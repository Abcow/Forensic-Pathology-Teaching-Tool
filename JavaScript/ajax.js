function loadPage(name, layoutManager) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlObject = parser.parseFromString(xmlhttp.responseText, "text/xml");
            } else {
                xmlObject = new ActiveXObject("Microsoft.XMLDOM");
                xmlObject.async = false;
                xmlObject.loadXML(xmlhttp.responseText);
            }
            layoutManager.displayPage(xmlObject);
        }
    }

    xmlhttp.open("GET", "content/" + name + ".xml", true);
    xmlhttp.send();

}


