var currentZoom, width, height, size, marker, svg, obj, nodes, links, node, link, nodeShape, nodeLabel, compartments, nodesByCompartment, enterNode;
var sameLinks;
var nodeSize = 50;
var dimmOpacity = 0.25;


function showSbgn(data, xmlDiff, comodiAnnotation) {

	//split diff into lines
	const splitLines = str => xmlDiff.split(/\r?\n/);
	var xmlLines = splitLines(xmlDiff);
	
	//parse the data
	obj = JSON.parse(data);


	obj.links.forEach(function (l, i){
		l.id = "link" + i;
	});

	nodes = obj.nodes;
	nodesFilterComp = nodes.filter(function (d) {return sboSwitch(d.sboTerm) != "compartment"});
	links = obj.links;
	//console.log(obj);
	//console.log(nodesFilterComp);
	//////same source/link combination/////

	var sameIndex = 0;
	sameLinks = [];

	links.forEach(function (l, i) {
		var sameCount = 0;
		//console.log(l);
		links.forEach(function (link, n) {

			if (n > i && link.multiIndex == null) {
				if (l.source == link.source && l.target == link.target) {
					sameCount++;

					if (sameLinks[sameIndex] != null) sameLinks[sameIndex]++;
					else {
						sameLinks[sameIndex] = 1;
						l.multiIndex = sameIndex;
						l.multiPos = 0;
						l.invert = false;
					}
					link.multiIndex = sameIndex;
					link.multiPos = sameCount;
					link.invert = false;
				} else if (l.source == link.target && l.target == link.source) {
					sameCount++;

					if (sameLinks[sameIndex] != null) sameLinks[sameIndex]++;
					else {
						sameLinks[sameIndex] = 1;
						l.multiIndex = sameIndex;
						l.multiPos = 0;
						l.invert = false;
					}
					link.multiIndex = sameIndex;
					link.multiPos = sameCount;

					link.invert = true;
				}
			}
		});
		if (sameCount > 0) sameIndex++;
	});

	//console.log(links);
	//console.log(sameLinks);
	///////////////////////////////////////
	//delete current graph and show graph tab and download button
	d3.selectAll("#bivesGraph").selectAll("svg").remove();

	//check if graph data is available
	if (data == "" || data == undefined) {
		$('#graphTab').hide();
		return;
	}


	//set size and zoom variables
	console.log(d3.select("#container").node().getBoundingClientRect());
	currentZoom = 1;
	width = d3.select("#container").node().getBoundingClientRect().width;
	height = d3.select("#container").node().getBoundingClientRect().height;
	size = (1200 - 50) / 10;
//	marker = width / 100;


	//append clean svg
	svg = d3.select("div#container").append("svg")
		.attr("id", 'bivesGraphSvg')
		.attr("preserveAspectRatio", "xMinYMin meet")
		//.attr("viewBox", "0 0 " + width + " " +  height)
		.classed("svg-content", true)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.attr("height", height)
		.attr("width", width);
	//	.call(zoom);

	appendDefs(); //define arrowheads: see appendDefs.js

	//add addEventListener to checkbox for port toggling
	//var checkbox = document.querySelector("input[id=portToggle]");

	//register event listerners
	/* 	checkbox.addEventListener('change', function () {
			changeProcessNode(size);
			ticked();
			console.log("Toogle want's to tickle")
		}); */

	createGraph();
	//add legend
	addLegend();
	initializeSimulation();

	var structeredComodi = getComodiObj(xmlLines, comodiAnnotation);
	var htmlChanges = getHtmlChanges(xmlLines);
	
	//assign dowload function with data to button
	document.getElementById("downloadBtn").classList.remove("disabled");
	document.getElementById("sbgnMlDownload").onclick = function() {downloadSBGNML(obj, structeredComodi)};
	document.getElementById("pngDownload").onclick = function(){ downloadPNGfromSVG("bivesGraphSvg")};
	document.getElementById("svgDownload").onclick = function() {downloadSvg("bivesGraphSvg")};

}

//create force layout
//////////// FORCE SIMULATION //////////// 
//adapted from: https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03
// force simulator
var forceSimulation = d3.forceSimulation();

// set up the forceSimulation and event to update locations after each tick
function initializeSimulation() {
	forceSimulation.nodes(nodesFilterComp);
	initializeForces();
	forceSimulation.on("tick", ticked);
}

// values for all forces
forceProperties = {
	center: {
		enabled: true,
		x: 0.5,
		y: 0.5
	},
	charge: {
		enabled: true,
		strength: -30,
		distanceMin: 1,
		distanceMax: 2000
	},
	collide: {
		enabled: true,
		strength: .7,
		iterations: 1,
		radius: nodeSize
	},
	forceX: {
		enabled: true,
		strength: .1,
		x: .5
	},
	forceY: {
		enabled: true,
		strength: .1,
		y: .5
	},
	link: {
		enabled: true,
		distance: 30,
		iterations: 1
	}
}

