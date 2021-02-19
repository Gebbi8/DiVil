function appendDefs() {
	var defs = d3.select("svg").append("defs");
	var refX = 12;
	var marker = 10;
	var refXProduction = 10;
	var refXModulation = 10.5;
	var strokeWidth = 1;


	defs.append("marker")
		.attr("id", "productionnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "black")
		.attr("stroke-width", "0")
		.attr("refX", refXProduction)
		.attr("refY", 0)
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "productionupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "#D6D287")
		.attr("stroke-width", "0")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "productiondelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "#D66A56")
		.attr("stroke-width", "0")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "productioninsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "#76D6AF")
		.attr("stroke-width", "0")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "productionmove")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "#8E67D6")
		.attr("stroke-width", "0")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "modulationnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "white")
		.attr("stroke-width", strokeWidth)
		.attr("refX", refXModulation)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "black")
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "modulationupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "white")
		.attr("stroke-width", strokeWidth)
		.attr("refX", refXModulation)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#D6D287")
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "modulationdelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "white")
		.attr("stroke-width", strokeWidth)
		.attr("refX", refXModulation)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#D66A56")
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "modulationinsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "white")
		.attr("stroke-width", strokeWidth)
		.attr("refX", refXModulation)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#76D6AF")
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "black")
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#D6D287")
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationdelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#D66A56")
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationinsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", "#76D6AF")
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")
		.attr("id", "catalysis")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.attr("d", "M1,0A1,1,0,0,1,9,0A1,1,0,0,1,1,0")
		.attr("class", "arrowHead");

	// catalysis ...

	defs.append("marker")

		.attr("id", "inhibitionnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", "1")
		.attr("fill", "white")
		.attr("refX", refX - 6)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "black")
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitioninsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", "1")
		.attr("fill", "white")
		.attr("refX", refX - 6)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "#76D6AF")
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitionupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", "1")
		.attr("fill", "white")
		.attr("refX", refX - 6)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "#D6D287")
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitiondelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", "1")
		.attr("fill", "white")
		.attr("refX", refX - 6)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "#D66A56")
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitionmove")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", "black")
		.attr("stroke-width", "1")
		.attr("fill", "white")
		.attr("refX", refX - 6)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "#8E67D6")
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "necessarystimulationnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("stroke", "black")
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "black")
		.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "necessarystimulationinsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("stroke", "black")
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "#76D6AF")
		.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "necessarystimulation")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("stroke", "black")
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", "black")
		.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");
}