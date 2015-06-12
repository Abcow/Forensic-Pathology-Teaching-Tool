var pageNumber = 0;
var maxPageNumber = 20;

function back() {
	if (pageNumber > 1) {
		pageNumber--;
		alert("Going Back!");
	};
}

function forward(){
	if(pageNumber < maxPageNumber){
		pageNumber++:
		alert("Going Forward!");
	}
}


window.onload = function(){

	alert("it's happening!");

		document.getElementByID("left").onclick = function(){
    		back();
   	 	}

    	document.getElementByID("right").onclick = function(){
    		forward();
    	}
}