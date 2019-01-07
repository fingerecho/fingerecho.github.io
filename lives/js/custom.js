var fh = function(){
		var bk = document.body;
		if (bk.style.background-color=="#f40"){
				bk.style.background-color="#2e2256";
		}else{
				bk.style.background-color="#f40";
		
		}
}
function chage_background(){
		window.setTimeout(fh,3000,false);
}
chage_background();
