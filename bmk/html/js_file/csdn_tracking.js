/*!function(){var i,e,c,a,s,n,d;s=[],i={SERVER_PV_URL:window.location.protocol+"//pv.csdn.net/csdnbi",SERVER_RE_URL:window.location.protocol+"//re.csdn.net/csdnbi",DELAY:500,DEBUG:!0},a={PV:"pv",VIEW:"view",CLICK:"click"},d={SKIPPED_AND_VISIBLE:"0",VISIBLE:"1"},c={getCookie:function(e){var t,o=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(o))?unescape(t[2]):null},buildRequestData:function(e,t){return a.PV==e?{headers:{component:"enterprise",datatype:"track",version:"v1"},body:JSON.stringify({re:$.param(t)})}:{headers:{component:"enterprise",datatype:"re",version:"v1"},body:JSON.stringify({re:$.param(t)})}},serverUrl:function(e){return a==e?i.SERVER_PV_URL:i.SERVER_RE_URL},initData:function(){var e,t;return n={uid:(null!=(e=/(; )?(UserName|_javaeye_cookie_id_)=([^;]+)/.exec(window.document.cookie))?e[3]:void 0)||"-",ref:window.document.referrer,pid:window.location.host.split(".csdn.net")[0],mod:"",con:"",ck:"-",curl:window.location.href,session_id:c.getCookie("dc_session_id"),cfg:{viewStrategy:d.VISIBLE}},$("meta[name=track]").attr("content")&&(t=JSON.parse($("meta[name=track]").attr("content"))),t&&(n=$.extend({},n,t)),n},tos:function(){var e,t,o,r;e=+new Date/1e3|0,o=null!=(t=/\bdc_tos=([^;]*)(?:$|;)/.exec(document.cookie))?t[1]:void 0;try{r=e-parseInt(o,36)}catch(e){console.warn("tos init error",e),r=-1}return document.cookie="dc_tos="+e.toString(36)+" ; expires="+new Date(1e3*(e+14400)).toGMTString()+" ; max-age=14400 ; path=/ ; domain=."+this.topDomain(window.location.host),r},topDomain:function(e){return/\.?([a-z0-9\-]+\.[a-z0-9\-]+)(:\d+)?$/.exec(e)[1]},copyArr:function(e){for(var t=[],o=0;o<e.length;o++)t.push(e[o]);return t},isView:function(e,t){var o=this;if(!e)return!1;var r=this.getElementBottom(e),n=r+e.offsetHeight;return d.VISIBLE==t?o.scrollTop()<r&&r<o.scrollTop()+o.windowHeight()||o.scrollTop()<n&&n<o.scrollTop()+o.windowHeight():d.SKIPPED_AND_VISIBLE==t?r<=o.scrollTop()+o.windowHeight()||(o.scrollTop()<r&&r<o.scrollTop()+o.windowHeight()||o.scrollTop()<n&&n<o.scrollTop()+o.windowHeight()):void 0},scrollTop:function(){return Math.max(document.body.scrollTop,document.documentElement.scrollTop)},windowHeight:function(){return"CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight},getElementTop:function(e){if("undefined"!=typeof jQuery)return $(e).offset().top;var t=e.offsetTop;for(e=e.offsetParent;null!=e;)t+=e.offsetTop,e=e.offsetParent;return t},getElementBottom:function(e){if("undefined"!=typeof jQuery)return $(e).offset().top+$(e).height();var t=e.offsetTop;for(e=e.offsetParent;null!=e;)t+=e.offsetTop,e=e.offsetParent;return t},url2Obj:function(e){var t={},o=e.split("&");for(var r in o)t[o[r].split("=")[0]]=decodeURIComponent(o[r].split("=")[1]);return t},fixParamConTop:function(e,t){return-1<e.con.split(",top_")||(e.con=e.con+",top_"+$(t).offset().top),e}},e={timer:0,checkTimer:0,reportServer:function(e,t){if(void 0!==e&&void 0!==t){var o=c.buildRequestData(e,t);s.push(o)}var r=c.copyArr(s);s=[];var n=a.PV==e?i.SERVER_PV_URL:i.SERVER_RE_URL;$.ajax({url:n,type:"POST",crossDomain:!0,xhrFields:{withCredentials:!0},contentType:"text/plain;charset=UTF-8",data:JSON.stringify(r),success:function(){},error:function(){console.error("csdn.track.reportServer()",arguments)}})},reportServerDelay:function(e,t){var o=c.buildRequestData(e,t);s.push(o);var r=this;r.timer&&clearTimeout(r.timer),r.timer=setTimeout(function(){r.reportServer()},i.DELAY)},reportView:function(e,t,o){e=c.fixParamConTop(e,t);var r=$.extend(!0,{},n,e);r.ck="-",delete r.cfg,r.type=a.VIEW,void 0===o?this.reportServerDelay(a.VIEW,r):this.reportServer(a.VIEW,r),"function"==typeof csdn.afterTrackReportView&&csdn.afterTrackReportView(t,e)},reportClick:function(e,t){e=c.fixParamConTop(e,t);var o=$.extend(!0,{},n,e);o.ck=o.con,delete o.cfg,o.type=a.CLICK,this.reportServer(a.CLICK,o)},reportPageView:function(e){var t=$.extend(!0,{},n,e);t.tos=c.tos(),t.referrer=t.ref,t.user_name=t.uid,delete t.cfg,t.type=a.PV,this.reportServer(a.PV,t)},viewCheck:function(){clearTimeout(this.checkTimer),this.checkTimer=setTimeout(function(){$("[data-track-view]").each(function(){var e=$(this),t=$.extend({},n,e.data("trackView"));c.isView(e.get(0),t.cfg.viewStrategy)&&(csdn.track.reportView(t,this),e.removeData("trackView"),e.removeAttr("data-track-view"))})},200)},isView:function(e){return c.isView(e)},debug:function(e,t){var o,r;for(var n in e)r=e[n],o=c.url2Obj(JSON.parse(r.body).re),void 0!==t?console.log(o.type,"--\x3e:",r.headers.datatype,o.mod,o.con):console.log(o.type,"--\x3e:",o)}},void 0===window.csdn&&(window.csdn={}),window.csdn.track=e,(n=c.initData()).disabled||csdn.track.reportPageView()}(),$(function(){var t=csdn.track;$(document).on("click","[data-track-click]",function(){var e=$(this).data("trackClick");t.reportClick(e,this)}),t.viewCheck($("[data-track-view]")),$(window).on("scroll",function(){t.viewCheck($("[data-track-view]"))})});*/