// add forces to the forceSimulation
function initializeForces() {
	// add forces and associate each with a name
	forceSimulation
		.force("link", d3.forceLink())
		.force("charge", d3.forceManyBody())
		.force("collide", d3.forceCollide())
		.force("center", d3.forceCenter())
		.force("forceX", d3.forceX())
		.force("forceY", d3.forceY());
	// apply properties to each of the forces
	updateForces();
}

// apply new force properties
function updateForces() {
	// get each force by name and update the properties
	forceSimulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y);
	forceSimulation.force("charge")
		.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	forceSimulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.collide.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	forceSimulation.force("forceX")
		.strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
		.x(width * forceProperties.forceX.x);
	forceSimulation.force("forceY")
		.strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
		.y(height * forceProperties.forceY.y);
	forceSimulation.force("link")
		.id(function (d) {
			return d.id;
		})
		.distance(forceProperties.link.distance)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? links : []);

	// updates ignored until this is run
	// restarts the simulforceSimulationation (important if forceSimulation has already slowed down)
	forceSimulation.alpha(1).restart();
}

////////////////////////////////////////


function createGraph() {

	///////// Links ////////
	link = svg.append("g")
		//.attr("stroke", "black")
		.attr("stroke-opacity", 1)
		.selectAll("line")
		.data(links)
		.enter().append("path")
		.attr("class", "link")
		.attr("id", function(d, i){
			return "link" + i;
		})
		.attr("stroke", function (d) {
			return strokeColor(d.bivesChange);
		})
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.style("marker-end", function (d) {
			//console.log(d.sboTerm, sboSwitchArc(d.sboTerm));
			//if(d.sboTerm == "") console.log(d.source, d.target);
			if(sboSwitchArc(d.sboTerm) == "consumption") return "none";
			return "url(#" + sboSwitchArc(d.sboTerm) + "" + d.bivesChange + ")"
		});

	////////// nodes ////////

	node = svg.selectAll("g.nodes")
		.data(nodesFilterComp);

		console.log(node);


	enterNode = node.enter()
		.append("g")
		.attr("id", function (d) {
			return d.id;
		})
		.attr("class", "node")
		.on('mouseover', highlight)
		.on('mouseout', resetOpacity)
		.on("dblclick", dblclicked)
		.on("click", highlight);

	nodeShape = enterNode.append("path")
		.attr("d", function (d) {
			var nodeType = sboSwitch(d.sboTerm);
			return customSymbol(nodeType, nodeSize);
		})
		.attr("id", function (d) {
			return d.id
		})
		.attr("stroke", function (d) {
			return strokeColor(d.bivesChange);
		})
		.attr("stroke-width", 2)
		.attr("fill", "white")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));


	nodeLabel = enterNode.append("text")
		.style("text-anchor", "middle")
		.style("stroke", "none")
		.style("font-size", "14px")
		.attr('dy', "0.25em")
		.text(function (d) {
			//console.log(d.label);
			return d.label
		});

	createCompartments();
}

//////////////Compartments///////////////
function createCompartments() {

	nodesByCompartment = d3.nest()
		.key(function (d) {
		//	console.log(d.compartment)
			return d.compartment;
		})
		.entries(nodesFilterComp);

		console.log(nodesByCompartment); 

	compartments = svg
		.selectAll("compartments")
		.data(nodesByCompartment.filter(function (d) {
			var filter = nodes.filter(
				function (n) {
					return d.key == n.id;
				});
			return filter > [];
		}))
		.enter().append("g")
		.attr("class", "compartment")
		.attr("id", function (d) {
			return d.key;
		})
		.attr("name", function (d) {

		});

	compartments.append("path")
		.attr("stroke-width", 3)
		.attr("stroke", function(d){
			return strokeColor(getCompAttr(d.key, "bivesChange"));
		})
		.attr("fill", "none")
		.attr("id", function (d) {
			return d.key + "-path";
		});

	compartments
		.append("text")
		.style("text-anchor", "middle") //text attr
		.style("stroke", "none")
		.style("font-size", "14px")
		.attr('dy', "0.25em")
		.text(function (c) {

			var cNode = nodes.filter(function (d) {
				return c.key == d.id;
			});
			return cNode[0].label;
		});
}

function ticked() {
	node.attr("cx", function (d) {
			return d.x;
		})
		.attr("cy", function (d) {
			return d.y;
		});

	link.attr("d", tickArrows);
	nodeShape.attr("transform", function (d) {
		return "translate(" + d.x + "," + d.y + ")";
	});

	nodeLabel.attr("transform", function (d) {
		return "translate(" + d.x + "," + d.y + ")";
	});

	compartments.select("path").attr("d", function (d) {
		//alert("test");
		return compartmentFlex(d);
	});

	compartments.select("text").attr("transform", function (d) {
		return compartmentText(d);
	});
}


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
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}



function highlight(d){
	enterNode.style('stroke-opacity', o => (isConnected(this, o) ? 1 : dimmOpacity));
	enterNode.select("text").style('opacity', o => (isConnected(this, o) ? 1 : dimmOpacity));
	//this.setAttribute("stroke-opacity", 1);
	link.style('opacity', o => (o.source.id === d.id || o.target.id === d.id ? 1 : dimmOpacity));
}

