function initialiseFeatures()
{
    var title = document.getElementById("navMenuTitle")
    title.onclick = function() {openList();};
}

function openList() {
    var list = document.getElementById("buttons");

    if (list.style.display == "none"){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }
}

function paragraph(parent, content) {
    this.paragraph = document.createElement("p");
    this.paragraph.innerHTML = content;
    this.paragraph.class = "element"
    parent.appendChild(this.paragraph);
}

window.onload = function() {
    var test = new paragraph(document.getElementsByTagName("main"), "test");
};