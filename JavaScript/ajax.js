window.onload = function(){
	requestpage("sourcetext/text.xml");
}

function clearpage(){
	var main = document.getElementsByTagName("main")[0];
	while(main.firstChild){
		main.removeChild(main.firstChild);
	}
}

function requestpage(pagesrc){
	var xmlhttp;
	if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest();	// code for IE7+, Firefox, Chrome, Opera, Safari
  	}
	else{
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");	// code for IE6, IE5
  	}

	xmlhttp.onreadystatechange=function(){
  	
		document.getElementsByTagName("main")[0].innerHTML=xmlhttp.responseText;
    

  }

xmlhttp.open("GET",pagesrc,true);
xmlhttp.send();

}
