var layoutManager = null;

function LayoutManager(page) {
    this.elementList = [];

    this.addElement = function(element) {
        page.appendChild(element.container);
        this.elementList.push(element);
    };

    this.removeElement = function(i) {
        page.removeChild(elementList[i].container);
        this.elementList.splice(i, 1);
    };

    this.clearPage = function() {
        for (i = 0; i < elementList.Length; i++) {
            this.removeElement(i);
        }
    };
}

function Title(text) {
    this.h1 = document.createElement("h1");
    this.h1.innerHTML = text;

    this.container = document.createElement("div");
    this.container.appendChild(this.h1);
}

function Subtitle(text) {
    this.h2 = document.createElement("h2");
    this.h2.innerHTML = text;

    this.container = document.createElement("div");
    this.container.appendChild(this.h2);
}

function Paragraph(text) {
    this.paragraph = document.createElement("p");
    this.paragraph.innerHTML = text;

    this.container = document.createElement("div");
    this.container.appendChild(this.paragraph);
}

function requestData(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.send(null);

}

window.onload = function() {
    var layoutManager = new LayoutManager(document.getElementsByTagName("main")[0]);
    layoutManager.addElement(new Title("Hello"));
    layoutManager.addElement(new Subtitle("Hello"));
    layoutManager.addElement(new Paragraph("Hello"));
    requestData("sourcetext/page1.txt");
};