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

        case "subaudio":
            return new subtitledAudio("audio/" + xmlObject.attributes.getNamedItem("filename").nodeValue);
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

        case "csi-image":
            var csiImage = new CsiImage("images/" + xmlObject.attributes.getNamedItem("filename").nodeValue,
                                        xmlObject.hasAttribute("width") ? xmlObject.attributes.getNamedItem("width").nodeValue : 256,
                                        xmlObject.hasAttribute("height") ? xmlObject.attributes.getNamedItem("height").nodeValue : 256);
            for (var i = 0; i < xmlObject.childNodes.length; i += 1) {
                if (xmlObject.childNodes[i].nodeName == "click-area") {
                    var popup = new Popup();
                    for (var j = 0; j < xmlObject.childNodes[i].childNodes.length; j += 1) {
                        popup.addElement(parseElement(xmlObject.childNodes[i].childNodes[j]));
                    }
                    csiImage.addClickArea(new ClickArea(
                        xmlObject.childNodes[i].attributes.getNamedItem("x1").nodeValue,
                        xmlObject.childNodes[i].attributes.getNamedItem("y1").nodeValue,
                        xmlObject.childNodes[i].attributes.getNamedItem("x2").nodeValue,
                        xmlObject.childNodes[i].attributes.getNamedItem("y2").nodeValue,
                        popup)
                    );
                }
                
            }
            return csiImage;
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

function CsiImage(src, width, height) {
    this.clickAreaList = [];
    
    this.image = document.createElement("img");
    this.image.src = src;

    this.container = document.createElement("div");
    this.container.className = "elementCsiImage";

    this.imageContainer = document.createElement("div");
    this.imageContainer.style.width = width + "px";
    this.imageContainer.style.height = height + "px";
    this.imageContainer.appendChild(this.image);

    this.container.appendChild(this.imageContainer);

    this.width = width;
    this.height = height;
    this.xRatio = 1;
    this.yRatio = 1;

    var _this = this;

    this.image.onload = function() {
        _this.xRatio = (this.width / this.height) / (_this.width / _this.height);
        if (_this.xRatio > 1) {
            _this.yRatio = 1 / _this.xRatio;
            _this.xRatio = 1;
        } else {
            _this.yRatio = 1;
        }
        _this.zoom(0);
    }

    this.clicked = false;
    this.x = 0;
    this.y = 0;
    this.z = 0.0;
    this.scale = 1;
    this.mouseXPrev = 0;
    this.mouseYPrev = 0;

    this.addClickArea = function(clickArea) {
        clickArea.button.style.left = clickArea.x1 * this.xRatio * this.scale + this.x + 50 * (1 - this.xRatio * this.scale);
        clickArea.button.style.top = clickArea.y1 * this.yRatio * this.scale + this.y + 50 * (1 - this.yRatio * this.scale);
        clickArea.button.style.width = clickArea.width * this.scale + "%";
        clickArea.button.style.height = clickArea.height * this.scale + "%";
        this.clickAreaList.push(clickArea);
        this.imageContainer.appendChild(clickArea.container);
    };

    this.zoom = function(dz) {
        this.z = Math.min(Math.max(this.z + dz, 0), 2);
        this.scale = Math.pow(2, this.z);
        this.image.style.minWidth = this.scale * 100 * this.xRatio + "%";
        this.image.style.minHeight = this.scale * 100 * this.yRatio + "%";
        this.scroll(0, 0);
    };

    this.scroll = function(dx, dy) {

        var xBounds = Math.abs(50 * (1 - this.xRatio * this.scale));
        var yBounds = Math.abs(50 * (1 - this.yRatio * this.scale));

        var newX = Math.min(Math.max(this.x + dx / (this.xRatio * this.scale), -xBounds), xBounds);
        var newY = Math.min(Math.max(this.y + dy / (this.yRatio * this.scale), -yBounds), yBounds);

        this.image.style.left = (newX + 50 * (1 - this.xRatio * this.scale)) + "%";
        this.image.style.top = (newY + 50 * (1 - this.yRatio * this.scale)) + "%";
        
        this.x = newX;
        this.y = newY;

        this.updateClickAreas();
    };

    this.updateClickAreas = function() {
        for (var i = 0; i < this.clickAreaList.length; i += 1) {
            this.clickAreaList[i].button.style.left = (this.clickAreaList[i].x * this.xRatio * this.scale + this.x + 50 * (1 - this.xRatio * this.scale)) + "%";
            this.clickAreaList[i].button.style.top = (this.clickAreaList[i].y * this.yRatio * this.scale + this.y + 50 * (1 - this.yRatio * this.scale)) + "%";
            this.clickAreaList[i].button.style.width = this.clickAreaList[i].width * this.scale + "%";
            this.clickAreaList[i].button.style.height = this.clickAreaList[i].height * this.scale + "%";
        }
    }

    this.image.onmousedown = function() {
        console.log("Mouse Clicked");
        _this.clicked = true;
    }

    this.image.onmouseleave = function() {
        _this.clicked = false;
    }

    this.image.onmouseup = function() {
        _this.clicked = false;
    }

    this.image.onmousemove = function(e) {
        if (_this.clicked) {
            _this.scroll(100 * (e.clientX - _this.mouseXPrev) / _this.width, 100 * (e.clientY - _this.mouseYPrev) / _this.height);
        }
        _this.mouseXPrev = e.clientX;
        _this.mouseYPrev = e.clientY;
    }

    this.image.onwheel = function(e) {
        _this.zoom(-e.deltaY / 20);
        return false;
    }

    this.image.ondragstart = function() {
        return false;
    }
}

