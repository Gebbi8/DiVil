var currentZoom, width, height, size, marker, svg, obj, nodes, links, node, link, nodeShape, nodeLabel, compartments, nodesByCompartment;
var sameLinks;
var nodeSize = 50;

function showSbgn(data) {



	//parse the data
	obj = JSON.parse(data);
	nodes = obj.nodes;
	links = obj.links;
	console.log(nodes);

	//////same source/link combination/////

	var sameIndex = 0;
	sameLinks = [];

	links.forEach(function (l, i) {
		var sameCount = 0;
		console.log(l);
		links.forEach(function (link, n) {

			if (n > i && link.sameIndex == null) {
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

	console.log(links, sameLinks);
	///////////////////////////////////////
	//delete current graph and show graph tab and download button
	d3.selectAll("#bivesGraph").selectAll("svg").remove();

	//check if graph data is available
	if (data == "" || data == undefined) {
		$('#graphTab').hide();
		return;
	}


	//set size and zoom variables
	currentZoom = 1;
	width = 1200;
	height = 1000;
	size = (width - 50) / 10;
	marker = width / 100;


	//append clean svg
	svg = d3.select("#bivesGraph").append("svg")
		.attr("id", 'bivesGraphSvg')
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
	initializeSimulation();

}

//create force layout
//////////// FORCE SIMULATION //////////// 
//adapted from: https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03
// force simulator
var forceSimulation = d3.forceSimulation();

// set up the forceSimulation and event to update locations after each tick
function initializeSimulation() {
	forceSimulation.nodes(nodes);
	initializeForces();
	forceSimulation.on("tick", ticked);
}

// values for all forces
forceProperties = {
	center: {
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
		enabled: false,
		strength: .1,
		x: .5
	},
	forceY: {
		enabled: false,
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
	link = svg.append("g")
		//.attr("stroke", "black")
		.attr("stroke-opacity", 1)
		.selectAll("line")
		.data(links)
		.enter().append("path")
		.attr("stroke", function (d) {
			return strokeColor(d.bivesClass);
		})
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.style("marker-end", function (d) {
			return "url(#" + sboSwitchArc(d.class) + "" + d.bivesClass + ")"
		});

	node = svg.selectAll("g")
		.data(nodes);

	var enterNode = node.enter()
		.append("g")
		.attr("id", function (d) {
			return d.id;
		})
		.attr("class", "node")
		.on("click", clicked);

	nodeShape = enterNode.append("path")
		.attr("d", function (d) {
			var nodeType = sboSwitch(d.class);
			return customSymbol(nodeType, nodeSize);
		})
		.attr("id", function (d) {
			return d.id
		})
		.attr("stroke", function (d) {
			return strokeColor(d.bivesClass);
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
			return d.compartment;
		})
		.entries(nodes);

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
		.attr("stroke", "black")
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


//zoom the whole svg
/* var zoom = d3.zoom()
	.scaleExtent([0.1, 10])
	.on("zoom", zoomed); */

//var container = svg.append("g");

/* function zoomed() {
ticked	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	ticked();
} */



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

function clicked(d) {
	d.fx = null;
	d.fy = null;
	if (d3.event.defaultPrevented) return; // dragged
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

/* var nested_data = d3.nest()
	.key(function (d) {
		return d.compartment;
	})
	.entries(obj.nodes); */

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

function strokeColor(bives) {
	switch (bives) {
		case 'nothing':
			return "black";
		case 'delete':
			return "red";
		case 'insert':
			return "green";
		case 'move':
			return "blue";
		case 'update':
			return "orange";
	};
}

function updateAll() {
	updateForces();
	//updateDisplay();
}