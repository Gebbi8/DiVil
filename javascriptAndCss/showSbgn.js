function showSbgn(data){
	d3.selectAll("svg").remove();

	console.log(data);
	var obj = JSON.parse(data);
	console.log(obj);
	
	var width = 3000,
		height = 3000;

	var color = d3.scale.category20();

	var force = d3.layout.force()
		.charge(-900)
		.linkDistance(20)
		.size([width, height]);

	var svg = d3.select("#right").append("svg")
		.attr("width", width)
		.attr("height", height);
	
	defs = svg.append("defs")

		defs.append("marker")
				.attr({
					"id":"production",
					"viewBox":"0 -6 11 12",
					"refX":9,
					"refY":0,
					"markerWidth":8,
					"markerHeight":8,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");

		defs.append("marker")
				.attr({
					"id":"modulation",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"0.5",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":10,
					"markerHeight":10,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,0L5,5L10,0L5,-5Z")
					.attr("class","arrowHead");

		defs.append("marker")
				.attr({
					"id":"stimulation",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"0.5",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":6,
					"markerHeight":6,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M1,-5L1,4L10,0Z")
					.attr("class","arrowHead");

		defs.append("marker")
				.attr({
					"id":"catalysis",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"0.5",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":6,
					"markerHeight":6,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M1,0A1,1,0,0,1,9,0A1,1,0,0,1,1,0")
					.attr("class","arrowHead");
					
		defs.append("marker")
				.attr({
					"id":"inhibition",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"2.5",
					"fill":"white",
					"refX":0,
					"refY":0,
					"markerWidth":4,
					"markerHeight":4,
					"fill":"white",
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,-5L0,5")
					.attr("class","arrowHead");
					
		defs.append("marker")
				.attr({
					"id":"necessarystimulation",
					"viewBox":"0 -6 11 12",
					"stroke-width":"0.5",
					"stroke":"black",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":5,
					"markerHeight":5,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
					.attr("class","arrowHead");
	
	var edges = [];
	
	var nodeById = d3.map();

	  obj.nodes.forEach(function(node) {
		nodeById.set(node.id, node);
	  });

	  obj.links.forEach(function(link) {
		link.source = nodeById.get(link.source);
		link.target = nodeById.get(link.target);
	  });
	 
	force
		  .nodes(obj.nodes)
		  .links(edges)
		  .start();

	  var link = svg.selectAll(".link")
		  .data(obj.links)
		.enter().append("line")
		  .attr("id", function(d) {return d.id})
		  .attr("class", "link")
		  .attr("marker-end", function(d) { return "url(#" + sboSwitch(d.class) + ")"; })
		  .style("stroke", "black")
		  .style("stroke-width", 2);

	  var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
        tick(); // this is the key to make it work together with updating both px,py,x,y on d !
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        tick();
        force.resume();
    }  
		
	
	  var node = svg.selectAll(".node")
		  .data(obj.nodes)
		.enter().append("g")
			.attr("class", function(d) {return "node " + sboSwitch(d.class);})
			.attr("fill", function(d) { if(d.class != "SBO:0000290") return "white";})
				.call(force.drag)
				.call(node_drag);
			
		
		node.append("path")
		  .attr("class", function(d) { return "node " + d.bivesClass } )
		  .attr("id", function(d) {return d.id})
		  .attr('d', function(d) { return getSymbol(d.class, 128); })
		  ;
		  
		node.append("text")
		  .style("text-anchor", "middle")
		  //.style("font-size", "50px")
		  //.style("font-style")
		  .attr('y', function(d) { if(d.class == "SBO:0000290") return -450;})
		  .attr('dy', "0.25em")
		  //.attr('x', function(d) { if(d.class == "SBO:0000290") return -100;})
		  .text(function(d) { return d.label });
		  
	  

	  force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { 
				if(sboSwitch(d.class) != "consumption"){
					var distance = distanceHack(sboSwitch(d.target.class));
					
					if(Math.abs(d.source.y - d.target.y) > 2* distance){
						if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
							return d.target.x;
						} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
							if(d.source.x < d.target.x){
								return d.target.x - distance/2;
							} else {
								return d.target.x + distance/2;
							}
						} else {
							if(d.source.x < d.target.x){
								return d.target.x - distance;
							} else {
								return d.target.x + distance;
							}
						}
					} else if (Math.abs(d.source.y - d.target.y) > 1.5 * distance){
						if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
							return d.target.x;
						} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
							if(d.source.x < d.target.x){
								return d.target.x - distance/2;
							} else {
								return d.target.x + distance/2;
							}
						} else {
							if(d.source.x < d.target.x){
								return d.target.x - distance;
							} else {
								return d.target.x + distance;
							}
						}
					} else {
						if(d.source.x < d.target.x){
							return d.target.x - distance;
						} else {
							return d.target.x + distance;
						}
					}
				} else return d.target.x;
			})			
			.attr("y2", function(d) {
				if(sboSwitch(d.class) != "consumption"){
					var distance = distanceHack(sboSwitch(d.target.class));
					
					if(Math.abs(d.source.x - d.target.x) > 2* distance){
						if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
							return d.target.y;
						} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
							if(d.source.y < d.target.y){
								return d.target.y - distance/2;
							} else {
								return d.target.y + distance/2;
							}
						} else {
							if(d.source.y < d.target.y){
								return d.target.y - distance;
							} else {
								return d.target.y + distance;
							}
						}
					} else if (Math.abs(d.source.x - d.target.x) > 1.5 * distance){
						if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
							return d.target.y;
						} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
							if(d.source.y < d.target.y){
								return d.target.y - distance/2;
							} else {
								return d.target.y + distance/2;
							}
						} else {
							if(d.source.y < d.target.y){
								return d.target.y - distance;
							} else {
								return d.target.y + distance;
							}
						}
					} else {
						if(d.source.y < d.target.y){
							return d.target.y - distance;
						} else {
							return d.target.y + distance;
						}
					}
				} else console.log("CONSUMPTION"); return d.target.y;
			});

		node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
	  });
	  
	  function tick() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) {
				if(sboSwitch(d.class) != "consumption"){
					var distance = distanceHack(sboSwitch(d.target.class));
					
					if(Math.abs(d.source.y - d.target.y) > 1.2* distance){
						if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
							return d.target.x;
						} else if (Math.abs(d.source.x - d.target.x) < 1.3 * distance){
							if(d.source.x < d.target.x){
								return d.target.x - distance/2;
							} else {
								return d.target.x + distance/2;
							}
						} else {
							if(d.source.x < d.target.x){
								return d.target.x - distance;
							} else {
								return d.target.x + distance;
							}
						}
					//} else if (Math.abs(d.source.y - d.target.y) > 1.5 * distance){
						if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
							return d.target.x;
						} else if (Math.abs(d.source.x - d.target.x) < 1.3 * distance){
							if(d.source.x < d.target.x){
								return d.target.x - distance/2;
							} else {
								return d.target.x + distance/2;
							}
						} else {
							if(d.source.x < d.target.x){
								return d.target.x - distance;
							} else {
								return d.target.x + distance;
							}
						}
					} else {
						if(d.source.x < d.target.x){
							return d.target.x - distance;
						} else {
							return d.target.x + distance;
						}
					}
				} else return d.target.x;
			})			
			.attr("y2", function(d) {
				if(sboSwitch(d.class) != "consumption"){
					var distance = distanceHack(sboSwitch(d.target.class));
					
					if(Math.abs(d.source.x - d.target.x) > 1.2* distance){
						if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
							return d.target.y;
						} else if (Math.abs(d.source.y - d.target.y) < 1.3 * distance){
							if(d.source.y < d.target.y){
								return d.target.y - distance/2;
							} else {
								return d.target.y + distance/2;
							}
						} else {
							if(d.source.y < d.target.y){
								return d.target.y - distance;
							} else {
								return d.target.y + distance;
							}
						}
					//} else if (Math.abs(d.source.x - d.target.x) > 1.5 * distance){
						if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
							return d.target.y;
						} else if (Math.abs(d.source.y - d.target.y) < 1.3 * distance){
							if(d.source.y < d.target.y){
								return d.target.y - distance/2;
							} else {
								return d.target.y + distance/2;
							}
						} else {
							if(d.source.y < d.target.y){
								return d.target.y - distance;
							} else {
								return d.target.y + distance;
							}
						}
					} else {
						if(d.source.y < d.target.y){
							return d.target.y - distance;
						} else {
							return d.target.y + distance;
						}
					}
				} else return d.target.y;
			});

		node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
	  };
	  return obj;
}

function distanceHack(nodeClass){
	var size = 128;
	switch (nodeClass){
		case "process": return size*0.15 ; break;
		case "macromolecule": return size*0.5; break;
		case "source and sink": return size*0.1; break;
		case "complex": return size*0.5; break;
		case "unspecifiedentity": return size*0.5; break;
		case "simplechemical": return size*0.25; break;
		default: return size;
	}
}