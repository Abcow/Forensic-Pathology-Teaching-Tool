window.onload = function() {
	text = document.getElementById("txt");
	text.style.opacity = 0;
	var a = 0;
	document.getElementById("body").onclick = function()
   {
   		if(a == 0){
   			a = 1;
   			text.style.opacity = 1;
   		}else{
   			a = 0;
   			text.style.opacity = 0;
   		}
   };
}