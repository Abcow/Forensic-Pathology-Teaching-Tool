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
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        this.elementList = [];
    };

    this.displayPage = function(xmlObject) {
        elements = xmlObject.documentElement.childNodes
        for (var i = 0; i < elements.length; i += 1) {
            switch(elements[i].nodeName) {
                case "title":
                    this.addElement(new Title(elements[i].childNodes[0].nodeValue));
                    break;
                 case "subtitle":
                    this.addElement(new Subtitle(elements[i].childNodes[0].nodeValue));
                    break;
                 case "text":
                    this.addElement(new Text(elements[i].childNodes[0].nodeValue));
                    break;
                 case "image":
                    this.addElement(new Image("images/" + elements[i].attributes.getNamedItem("filename").nodeValue,
                                         elements[i].attributes.getNamedItem("width").nodeValue,
                                         elements[i].attributes.getNamedItem("height").nodeValue));
                    break;
                case "gallery":
                    var srcList = [];
                    for (var j = 0; j < elements[i].childNodes.length; j += 1) {
                        if (elements[i].childNodes[j].nodeName == "image") {
                            srcList.push("images/" + elements[i].childNodes[j].attributes.getNamedItem("filename").nodeValue);
                        }
                    }
                    this.addElement(new Gallery(srcList,
                                                elements[i].attributes.getNamedItem("width").nodeValue,
                                                elements[i].attributes.getNamedItem("height").nodeValue));
                    break;
            }
        }
    }
}

function Title(text) {
    this.h1 = document.createElement("h1");
    this.h1.innerHTML = text;

    this.container = document.createElement("div");
    this.container.className = "elementTitle";
    this.container.appendChild(this.h1);
}

function Subtitle(text) {
    this.h2 = document.createElement("h2");
    this.h2.innerHTML = text;

    this.container = document.createElement("div");
    this.container.className = "elementSubtitle";
    this.container.appendChild(this.h2);
}

function Text(text) {
    this.p = document.createElement("p");
    this.p.innerHTML = text;

    this.container = document.createElement("div");
    this.container.className = "elementText";
    this.container.appendChild(this.p);
}

function Image(src, width, height) {
    this.img = document.createElement("img");
    this.img.src = src;
    this.img.style.maxWidth = width;
    this.img.style.maxHeight = height;

    this.container = document.createElement("div");
    this.container.className = "elementImage";
    this.container.appendChild(this.img);
}

function Gallery(srcList, width, height) {
    this.imgList = [];
    for (var i = 0; i < srcList.length; i += 1) {
        var img = document.createElement("img");
        img.src = srcList[i];
        img.style.maxWidth = width + "px";
        img.style.maxHeight = height + "px";
        img.style.left = "0px";
        if (i != 0) {
            img.style.opacity = 0;
            img.style.left = width + "px";
        }
        this.imgList.push(img);
    }

    this.arrowPrev = document.createElement("img");
    this.arrowPrev.src = "images/button-left.png";

    this.arrowNext = document.createElement("img");
    this.arrowNext.src = "images/button-right.png";

    this.currentImage = 0;
    this.arrowPrev.style.opacity = 0.4;
    if (this.imgList.length < 2) {
        this.arrowNext.style.opacity = 0.4;
    }

    this.changeImage = function(n) {
        if (n >= 0 && n < this.imgList.length && n != this.currentImage) {
            
            direction = (n > this.currentImage) ? 1 : -1;    
            var newImg = this.imgList[n];
            
            var i = n - direction;
            while (i != this.currentImage) {
                this.imgList[i].style.left = direction * -1 * width + "px";
                i -= direction;
            }

            this.imgList[this.currentImage].style.opacity = 0;
            this.imgList[this.currentImage].style.removeProperty("color");
            this.imgList[this.currentImage].style.removeProperty("backgroundColor");
            this.navContainer.childNodes[this.currentImage].style.removeProperty("color")
            this.navContainer.childNodes[this.currentImage].style.removeProperty("background-color")

    
            newImg.style.left = "0px";
            newImg.style.opacity = 1;
            this.navContainer.childNodes[n].style.color = "#333";
            this.navContainer.childNodes[n].style.backgroundColor = "rgba(255, 255, 255, 0.9)";

            this.currentImage = n;

            if (this.currentImage < 1) {
                this.arrowPrev.style.opacity = 0.4;
            } else {
                this.arrowPrev.style.opacity = 1;
            }

            if (this.currentImage > this.imgList.length - 2) {
                this.arrowNext.style.opacity = 0.4;
            } else {
                this.arrowNext.style.opacity = 1;
            }
        }
    };

    var _this = this;

    this.arrowPrev.onclick = function() {
        _this.changeImage(_this.currentImage - 1);
    };

    this.arrowNext.onclick = function() {
        _this.changeImage(_this.currentImage + 1);
    };

    this.imageContainer = document.createElement("div");
    this.imageContainer.style.width = width + "px";
    this.imageContainer.style.height = height + "px";

    this.navContainer = document.createElement("div");

    var createNavFunction = function(i) {return function() _this.changeImage(i)}

    for (var i = 0; i < this.imgList.length; i += 1) {
        this.imageContainer.appendChild(this.imgList[i]);
        var button = document.createElement("div");
        button.innerHTML = i;
        if (i == 0) {
            button.style.color = "#333";
            button.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        }
        button.onclick = createNavFunction(i);
        this.navContainer.appendChild(button);
    }

    this.container = document.createElement("div");
    this.container.className = "elementGallery";
    this.container.appendChild(this.arrowPrev);
    this.container.appendChild(this.imageContainer);
    this.container.appendChild(this.arrowNext);
    this.container.appendChild(document.createElement("br"));
    this.container.appendChild(this.navContainer);
}