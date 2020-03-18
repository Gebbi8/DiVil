	function showSbgn(data){

	//delete current graph and sho graph tab and download button
	d3.selectAll("#bivesGraph").selectAll("svg").remove();

	//check if graph data is available
	if(data == "" || data == undefined) {
		$('#graphTab').hide();
		return;
	}
//	$('#graphTab').show();
//	$('#donwload').show();

//Variables for d3
var currentZoom = 1;
var width = 1000,
	height = 800,
	size = (width - 50) / 10 ;
	marker = width / 100;

	//append clean svg
	var svg = d3.select("#bivesGraph").append("svg")
		.attr("id", 'bivesGraphSvg')
		.attr("width", width)
		.attr("height", height)
		.attr("width", width);
//		.call(zoom);

	appendDefs(); //define arrowheads: see appendDefs.js

	//add addEventListener to checkbox for port toggling
	var checkbox = document.querySelector("input[id=portToggle]");

	//register event listerners
	checkbox.addEventListener( 'change', function() {
		changeProcessNode(size);
		ticked();
		console.log("Toogle want's to tickle")
	});

	//parse the data and register download function
	var obj = JSON.parse(data);
	// register click-listeners to the download button
	$("#download").click (function (){download (obj);});

	//get nodes and links
	var nodes = obj.nodes;
	console.log(nodes);
	var links = obj.links;
	console.log(links);

	//create force layout
	var forceSimulation = d3.forceSimulation(nodes)
		.force('charge', d3.forceManyBody().strength(-50))		//set colision to avoid overlap
	  .force('center', d3.forceCenter(width / 2, height / 2)) //attract to the svg center
		.force('charge', d3.forceManyBody())
	//	.force('link', d3.forceLink().links(links)) //link have a specific distance, default is 30
	  .on('tick', ticked);


	const link = svg.append("g")
      .attr("stroke", "black")
      .attr("stroke-opacity", 1)
	    .selectAll("line")
		    .data(links)
		    .enter().append("path")
		      .attr("stroke-width", 3)
					.style("marker-end", function(d){return "url(#" + sboSwitchArc(d.class) + "" + d.bivesClass + ")"});

	var node = svg.selectAll("g")
								.data(nodes);

	var enterNode = node.enter()
							    .append("g")
									.attr("id", function(d) {return d.id})
							    .attr("class", "node");

	var nodeShape = enterNode.append("path")
							.attr("d", function(d) {
								var nodeType = sboSwitch(d.class);
								return customSymbol(nodeType, 30);
							})
							.attr("id", function(d) {return d.id})
							.style("stroke", "black")
							.style("stroke-width", 3)
        			.attr("fill","white")
	            .call(d3.drag()
		            .on("start",dragstarted)
		            .on("drag",dragged)
								.on("end", dragended));

		var nodeLabel = enterNode.append("text")
											.style("text-anchor", "middle")
											.style("stroke", "none")
											.style("font-size", "14px")
											.attr('dy', "0.25em")
											.text(function(d) { console.log(d.label); return d.label });

		function ticked() {

			link.attr("d", tickArrows);

	    node.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });

			nodeShape.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

			nodeLabel.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});
	  }


	//zoom the whole svg
	var zoom = d3.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", zoomed);

	var container = svg.append("g");

	function zoomed() {
		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		ticked();
	}

	var edges = [];
	var compartments = [];


	var nodeById = d3.map();

	  obj.nodes.forEach(function(node) {

		var add = true;
		for(var i=0; i < compartments.length; i++){
			if(compartments[i].id == node.compartment){
				compartments[i].sum +=1;
				add = false;
			}
		}

		if(add){
			compartments.push({id: node.compartment, sum: 1});
		}
		nodeById.set(node.id, node);
	  });

	  console.log(compartments);
	  console.log(nodeById);



	  obj.links.forEach(function(link) {
			link.source = nodeById.get(link.source);
			link.target = nodeById.get(link.target);
	  });


		var radius = 15;
		var color = d3.scaleOrdinal();

	function dragstarted(d) {
		if (!d3.event.active) forceSimulation.alphaTarget(0.5).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) forceSimulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	function clicked(d){
		console.log("click");
		if (d3.event.defaultPrevented) return; // dragged

		d3.select(this).classed("fixed", d.fixed = false);
	}

