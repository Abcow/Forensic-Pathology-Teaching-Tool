//This is the Ajax from the project I did last year. The xml format we used for the data we requested was god awful


function requestData(url, callBack)
{
	// Create a new XMLHttpRequest object
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// XMLHttpRequest is supported
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// Create an ActiveX Object
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callBack(xmlhttp);
		}
	}
	// Open the object with the filename
	xmlhttp.open("POST", url, true);
	// Send the request
	xmlhttp.send(null);
}

function initialise(){
	setupXMLRequests();
	//dropdownMenu();
}

function dropdownMenu()
{
	var title = document.getElementById("navMenuTitle");
	var linkspanel = document.getElementById("links");
	var links = linkspanel.getElementsByTagName("li");
	
	title.onclick = function() {toggleSubMenu(links, title)};
	//title.onmouseover = function() {toggleSubMenu(links)};
	

}

function toggleSubMenu(links, title)
{
	/*
	for(var i=0; i<links.length; i++)
	{
	
	if (links[i].style.display == "none"||links[i].style.display == ""){
			links[i].style.display = "block";
			title.innerHTML = "Malware";
		} else {
			links[i].style.display = "none";
			title.innerHTML = "Navigation Menu";
		}
	}
	*/
} 


function setupXMLRequests(){
	
	//home
	var homeLink = document.getElementById("home");
	homeLink.onclick = function(){requestData("home.xml",changePageContent)};
	//history	
	var homeLink = document.getElementById("history");
	homeLink.onclick = function(){requestData("history.xml",changePageContent)};		
	//types
	var typesLink = document.getElementById("types");
	typesLink.onclick = function(){requestData("types.xml",changePageContent)};
	//protection
	var protectionLink = document.getElementById("protection");
	protectionLink.onclick = function(){requestData("protection.xml",changePageContent)};
	//law
	var lawLink = document.getElementById("law");
	lawLink.onclick = function(){requestData("law.xml",changePageContent)};
	//purposes
	var purposesLink = document.getElementById("purposes");
	purposesLink.onclick = function(){requestData("purposes.xml",changePageContent)};

}


function changePageContent(xmlhttp){
	var contentDiv = document.getElementById("content");
	
	//Remove all the children
	while(contentDiv.firstChild){
		contentDiv.removeChild(contentDiv.firstChild);
	}
	
	var xmlContent = xmlhttp.responseXML;
	
	generatePageContent(xmlContent,contentDiv);	
	
	
		
}

function generatePageContent(xmlContent,contentDiv){

	makeTitle(xmlContent,contentDiv);
	createFirstParagraph(xmlContent,contentDiv);
	createAdditionalSections(xmlContent,contentDiv);
	createReferances(xmlContent,contentDiv);
}

function makeTitle(xmlContent,contentDiv){
	var title = document.createElement("h1");
	title.className = "centerText";
	var titleData = xmlContent.getElementsByTagName("title")[0].firstChild.data;
	title.appendChild(document.createTextNode(titleData));
	contentDiv.appendChild(title);
}

function createFirstParagraph(xmlContent,contentDiv){

	var sectionDiv = document.createElement("div");
	sectionDiv.className = "subDiv";

	var firstSection = xmlContent.getElementsByTagName("section")[0];
	var paragraphs = firstSection.getElementsByTagName("para");
	
	for(var i = 0; i < paragraphs.length; i++){
	
		sectionDiv.appendChild(createParagraph(paragraphs[i]));
	}	
	contentDiv.appendChild(sectionDiv);
}

function createAdditionalSections(xmlContent,contentDiv){
	var sections = xmlContent.getElementsByTagName("section");
	
	for(var i = 1; i < sections.length; i++){
		createSectionContent(sections[i],contentDiv);
	}
}

function createSectionContent(section,contentDiv){

	var sectionDiv = document.createElement("div");
	sectionDiv.className = "subDiv";

	var titleFromXml = section.getElementsByTagName("subtitle");
	var titleTag = document.createElement("h2");
	titleTag.appendChild(document.createTextNode(titleFromXml[0].firstChild.data));
	sectionDiv.appendChild(titleTag); 	
	var paras = section.getElementsByTagName("para");
	
	for(var i = 0; i < paras.length; i++){
	
		var working;
		
		if(paras[i].id == "list") {
			working = createList(paras[i],liElement);	
		}
		else{	
			working = createParagraph(paras[i]);			
		}		
		sectionDiv.appendChild(working);
	}
		
	contentDiv.appendChild(sectionDiv);
}

function createReferances(xmlContent,contentDiv){

	var refDiv = document.createElement("div");
	refDiv.className = "subDiv";

	var refTitleTag = document.createElement("h2");
	refTitleTag.appendChild(document.createTextNode("References"));
	refDiv.appendChild(refTitleTag);

	var xmlList =  xmlContent.getElementsByTagName("ref")[0];
	var list = createList(xmlList, createRefLi);
	refDiv.appendChild(list);
	
	contentDiv.appendChild(refDiv);
	
}

function createList(list,liFunction) {
	var ulTag = document.createElement("ul");
	var liArray = list.getElementsByTagName("listElement");
	for(var j = 0; j < liArray.length; j++){	
		ulTag.appendChild(liFunction(liArray[j]));
	}
	return ulTag;
}

function createRefLi(listElement){
	var liTag = document.createElement("li");
	var aTag = document.createElement("a");
	aTag.setAttribute("href",listElement.firstChild.data);
	aTag.appendChild(document.createTextNode(listElement.firstChild.data));
	liTag.appendChild(aTag);
	return liTag;
}

function liElement(listElement){
	var liTag = document.createElement("li");
	liTag.appendChild(document.createTextNode(listElement.firstChild.data));
	return liTag;
}

function createParagraph(para){
	var paragraph = document.createElement("p");
	var paragraphData = para.firstChild.data;
	paragraph.appendChild(document.createTextNode(paragraphData));
	return paragraph;
}
