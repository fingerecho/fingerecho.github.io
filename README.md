# 小方个人网 · fingerecho.github.io

> 一个托管在 GitHub Pages 上的个人主页与技术博客，纯静态、零后端、开箱即用。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线-blue)](https://fingerecho.com)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Static](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-orange)]()

- 线上站点：<https://fingerecho.com>

## 项目简介

这是本人的个人网站源码仓库。整站由手写的 HTML / CSS / JavaScript 构成，
通过 GitHub Actions 自动部署到 GitHub Pages，并用 `CNAME` 绑定自定义域名
`fingerecho.com`。页面不依赖后端服务，所有内容均为静态文件，加载快、易于迁移与备份。

## 功能特性

- **响应式布局**：桌面端左侧导航栏，移动端折叠为右上角抽屉菜单。
- **技术博客**：`lives/` 下按时间归档文章，并提供 RSS 订阅 `lives/rss.xml`。
- **文章索引**：`navcontent/` 生成分类索引，正文归档在 `subcontent/`。
- **书签导航**：`bmk/` 是一个独立的个人书签收藏页。
- **学习资源**：`resources/` 收录常用的数学、技术类 PDF 资料。
- **个人简历**：`cv.pdf` 为当前简历，`cvs/` 保存历史版本。
- **搜索引擎优化**：内置 `robots.txt`、`sitemap.txt` 及百度站点验证文件。
- **自动化脚本**：提供文章发布、RSS 生成、站点地图生成、一键推送等 Python / Shell 工具。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 网站首页 |
| `lives/` | 博客文章与 RSS 订阅源 |
| `navcontent/` | 文章分类索引页及生成脚本 |
| `subcontent/` | 文章正文与模板 |
| `bmk/` | 个人书签收藏页 |
| `resources/` | 学习资源（PDF） |
| `cvs/` | 历史简历备份 |
| `css/` `js/` `jpg/` | 样式、脚本与图片资源 |
| `config/` | Nginx 等配置 |
| `temp/` | 文章发布临时目录 |
| `.github/workflows/static.yml` | GitHub Pages 自动部署工作流 |
| `CNAME` | 自定义域名配置 |
| `LICENSE` | MIT 开源许可证 |

## 技术栈

- **前端**：HTML5、CSS3、原生 JavaScript、Bootstrap、jQuery
- **构建/部署**：GitHub Actions、GitHub Pages、Jekyll 主题配置（`_config.yml`）
- **自动化脚本**：Python 3、PyYAML、Requests、BeautifulSoup4
- **服务器参考配置**：Nginx（`config/nginx.conf`）

## 本地预览

由于是纯静态站点，任意静态服务器均可运行：

```bash
# 在仓库根目录执行
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 部署方式

推送到 `master` 分支即可：

```bash
git push origin master
```

GitHub Actions 会执行 `.github/workflows/static.yml`，将整个仓库作为静态站点
发布到 GitHub Pages。自定义域名通过根目录的 `CNAME`（`fingerecho.com`）生效。

## 常用脚本

```bash
# 生成博客 RSS 订阅源 -> lives/rss.xml
python3 gen_RSS_for_lives.py

# 爬取站点并生成 sitemap.txt
python3 gen_sitemap.py https://fingerecho.com

# 发布一篇文章（title + 分类）
./insert.sh "文章标题" "分类名"

# 一键提交并推送（可带说明）
./push_to_github.sh "本次更新说明"
```

文章发布流程：

1. 将草稿（`.txt` / `.md` / `.htm`）放入 `temp/`。
2. 运行 `insert.sh`，脚本会自动生成正文、写入 YAML 索引并更新导航。
3. 推送到远端，等待 Pages 自动部署完成。

## 开源许可

本项目基于 [MIT License](./LICENSE) 开源，欢迎参考与交流。

## 说明

本人github的SSH私钥已经迁移到本人微信收藏当中。