/*	var dragCompartment = d3.behavior.drag()
		.on("dragstart", function() {forceSimulation.start(); d3.event.sourceEvent.stopPropagation();})
		.on("drag", function(d, i){

			var key = d.key;
			var selection = d3.selectAll("#bivesGraphSvg").selectAll("g.node")
				.filter(function(d){return d.compartment == key});

			selection.each(
					function(d){
						d3.select(this).classed("fixed", d.fixed = true);
						d.x = d.x + d3.event.dx;
						d.y = d.y + d3.event.dy;
						d3.select(this).attr("transform", function(d,i){
							return "translate(" + [ d.x,d.y ] + ")"
						})
						x=d.x; y=d.y;
						d.px=d.x; d.py=d.y;
					}
				);
			tick();
		}) */

	var nested_data = d3.nest()
		.key(function(d) { return d.compartment; })
		.entries(obj.nodes);

/*	 var link = container.selectAll(".link")
		  .data(obj.links)
		.enter().append("path")
		  .attr("marker-end", function(d) {
				var elementClass;
				return "url(#" + sboSwitchArc(d.class) + "" + d.bivesClass + ")";
			})
		  .attr("id", function(d) {return d.id})
		  .attr("class", function(d) { return "link " + d.bivesClass;})
		  .style("stroke-width", 1)
		  .style("fill", "none")
		  .style("stroke", function(d) { return getColor(d.bivesClass);})
*/
	function getColor(bivesColor){
		switch (bivesColor){
			case 'insert': return "green"; break;
			case 'delete': return "red"; break;
			case 'move': return "blue"; break;
			case 'update': return "orange"; break;
			default: return "black";
		}
	}

	function compartmentFlex(id){
		//find min and max values of contained nodes
		var xMin=Infinity, xMax=-Infinity, yMin=Infinity, yMax=-Infinity
		nested_data.forEach(function(d){
			if(d.key == id){
				d.values.forEach(function(e){
					var element = d3.select("#"+e.id).node();
					var halfElementWidth = 0;
					var halfElementHeight = 0;
					if(element != null){
						var boundingClientRect = element.getBoundingClientRect();
						halfElementWidth = boundingClientRect.width/2/currentZoom;
						halfElementHeight = boundingClientRect.height/2/currentZoom;
					}

					xMin = Math.min(xMin, e.x-halfElementWidth);
					xMax = Math.max(xMax, e.x+halfElementWidth);
					yMin = Math.min(yMin, e.y-halfElementHeight);
					yMax = Math.max(yMax, e.y+halfElementHeight);
				})
			}
		});
		if(xMin==Infinity)  return;
		var x= (-xMin+xMax)/3;
		var y= (yMin+yMax)*0.05;
		return "M " + xMin + " " + yMin +
		" Q " + (xMin+x/2) + " " + (yMin-8) + " " + (xMin+x) + " " +(yMin-8) +
		" H " + (xMin + 2*x) +
		" Q " + (xMax-x/2) + " " + (yMin-8) + " " + xMax + " " +(yMin) +
		" V " + yMax +
		" Q " + (xMax-x/2) + " " + (yMax+8) + " " + (xMax-x) + " " +(yMax+8) +
		" H " + (xMin + x) +
		" Q " + (xMin+x/2) + " " + (yMax+8) + " " + (xMin) + " " +(yMax) +
		" z ";
	}



/*
		node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
*/
//	  };


	return obj;
}

function changeProcessNode(size){
	console.log("call for change", size);
	var size = size * 0.15;
	if(document.getElementById("portToggle").checked){
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size*0.5 + " -" + size*0.5 +	" h " + size + " v " + size + " h -" + size +	" z "
		);
		console.log("changed");
	} else {
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size*0.5 + " -" + size*0.5 +	" h " + size + " v " + size + " h -" + size +	" z " + " m 0 " + size/2 + " h -" + size/2 + " m " + size*2 + " 0" + " h -" + size/2
		);
	}
}
