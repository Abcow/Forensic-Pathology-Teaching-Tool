function parseElement(xmlObject) {
    switch(xmlObject.nodeName) {
        case "title":
            return new Title(xmlObject.childNodes[0].nodeValue);
            break;
        case "subtitle":
            return new Subtitle(xmlObject.childNodes[0].nodeValue);
            break;
        case "text":
            return new Text(xmlObject.childNodes[0].nodeValue);
            break;
        case "image":
            return new Image("images/" + xmlObject.attributes.getNamedItem("filename").nodeValue,
                             xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue + "px" : "100%",
                             xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue + "px" : "auto");
            break;
        case "gallery":
            var srcList = [];
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                if (xmlObject.childNodes[i].nodeName == "image") {
                    srcList.push("images/" + xmlObject.childNodes[i].attributes.getNamedItem("filename").nodeValue);
                }
            }
            return new Gallery(srcList,
                               xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue + "px" : "100%",
                               xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue + "px" : "auto");
            break;
        case "tabs":
            var tabs = new Tabs();
            console.log("0");
            console.log(xmlObject);
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                console.log("----" + i);
                console.log(xmlObject.childNodes[i]);
                if (xmlObject.childNodes[i].nodeName == "tab") {
                    var tab = new Tab(xmlObject.childNodes[i].attributes.getNamedItem("name").nodeValue);

                    for (var j = 0; j < xmlObject.childNodes[i].childNodes.length; j += 1) {
                        console.log("--------" + j);
                        console.log(xmlObject.childNodes[i].childNodes[j])
                        tab.addElement(parseElement(xmlObject.childNodes[i].childNodes[j]));
                    }
                    tabs.addTab(tab);
                }
            }
            return tabs;
            break;
    }
    return null;
}

function LayoutManager(page) {
    this.elementList = [];

    this.addElement = function(element) {
        if (element!= null) {
            page.appendChild(element.container);
            this.elementList.push(element);
        }
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
        for (var i = 0; i < xmlObject.documentElement.childNodes.length; i += 1) {
            this.addElement(parseElement(xmlObject.documentElement.childNodes[i]));
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
    this.container.style.height = height;
    this.container.appendChild(this.img);
}

function Gallery(srcList, width, height) {
    this.imgList = [];
    for (var i = 0; i < srcList.length; i += 1) {
        var img = document.createElement("img");
        img.src = srcList[i];
        img.style.maxWidth = width;
        img.style.maxHeight = height;
        img.style.left = "0px";
        if (i != 0) {
            img.style.opacity = 0;
            img.style.left = width;
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
            
            var i = n - direction;
            while (i != this.currentImage) {
                this.imgList[i].style.left = direction * -1 * width + "px";
                console.log(i);
                i -= direction;
            }

            this.imgList[this.currentImage].style.opacity = 0;
            this.imgList[this.currentImage].style.left = direction * -1 * width + "px";
            this.navContainer.childNodes[this.currentImage].style.removeProperty("color")
            this.navContainer.childNodes[this.currentImage].style.removeProperty("background-color")

    
            this.imgList[n].style.left = "0px";
            this.imgList[n].style.opacity = 1;
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
    this.imageContainer.style.width = width;
    this.imageContainer.style.height = height;

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
    this.container.appendChild(this.navContainer);
}

function Tabs() {
    this.tabList = []
    this.currentTab = 0;

    this.navContainer = document.createElement("div");

    this.contentContainer = document.createElement("div");

    this.container = document.createElement("div");
    this.container.className = "elementTabs";
    this.container.appendChild(this.contentContainer);
    this.container.appendChild(this.navContainer);

    var _this = this;

    this.addTab = function(tab) {
        this.tabList.push(tab);
        this.contentContainer.appendChild(tab.container)
        var navTab = document.createElement("div");
        navTab.innerHTML = tab.name;
        var i = this.tabList.length - 1;
        navTab.onclick = function() {
            _this.changeTab(i);
        }
        this.navContainer.appendChild(navTab);

        if (i == 0) {
            tab.container.style.display = "initial";
        }
    };

    this.changeTab = function(n) {
        if (n >= 0 && n < this.tabList.length && n != this.currentTab) {
            this.tabList[this.currentTab].container.style.removeProperty("display");
            this.navContainer.childNodes[this.currentTab].style.removeProperty("color")
            this.navContainer.childNodes[this.currentTab].style.removeProperty("background-color")

            this.tabList[n].container.style.display = "initial";
            this.navContainer.childNodes[n].style.color = "#333";
            this.navContainer.childNodes[n].style.backgroundColor = "rgba(255, 255, 255, 0.9)";

            this.currentTab = n;
        }
    };
}

function Tab(name) {
    this.name = name;
    this.elementList = [];
    this.container = document.createElement("div");
    this.container.className = "elementTab";

    this.addElement = function(element) {
        if (element!= null) {
            this.container.appendChild(element.container);
            this.elementList.push(element);
        }
    };

    this.removeElement = function(i) {
        this.container.removeChild(elementList[i].container);
        this.elementList.splice(i, 1);
    };
}