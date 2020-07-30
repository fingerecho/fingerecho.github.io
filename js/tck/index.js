
var GLOBAL_URI =  'https://sparql.fyping.cn:65534'

var globaluv_uri = GLOBAL_URI + "/uv";

var main_add_func = function(){
	
	//document.head.append(tar);
	console.log("globaluv_uri:"+globaluv_uri);
	console.log("sign:"+tarinfo);
	$.ajax({
			type:"POST",
			url:globaluv_uri,	
        
			data: {
				tokens:tarinfo
			},
			success: function(){
				console.log("send post request finished....");
			}
		});
};
var tarinfo = new FFGGAA().get();

main_add_func();


