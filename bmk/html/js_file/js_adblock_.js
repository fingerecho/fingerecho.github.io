! function() {
	var c, e;

	function t() {
		console.log("AdBlock is not enabled")
	}

	function n() {
		var c, e, t;
		console.log("Adblock is enabled"), c = "adblock", e = {
			step: "install"
		}, t = window.location.protocol + "//statistic.csdn.net/", $.get(t + c, e);
		var n;
		! function() {
			var c = document.createElement("div");
			c.innerHTML = '<div class="adblock"><img src="https://g.csdnimg.cn/check-adblock/1.0.0/img/monkey@2x.png"/><span>亲爱的用户，您使用了广告屏蔽软件，广告是CSDN向您免费提供服务与产品的重要支持，希望您将csdn.net加入AdBlock Plus<a class="check_a" href="https://bbs.csdn.net/topics/392458005" target="_blank">白名单</a>，感谢支持！</span><em class="check_close"><svg t="1539053811268" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7199" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 438.378667L806.506667 143.893333a52.032 52.032 0 1 1 73.6 73.621334L585.621333 512l294.485334 294.485333a52.074667 52.074667 0 0 1-73.6 73.642667L512 585.621333 217.514667 880.128a52.053333 52.053333 0 1 1-73.621334-73.642667L438.378667 512 143.893333 217.514667a52.053333 52.053333 0 1 1 73.621334-73.621334L512 438.378667z" fill="#8a8a8a" p-id="7200"></path></svg></div>';
			var e = document.body.firstChild;
			document.body.insertBefore(c, e)
		}(), $(".check_close").length && $(".check_close").on("click", function(c) {
			c.stopPropagation(), $(this).parents(".adblock").remove(), "function" == typeof window.csdn.insertcallbackBlock && window.csdn.insertcallbackBlock()
		}), (n = new Date).setDate(n.getDate() + 7), document.cookie = "c_adb=1; expires=" + n.toGMTString() + "; domain=csdn.net; path=/", "function" == typeof window.csdn.insertcallbackBlock && window.csdn.insertcallbackBlock()
	}
	if (void 0 === window.csdn && (window.csdn = {}), c = "https://g.csdnimg.cn/check-adblock/1.0.8/css/check-adblock.css", (e = document.createElement("link")).rel = "stylesheet", e.type = "text/css", e.href = c, document.getElementsByTagName("head")[0].appendChild(e), "undefined" != typeof fuckAdBlock || "undefined" != typeof FuckAdBlock) n();
	else {
		var o = document.createElement("script");
		o.onload = function() {
			fuckAdBlock.onDetected(n), fuckAdBlock.onNotDetected(t)
		}, o.onerror = function() {
			n()
		}, o.type = "text/javascript", o.src = "https://g.csdnimg.cn/lib/fuckadblock/3.2.1/fuckadblock.min.js", document.head.appendChild(o)
	}
}();