/**
 * projects.html —— 项目列表数据配置
 *
 * 本文件只存放数据，不含任何逻辑、不注册事件、不读写 DOM，
 * 浏览器解析成本约等于一次变量赋值，对 CPU / GPU / 内存无额外占用。
 *
 * 字段说明
 *   name      项目名（卡片标题，字符串）
 *   desc      项目描述（字符串）
 *   tags      标签数组（可为空数组 []，为空时该行不渲染）
 *   progress  完成度文案，如 "已完成" / "开发中" / "v1.2 维护中"
 *   done      完成状态：true = 已完成（绿色圆点），false = 进行中（橙色圆点）
 *   links.github  GitHub 仓库地址；留空 "" 则不显示 GitHub 链接标签
 *   links.gitee   码云仓库地址；留空 "" 则不显示 Gitee 链接标签
 *                 （github 与 gitee 只有一个时，就只显示那一个，不会留出空位）
 *   links.demo    在线案例 / 演示地址；填写后用「查看案例」取代「已完成」，留空 "" 则显示完成度
 *
 * 新增项目：在数组末尾复制一段对象填写即可，卡片顺序与这里的书写顺序一致。
 */
window.PROJECTS = [
	{
		name: "Fingerecho's Blog",
		desc: "心若有所向往，何惧道阻且长。记录技术分享和生活感悟的个人博客。",
		tags: ["技术分享", "Blog", "Markdown"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/fingerecho.github.io",
			gitee: "https://gitee.com/fingerecho/fingerecho.github.io",
			demo: "https://fingerecho.com"
		}
	},
	{
		name: "KC-CXIM(《铖信》即时通讯)",
		desc: "KC-CXIM《铖信》是一个全栈即时通讯项目：自带 C++17 自研 IM 服务端（HTTP 鉴权 + TCP 长连接 + MariaDB）、Windows 桌面客户端与 Web 管理后台（Drogon 后端 + Vue3 前端），同时保留腾讯云 IM SDK 的接入示例。",
		tags: ["Windows", "即时通讯", "仿QQ"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KC-CXIM",
			gitee: "https://gitee.com/fingerecho/KC-CXIM",
			demo: ""
		}
	},
	{
		name: "KCSystemConsole(克铖操作控制台)",
		desc: "打造一款轻量、现代、高效的 Windows 系统监控与操作工具。",
		tags: ["监控", "AI Agent", "实时数据"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KCSystemConsole",
			gitee: "",
			demo: ""
		}
	},
	{
		name: "KC-EchoPlayer(克铖音视频播放器)",
		desc: "一个基于 Duilib 与 BASS 的 Windows 音乐播放器，支持多格式音频播放与实时频谱可视化。",
		tags: ["Windows", "音视频播放器", "自研开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KC-EchoPlayer",
			gitee: "https://gitee.com/fingerecho/KC-EchoPlayer",
			demo: ""
		}
	},
	{
		name: "KCEnvEditor(克铖环境变量管理器)",
		desc: "一款轻量级 Windows 环境变量管理器，支持可视化查看、编辑、备份与回滚系统/用户变量，让 PATH 配置更安全、更省心。",
		tags: ["Windows", "环境变量", "自研开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KCEnvEditor",
			gitee: "",
			demo: ""
		}
	},
	{
		name: "KCMemMonitor(克铖内存监控器)",
		desc: "基于 C++ 与 WinUI3 的 Windows 整机物理内存监控工具。界面实时展示总内存、已用内存、可用内存、占用百分比与内存压力等级五项指标，并以环形饼图和近 60 秒动态趋势图直观呈现。",
		tags: ["Windows系统工具", "内存监控", "自研开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KCMemMonitor",
			gitee: "",
			demo: ""
		}
	},
	{
		name: "KCCPUMonitor(克铖CPU性能监控器)",
		desc: "本项目是基于 C++ 与 WinUI3 的 Windows 整机 CPU 性能监控工具，WinUI3 桌面应用，实时展示 CPU 名称、利用率、当前/基准频率、进程数、线程数、句柄数、正常运行时间、插槽、内核、逻辑处理器、虚拟化状态、L1/L2/L3 缓存。",
		tags: ["Windows系统工具", "CPU性能监控", "自研开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KCCPUMonitor",
			gitee: "",
			demo: ""
		}
	},
	{
		name: "KC-CodeLitePlugin-CodeStatsPanel(CodeLite 插件：智能代码统计与质量看板)",
		desc: "本项目是 CodeLite 插件：基于 AST 的智能代码统计与质量看板。功能定位：在底部 Dock 面板做一个可视化的代码统计工具。支持统计项目内的代码行数、注释率、圈复杂度（粗略计算 if/for/while 数量），以及 TODO/FIXME 标记。",
		tags: ["CodeLite IDE插件", "AST代码统计", "自研开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/KC-CodeLitePlugin-CodeStatsPanel",
			gitee: "",
			demo: ""
		}
	},
	{
		name: "trackingsite(知识图谱项目)",
		desc: "开源、隐私友好的网站访问统计分析工具，提供详细的访问数据和洞察。",
		tags: ["数据分析", "统计", "开源"],
		progress: "已完成",
		done: true,
		links: {
			github: "https://github.com/fingerecho/trackingsite",
			gitee: "",
			demo: ""
		}
	}
];
