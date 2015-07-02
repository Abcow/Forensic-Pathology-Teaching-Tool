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
                             xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue : 256,
                             xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue : 256);
            break;

        case "gallery":
            var srcList = [];
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                if (xmlObject.childNodes[i].nodeName == "image") {
                    srcList.push("images/" + xmlObject.childNodes[i].attributes.getNamedItem("filename").nodeValue);
                }
            }
            return new Gallery(srcList,
                               xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue : 256,
                               xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue : 256);
            break;

        case "tabs":
            var tabs = new Tabs();
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                if (xmlObject.childNodes[i].nodeName == "tab") {
                    var tab = new Tab(xmlObject.childNodes[i].attributes.getNamedItem("name").nodeValue);
                    for (var j = 0; j < xmlObject.childNodes[i].childNodes.length; j += 1) {
                        tab.addElement(parseElement(xmlObject.childNodes[i].childNodes[j]));
                    }
                    tabs.addTab(tab);
                }
            }
            return tabs;
            break;

        case "popup-button":
            var popup = new Popup();
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                popup.addElement(parseElement(xmlObject.childNodes[i]));
            }
            return new popupButton(xmlObject.attributes.getNamedItem("text").nodeValue, popup);
            break;

        case "padding":
            return xmlObject.hasAttribute("height") ? new Padding(xmlObject.attributes.getNamedItem("height").nodeValue) : new Padding(2);
            break;

        case "navigation-button":
            return new NavigationButton(xmlObject.childNodes[0].nodeValue, xmlObject.attributes.getNamedItem("destination").nodeValue);
            break;

        case "video":
            return new Video("videos/" + xmlObject.attributes.getNamedItem("filename").nodeValue,
                             xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue : 256,
                             xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue : 256);
            break;

        case "audio":
            return new Audio("audio/" + xmlObject.attributes.getNamedItem("filename").nodeValue);
            break;

        case "columns":
            var columns = new Columns();
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                if (xmlObject.childNodes[i].nodeName == "column") {
                    var column = new Column();
                    for (var j = 0; j < xmlObject.childNodes[i].childNodes.length; j += 1) {
                        column.addElement(parseElement(xmlObject.childNodes[i].childNodes[j]));
                    }
                    columns.addColumn(column);
                }
            }
            return columns;
            break;
    }
    return null;
}

function LayoutManager(page) {

    this.addElement = function(element) {
        if (element != null) {
            page.appendChild(element.container);
        }
    };

    this.clearPage = function() {
        var elements = page.getElementsByTagName("div");
        while (elements.length > 0) {
            page.removeChild(elements[0]);
            elements = page.getElementsByTagName("div");
        }
    };

    this.displayPage = function(xmlObject) {
       if (xmlObject.documentElement.hasAttribute("prev")) {
            prevPage = xmlObject.documentElement.attributes.getNamedItem("prev").nodeValue;
            document.getElementById("left").style.opacity = 1;
        } else {
            prevPage = null;
            document.getElementById("left").style.opacity = 0.2;
        }

        if (xmlObject.documentElement.hasAttribute("next")) {
            nextPage = xmlObject.documentElement.attributes.getNamedItem("next").nodeValue;
            document.getElementById("right").style.opacity = 1;
        } else {
            nextPage = null;
            document.getElementById("right").style.opacity = 0.2;
        }

        this.clearPage();
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
    this.img.style.maxWidth = width + "px";
    this.img.style.maxHeight = height + "px";

    this.container = document.createElement("div");
    this.container.className = "elementImage";
    this.container.style.height = height + "px";
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
    this.arrowPrev.style.opacity = 0.2;
    if (this.imgList.length < 2) {
        this.arrowNext.style.opacity = 0.2;
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
                this.arrowPrev.style.opacity = 0.2;
            } else {
                this.arrowPrev.style.opacity = 1;
            }

            if (this.currentImage > this.imgList.length - 2) {
                this.arrowNext.style.opacity = 0.2;
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
        button.className = "elementButton";
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
            this.navContainer.childNodes[i].style.color = "#333";
            this.navContainer.childNodes[i].style.backgroundColor = "rgba(255, 255, 255, 0.9)";
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
    this.container = document.createElement("div");
    this.container.className = "elementTab";

    this.addElement = function(element) {
        if (element != null) {
            this.container.appendChild(element.container);
        }
    };
}

function popupButton(text, popup) {

    this.popup = popup;

	this.button = document.createElement("div");
	this.button.innerHTML = text;

	this.container = document.createElement("div");
	this.container.className = "elementButton";
	this.container.appendChild(this.button);
    this.container.appendChild(this.popup.container);

    var _this = this;

	this.button.onclick = function() {
        _this.popup.container.style.display = "initial";
	}

}

function Popup() {
    this.name = name;

    this.overlay = document.createElement("div");
    this.overlay.innerHTML = "Click anywhere to close.";

    this.contentContainer = document.createElement("div");

    var _this = this;

    this.overlay.onclick = function() {
        _this.container.style.removeProperty("display");
    }

    this.container = document.createElement("div");
    this.container.className = "elementPopup";
    this.container.appendChild(this.overlay);
    this.container.appendChild(this.contentContainer);

    this.addElement = function(element) {
        if (element != null) {
            this.contentContainer.appendChild(element.container);
        }
    };
}

function Image(src, width, height) {
    this.img = document.createElement("img");
    this.img.src = src;
    this.img.style.maxWidth = width + "px";
    this.img.style.maxHeight = height + "px";

    this.container = document.createElement("div");
    this.container.className = "elementImage";
    this.container.style.height = height + "px";
    this.container.appendChild(this.img);
}

function Audio(src){
    this.audio = document.createElement("audio");
    this.audio.src = src;
    this.audio.controls = true;
    this.type = ""

    this.container = document.createElement("div");
    this.container.className = "elementAudio";
    this.container.appendChild(this.audio);
}

function Video(src, width, height){
    this.video = document.createElement("video")
    this.video.src = src;
    this.video.controls = true;
    this.video.style.width = width + "px";
    this.video.style.height = height + "px";

    this.container = document.createElement("div");
    this.container.className = "elementVideo";
    this.container.style.height = height + "px";
    this.container.appendChild(this.video);
}

function Padding(height) {
    this.container = document.createElement("div");
    this.container.className = "elementImage";
    this.container.style.height = height * 16 + "px";
}


function NavigationButton(text, destination) {

    this.button = document.createElement("div");
    this.button.innerHTML = text;

    this.container = document.createElement("div");
    this.container.className = "elementButton";
    this.container.appendChild(this.button);

    this.button.onclick = function() {
        loadPage(destination)
    }

}

function Columns() {

    this.container = document.createElement("div");
    this.container.className = "elementColumns";

    var _this = this;

    this.addColumn = function(column) {
        _this.container.appendChild(column.container);

    };
}

function Column() {
    this.container = document.createElement("div");
    this.container.className = "elementColumn";

    this.addElement = function(element) {
        if (element != null) {
            this.container.appendChild(element.container);
        }
    };
}