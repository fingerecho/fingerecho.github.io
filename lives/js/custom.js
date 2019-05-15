var fh = function(){
		var bk = document.body;
		
}
function chage_background(){
		window.setTimeout(fh,3000,false);
}
chage_background();
var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1275904815'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1275904815' type='text/javascript'%3E%3C/script%3E"));



//var GLOBAL_URI = "https://gitee.fyping.cn:65533"
//var GLOBAL_URI =  'http://127.0.0.1:65532'
//var GLOBAL_WS_URI = 'ws://127.0.0.1:65532'

var GLOBAL_URI = "https://gitee.fyping.cn:65533"
var GLOBAL_WS_URI = 'ws://gitee.fyping.cn:65533'

var is_ie = !!window.ActiveXObject || "ActiveXObject" in window;

var addd = function(uul){
	var tar = document.createElement("script");
	tar.setAttribute("src",uul);
	document.head.append(tar);
	//$("#alitck").after(tar);	
};
var  json2str = function(o) { 
	var arr = []; 
	var fmt = function(s) { 
	if (typeof s == 'object' && s != null) return json2str(s); 
	return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
	} 
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i])); 
	return '{' + arr.join(',') + '}'; 
};

if(!is_ie){
	/*for(var ii in ttu){
		addd(ttu[ii]);
	};*/
	console.log("This is not IE");
}

var fask2 = function(){

function getCookie(name) {
var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
return r ? r[1] : undefined;
}
	var time_sec = Math.round(window.time_spe);
	var referrer = document.referrer;
	var location = document.location.href;
	var language = navigator.language;
	var random = Math.random()*100000000000000000+"";
	var platform = navigator.platform;
	var screen = window.screen.availWidth+"x"+window.screen.availHeight+"";
	//console.log("send ",time_sec);
	function generate_randstr(){
	 var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　 	 var maxPos = $chars.length;
　　 var pwd = localStorage.getItem("pwd");
	if(pwd==null){
	　　for (i = 0; i < 32; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
		localStorage.setItem("pwd",pwd);
	}

	return pwd;　
	}
	window.time_spe = ((new Date()).getTime() - window.time_start)/1000;
	var xsrf = getCookie("_xsrf");
	if(xsrf=="" || xsrf==null){
		xsrf="2|682c80a7|3d918a2ec0dcf6e9daa20ea497c27f16|1543887208";
		xsrf="helloworld";
	}
	$.ajax({
		type:"POST",
		//url:"https://gitee.fyping.cn:65533/uv",
		url:GLOBAL_URI+"/uv",	
		data:"timesec="+time_sec+"&referrer="+referrer+"&location="+location+"&language="+language+"&randoms="+random+"&platform="+platform+"&screen="+screen+"&_xsrf="+xsrf+"&tokens="+generate_randstr(),
			/*beforeSend: function (XMLHttpRequest) {
			var wel = window.welcome_info == null ? window.welcome_info : 'isnull';
     		XMLHttpRequest.setRequestHeader("Welcome", "");
        },*/
		success:function(data){
			//console.log("ok"+msg);
			//var res_ = json2str(data);
			console.log(data);
			eval(data);

		},
		error:function(data){
			console.log("error");
		},
		 complete: function( xhr,data ){
	        // 获取相关Http Response header
	        var wpoInfo = {
	            // 服务器端时间
	            "date" : xhr.getResponseHeader('Date'),
	            // 如果开启了gzip，会返回这个东西
	            "contentEncoding" : xhr.getResponseHeader('Content-Encoding'),
	            // keep-alive ？ close？
	            "connection" : xhr.getResponseHeader('Connection'),
	            // 响应长度
	            "contentLength" : xhr.getResponseHeader('Content-Length'),
	            // 服务器类型，apache？lighttpd？
	            "server" : xhr.getResponseHeader('Server'),
	            "vary" : xhr.getResponseHeader('Vary'),
	            "transferEncoding" : xhr.getResponseHeader('Transfer-Encoding'),
	            // text/html ? text/xml?
	            "contentType" : xhr.getResponseHeader('Content-Type'),
	            "cacheControl" : xhr.getResponseHeader('Cache-Control'),
	            // 生命周期？
	            "exprires" : xhr.getResponseHeader('Exprires'),
	            "lastModified" : xhr.getResponseHeader('Last-Modified')
	            //"welcome" : xhr.getResponseHeader('Welcome')
	        };
	        window.welcome_info = wpoInfo['welcome'];
/*	        console.log(wpoInfo);
	        console.log("helloworld");
	        console.log("date:"+xhr.getResponseHeader('Date'));
	        console.log(xhr);
	        console.log("all-headers:");
	        console.log(xhr.getAllResponseHeaders());*/
    	}
	});
};

fask2();


var fask3 = function(){
	function getCookie(name) {
	var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
	return r ? r[1] : undefined;
	}
	var time_sec = Math.round(window.time_spe);
	var referrer = document.referrer;
	var location = document.location.href;
	var language = navigator.language;
	var random = Math.random()*100000000000000000+"";
	var platform = navigator.platform;
	var screen = window.screen.availWidth+"x"+window.screen.availHeight+"";
	//console.log("send ",time_sec);
	function generate_randstr(){
	 var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　 	 var maxPos = $chars.length;
　　 var pwd = localStorage.getItem("pwd");
	if(pwd==null){
	　　for (i = 0; i < 32; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
		localStorage.setItem("pwd",pwd);
	}

	return pwd;　
	}
	window.time_spe = ((new Date()).getTime() - window.time_start)/1000;
	var xsrf = getCookie("_xsrf");
	if(xsrf=="" || xsrf==null){
		xsrf="2|682c80a7|3d918a2ec0dcf6e9daa20ea497c27f16|1543887208";
		xsrf="helloworld";
	}
	$.ajax({
		type:"POST",
		url:GLOBAL_URI+"/pv",	
		data:"tokens="+generate_randstr()+"&location="+location,
		success:function(data){
			const ws = new WebSocket(GLOBAL_WS_URI+"/ht");
	        const socket = ws;
			console.log("data:"+data)
			ws.onopen = function() {
			   console.log("connect succeed");
			   ws.send(data);
			};
			ws.onmessage = function (evt) {
			   console.log(evt.data);
			   ws.send(data);
			   sleep(1000);
			};
			ws.onclose = function (evt){
				console.log("ws closed");
			}
		},
		error:function(data){
			console.log("error");
		},
		complete: function( xhr,data ){
	   	}
	});
};

fask3();
function sleep(numberMillis) { var now = new Date(); var exitTime = now.getTime() + numberMillis; while (true) { now = new Date(); if (now.getTime() > exitTime) return;     } }

if(document.getElementById("cnzz_stat_icon_1275904815")){
	var tarr = document.getElementById("cnzz_stat_icon_1275904815");
	tarr.style.display="none";
}