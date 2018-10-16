function download(obj) {
	console.log(obj);

	var data = $.parseJSON(obj);

	console.log(data);
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
	xml = xml + '\t<map language="process description">\n';

	//loop over glyphs

	for(i = 0; i<data.nodes.length; i++){
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
		if(d3.selectAll("g.node")[0][i] != undefined){
			var bbox = d3.selectAll("g.node")[0][i].getBBox();
			xml = xml + '\t\t\t<bbox x="' + d3.selectAll("g.node").data()[i].x + '" y="' + d3.selectAll("g.node").data()[i].y + '" w="' + bbox.width + '" h="' + bbox.height + '"' + '/>\n';
		}


		xml = xml + '\t\t</glyph>\n';
	}

	//loop over arcs
	for(i = 0; i<data.links.length; i++){
		xml = xml + '\t\t<arc id="arc' + i + '" class="' + sboSwitch(data.links[i].class) + '" ';

		xml = xml + 'source="' + data.links[i].source.id + '" target="' + data.links[i].target.id + '"'

		xml = xml + '>\n';
console.log(d3.selectAll(".link")[0][i].animatedPathSegList);
		xml = xml + '\t\t\t<note color="' + d3.selectAll(".link")[0][i].style.stroke + '"/>\n'

		xml = xml + '\t\t\t<start x="' + d3.selectAll(".link")[0][i].animatedPathSegList[0].x + '" y="' + d3.selectAll(".link")[0][i].animatedPathSegList[0].y + '"/>\n';

		xml = xml + '\t\t\t<end x="' + d3.selectAll(".link")[0][i].animatedPathSegList[1].x + '" y="' + d3.selectAll(".link")[0][i].animatedPathSegList[1].y + '"/>\n';

		xml = xml + '\t\t</arc>\n';
	}

	xml = xml + '\t' + '</map>\n';
	xml = xml + "</sbgn>";
	console.log(xml);

	var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "merged-models.sbgnml");
}