! function() {
	var i, e, c, a, s, n, d;
	s = [], i = {
		SERVER_PV_URL: window.location.protocol + "//pv.csdn.net/csdnbi",
		SERVER_RE_URL: window.location.protocol + "//re.csdn.net/csdnbi",
		DELAY: 500,
		DEBUG: !0
	}, a = {
		PV: "pv",
		VIEW: "view",
		CLICK: "click"
	}, d = {
		SKIPPED_AND_VISIBLE: "0",
		VISIBLE: "1"
	}, c = {
		getCookie: function(e) {
			var t, o = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
			return (t = document.cookie.match(o)) ? unescape(t[2]) : null
		},
		buildRequestData: function(e, t) {
			return a.PV == e ? {
				headers: {
					component: "enterprise",
					datatype: "track",
					version: "v1"
				},
				body: JSON.stringify({
					re: $.param(t)
				})
			} : {
				headers: {
					component: "enterprise",
					datatype: "re",
					version: "v1"
				},
				body: JSON.stringify({
					re: $.param(t)
				})
			}
		},
		serverUrl: function(e) {
			return a == e ? i.SERVER_PV_URL : i.SERVER_RE_URL
		},
		initData: function() {
			var e, t;
			return n = {
				uid: (null != (e = /(; )?(UserName|_javaeye_cookie_id_)=([^;]+)/.exec(window.document.cookie)) ? e[3] : void 0) || "-",
				ref: window.document.referrer,
				pid: window.location.host.split(".csdn.net")[0],
				mod: "",
				con: "",
				ck: "-",
				curl: window.location.href,
				session_id: c.getCookie("dc_session_id"),
				cfg: {
					viewStrategy: d.VISIBLE
				}
			}, $("meta[name=track]").attr("content") && (t = JSON.parse($("meta[name=track]").attr("content"))), t && (n = $.extend({}, n, t)), n
		},
		tos: function() {
			var e, t, o, r;
			e = +new Date / 1e3 | 0, o = null != (t = /\bdc_tos=([^;]*)(?:$|;)/.exec(document.cookie)) ? t[1] : void 0;
			try {
				r = e - parseInt(o, 36)
			} catch (e) {
				console.warn("tos init error", e), r = -1
			}
			return document.cookie = "dc_tos=" + e.toString(36) + " ; expires=" + new Date(1e3 * (e + 14400)).toGMTString() + " ; max-age=14400 ; path=/ ; domain=." + this.topDomain(window.location.host), r
		},
		topDomain: function(e) {
			return /\.?([a-z0-9\-]+\.[a-z0-9\-]+)(:\d+)?$/.exec(e)[1]
		},
		copyArr: function(e) {
			for (var t = [], o = 0; o < e.length; o++) t.push(e[o]);
			return t
		},
		isView: function(e, t) {
			var o = this;
			if (!e) return !1;
			var r = this.getElementBottom(e),
				n = r + e.offsetHeight;
			return d.VISIBLE == t ? o.scrollTop() < r && r < o.scrollTop() + o.windowHeight() || o.scrollTop() < n && n < o.scrollTop() + o.windowHeight() : d.SKIPPED_AND_VISIBLE == t ? r <= o.scrollTop() + o.windowHeight() || (o.scrollTop() < r && r < o.scrollTop() + o.windowHeight() || o.scrollTop() < n && n < o.scrollTop() + o.windowHeight()) : void 0
		},
		scrollTop: function() {
			return Math.max(document.body.scrollTop, document.documentElement.scrollTop)
		},
		windowHeight: function() {
			return "CSS1Compat" == document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
		},
		getElementTop: function(e) {
			if ("undefined" != typeof jQuery) return $(e).offset().top;
			var t = e.offsetTop;
			for (e = e.offsetParent; null != e;) t += e.offsetTop, e = e.offsetParent;
			return t
		},
		getElementBottom: function(e) {
			if ("undefined" != typeof jQuery) return $(e).offset().top + $(e).height();
			var t = e.offsetTop;
			for (e = e.offsetParent; null != e;) t += e.offsetTop, e = e.offsetParent;
			return t
		},
		url2Obj: function(e) {
			var t = {},
				o = e.split("&");
			for (var r in o) t[o[r].split("=")[0]] = decodeURIComponent(o[r].split("=")[1]);
			return t
		},
		fixParamConTop: function(e, t) {
			return -1 < e.con.split(",top_") || (e.con = e.con + ",top_" + $(t).offset().top), e
		}
	}, e = {
		timer: 0,
		checkTimer: 0,
		reportServer: function(e, t) {
			if (void 0 !== e && void 0 !== t) {
				var o = c.buildRequestData(e, t);
				s.push(o)
			}
			var r = c.copyArr(s);
			s = [];
			var n = a.PV == e ? i.SERVER_PV_URL : i.SERVER_RE_URL;
			$.ajax({
				url: n,
				type: "POST",
				crossDomain: !0,
				xhrFields: {
					withCredentials: !0
				},
				contentType: "text/plain;charset=UTF-8",
				data: JSON.stringify(r),
				success: function() {},
				error: function() {
					console.error("csdn.track.reportServer()", arguments)
				}
			})
		},
		reportServerDelay: function(e, t) {
			var o = c.buildRequestData(e, t);
			s.push(o);
			var r = this;
			r.timer && clearTimeout(r.timer), r.timer = setTimeout(function() {
				r.reportServer()
			}, i.DELAY)
		},
		reportView: function(e, t, o) {
			e = c.fixParamConTop(e, t);
			var r = $.extend(!0, {}, n, e);
			r.ck = "-", delete r.cfg, r.type = a.VIEW, void 0 === o ? this.reportServerDelay(a.VIEW, r) : this.reportServer(a.VIEW, r), "function" == typeof csdn.afterTrackReportView && csdn.afterTrackReportView(t, e)
		},
		reportClick: function(e, t) {
			e = c.fixParamConTop(e, t);
			var o = $.extend(!0, {}, n, e);
			o.ck = o.con, delete o.cfg, o.type = a.CLICK, this.reportServer(a.CLICK, o)
		},
		reportPageView: function(e) {
			var t = $.extend(!0, {}, n, e);
			t.tos = c.tos(), t.referrer = t.ref, t.user_name = t.uid, delete t.cfg, t.type = a.PV, this.reportServer(a.PV, t)
		},
		viewCheck: function() {
			clearTimeout(this.checkTimer), this.checkTimer = setTimeout(function() {
				$("[data-track-view]").each(function() {
					var e = $(this),
						t = $.extend({}, n, e.data("trackView"));
					c.isView(e.get(0), t.cfg.viewStrategy) && (csdn.track.reportView(t, this), e.removeData("trackView"), e.removeAttr("data-track-view"))
				})
			}, 200)
		},
		isView: function(e) {
			return c.isView(e)
		},
		debug: function(e, t) {
			var o, r;
			for (var n in e) r = e[n], o = c.url2Obj(JSON.parse(r.body).re), void 0 !== t ? console.log(o.type, "--\x3e:", r.headers.datatype, o.mod, o.con) : console.log(o.type, "--\x3e:", o)
		}
	}, void 0 === window.csdn && (window.csdn = {}), window.csdn.track = e, (n = c.initData()).disabled || csdn.track.reportPageView()
}(), $(function() {
	var t = csdn.track;
	$(document).on("click", "[data-track-click]", function() {
		var e = $(this).data("trackClick");
		t.reportClick(e, this)
	}), t.viewCheck($("[data-track-view]")), $(window).on("scroll", function() {
		t.viewCheck($("[data-track-view]"))
	})
});