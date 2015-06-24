answers = document.getElementsByClassName("ans");

window.onload = function() {

   correcttext = document.getElementById("correct").innerHTML;
   wrongtext = document.getElementById("wrong").innerHTML;
   moretext = document.getElementById("more").innerHTML;

   correct = document.getElementById("correct");
   wrong = document.getElementById("wrong");
   more = document.getElementById("more");

   wrong.parentNode.removeChild(wrong);
   correct.parentNode.removeChild(correct);
   more.parentNode.removeChild(more);


   for(i = 0; i < answers.length; i++){
   	
   	var y = answers[i].getAttribute("cor");	
   		if(y == "false"){
   			answers[i].onclick = function(){ removeFal() }
   		}
   		if(y == "true"){
   			answers[i].onclick = function(){ removeTru() }
   		}
   }

}

function showmoreinfo(srctext){
	var para = document.createElement("p");
   	var text = document.createTextNode(srctext);
   	para.appendChild(text);
   	document.getElementsByTagName("main")[0].appendChild(para);
}

function createClickImage(src, context, id, func){
	var img = document.createElement("img");
	img.src = src;
	img.id = id;
	img.onclick = func;
	context.appendChild(img);
}

function removeFal(){

	var l = answers.length;

	for(i = 0; i < l; i++){
   		answers[0].parentNode.removeChild(answers[0]);
   	}
   	
   	showmoreinfo(wrongtext);

   	createClickImage("images/more.png", document.getElementsByTagName("main")[0], "mor" ,function(){ showmoreinfo(moretext); deletebutton(); });
   	createClickImage("images/refresh.png",  document.getElementsByTagName("main")[0], "refresh", function(){ alert("Currenly unimplemented"); } )
}

function removeTru(){

	var l = answers.length;

	for(i = 0; i < l; i++){
   		answers[0].parentNode.removeChild(answers[0]);
   	}

   	
   	showmoreinfo(correcttext);

   	createButton("More Information", document.getElementsByTagName("main")[0], function(){ showmoreinfo(moretext); deletebutton(); });

}

function deletebutton(){
	var butt = document.getElementById("mor");
	butt.parentNode.removeChild(butt);
}


