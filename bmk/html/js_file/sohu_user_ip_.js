String.prototype.getQueryString = function(v) {
	var reg = new RegExp("(^|&|\\?)" + v + "=([^&]*)(&|$)"),
		r;
	if (r = this.match(reg)) {
		return unescape(r[2]);
	}
	return null;
};
var sohu_IP_Loc = "unknown",
	LocUrl = document.location.href;
if ((LocUrl.indexOf("sohusce.com") >= 0) || (LocUrl.indexOf("sohu.com") >= 0) || (LocUrl.indexOf("chinaren.com") >= 0) || (LocUrl.indexOf("17173.com") >= 0) || (LocUrl.indexOf("focus.cn") >= 0)) {
	window.sohu_user_ip = "113.118.10.244";
	sohu_IP_Loc = "CN440300";
	sohu_IP_Loc_V = "CN440300";
}
var AdLoc2 = sohu_IP_Loc.substr(0, 2),
	AdLoc4 = sohu_IP_Loc.substr(0, 4),
	AdLoc6 = sohu_IP_Loc.substr(0, 6);
if (window.location.href.getQueryString("ip")) sohu_IP_Loc = AdLoc2 = AdLoc4 = AdLoc6 = window.location.href.getQueryString("ip");