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
    layoutManager.addElement(new Title("Forensic Pathology Teaching tool example Text page"));
    layoutManager.addElement(new Subtitle("Example Subtitle"));
    layoutManager.addElement(new Paragraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper, leo pulvinar tincidunt efficitur, ipsum libero bibendum ante, et malesuada mi nisi eget dolor. Nulla non elit eget ex laoreet gravida. Nulla faucibus orci sit amet risus dignissim finibus. Integer facilisis commodo velit. Aliquam lacus risus, porttitor rutrum nulla eu, rutrum consequat diam. Sed nec elit ut ligula pulvinar tristique sed id erat. Mauris mollis lorem non metus ornare tincidunt. Etiam imperdiet libero sit amet turpis commodo, eget maximus orci rutrum."));
    layoutManager.addElement(new Paragraph("Sed scelerisque, eros vel tincidunt euismod, eros erat pharetra nisl, id mattis elit arcu varius tellus. Suspendisse laoreet elit ac diam hendrerit, quis sollicitudin nisi maximus. In ornare urna ut dui bibendum tincidunt. Fusce vitae ante tincidunt, fermentum orci in, sodales dui. Aliquam et tellus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vehicula nisl eget lectus scelerisque, sed sodales erat dapibus. Morbi vel tellus eros. Maecenas lacinia nibh sed finibus rhoncus. Suspendisse enim leo, tempor eget tempor eget, molestie in felis. In id diam velit. Cras ex nisl, porttitor quis auctor non, lacinia id ligula. Cras lacinia orci a nunc rhoncus pretium. Quisque rhoncus orci at lectus pretium dapibus. Nulla blandit quam nec auctor sagittis."));
};