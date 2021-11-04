function downloadSBGNML(data, structeredComodi) {
	console.log(data, structeredComodi);
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
	xml = xml + '\t<map language="process description">\n';

	xml = xml + '\t\t<extensions>\n';
	xml = xml + '\t\t\<renderInformation xlmns="http://www.sbml.org/sbml/level3/version1/render/version1" id="renderInformation">\n';
	xml = xml + '\t\t\t<listOfColorDefinitions>\n';
	xml = xml + '\t\t\t\t<colorDefinition id="nothing" value="black"/>\n';
	xml = xml + '\t\t\t\t<colorDefinition id="update" value="#D6D287"/>\n';
	xml = xml + '\t\t\t\t<colorDefinition id="delete" value="#D66A56"/>\n';
	xml = xml + '\t\t\t\t<colorDefinition id="insert" value="#76D6AF"/>\n';
	xml = xml + '\t\t\t\t<colorDefinition id="move" value="#8E67D6"/>\n';
	xml = xml + '\t\t\t</listOfColorDefinitions>\n';
	xml = xml + '\t\t\t<listOfStyles>\n';

	//compute change idLists
	var idListNothing = '';
	var idListInsert ='';
	var idListUpdate = ''; 
	var idListDelete = '';
	var idListMove = '';

	fillIdList(data.nodes);
	fillIdList(data.links);
	
	function fillIdList(arr){
		arr.forEach(e => {
			switch (e.bivesChange) { //adapt after backend update
				case 'nothing':
					idListNothing += e.id + ' ';
					break;
				case 'insert':
					idListInsert += e.id + ' ';
					break;
				case 'delete':
					idListDelete += e.id + ' ';
					break;
				case 'update':
					idListUpdate += e.id + ' ';
					break;
				case 'move':
					idListMove += e.id + ' ';
					break;
				default:
					break;
			}
		});
	}

	xml = xml + '\t\t\t\t<style id="noChange" idList="' + idListNothing + '">\n';
	xml = xml + '\t\t\t\t\t<g stroke="nothing"/>\n';
	xml = xml + '\t\t\t\t</style>\n';

	xml = xml + '\t\t\t\t<style id="updateChange" idList="' + idListUpdate + '">\n';
	xml = xml + '\t\t\t\t\t<g stroke="update"/>\n';
	xml = xml + '\t\t\t\t</style>\n';

	xml = xml + '\t\t\t\t<style id="insertChange" idList="' + idListInsert + '">\n';
	xml = xml + '\t\t\t\t\t<g stroke="insert"/>\n';
	xml = xml + '\t\t\t\t</style>\n';

	xml = xml + '\t\t\t\t<style id="deleteChange" idList="' + idListDelete + '">\n';
	xml = xml + '\t\t\t\t\t<g stroke="delete"/>\n';
	xml = xml + '\t\t\t\t</style>\n';

	xml = xml + '\t\t\t\t<style id="moveChange" idList="' + idListMove + '">\n';
	xml = xml + '\t\t\t\t\t<g stroke="move"/>\n';
	xml = xml + '\t\t\t\t</style>\n';

	xml = xml + '\t\t\t</listOfStyles>\n'
	xml = xml + '\t\t</renderInformation>\n';
	xml = xml + '\t\t</extensions>\n';

	//loop over glyphs

	for(i = 0; i<data.nodes.length; i++){
		var svgNode = d3.select("#" + data.nodes[i].id);
		console.log( data.nodes[i], svgNode);
		if(svgNode._groups[0][0] == null) continue; //deleted departement that has no species assigned is not visualised. all species it contained are no associated with another compartment
		var bBox = svgNode._groups[0][0].getBBox();
		var svgData = svgNode.data()[0];
		//console.log(svgData, bBox);

		xml = xml + '\t\t<glyph ';

		var compartment = data.nodes[i].compartment;
		if(compartment != "null")	xml = xml + ' compartmentRef="' + data.nodes[i].compartment + '" ';

		//class optional, id mandatory
		if(data.nodes[i].sboTerm != null){
			xml = xml + 'class="' + sboSwitch(data.nodes[i].sboTerm) + '" ';
			xml = xml + 'id="' + data.nodes[i].id + '"';
		}
		xml = xml + '>\n';

		//label optional
		if(data.nodes[i].label != null){
			xml = xml + '\t\t\t<label text="' + data.nodes[i].label + '"/>\n'
		}

		//color
/* 		if(d3.selectAll("g").data()[i] == undefined) color = "black";
		else color = $("#" + d3.selectAll("g").data()[i].id).css("stroke")
		if(color == "rgb(255, 165, 0)"){
			color = "orange";
		}
		xml = xml + '\t\t\t<note color="' + color + '"/>\n' */

		//clonmarker optional

		//bounding box mandatory for glyphs (not compartments)
		//if(d3.select("#"+data.nodes[i].id)._groups[0][i] != undefined){
			if( sboSwitch(data.nodes[i].sboTerm) != "compartment") xml = xml + '\t\t\t<bbox x="' + (svgData.x - bBox.width/2) + '" y="' + (svgData.y - bBox.height/2) + '" w="' + bBox.width + '" h="' + bBox.height + '"' + '/>\n';
		//}

		//add annotaion for comodi
		xml += '\t\t\t<extension>\n';
		// comodiAdder(data, changeType, path)
		xml += '\t\t\t\t' + comodiAdder(structeredComodi, data.nodes[i].bivesChange, data.nodes[i].path) + '\n';
		xml += '\t\t\t</extension>\n';
		
		

		xml = xml + '\t\t</glyph>\n';
	}

	//loop over arcs
	//console.log(data.links);
	for(i = 0; i<data.links.length; i++){
		var node = d3.select("#" + data.links[i].id);
		var path = node.attr("d");
		var cl = sboSwitch(data.links[i].sboTerm);
		if(cl == "necessarystimulation") cl = "necessary stimulation";

		xml = xml + '\t\t<arc id="' + data.links[i].id + '" class="' + cl + '" ';

		xml = xml + 'source="' + data.links[i].source.id + '" target="' + data.links[i].target.id + '"'

		xml = xml + '>\n';

		xml = xml + '\t\t\t<note color="' + node.attr("stroke") + '"/>\n'

		xml = xml + '\t\t\t<start x="' + svgPathCoordinate('start', 'x', path) + '" y="' + svgPathCoordinate('start', 'y', path) + '"/>\n';

		xml = xml + '\t\t\t<end x="' + svgPathCoordinate('end', 'x', path) + '" y="' + svgPathCoordinate('end', 'y', path) + '"/>\n';

		//add annotaion for comodi
		xml += '\t\t\t<extension>\n';
		// comodiAdder(data, changeType, path)
		xml += '\t\t\t' + comodiAdder(structeredComodi, data.nodes[i].bivesChange, data.nodes[i].path) + '\n';
		xml += '\t\t\t</extension>\n';

		xml = xml + '\t\t</arc>\n';
	}

	xml = xml + '\t' + '</map>\n';
	xml = xml + "</sbgn>";

	console.log(xml);
	//beautify and download
	const beautifiedXmlText = new XmlBeautify().beautify(xml,  {
		indent: "\t", //indent pattern like white spaces
		useSelfClosingElement: true //true:use self-closing element when empty element.
	});

	console.log(beautifiedXmlText);

	var blob = new Blob([beautifiedXmlText], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "verion-comparison.sbgnml");
}

function svgPathCoordinate(point, axis, path){
	//console.log(path);
	//Q Path
	var coordinates = path.split(" ");
	var p;
	var x,y;

	//console.log(coordinates);

	if(point == "start") p = coordinates[0].split(',');
	else if(coordinates.length == 2){
		p = coordinates[1].split(',');
	} else 
	p = coordinates[2].split(',');

	if(axis == 'x') return p[0].substr(1);
	else return p[1];

}

function comodiAdder(data, changeType, path){
    console.log(changeType, path);
    console.log(data);
   
    if(changeType == "delete") path = 'old-' + path;
    console.log(path,data[path]);
    return data[path].comodi;
}