function ClickArea(x1, y1, x2, y2, popup) {
    this.x = parseFloat(x1);
    this.y = parseFloat(y1);
    this.width = parseFloat(x2) - parseFloat(x1);
    this.height = parseFloat(y2) - parseFloat(y1);

    this.popup = popup;

    this.button = document.createElement("div");

    this.container = document.createElement("div");
    this.container.className = "elementClickArea";
    this.container.appendChild(this.button);

    this.container.appendChild(this.popup.container);

    var _this = this;

    this.button.onclick = function() {
        _this.popup.container.style.display = "initial";
    }
}

function subtitledAudio(src) {
    this.audio = document.createElement("audio");
    this.audio.src = src;
    this.audio.controls = true;
    this.type = "";

    var _this = this.audio;

    this.container = document.createElement("div");
    this.container.className = "elementAudio";

    this.titleContainer = document.createElement("div");
    this.titleContainer.className = "titleContainer";

    this.container.appendChild(this.audio);
    this.container.appendChild(this.titleContainer);

    this.audio.onplay = function() {
        time = _this.currentTime;
        document.getElementsByClassName("titleContainer")[0].innerHTML = document.getElementsByClassName("titleContainer")[0].innerHTML = getSubs(time);
    };

    this.audio.onpause = function() {
        time = _this.currentTime;
        document.getElementsByClassName("titleContainer")[0].innerHTML = document.getElementsByClassName("titleContainer")[0].innerHTML = getSubs(time);
    };
    
    this.audio.onseeked = function() {
        time = _this.currentTime;
        document.getElementsByClassName("titleContainer")[0].innerHTML = getSubs(time);
    };
    
    this.audio.onseeking = function() {
        time = _this.currentTime;
        document.getElementsByClassName("titleContainer")[0].innerHTML = getSubs(time);
    };
    
    this.audio.ontimeupdate = function() {
        time = _this.currentTime;
        document.getElementsByClassName("titleContainer")[0].innerHTML = getSubs(time);
    };
    
function getSubs(time) {
        
        //thetime = " The time is: " + time;
        subs = "";

        if( 11 <= time && time < 14){
            subs = "Good Morning, this is DI Pullan,";
        }else if( 14 <= time && time < 17 ){
            subs = "may I speak to Dr Yap of the forensic pathology department.";
        }else if( 17 <= time && time < 19 ){
            subs = "Currently speaking.";
        }else if( 19 <= time && time < 20 ){
            subs = "Ah, good. I was just ringing you to inform you of";
        }else if( 20 <= time && time < 23 ){
            subs = "a suspicious death in the Roath area of Cardiff, last night.";
        }else if( 23 <= time && time < 25 ){
            subs = "O.K. Go on.";
        }else if( 25 <= time && time < 27 ){
            subs = "The deceased was identified as Marvin Settler.";
        }else if( 27 <= time && time < 29 ){
            subs = "He is a thirty four year old male,";
        }else if( 29 <= time && time < 32 ){
            subs = "who was found this morning at 7:30 AM,";
        }else if( 32 <= time && time < 34 ){
            subs = "slumped against an alley wall near to his house.";
        }else if( 34 <= time && time < 37 ){
            subs = "Although was cold to the touch and pulseless,";
        }else if( 37 <= time && time < 38 ){
            subs = "the woman who found him rang an ambulance and began CPR.";
        }else if( 38 <= time && time < 42 ){
            subs = "She has been trained in basic life support.";
        }else if( 42 <= time && time < 45 ){
            subs = "The ambulance crew pronounced the man dead at the scene,";
        }else if( 45 <= time && time < 46 ){
            subs = "and due to the circumstances of his death we thought";
        }else if( 46 <= time && time < 48 ){
            subs = "it best to involve you as quickly";
        }else if( 48 <= time && time < 49 ){
            subs = "as we could in this investigation.";
        }else if( 50 <= time && time < 51 ){
            subs = "I see.";
        }else if( 51 <= time && time < 53 ){
            subs = "When was the individual last seen?";
        }else if( 54 <= time && time < 57 ){
            subs = "Around 2:30, we think, that same morning,";
        }else if( 57 <= time && time < 62 ){
            subs = "he was leaving Live Lounge at the time.";
        }else if( 62 <= time && time < 63 ){
            subs = "And we believe he began walking home,";
        }else if( 63 <= time && time < 65 ){
            subs = "but did not make it.";
        }else if( 65 <= time && time < 68 ){
            subs = "Witness bystanders report of fighting between two individuals,";
        }else if( 68 <= time && time < 70 ){
            subs = "one of whom fits his description.";
        }else if( 70 <= time && time < 73 ){
            subs = "and he does have some injuries indicative of a fight.";
        }else if( 73 <= time && time < 76 ){
            subs = "And what do we know of Mr Settler? ";
        }else if( 76 <= time && time < 77 ){
            subs = "We know he has a large social network,";
        }else if( 77 <= time && time < 78 ){
            subs = "but only one remaining living relative,";
        }else if( 80 <= time && time < 84 ){
            subs = "his Mother, whom we have informed of this tragic death.";
        }else if( 84 <= time && time < 86 ){
            subs = "He has no criminal record.";
        }else if( 86 <= time && time < 88 ){
            subs = "And is the manager of a local cake factory,";
        }else if( 88 <= time && time < 91 ){
            subs = "and we are in the process of taking statements from his co-workers.";
        }else if( 91 <= time && time < 94 ){
            subs = "In relation to the evening, we know he was drunk";
        }else if( 94 <= time && time < 96 ){
            subs = "but his friends believe he had not taken any drugs.";
        }else if( 96 <= time && time < 100 ){
            subs = "Do we know if Mr Settler has any medical history?";
        }else if( 100 <= time && time < 103 ){
            subs = "He had asthma when young, but that was controlled.";
        }else if( 103 <= time && time < 106 ){
            subs = "and he also broke his leg when he was sixteen.";
        }else if( 106 <= time && time < 107 ){
            subs = "O.K Thank you.";
        }else if( 107 <= time && time < 109 ){
            subs = "Is the body still at the scene of death?";
        }else if( 109 <= time && time < 111 ){
            subs = "It is yes.";
        }else if( 111 <= time && time < 115 ){
            subs = "Where and when would you like to meet then?";
        }else if( 115 <= time && time < 119 ){
            subs = "Would 1:00PM today work for you? Queensbury Road, Roath?";
        }else if( 119 <= time && time < 121 ){
            subs = "Yeah, that sounds good";
        }else if( 121 <= time && time < 123 ){
            subs = "O.K, brilliant, thank you!";
        }else{
            subs = " ";
        }

        return subs;

    }

}
