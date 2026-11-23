#!/usr/bin/env bash
# push_to_git_server.sh
# 功能:
#   1. 将本仓库同时绑定到 GitHub 和 Gitee 上 fingerecho 用户的同名仓库
#   2. 若远程仓库不存在,则通过 API 自动创建(GitHub 与 Gitee 均不支持通过 SSH 创建仓库)
#   3. 以 master 作为远程仓库的默认分支
#   4. 一次运行,同时 push 到:
#        git@github.com:fingerecho/fingerecho.github.io.git
#        git@gitee.com:fingerecho/fingerecho.github.io.git
#
# 用法:
#   ./push_to_git_server.sh "提交说明"          # 生成RSS + 提交 + 推送到两个远程
#   ./push_to_git_server.sh -n "提交说明"       # 跳过生成RSS,其余同上
#   ./push_to_git_server.sh --setup-only        # 只配置远程仓库(检测/创建/设默认分支),不提交不推送
#   ./push_to_git_server.sh --push-only         # 只推送到两个远程,不做 add/commit
#
# 前置条件:
#   - 已配置好 GitHub 和 Gitee 的 SSH 密钥(本机 ssh 能连通两站)
#   - 创建远程仓库需要 API 凭证(仅当仓库不存在时才用到):
#       GitHub: 已登录的 gh CLI,或环境变量 GITHUB_TOKEN
#       Gitee : 环境变量 GITEE_TOKEN(在 Gitee「设置 -> 私人令牌」中生成,勾选 projects 权限)
#     若目标仓库已存在,则无需任何 token。
#   - 推送前确认两个账号的用户名确实都是 fingerecho(见下方配置区)

set -o pipefail

# ==================== 配置区 ====================
BRANCH="master"                                # 本地与远程的默认分支
GITHUB_USER="fingerecho"
GITEE_USER="fingerecho"
REPO_NAME="fingerecho.github.io"
REMOTE_GITHUB="github"                         # 远程名:GitHub
REMOTE_GITEE="gitee"                           # 远程名:Gitee
PUSH_FORCE="-f"                                # 强制推送;想改为普通推送可置空
GITHUB_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
GITEE_URL="git@gitee.com:${GITEE_USER}/${REPO_NAME}.git"
# 注意:GitHub Pages 用户站点仓库名须为 <用户名>.github.io;
# 若你的 GitHub 用户名不是 fingerecho,请同步修改 GITHUB_USER。
# ================================================

GEN_RSS=1
DO_COMMIT=1
DO_PUSH=1
DO_SETUP=1
MSG=""

while [ $# -gt 0 ]; do
    case "$1" in
        -n|--no-rss)     GEN_RSS=0; shift ;;
        --setup-only)    DO_COMMIT=0; DO_PUSH=0; shift ;;
        --push-only)     DO_COMMIT=0; shift ;;
        -h|--help)       sed -n '2,26p' "$0"; exit 0 ;;
        -*)              echo "未知选项: $1" >&2; exit 1 ;;
        *)               MSG="$1"; shift ;;
    esac
done

info() { echo "[信息] $*"; }
warn() { echo "[警告] $*" >&2; }
err()  { echo "[错误] $*" >&2; }

# 检查 git 仓库与当前分支
cd "$(git rev-parse --show-toplevel)" || { err "当前目录不是 git 仓库"; exit 1; }
CUR_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CUR_BRANCH" != "$BRANCH" ]; then
    warn "当前分支是 $CUR_BRANCH,而脚本按 $BRANCH 分支工作。"
    warn "将尝试切换到 $BRANCH 分支……"
    git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH"
fi

# 统一身份配置(保留原脚本行为,写为仓库级,避免污染全局)
git config user.email "283285356@qq.com"
git config user.name "fingerecho"

# ---------- 工具函数 ----------

# 幂等地添加/更新远程
ensure_remote() {
    local name="$1" url="$2"
    if git remote get-url "$name" >/dev/null 2>&1; then
        git remote set-url "$name" "$url"
    else
        git remote add "$name" "$url"
    fi
}

# 检测远程仓库是否存在(利用 SSH),存在返回 0
remote_repo_exists() {
    local url="$1"
    GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new" \
        git ls-remote "$url" HEAD >/dev/null 2>&1
}

# 创建 GitHub 仓库(优先 gh CLI,其次 GITHUB_TOKEN)
create_github_repo() {
    if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
        info "使用 gh CLI 创建 GitHub 仓库 ${GITHUB_USER}/${REPO_NAME} ……"
        gh repo create "$GITHUB_USER/$REPO_NAME" --description "$REPO_NAME" >/dev/null && return 0
        # 仓库可能已存在导致 create 失败,交由调用方处理
        return 1
    fi
    if [ -n "${GITHUB_TOKEN:-}" ]; then
        info "使用 REST API 创建 GitHub 仓库 ……"
        local resp
        resp="$(curl -sS -X POST "https://api.github.com/user/repos" \
            -H "Authorization: Bearer ${GITHUB_TOKEN}" \
            -H "Accept: application/vnd.github+json" \
            --data-urlencode "name=${REPO_NAME}" \
            --data-urlencode "private=false" \
            --data-urlencode "auto_init=false")"
        if echo "$resp" | grep -q '"full_name"'; then
            return 0
        fi
        err "GitHub 创建仓库失败: $resp"
        return 1
    fi
    warn "GitHub 仓库 ${GITHUB_USER}/${REPO_NAME} 不存在,且未找到可用的创建方式。"
    warn "请任选其一:"
    warn "  1) 安装并登录 gh CLI(gh auth login)"
    warn "  2) 设置环境变量 GITHUB_TOKEN(具有 repo 权限的 token)"
    warn "  3) 手动在网页上创建该仓库后重新运行本脚本"
    return 1
}

