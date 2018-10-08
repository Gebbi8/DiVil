function downloadSBML(obj) {
	var data = JSON.parse(obj);
	console.log(data, data.nodes);

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

	xml = xml + '<compartment>  </compartment>\n';



	xml = xml + '</listOfCompartments>\n';
	xml = xml + '<listOfSpecies>\n';

	console.log(data.nodes.length, data.nodes[1]);
	for(i = 0; i < data.nodes.length; i++){
		xml = xml + '<species '

		xml = xml + 'id="' + data.nodes[i].id + '"';
		if(data.nodes[i].compartment != "null")	xml = xml + ' compartment="' + data.nodes[i].compartment + '" ';


		xml = xml + '>\n'



		xml = xml + '</species>\n';



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

	xml = xml + '<reaction> ... </reaction>\n';


	xml = xml + '</listOfReactions>\n';
	xml = xml + '<listOfEvents>\n';

	xml = xml + '<event> ... </event>\n';



	xml = xml + '</listOfEvents>\n';



	xml = xml + '\t\t</model>\n';
	xml = xml +	'\t</sbml>\n';

	//check and print
	console.log(xml);

	var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "sbgn-ml.xml");

}
///////////////////////////////////////////////////////////////
	//var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
/*	xml = xml + '\t<map language="process description">\n';

	//loop over glyphs

	for(i = 0; i<data.nodes.length; i++){
		xml = xml + '\t\t<glyph ';

		var compartment = data.nodes[i].compartment;
		if(compartment != "null")	xml = xml + ' compartmentRef="' + data.nodes[i].compartment + '" ';

		//class , id mandatory
		if(data.nodes[i].class != null){
			xml = xml + 'class="' + sboSwitch(data.nodes[i].class) + '" ';
			xml = xml + 'id="' + data.nodes[i].id + '"';
		}
		xml = xml + '>\n';

		//label
		if(data.nodes[i].label != null){
			xml = xml + '\t\t\t<label text="' + data.nodes[i].label + '"/>\n'
		}

		//color
		var color = $("#"+d3.selectAll("g").data()[i].id).css("stroke");
		if(color == "rgb(255, 165, 0)"){
			color = "orange";
		}
		xml = xml + '\t\t\t<note color="' + color + '"/>\n'

		//clonemarker

		//bounding box mandatory
		var bbox = d3.selectAll("g.node")[0][i].getBBox();
		xml = xml + '\t\t\t<bbox x="' + d3.selectAll("g").data()[i].x + '" y="' + d3.selectAll("g").data()[i].y + '" w="' + bbox.width + '" h="' + bbox.height + '"' + '/>\n';

		xml = xml + '\t\t</glyph>\n';
	}

	//loop over arcs
	for(i = 0; i<data.links.length; i++){
		xml = xml + '\t\t<arc id="arc' + i + '" class="' + sboSwitch(data.links[i].class) + '" ';

		xml = xml + 'source="' + data.links[i].source.id + '" target="' + data.links[i].target.id + '"'

		xml = xml + '>\n';

		xml = xml + '\t\t\t<note color="' + d3.selectAll("line")[0][i].style.stroke + '"/>\n'

		xml = xml + '\t\t\t<start x="' + d3.selectAll("line")[0][i].x1.animVal.value + '" y="' + d3.selectAll("line")[0][i].y1.animVal.value + '"/>\n';

		xml = xml + '\t\t\t<end x="' + d3.selectAll("line")[0][i].x2.animVal.value + '" y="' + d3.selectAll("line")[0][i].y2.animVal.value + '"/>\n';

		xml = xml + '\t\t</arc>\n';
	}

	xml = xml + '\t' + '</map>\n';
	xml = xml + "</sbgn>";

}
*/
