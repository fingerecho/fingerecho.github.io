(function () {
	"use strict";

	var THEMES = 8;
	var PAGE_FILE = (location.pathname.split("/").pop() || "index.html").toLowerCase();
	var IS_INDEX = /^(index\.html?)?$/.test(PAGE_FILE) || location.pathname.slice(-1) === "/";

	function hashString(str) {
		var h = 5381;
		for (var i = 0; i < str.length; i++) {
			h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
		}
		return h;
	}

	function applyTheme() {
		var root = document.documentElement;
		root.setAttribute("data-theme", String(hashString(PAGE_FILE) % THEMES));
		root.setAttribute("data-page", IS_INDEX ? "index" : "post");
		root.setAttribute("data-file", PAGE_FILE);

		if (!document.querySelector('meta[name="viewport"]')) {
			var viewport = document.createElement("meta");
			viewport.name = "viewport";
			viewport.content = "width=device-width, initial-scale=1";
			document.head.appendChild(viewport);
		}

		var themeColor = document.querySelector('meta[name="theme-color"]');
		if (!themeColor) {
			themeColor = document.createElement("meta");
			themeColor.name = "theme-color";
			document.head.appendChild(themeColor);
		}
		themeColor.content = "#070912";
	}

	function createBackdrop() {
		if (!document.querySelector(".blog-bg")) {
			var bg = document.createElement("div");
			bg.className = "blog-bg";
			bg.setAttribute("aria-hidden", "true");
			document.body.insertBefore(bg, document.body.firstChild);
		}
		if (!document.querySelector(".blog-grid")) {
			var grid = document.createElement("div");
			grid.className = "blog-grid";
			grid.setAttribute("aria-hidden", "true");
			document.body.appendChild(grid);
		}
	}

	function isSkippable(node) {
		if (node.nodeType === 8) { return true; }
		if (node.nodeType === 3) { return !node.textContent.trim(); }
		if (node.nodeType !== 1) { return true; }
		var tag = node.tagName;
		if (tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" ||
			tag === "META" || tag === "NOSCRIPT" || tag === "TEMPLATE") {
			return true;
		}
		return node.classList.contains("blog-bg") ||
			node.classList.contains("blog-grid") ||
			node.classList.contains("blog-progress") ||
			node.classList.contains("blog-fab");
	}

	function wrapContent() {
		var main = document.querySelector(".article");
		if (main) { return main; }

		main = document.createElement("main");
		main.className = "article";

		var nodes = Array.prototype.slice.call(document.body.childNodes);
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (isSkippable(node)) { continue; }
			main.appendChild(node);
		}
		document.body.appendChild(main);
		return main;
	}

	function wrapTables(scope) {
		var tables = scope.querySelectorAll("table");
		for (var i = 0; i < tables.length; i++) {
			var table = tables[i];
			if (table.parentElement && table.parentElement.classList.contains("table-wrap")) {
				continue;
			}
			var wrap = document.createElement("div");
			wrap.className = "table-wrap";
			table.parentNode.insertBefore(wrap, table);
			wrap.appendChild(table);
		}
	}

	function markProseBlocks(scope) {
		var pres = scope.querySelectorAll("pre");
		for (var i = 0; i < pres.length; i++) {
			if (!pres[i].textContent.trim()) {
				pres[i].style.display = "none";
				continue;
			}
			if (!pres[i].querySelector("code")) {
				pres[i].classList.add("pre-prose");
			}
		}
	}

	function hideEmptyHeadings(scope) {
		var headings = scope.querySelectorAll("h1, h2, h3");
		for (var i = 0; i < headings.length; i++) {
			if (!headings[i].textContent.trim()) {
				headings[i].style.display = "none";
			}
		}
	}

	function findTitleHeading(scope) {
		var headings = scope.querySelectorAll("h1, h2");
		for (var i = 0; i < headings.length; i++) {
			if (headings[i].textContent.trim()) {
				return headings[i];
			}
		}
		return null;
	}

	function addTitleAndMeta(scope) {
		var heading = findTitleHeading(scope);
		var siteTitle = scope.querySelector("#site-title-name span");
		if (!heading && !siteTitle && document.title && document.title.trim()) {
			heading = document.createElement("h1");
			heading.textContent = document.title.trim();
			scope.insertBefore(heading, scope.firstChild);
		}

		var back = scope.querySelector("#site-title-name a");
		if (back) {
			back.textContent = "← 返回";
		}

		if (!heading || IS_INDEX) { return; }
		if (scope.querySelector("video, iframe")) { return; }

		var text = scope.textContent || "";
		var cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
		var words = (text.replace(/[\u4e00-\u9fff]/g, " ").match(/[A-Za-z0-9_]+/g) || []).length;
		var total = cjk + words;
		if (total < 20) { return; }
		if ((scope.querySelector("table") || scope.querySelectorAll("a").length > 3) &&
			scope.querySelectorAll("p").length === 0) {
			return;
		}

		var minutes = Math.max(1, Math.round(total / 350));
		var meta = document.createElement("div");
		meta.className = "article-meta";
		meta.innerHTML =
			'<span>' + minutes + ' 分钟阅读</span>' +
			'<span>' + total.toLocaleString() + ' 字</span>';
		heading.parentNode.insertBefore(meta, heading.nextSibling);
	}

	function addChrome() {
		if (!document.querySelector(".blog-progress")) {
			var bar = document.createElement("div");
			bar.className = "blog-progress";
			bar.setAttribute("role", "progressbar");
			bar.setAttribute("aria-hidden", "true");
			document.body.appendChild(bar);
		}

		var fab = document.querySelector(".blog-fab");
		if (!fab) {
			fab = document.createElement("div");
			fab.className = "blog-fab";
			if (!IS_INDEX) {
				var home = document.createElement("a");
				home.href = "./index.html";
				home.textContent = "文章列表";
				fab.appendChild(home);
			}
			var top = document.createElement("button");
			top.type = "button";
			top.className = "top";
			top.textContent = "回到顶部";
			top.addEventListener("click", function () {
				window.scrollTo({ top: 0, behavior: "smooth" });
			});
			fab.appendChild(top);
			document.body.appendChild(fab);
		}

		var progress = document.querySelector(".blog-progress");
		var topButton = fab.querySelector(".top");

		function onScroll() {
			var doc = document.documentElement;
			var max = doc.scrollHeight - window.innerHeight;
			var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			if (progress) { progress.style.width = (ratio * 100) + "%"; }
			if (topButton) {
				if (window.scrollY > 360) {
					fab.classList.add("visible");
				} else {
					fab.classList.remove("visible");
				}
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		onScroll();
	}

	function handleImages(scope) {
		var images = scope.querySelectorAll("img");
		for (var i = 0; i < images.length; i++) {
			var img = images[i];
			if (!img.getAttribute("decoding")) { img.setAttribute("decoding", "async"); }
			if (!img.getAttribute("loading")) { img.setAttribute("loading", "lazy"); }
			img.addEventListener("error", function () {
				this.style.display = "none";
			});
			if (img.complete && img.naturalWidth === 0) {
				img.style.display = "none";
			}
		}
	}

	function cleanTemplateArtifacts(scope) {
		var stray = [];
		for (var i = 0; i < scope.childNodes.length; i++) {
			var node = scope.childNodes[i];
			if (node.nodeType === 3 && /^\s*\{%.*%\}\s*$/.test(node.nodeValue)) {
				stray.push(node);
			}
		}
		for (var j = 0; j < stray.length; j++) {
			stray[j].parentNode.removeChild(stray[j]);
		}
	}

	function adoptLateFrames(main) {
		if (!document.querySelector('script[src*="utteranc"]')) { return; }
		if (typeof MutationObserver === "undefined") { return; }

		var observer = new MutationObserver(function (mutations) {
			for (var i = 0; i < mutations.length; i++) {
				var added = mutations[i].addedNodes;
				for (var j = 0; j < added.length; j++) {
					var node = added[j];
					if (node.nodeType !== 1 || main.contains(node)) { continue; }
					if (node.classList.contains("blog-bg") ||
						node.classList.contains("blog-grid") ||
						node.classList.contains("blog-fab") ||
						node.classList.contains("blog-progress")) {
						continue;
					}
					var hasFrame = node.tagName === "IFRAME" ||
						(node.querySelector && node.querySelector("iframe"));
					if (hasFrame) {
						main.appendChild(node);
					}
				}
			}
		});
		observer.observe(document.body, { childList: true });
	}

	function decorate() {
		var main = wrapContent();
		wrapTables(main);
		markProseBlocks(main);
		hideEmptyHeadings(main);
		addTitleAndMeta(main);
		cleanTemplateArtifacts(main);
		handleImages(main);
		createBackdrop();
		addChrome();
		adoptLateFrames(main);
	}

	applyTheme();

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", decorate);
	} else {
		decorate();
	}
})();