# 创建 Gitee 仓库(需要 GITEE_TOKEN 私人令牌)
create_gitee_repo() {
    if [ -n "${GITEE_TOKEN:-}" ]; then
        info "使用 REST API 创建 Gitee 仓库 ……"
        local resp
        # 正确的建库端点是 POST /api/v5/user/repos(POST /api/v5/repos 返回 404)
        resp="$(curl -sS -X POST "https://gitee.com/api/v5/user/repos" \
            --data-urlencode "access_token=${GITEE_TOKEN}" \
            --data-urlencode "name=${REPO_NAME}" \
            --data-urlencode "private=false" \
            --data-urlencode "description=${REPO_NAME}" \
            --data-urlencode "auto_init=false")"
        if echo "$resp" | grep -q '"full_name"'; then
            return 0
        fi
        err "Gitee 创建仓库失败: $resp"
        return 1
    fi
    warn "Gitee 仓库 ${GITEE_USER}/${REPO_NAME} 不存在,且未设置 GITEE_TOKEN。"
    warn "请在 Gitee「设置 -> 私人令牌」生成 token(勾选 projects 权限),然后:"
    warn "  export GITEE_TOKEN=你的token   再重新运行本脚本"
    warn "(也可以直接在 Gitee 网页手动创建同名仓库后重新运行)"
    return 1
}

# 推送 master 到某个远程
push_to() {
    local name="$1"
    info "正在推送到 ${name} (${PUSH_FORCE:+强制})……"
    if GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=20 -o StrictHostKeyChecking=accept-new" \
        git push $PUSH_FORCE "$name" "HEAD:${BRANCH}" 2>&1; then
        info "${name}: 推送成功 -> ${BRANCH}"
        return 0
    else
        err "${name}: 推送失败"
        return 1
    fi
}

# 确保远程默认分支为 master(Gitee 空仓库默认常为 master;GitHub 首次推送即 master)
# API 设置仅作兜底,失败只提示不中止
set_default_branch_api() {
    local host="$1" owner="$2" repo="$3"
    case "$host" in
        github)
            [ -z "${GITHUB_TOKEN:-}" ] && return 0
            curl -sS -X PATCH "https://api.github.com/repos/${owner}/${repo}" \
                -H "Authorization: Bearer ${GITHUB_TOKEN}" \
                -H "Accept: application/vnd.github+json" \
                -H "X-GitHub-Api-Version: 2022-11-28" \
                --data-urlencode "default_branch=${BRANCH}" >/dev/null 2>&1 \
                && info "GitHub: 已确认默认分支为 ${BRANCH}" \
                || warn "GitHub: 设置默认分支失败,请到仓库 Settings -> Branches 手动确认"
            ;;
        gitee)
            [ -z "${GITEE_TOKEN:-}" ] && return 0
            curl -sS -X PATCH "https://gitee.com/api/v5/repos/${owner}/${repo}" \
                --data-urlencode "access_token=${GITEE_TOKEN}" \
                --data-urlencode "cf_default_branch=${BRANCH}" >/dev/null 2>&1 \
                && info "Gitee: 已确认默认分支为 ${BRANCH}" \
                || warn "Gitee: 设置默认分支失败,请到仓库「管理 -> 仓库设置」手动确认"
            ;;
    esac
}

# ---------- 主流程 ----------

FAILED=0

if [ "$DO_SETUP" = 1 ]; then
    ensure_remote "$REMOTE_GITHUB" "$GITHUB_URL"
    ensure_remote "$REMOTE_GITEE"  "$GITEE_URL"
    info "远程绑定完成: $REMOTE_GITHUB -> $GITHUB_URL"
    info "               $REMOTE_GITEE -> $GITEE_URL"

    # 检测/创建 GitHub 仓库
    if remote_repo_exists "$GITHUB_URL"; then
        info "GitHub 仓库已存在。"
    else
        create_github_repo || FAILED=1
    fi

    # 检测/创建 Gitee 仓库
    if remote_repo_exists "$GITEE_URL"; then
        info "Gitee 仓库已存在。"
    else
        create_gitee_repo || FAILED=1
    fi
fi

if [ "$DO_COMMIT" = 1 ]; then
    if [ "$GEN_RSS" = 1 ] && [ -f gen_RSS_for_lives.py ]; then
        info "生成 RSS……"
        python3 gen_RSS_for_lives.py || warn "RSS 生成失败,继续提交流程"
    fi
    git add ./*
    if git diff --cached --quiet; then
        info "没有需要提交的改动,跳过 commit。"
    else
        if [ -z "$MSG" ]; then
            MSG="提交更新: $(date '+%Y-%m-%d %H:%M')"
        fi
        git commit -m "$MSG" || { err "提交失败"; exit 1; }
        info "已提交: $MSG"
    fi
fi

if [ "$DO_PUSH" = 1 ]; then
    push_to "$REMOTE_GITHUB" || FAILED=1
    push_to "$REMOTE_GITEE"  || FAILED=1

    # 推送成功后,若有 token 则顺带确认默认分支
    if [ "$FAILED" = 0 ]; then
        set_default_branch_api github "$GITHUB_USER" "$REPO_NAME"
        set_default_branch_api gitee  "$GITEE_USER" "$REPO_NAME"
    fi
fi

if [ "$FAILED" = 0 ]; then
    info "全部完成。可访问以下地址核对:"
    info "  https://github.com/${GITHUB_USER}/${REPO_NAME}"
    info "  https://gitee.com/${GITEE_USER}/${REPO_NAME}"
else
    err "流程中存在失败项,请按上方提示处理后重新运行。"
    exit 1
fi
