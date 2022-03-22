import * as d3 from '../thirdParty/d3.min.js';
import * as d3Sbgn from './appendDefs.js';
import * as xmlParser from './xmlParser.js';
import * as sboTermMapper from './sboTermMapping.js';
import * as customSymbol from './customSymbol';

var width, height, svg, obj, nodes, links, node, link, nodeShape, nodeLabel, compartments, nodesByCompartment, enterNode, structeredData, nodesFilterComp;
var sameLinks;
var nodeSize = 50;
var dimmOpacity = 0.25;
var dragable = true;


export function showSbgn(data, xmlDiff, comodiAnnotation, v1, v2) {

	alert("check my out <<<<-----");


	let info = document.getElementById("infoPopup");
	info.style.display = "none";
	info.innerHTML = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';


	//split diff into lines
	const splitLines = xmlDiff.split(/\r?\n/); //!!! check !!!
	var xmlLines = [];
	if (xmlDiff) xmlLines = splitLines(xmlDiff);

	//parse the data
	obj = JSON.parse(data);
	// var idMap = {delete:{}, insert:{}, update:{}, move:{}};

	// obj.nodes.forEach(node => {
	// 	var path;
	// 	if(node.bivesChange == "delete") path = 'oldPath="';
	// 	else path = 'newPath="';
	// 	path = path + node.path + '"';

	// 	idMap[node.bivesChange][path] = node.id;
	// });

	// console.log(idMap);

	// path + change to id map
	console.log(obj);

	obj.links.forEach(function (l, i) {
		l.id = "link" + i;
	});

	nodes = obj.nodes;
	nodesFilterComp = nodes.filter(function (d) {
		return sboTermMapper.sboSwitch(d.sboTerm) != "compartment"
	});
	links = obj.links;
	console.log(links);
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
	/* 	if (data == "" || data == undefined) {
			$('#graphTab').hide();
			alert("No data for graph available.")
			return;
		} */



	//set size and zoom variables
	console.log(d3.select("#container").node().getBoundingClientRect());
	width = d3.select("#container").node().getBoundingClientRect().width;
	height = d3.select("#container").node().getBoundingClientRect().height;
	//var size = (1200 - 100) / 10;
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

	d3Sbgn.appendDefs(); //define arrowheads: see appendDefs.js

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

	//add tooltip
	d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "popup")
		.style("opacity", 0);

	initializeSimulation();

	structeredData = xmlParser.getStructeredData(xmlLines, comodiAnnotation, v1, v2);

	console.log(structeredData);
	//assign dowload function with data to button


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
var forceProperties = {
	center: {
		enabled: true,
		x: 0.5,
		y: 0.5
	},
	charge: {
		enabled: true,
		strength: -500,
		distanceMin: 50,
		distanceMax: 2000
	},
	collide: {
		enabled: true,
		strength: .5,
		iterations: 1,
		radius: 40
	},
	forceX: {
		enabled: true,
		strength: .1,
		x: .5
	},
	forceY: {
		enabled: true,
		strength: .25,
		y: .5
	},
	link: {
		enabled: false,
		distance: 50,
		iterations: 1
	}
}

// add forces to the forceSimulation
function initializeForces() {
	// add forces and associate each with a name
	forceSimulation
		.force("center", d3.forceCenter())
		.force("link", d3.forceLink(links).id(function (n) {
			return n.id;
		}))
		.force("charge", d3.forceManyBody(-200))
		.force("collide", d3.forceCollide().strength(0))
		.force("forceX", d3.forceX())
		.force("forceY", d3.forceY());
	// apply properties to each of the forces
	updateForces();
}