function resetOpacity(){
	enterNode.style('stroke-opacity', 1);
	enterNode.select("text").style('opacity', 1);
	link.style('opacity', 1);
}

function isConnected(main, other){
	for(var i = 0; i < links.length; i++){
			//console.log(l.source.id, main.id, l.target.id, other.id, l.target.id, main.id, l.source.id, other.id);
			if((links[i].source.id == main.id && links[i].target.id == other.id) || (links[i].target.id == main.id && links[i].source.id == other.id) || main.id == other.id) return true;
	}
	return false;
}

function dblclicked(d) {
	d.fx = null;
	d.fy = null;
	//if (d3.event.defaultPrevented) return; // dragged
}

function getColor(bivesColor) {
	switch (bivesColor) {
		case 'insert':
			return "green";
			break;
		case 'delete':
			return "red";
			break;
		case 'move':
			return "blue";
			break;
		case 'update':
			return "orange";
			break;
		default:
			return "black";
	}
}

function compartmentFlex(c) {
	//find min and max values of contained nodes
	var xMin = Infinity,
		xMax = -Infinity,
		yMin = Infinity,
		yMax = -Infinity;

	xMin = d3.min(c.values, function (d) {

		halfElementWidth = d3.select("#" + d.id).node().getBBox().width / 2;
		return d.x - halfElementWidth;
	});
	xMax = d3.max(c.values, function (d) {
		halfElementWidth = d3.select("#" + d.id).node().getBBox().width / 2;
		return d.x + halfElementWidth;
	});
	yMin = d3.min(c.values, function (d) {
		halfElementHeight = d3.select("#" + d.id).node().getBBox().height / 2;
		return d.y - halfElementHeight;
	});
	yMax = d3.max(c.values, function (d) {
		halfElementHeight = d3.select("#" + d.id).node().getBBox().height / 2;
		return d.y + halfElementHeight;
	});

	var x;
	if (xMin < 0 && xMax < 0) x = (xMin - xMax) / 3;
	else if (xMin < 0) x = (-xMin + xMax) / 3;
	else x = (-xMin + xMax) / 3;

	return "M " + xMin + " " + yMin +
		" q " + x / 3 + " " + "-14" + " " + x + " " + "-14" +
		" h " + x +
		" q " + x / 3 + " " + 0 + " " + x + " " + 14 +
		" V " + yMax +
		" q " + (-x / 3) + " " + 14 + " " + (-x) + " " + 14 +
		" h " + (-x) +
		" q " + (-x / 3) + " " + 0 + " " + (-x) + " " + (-14) +
		" z ";
};

function compartmentText(c) {
	var bBox = d3.select("#" + c.key + "-path").node().getBBox();
	var xMid = bBox.x + bBox.width / 2;
	var y = bBox.y + 15;

	return "translate(" + xMid + "," + y + ")";
}

function changeProcessNode(size) {
	var size = size * 0.15;
	if (document.getElementById("portToggle").checked) {
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size * 0.5 + " -" + size * 0.5 + " h " + size + " v " + size + " h -" + size + " z ");
	} else {
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size * 0.5 + " -" + size * 0.5 + " h " + size + " v " + size + " h -" + size + " z " + " m 0 " + size / 2 + " h -" + size / 2 + " m " + size * 2 + " 0" + " h -" + size / 2);
	}
}

function getCompAttr(id, attr){
	for(let i = 0; i < obj.nodes.length; i++){
		if(obj.nodes[i].id == id){
			if(attr == "bivesChange") return obj.nodes[i].bivesChange;
		}
	}
	return "getAttr Failed";
}

function addLegend(){
	var legendSize = 10, legendSpacing = 10;

	var color = d3.scaleOrdinal()
		.domain(["no change", "exclusivly in first verions", "exclusivly in second version", "changed position in document", "changed attribute"])
		.range(["black", "#D66A56", "#76D6AF", "#8E67D6", "#D6D287"]);

	var legend = svg.append('g')
		.selectAll("g")
		.data(color.domain())
		.enter()
		.append('g')
		  .attr('class', 'legend')
		  .attr('transform', function(d, i) {
			var x = 0;
			var y = i * legendSize + 20 + i * 5;
			return 'translate(' + x + ',' + y + ')';
		});
	
	legend.append('rect')
		.attr('width', legendSize)
		.attr('height', legendSize)
		.style('fill', color)
		.style('stroke', color);
	
	legend.append('text')
		.attr('x', legendSize + legendSpacing)
		.attr('y', legendSize - legendSize/5)
		.text(function(d) { return d; });
}

function strokeColor(bives) {
	switch (bives) {
		case 'nothing':
			return "black";
		case 'delete':
			return "#D66A56";
		case 'insert':
			return "#76D6AF";
		case 'move':
			return "#8E67D6";
		case 'update':
			return "#D6D287";
	};
}

function updateAll() {
	updateForces();
}