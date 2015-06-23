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
        for (var i = 0; i < elementList.Length; i++) {
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
    this.p = document.createElement("p");
    this.p.innerHTML = text;

    this.container = document.createElement("div");
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

function ImageSet(srcList, width, height) {
    this.imgList = [];
    for (var i = 0; i < srcList.length; i += 1) {
        var img = document.createElement("img");
        img.src = srcList[i];
        img.style.maxWidth = width + "px";
        img.style.maxHeight = height + "px";
        img.style.left = "0px";
        if (i != 0) {
            img.style.opacity = 0;
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
            var img = this.imgList[this.currentImage];
            direction = (n > this.currentImage) ? 1 : -1;    
            var newImg = this.imgList[this.currentImage + direction];
            
            newImg.style.transition = "opacity 75ms linear";
            newImg.style.WebkitTransition = "opacity 75ms linear";
            newImg.style.MozTransition = "opacity 75ms linear";
            newImg.style.MsTransition = "opacity 75ms linear";
            newImg.style.OTransition = "opacity 75ms linear";
            newImg.style.left = direction * width + "px";
            
            window.setTimeout(function() {

                newImg.style.removeProperty("transition");
                newImg.style.removeProperty("webkit-transition");
                newImg.style.removeProperty("moz-transition");
                newImg.style.removeProperty("ms-transition");
                newImg.style.removeProperty("-o-transition");
    
                img.style.left = direction * -1 * width + "px";
                img.style.opacity = 0;
    
                newImg.style.left = "0px";
                newImg.style.opacity = 1;
            }, 0);

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

    for (var i = 0; i < this.imgList.length; i += 1) {
        this.imageContainer.appendChild(this.imgList[i]);
    }

    this.container = document.createElement("div");
    this.container.className = "elementGallery";
    this.container.appendChild(this.arrowPrev);
    this.container.appendChild(this.imageContainer);
    this.container.appendChild(this.arrowNext);
}

window.onload = function() {
    var layoutManager = new LayoutManager(document.getElementsByTagName("main")[0]);
    layoutManager.addElement(new Title("Hello"));
    layoutManager.addElement(new Subtitle("Hello"));
    layoutManager.addElement(new Paragraph("Hello"));
    layoutManager.addElement(new Image("images/button-left.png", 64, 64));
    layoutManager.addElement(new ImageSet(["images/sets/test/0.jpg", "images/sets/test/1.jpg", "images/sets/test/2.jpg", "images/sets/test/3.png", "images/sets/test/4.png", "images/sets/test/5.png"], 256, 256));
};