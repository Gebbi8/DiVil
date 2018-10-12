function downloadSBML(obj, xmlDocDiff, xmlDocSbml) {
	var data = JSON.parse(obj);
	console.log(xmlDocDiff, xmlDocSbml);
	var xDiff, xSbml;


	xDiff = xmlDocDiff.getElementsByTagName("insert")[0].getElementsByTagName("node");
	for(i=0; i < 4; i++){
		var newPath, pathArray;

		newPath = xDiff[i].getAttribute("newPath");
		pathArray =  splitXmlPath(newPath);
		console.log(pathArray);
	//	xml = xml + '<reaction'
	//	if(data.links[i].id != "null")	xml = xml + ' id="' + data.links[i].id + '" '; //id from model would be better
	//	if(data.links[i].compartment != "null")	xml = xml + ' compartment="' + data.links[i].compartment + '" ';
	//	xml = xml + '>\n';



	//	xml = xml +  '</reaction>\n';
	}











	var xml =	'<?xml version="1.0" encoding="UTF-8"?>\n';
	xml = xml +	'\t<sbml xmlns="http://www.sbml.org/sbml/level3/version2/core" level="3" version="2">\n'
	xml = xml +	'\t\t<model id="MyMergedModel">\n';

	xml = xml + '<listOfFunctionDefinitions>\n';

	xml = xml + '<functionDefinition> </functionDefinition>\n';



	xml = xml + '</listOfFunctionDefinitions>\n';
	xml = xml + '<listOfUnitDefinitions>\n';

	xml = xml + '<unitDefinition>  </unitDefinition>\n';



	xml = xml + '</listOfUnitDefinitions>\n';
	xml = xml + '<listOfCompartments>\n';

	for(i = 0; i < data.nodes.length; i++){
		if(data.nodes[i].id.startsWith("c")){ //types for nodes is needed to read it out from the json, unique ID directly from the model would also be good!
			xml = xml + '<compartment\n';
			if(data.nodes[i].id != "null")	xml = xml + ' id="' + data.nodes[i].id + '" ';
			if(data.nodes[i].compartment != "null")	xml = xml + ' compartment="' + data.nodes[i].compartment + '" ';
			if(data.nodes[i].class != "null")	xml = xml + ' sbo="' + data.nodes[i].class + '" ';
			if(data.nodes[i].label != "null")	xml = xml + ' name="' + data.nodes[i].label + '" ';
			xml = xml + '>\n'
			xml = xml + '</compartment>\n';
		}
	}




	xml = xml + '</listOfCompartments>\n';
	xml = xml + '<listOfSpecies>\n';

	console.log(data.nodes.length, data.nodes[1]);
	for(i = 0; i < data.nodes.length; i++){
		if(!data.nodes[i].id.startsWith("r") && !data.nodes[i].id.startsWith("c")){ //types for ndoes is needed to read it out from the json, unique ID directly from the model would also be good!
			xml = xml + '<species '
			if(data.nodes[i].id != "null")	xml = xml + ' id="' + data.nodes[i].id + '" ';
			if(data.nodes[i].compartment != "null")	xml = xml + ' compartment="' + data.nodes[i].compartment + '" ';
			if(data.nodes[i].class != "null")	xml = xml + ' sbo="' + data.nodes[i].class + '" ';
			if(data.nodes[i].label != "null")	xml = xml + ' name="' + data.nodes[i].label + '" ';
			xml = xml + '>\n'
			xml = xml + '</species>\n';
		}
	}



	xml = xml + '</listOfSpecies>\n';
	xml = xml + '<listOfParameters>\n';

	xml = xml + '<parameter>  </parameter>\n';



	xml = xml + '</listOfParameters>\n';
	xml = xml + '<listOfInitialAssignments>\n';

	xml = xml + '<initialAssignment>  </initialAssignment>\n';



	xml = xml + '</listOfInitialAssignments>\n';
	xml = xml + '<listOfRules>\n';

	xml = xml + '</listOfRules>\n';
	xml = xml + '<listOfConstraints>\n';

	xml = xml + '<constraint> ... </constraint>\n';



	xml = xml + '</listOfConstraints>\n';
	xml = xml + '<listOfReactions>\n';


	xml = xml + '</listOfReactions>\n';
	xml = xml + '<listOfEvents>\n';

	xml = xml + '<event> ... </event>\n';



	xml = xml + '</listOfEvents>\n';



	xml = xml + '\t\t</model>\n';
	xml = xml +	'\t</sbml>\n';

	//check and print
	var blob = new Blob([(new XMLSerializer).serializeToString(xmlDocDiff)], {type: "text/xml;charset=utf-8"});
	saveAs(blob, "sbgn-ml.xml");
}

function splitXmlPath(path){
	var pathArray;

	pathArray = path.substr(1);
	pathArray = pathArray.split("/");
	for(i = 0; i < pathArray.length; i++){
		pathArray = pathArray[i].slice(0,-1);
		pathArray = pathArray[i].split("[");
	}

	return pathArray;
}
