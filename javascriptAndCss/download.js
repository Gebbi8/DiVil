function download(obj) {
	console.log(obj);

	var data = $.parseJSON(obj);

	console.log(data);
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
	xml = xml + '\t<map language="process description">\n';

	//loop over glyphs

	for(i = 0; i<data.nodes.length; i++){
		var svgNode = d3.select("#" + data.nodes[i].id);
		var bBox = svgNode._groups[0][0].getBBox();
		var svgData = svgNode.data()[0];
		console.log(svgData, bBox);

		xml = xml + '\t\t<glyph ';

		var compartment = data.nodes[i].compartment;
		if(compartment != "null")	xml = xml + ' compartmentRef="' + data.nodes[i].compartment + '" ';

		//class optional, id mandatory
		if(data.nodes[i].class != null){
			xml = xml + 'class="' + sboSwitch(data.nodes[i].class) + '" ';
			xml = xml + 'id="' + data.nodes[i].id + '"';
		}
		xml = xml + '>\n';

		//label optional
		if(data.nodes[i].label != null){
			xml = xml + '\t\t\t<label text="' + data.nodes[i].label + '"/>\n'
		}

		//color
		var color;
		if(d3.selectAll("g").data()[i] == undefined) color = "black";
		else color = $("#" + d3.selectAll("g").data()[i].id).css("stroke")
		if(color == "rgb(255, 165, 0)"){
			color = "orange";
		}
		xml = xml + '\t\t\t<note color="' + color + '"/>\n'

		//clonmarker optional

		//bounding box mandatory
		//if(d3.select("#"+data.nodes[i].id)._groups[0][i] != undefined){
			xml = xml + '\t\t\t<bbox x="' + svgData.x + '" y="' + svgData.y + '" w="' + bBox.width + '" h="' + bBox.height + '"' + '/>\n';
		//}

		xml = xml + '\t\t</glyph>\n';
	}

	//loop over arcs
/*	for(i = 0; i<data.links.length; i++){
		xml = xml + '\t\t<arc id="arc' + i + '" class="' + sboSwitch(data.links[i].class) + '" ';

		xml = xml + 'source="' + data.links[i].source.id + '" target="' + data.links[i].target.id + '"'

		xml = xml + '>\n';

		xml = xml + '\t\t\t<note color="' + d3.selectAll(".link")[i].style.stroke + '"/>\n'

		xml = xml + '\t\t\t<start x="' + d3.selectAll(".link")[i].animatedPathSegList[0].x + '" y="' + d3.selectAll(".link")[0][i].animatedPathSegList[0].y + '"/>\n';

		xml = xml + '\t\t\t<end x="' + d3.selectAll(".link")[i].animatedPathSegList[1].x + '" y="' + d3.selectAll(".link")[0][i].animatedPathSegList[1].y + '"/>\n';

		xml = xml + '\t\t</arc>\n';
	}*/

	xml = xml + '\t' + '</map>\n';
	xml = xml + "</sbgn>";
	console.log(xml);

	var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merged-models.sbgnml");
}
