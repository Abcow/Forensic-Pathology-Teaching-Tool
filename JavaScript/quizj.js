window.onload = function() {
   text = document.getElementById("correct");
   correct = document.getElementById("true");
   correct.onclick = function(){
      text.style.opacity = 1;
   };
}