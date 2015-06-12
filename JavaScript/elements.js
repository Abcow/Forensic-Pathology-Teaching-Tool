function paragraph(parent, text) {
    this.paragraph = document.createElement("p");
    this.paragraph.innerHTML = text;
    this.paragraph.class = "element";
    parent.appendChild(this.paragraph);
}

function title(parent, text) {
    this.paragraph = document.createElement("h1");
    this.paragraph.innerHTML = text;
    this.paragraph.class = "element";
    parent.appendChild(this.paragraph);

    this.destroy = function() {
        
    }
}

function subtitle(parent, text) {
    this.paragraph = document.createElement("h2");
    this.paragraph.innerHTML = text;
    this.paragraph.class = "element";
    parent.appendChild(this.paragraph);
}

