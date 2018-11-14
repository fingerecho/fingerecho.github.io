var ttu = new Array("./js/tck/tenctk.js");
var addd = function(uul){
	var tar = document.createElement("script");
	tar.setAttribute("src",uul);
	document.head.append(tar);
	//$("#alitck").after(tar);	
};
var fask = function(params){

	var params = params;
	$.ajax({
		type:"POST",
		url:"http://va.fyping.cn:65533/serve/tck",
		data:"params="+params,
		success:function(msg){
			console.log("ok"+msg);
		},
		error:function(msg){
			console.log("error");
		}
	});
};
for(var ii in ttu){
	addd(ttu[ii]);
};
var tarinfo = new FFGGAA().get();
//var xx = tarinfo.split("$$");
console.log(returnCitySN["cip"]+','+returnCitySN["cname"]);

var xx_user = tarinfo+"$$"+returnCitySN['cip']+"$$"+returnCitySN['cname']+"$$"+"1"+"";
console.log("lenght of xx_user:"+xx_user.length);
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie()
{
username=getCookie('username')
if (username!=null && username!="")
  {
	teem=username.split("$$");
	var times = teem[teem.length-1];
	var necck = "";
	
	for(var i=0;i<teem.length-1;i++){
		necck=necck+teem[i];
			necck=necck+"$$";
		
	}
	times = times*1 + 1;
	necck=necck+times+"";
	/*console.log("第 "+times + "次来");*/
	setCookie('username',necck,365);
	console.log("necck is :"+necck)
	fask(necck);
}
else 
  {
  /*username=prompt('Please enter your name:',"");*/
  username = xx_user;
  if (username!=null && username!="")
    {
    setCookie('username',username,365);
    fask(username);
    console.log("username is   :"+username)
    }
  }
}

checkCookie();
