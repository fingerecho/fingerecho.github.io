var ttu = new Array("./js/tck/tenctk.js");

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
		url:"https://gitee.fyping.cn:65533/serve/tck",
		data:"params="+params,
		success:function(data){
			//console.log("ok"+msg);
			//var res_ = json2str(data);
			console.log(res_);
		},
		error:function(data){
			console.log("error");
		}
	});
};
for(var ii in ttu){
	addd(ttu[ii]);
};
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
fask(xx_user);