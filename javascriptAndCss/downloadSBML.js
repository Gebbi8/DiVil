function downloadSBML(decisionArr, oldDoc, newDoc) { //works always with the second document as main
//use .ownerDocument to get doc. best from newDoc
console.log(newDoc);

//do all operations use: removeChild and replace... see w3...
	//iterate through decision array
	for(var i=0; i < decisionArr.length; i++){
		if(decisionArr[i][0] == 'delete' && decisionArr[i][1] == 0){ //add to the file if the user selected to keep it
			addDeleted(decisionArr[i][2], decisionArr[i][3], newDoc);

		} else if(decisionArr[i][0] == 'insert' && decisionArr[i][1] == 1) { //delete from the file if the user selected to keep it
			decisionArr[i][2].parentNode.removeChild(decisionArr[i][2]);

		} else if(decisionArr[i][0] == 'move' && decisionArr[i][1] == 0) { // delete moved node from document and insert the old node
			//remove node from newparent
			decisionArr[i][2].parentNode.removeChild(decisionArr[i][2]);
			//add to oldParent
			addDeleted(decisionArr[i][2], decisionArr[i][4], newDoc);

		} else if(decisionArr[i][0] == 'update' && decisionArr[i][1] == 0) { // delete moved node from document and insert the old node
			console.log("replaceIt!!!!!!!!!!!!!!");
			decisionArr[i][3].parentNode.replaceChild(decisionArr[i][2], decisionArr[i][3]); //replaced decisionArr[i][3] with decisionArr[i][2]

		}
	}

	//check and download
	var blob = new Blob([(new XMLSerializer).serializeToString(newDoc)], {type: "text/xml;charset=utf-8"}); //xmlDocSbmlNew
	saveAs(blob, "SBML-Merge.xml"); //TODO: put in a useful name
}

function addDeleted(node, oldPath, newDoc){
	console.log(node, oldPath, newDoc);
	// get parent of some path in newDoc //int p=filePath.lastIndexOf(".");
	var slicePos = oldPath.lastIndexOf('/');
	var parentPath = oldPath.slice(0, slicePos);
	console.log(parentPath);
	parent = newDoc.evaluate(parentPath, newDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
	console.log(newDoc.evaluate(parentPath, newDoc, null, XPathResult.ANY_TYPE, null));
	if(parent == null){
		alert("One your choices (probably a move) could not be applied because the path does not exist in the second model.");
		return;
	}

//	newDoc.add(  ); //add decisionArr[i][2] to position X in doc ... get position with split at [ after slice
	parent.appendChild(node);

	//TODO:
	//use insert before to get the right position
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
