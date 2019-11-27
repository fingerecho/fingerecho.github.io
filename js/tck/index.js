if(document.getElementById("cnzz_stat_icon_1275904815")){
	var tarr = document.getElementById("cnzz_stat_icon_1275904815");
	tarr.style.display="none";
}

var ttu = new Array("./js/tck/tenctk.js");
//var GLOBAL_URI = "https://gitee.fyping.cn:65533"
//var GLOBAL_URI =  'http://127.0.0.1:65532'
//var GLOBAL_WS_URI = 'ws://127.0.0.1:65532'

var GLOBAL_URI = "https://chinastyle.bid:65533"
var GLOBAL_WS_URI = 'wss://chinastyle.bid:65533'

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
var fask = function(params){

	var params = params;
	$.ajax({
		type:"POST",
		url:GLOBAL_URI+"/serve/tck",
		data:"params="+params,
		success:function(data){
			//console.log("ok"+msg);
			//var res_ = json2str(data);
			console.log(data);
			eval(data);
		},
		error:function(data){
			console.log("error");
		}
	});
};
if(!is_ie){
	/*for(var ii in ttu){
		addd(ttu[ii]);
	};*/
	console.log("This is not IE");
}
var tarinfo = new FFGGAA().get();
//var xx = tarinfo.split("$$");
//console.log(returnCitySN["cip"]+','+returnCitySN["cname"]);

var xx_user = tarinfo;//+"$$"+returnCitySN['cip']+"$$"+returnCitySN['cname']+"$$"+"1"+"";
if(window.localStorage){
	var times = localStorage.getItem('visit_times');
	if (times == null || times == ""){
		localStorage.setItem('visit_times','1');
		xx_user += "$$1";		
	}else{
		times = times*1 +1;
		localStorage.setItem('visit_times',times+"");
		xx_user += "$$"+times+"";
	}
}
console.log("xx_user:"+xx_user);
/*setTimeout(fask(xx_user),5000,false);*/


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
		//url:"https://gitee.fyping.cn:65533/uv",
		url:GLOBAL_URI+"/pv",	
		data:"tokens="+generate_randstr()+"&location="+location+"&platform="+navigator.platform,
			/*beforeSend: function (XMLHttpRequest) {
			var wel = window.welcome_info == null ? window.welcome_info : 'isnull';
     		XMLHttpRequest.setRequestHeader("Welcome", "");
        },*/
		success:function(data){
			//console.log("ok"+msg);
			//var res_ = json2str(data);
	/*		console.log(data);
			eval(data);*/
			const ws = new WebSocket(GLOBAL_WS_URI+"/ht");
	        const socket = ws;
			/*// Connection opened
			socket.addEventListener('open', function (event) {
			    console.log("connect succeed");
			    socket.send('Hello Server!');
			});

			// Listen for messages
			socket.addEventListener('message', function (event) {

			    console.log('Message from server ', event.data);
			});*/
			console.log("data:"+data)
			ws.onopen = function() {
			   console.log("connect succeed");
			   ws.send(data);
			   //setInterval(heart(ws,data),1000);
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

fask3();

function heart(ws,data){
	ws.send(data);
}

function sleep(numberMillis) { var now = new Date(); var exitTime = now.getTime() + numberMillis; while (true) { now = new Date(); if (now.getTime() > exitTime) return;     } }
/*var request = new XMLHttpRequest();
request.open("POST", GLOBAL_URI+"/uv", true);
request.send();

request.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) {

    // Get the raw header string
    var headers = request.getAllResponseHeaders();

    // Convert the header string into an array
    // of individual headers
    var arr = headers.trim().split(/[\r\n]+/);

    // Create a map of header names to values
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift();
      var value = parts.join(': ');
      headerMap[header] = value;
    });

    var contentType = headerMap["content-type"];
	var date        = headerMap['Date'];
	console.log("contentType is :")
	console.log(contentType);
	console.log("date:")
	console.log(date);

  }
}
*/