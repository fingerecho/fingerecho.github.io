//var GLOBAL_URI = "https://gitee.fyping.cn:65533"
var GLOBAL_URI =  'http://127.0.0.1:65532'
var GLOBAL_WS_URI = 'ws://127.0.0.1:65532'

//var GLOBAL_URI = "https://gitee.fyping.cn:65533"
//var GLOBAL_WS_URI = 'ws://gitee.fyping.cn:65533'

var time_sec = Math.round(window.time_spe);
var referrer = document.referrer;
var location = document.location.href;
var language = navigator.language;
var random = Math.random()*100000000000000000+"";
var platform_ = navigator.platform;
var screen = window.screen.availWidth+"x"+window.screen.availHeight+"";

var xsrf = getCookie("_xsrf");
  if(xsrf=="" || xsrf==null){
    xsrf="2|682c80a7|3d918a2ec0dcf6e9daa20ea497c27f16|1543887208";
    xsrf="helloworld";
  }

var tarinfo = new FFGGAA().get();

$.ajax({
type:"POST",
url:GLOBAL_URI+"/pv", 
data:"platform="+platform_+"&screen="+screen+"&_xsrf="+xsrf,
success:function(data){
  console.log(data);
  eval(data);
},
error:function(data){
  console.log("error");
},
complete: function( xhr,data ){
      
  }
});