// apply new force properties
function updateForces() {
	console.log(forceSimulation.force);
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
		// .id(function (d) {
		// 	console.log(d.id, forceProperties);
		// 	return d.id;
		// })
		.distance(forceProperties.link.distance)
		.iterations(forceProperties.link.iterations)
		//.links(forceProperties.link.enabled ? links : [])
		;

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
		.attr("id", function (d, i) {
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
			if (sboTermMapper.sboSwitchArc(d.sboTerm) == "consumption") return "none";
			return "url(#" + sboTermMapper.sboSwitchArc(d.sboTerm) + "" + d.bivesChange + ")"
		});

	////////// nodes ////////

	node = svg.selectAll("g.nodes")
		.data(nodesFilterComp);

	enterNode = node.enter()
		.append("g")
		.attr("id", function (d) {
			return d.id;
		})
		.attr("class", "node")
		.on('mouseover', highlight)
		.on('mouseout', resetOpacity)
		.on("dblclick", dblclicked)
		.on("click", function (d) {
			//forceSimulation.stop();
			// console.log(d.bivesChange, d.path);
			// console.log(structeredData[d.path]);

			if (d3.event.defaultPrevented) return;

			var path = d.path;
			if (d.bivesChange == "delete") path = "old-" + d.path;

			console.log(structeredData[path]);
			console.log(path);

			d3.select("#popup").transition()
				.duration(200)
				.style("opacity", function () {
					if (structeredData[path]) return 0.9;
					else return 0;
				});
			d3.select("#popup").html(
				function () {
					if (structeredData[path]) {
						return "<ul>" + structeredData[path].popup + "</ul>";
					} else {
						return "";
					}
				}
			) //getHtmlChanges from node id	
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
			/* ctop();
			MathJax.typeset(); */
		})
		.on("mouseleave", hideTooltip);


	let fontSize = "12px"
	if (getDeviceWidth() < 700) {
		nodeSize = 30;
		fontSize = "8px";
		dragable = false;
	}


	nodeShape = enterNode.append("path")
		.attr("d", function (d) {
			var nodeType = sboTermMapper.sboSwitch(d.sboTerm);
			return customSymbol.customSymbol(nodeType, nodeSize);
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
		.style("font-size", fontSize)
		.attr('dy', "0.25em")
		.attr('pointer-events', "none")
		.text(function (d) {
			//console.log(d.label);
			return d.label
		});

	createCompartments();
}

//////////////Compartments///////////////
function createCompartments() {

	let compartmentHierachy = [];
	let allComps = nodes.filter(function (d) {
		return d.sboTerm == "SBO:0000290";
	})

	// first
	console.log(compartmentHierachy, allComps);

	while (compartmentHierachy.length < allComps.length) {

		allComps.forEach(c => {
			if (!compartmentHierachy.includes(c.id)) {
				if (c.compartment == null || c.compartment == "null" || compartmentHierachy.includes(c.compartment)) compartmentHierachy.push(c.id);
			}
		})
	}

	compartmentHierachy = compartmentHierachy.reverse();

	console.log(compartmentHierachy);

	let nBCTemp = d3.nest()
		.key(function (d) {
			//	console.log(d.compartment)
			return d.compartment;
		})
		.entries(nodesFilterComp);



	nodesByCompartment = [];
	let temp = nBCTemp.filter(function (d) {
		return d.key == "null" || d.key == null;
	});

	console.log(temp);

	if (temp != undefined) {
		//alert("sadas");
		nodesByCompartment = nodesByCompartment.concat(temp);
	}

	console.log(nodesByCompartment);

	for (let i = 0; i < compartmentHierachy.length; i++) {
		let cId = compartmentHierachy[i];

		let temp = nBCTemp.find(function (d) {
			//console.log(d, cId);
			return d.key == cId;
		});
		if (temp != undefined) nodesByCompartment = nodesByCompartment.concat(temp);

	}

	console.log(nodesByCompartment);
	//add compartment ids to the containing compartment
	nodesByCompartment.forEach(d => {
		console.log(d);
		let temp = allComps.filter(function (c) {
			return c.compartment == d.key;
		});
		console.log(temp);
		d.values = d.values.concat(temp);
	})


	console.log(nodesByCompartment);

	//nodesByCompartment is now sorted by drawing dependency

	compartments = svg
		.selectAll("compartments")
		.data(
			nodesByCompartment.filter(function (d) {
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
			return d.name;
		})
		.on("click", function (d) {
			let node = nodes.find(node => node.id == d.key);
			var path = node.path;
			if (getCompAttr(d.key, "bivesChange") == "delete") path = "old-" + path;
			// let popup;
			// if(!(popup = structeredData[path])) popup = "<li>This node element was not changed.</li>";
			// else popup = popup.popup;

			d3.select("#popup").transition()
				.duration(200)
				.style("opacity", function () {
					if (structeredData[path]) return 0.9;
					else return 0;
				});
			d3.select("#popup").html(
				function () {
					if (structeredData[path]) {
						return "<ul>" + structeredData[path].popup + "</ul>";
					} else {
						return "";
					}
				}
			)
			//MathJax.Hub.Rerender(); //recall mathjax
			/* 			ctop();
						MathJax.typeset(); //MathJax.Hub.Queue(["Typeset", MathJax.Hub]);  */
		})
		.on("mouseleave", hideTooltip);

	compartments.append("path")
		.attr("stroke-width", 3)
		.attr("stroke", function (d) {
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
		.attr('pointer-events', "none")
		.text(function (c) {

			var cNode = nodes.filter(function (d) {
				return c.key == d.id;
			});
			return cNode[0].label;
		});

	//show popup if emtpy compartments exists
	allComps.forEach(e => {
		let empty = true;
		nodesByCompartment.forEach(c => {
			if (e.id == c.key) {
				empty = false;
				return;
			}
		});
		if (empty) {
			let info = document.getElementById("infoPopup");
			info.innerHTML = info.innerHTML + "<p> The compartment <b><em><span class='" + e.bivesChange + "-color'>" + e.label + "</span></em></b> does not contain nodes. Thus, it is not displayed.";
			info.style.display = "block";
		}

	});
}

function ticked() {
	//console.log(node.attr);
	nodeShape.attr("cx", function (d) {
		let nodeWidth = d3.select("#" + d.id).node().getBBox().width;
		return d.x = Math.max(nodeWidth / 2 + 10, Math.min(d.x, width - nodeWidth / 2 - 10));
	})
		.attr("cy", function (d) {
			let nodeHeight = d3.select("#" + d.id).node().getBBox().height;
			return d.y = Math.max(nodeHeight / 2 + 10, Math.min(d.y, height - nodeHeight / 2 - 10));
		})
	//alert("tasdasd");
	//link.attr("d", tickArrows); //???
	nodeShape.attr("transform", function (d) {
		//alert("!");
		return "translate(" + d.x + "," + d.y + ")";
	});

	nodeLabel.attr("transform", function (d) {
		return "translate(" + d.x + "," + d.y + ")";
	});

	compartments.select("path").attr("d", function (d) {
		return compartmentFlex(d);
	});

	compartments.select("text")
		.attr("transform", function (d) {
			return compartmentText(d);
		});
}


function dragstarted() {
	console.log("drag start");
	if (!dragable) return;
	if (!d3.event.active) forceSimulation.alphaTarget(0.1).restart();
	//d.fx = d.x;
	//d.fy = d.y;
}

function dragged(d) {
	if (!dragable) return;

	console.log("dragging");
	//forceSimulation.alphaTarget(0.05).restart();
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
	if (!dragable) return;

	console.log("dragg end start");
	if (!d3.event.active) forceSimulation.alphaTarget(0);
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}



function highlight(d) {
	enterNode.style('stroke-opacity', o => (isConnected(this, o) ? 1 : dimmOpacity));
	enterNode.select("text").style('opacity', o => (isConnected(this, o) ? 1 : dimmOpacity));
	//this.setAttribute("stroke-opacity", 1);
	link.style('opacity', o => (o.source.id === d.id || o.target.id === d.id ? 1 : dimmOpacity));
}

function resetOpacity() {
	enterNode.style('stroke-opacity', 1);
	enterNode.select("text").style('opacity', 1);
	link.style('opacity', 1);
}

var hideTooltip = function () {
	d3.select("#popup")
		.transition()
		.duration(200)
		.style("opacity", 0)
}

function isConnected(main, other) {
	for (var i = 0; i < links.length; i++) {
		//console.log(l.source.id, main.id, l.target.id, other.id, l.target.id, main.id, l.source.id, other.id);
		if ((links[i].source.id == main.id && links[i].target.id == other.id) || (links[i].target.id == main.id && links[i].source.id == other.id) || main.id == other.id) return true;
	}
	return false;
}

function dblclicked(d) {
	console.log(dblclicked);
	d.fx = null;
	d.fy = null;
	// reheat forces
	//if (!d3.event.active) 
	forceSimulation.alphaTarget(0.2).restart();
	forceSimulation.alphaTarget(0);

	//if (d3.event.defaultPrevented) return; // dragged
}

/* function getColor(bivesColor) {
	switch (bivesColor) {
		case 'insert':
			return "green";
		case 'delete':
			return "red";
		case 'move':
			return "blue";
		case 'update':
			return "orange";
		default:
			return "black";
	}
} */

function compartmentFlex(c) {
	//console.log("------------------------------------------------: ", c.key);
	//find min and max values of contained nodes
	var xMin = Infinity,
		xMax = -Infinity,
		yMin = Infinity,
		yMax = -Infinity;

	xMin = d3.min(c.values, function (d) {
		let node = d3.select("#" + d.id).node().getBBox();

		if (d.id.startsWith("c")) return node.x - 10;
		else return d.x - node.width / 2 - 10;

	});
	xMax = d3.max(c.values, function (d) {
		let node = d3.select("#" + d.id).node().getBBox();

		if (d.id.startsWith("c")) return node.x + node.width + 10;
		else return d.x + node.width / 2 + 10;

	});

	yMin = d3.min(c.values, function (d) {
		let node = d3.select("#" + d.id).node().getBBox();

		if (d.id.startsWith("c")) return node.y - 10;
		else return d.y - node.height / 2 - 10;
	});

	yMax = d3.max(c.values, function (d) {
		let node = d3.select("#" + d.id).node().getBBox();

		if (d.id.startsWith("c")) return node.y + node.height + 10;
		else return d.y + node.height / 2 + 10;
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
}

function compartmentText(c) {
	var bBox = d3.select("#" + c.key + "-path").node().getBBox();
	var xMid = bBox.x + bBox.width / 2;
	var y = bBox.y + 15;

	return "translate(" + xMid + "," + y + ")";
}

/* function changeProcessNode(size) {
	size = size * 0.15;
	if (document.getElementById("portToggle").checked) {
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size * 0.5 + " -" + size * 0.5 + " h " + size + " v " + size + " h -" + size + " z ");
	} else {
		d3.selectAll(".node.process").selectAll("path")
			.attr("d", "m -" + size * 0.5 + " -" + size * 0.5 + " h " + size + " v " + size + " h -" + size + " z " + " m 0 " + size / 2 + " h -" + size / 2 + " m " + size * 2 + " 0" + " h -" + size / 2);
	}
} */

function getCompAttr(id, attr) {
	for (let i = 0; i < obj.nodes.length; i++) {
		if (obj.nodes[i].id == id) {
			if (attr == "bivesChange") return obj.nodes[i].bivesChange;
		}
	}
	return "getAttr Failed";
}

function addLegend() {
	var legendSize = 10,
		legendSpacing = 10;

	var color = d3.scaleOrdinal()
		.domain(["no change", "exclusively in first verion", "exclusively in second version", "changed attribute"]) //move:  "changed position in document",
		.range(["black", "#D66A56", "#76D6AF", "#D6D287"]); //move: "#8E67D6",

	var legend = svg.append('g')
		.selectAll("g")
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function (d, i) {
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
		.attr('y', legendSize - legendSize / 5)
		.attr('pointer-events', "none")
		.text(function (d) {
			return d;
		});
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
	}
}

/* function updateAll() {
	updateForces();
} */

function getDeviceWidth() {
	if (typeof (window.innerWidth) == 'number') {
		//Non-IE
		return window.innerWidth;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		//IE 6+ in 'standards compliant mode'
		return document.documentElement.clientWidth;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		//IE 4 compatible
		return document.body.clientWidth;
	}
	return 0;
}