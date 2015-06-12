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
		pageNumber ++:
		alert("Going Forward!");
	}
}

function paragraph(parent, content) {
    this.paragraph = document.createElement("p");
    this.paragraph.innerHTML = content;
    this.paragraph.class = "element"
    parent.appendChild(this.paragraph);
}

window.onload = function() {
    alert("Hello");

    var test = new paragraph(document.getElementsByTagName("main"), "test");


    document.getElementByID("left").onclick = function(){
        back();
    }

    document.getElementByID("right").onclick = function(){
        forward();
    }    
};