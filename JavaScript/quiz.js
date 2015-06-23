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
   		answers[i].onclick = function(){ remove() }
   }

}

function showmoreinfo(){
	alert( "Kappa... " + more);
}

function createButton(text, context, func){
    var button = document.createElement("input");
    button.type = "button";
    button.value = text;
    button.onclick = func;
    context.appendChild(button);
}

function remove(){

	var l = answers.length;

	for(i = 0; i < l; i++){
   		answers[0].parentNode.removeChild(answers[0]);
   	}

   	document.getElementById("blank").innerHTML = correcttext;
   	createButton("More Information", document.getElementsByTagName("main")[0], function(){ showmoreinfo() });

}


