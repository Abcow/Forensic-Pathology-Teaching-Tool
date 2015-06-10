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