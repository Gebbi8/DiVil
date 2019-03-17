function downloadSBML(decisionArr, oldDoc, newDoc) { //works always with the second document as main

console.log(newDoc);


	//iterate through decision array
	for(var i=0; i < decisionArr.length; i++){
		console.log(decisionArr[i]);

		if(decisionArr[i][0] == 'delete' && decisionArr[i][1] == 0){ //add to the file if the user selected to keep it
		//	newDoc.add(  ); //add decisionArr[i][2] to position X in doc

		} else if(decisionArr[i][0] == 'insert' && decisionArr[i][1] == 1) { //delete from the file if the user selected to keep it
			console.log(decisionArr[i][2], decisionArr[i][2].parentNode.removeChild(decisionArr[i][2]));
			
		} else if(decisionArr[i][0] == 'move' && decisionArr[i][1] == 0) { // delete moved node from document and insert the old node

		} else if(decisionArr[i][0] == 'update' && decisionArr[i][1] == 0) { // delete moved node from document and insert the old node

		}

	}


	//xDiff = xmlDocDiff.getElementsByTagName("delete")[0].getElementsByTagName("node");
	//console.log(xDiff.length);

	// for(i=0; i < xDiff.length; i++){
	//
	// 	//console.log(xDiff[i], xDiff[i].getAttribute("oldParent"), xDiff[i].getAttribute("newParent"));
	// 	getXmlElement(xmlDocSbmlOld, xDiff[i].getAttribute("oldParent"));
	//
	//
	// 	if(!xDiff[i].hasAttribute("triggeredBy")){
	// 		var newPath, pathArray, nextSibling, oldObject, parent;
	//
	// 		newPath = xDiff[i].getAttribute("oldPath");
	// 		pathArray =  splitXmlPath(newPath);
	// 		console.log(pathArray);
	// 		console.log("it worked how often?");
	//
	// 		parent = xmlDocSbmlNew;
	// 		oldObject = xmlDocSbmlOld;
	//
	// 		for(k=0; k < pathArray.length-1; k++){
	//
	// 			if(parent != undefined) parent = parent.getElementsByTagName(pathArray[k][0])[pathArray[k][1]-1];
	// 			else console.log("parent was undefined");
	//
	// 			if(oldObject != undefined) oldObject = oldObject.getElementsByTagName(pathArray[k][0])[pathArray[k][1]-1];
	// 			else console.log("oldObject was undefined");
	// 		}
	//
	//
	// 		//console.log(oldObject, parent);
	//
	// 		if(parent != undefined && oldObject != undefined){
	// 			nextSibling = parent.getElementsByTagName(pathArray[pathArray.length-1][0])[pathArray[pathArray.length-1][1]];
	// 			console.log(oldObject);
	// 			oldObject = oldObject.getElementsByTagName(pathArray[pathArray.length-1][0])[pathArray[pathArray.length-1][1]-1];
	//
	// 			if(nextSibling != undefined && oldObject != undefined){
	// 				console.log("nextSibling", nextSibling, "oldObject", oldObject);
	// 				nextSibling.parentNode.insertBefore(oldObject, nextSibling); // is the xml manipulated or just
	// 				console.log(oldObject.ownerDocument);
	// 			} else {
	// 				console.log("parent", parent, "parentTag", parent.tagName, "oldO", oldObject);
	// 				if(oldObject != undefined) parent.appendChild(oldObject);
	// 				else console.log("undefined oldObject");
	//
	// 			}
	// 		} else console.log("undefined parent or object");
	// 	}
	// }

	//check and download
//	var blob = new Blob([(new XMLSerializer).serializeToString(xmlDocSbmlNew)], {type: "text/xml;charset=utf-8"}); //xmlDocSbmlNew
//	saveAs(blob, "SBML-Merge.xml");
}

function splitXmlPath(path){
	var pathArray;

	path = path.substr(1);
	pathArray = path.split("/");
	for(j = 0; j < pathArray.length; j++){
		pathArray[j] = pathArray[j].slice(0,-1);
		pathArray[j] = pathArray[j].split("[");
	}

	return pathArray;
}

function getXmlElement(xmlDoc, xpath){
	console.log(xmlDoc, xpath);
	var xmlElement = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE,null);
	console.log(xmlElement.iterateNext());
}
