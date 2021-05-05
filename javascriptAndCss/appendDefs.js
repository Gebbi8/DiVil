function appendDefs() {
	var defs = d3.select("svg").append("defs");
	var refX = "12";
	var marker = "10";
	var refXProduction = "10";
	var refXModulation = "10.5";
	var strokeWidth = "1";

	//colours
	var nothingC = 	"black";
	var updateC = 	"#D6D287";
	var insertC = 	"#76D6AF";
	var deleteC = 	"#D66A56";
	var moveC = 		"#8E67D6";


	defs.append("marker")
		.attr("id", "productionnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", nothingC)
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

		.attr("id", "productionupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", updateC)
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
		.attr("fill", deleteC)
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
		.attr("fill", insertC)
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
		.attr("fill",  moveC)
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

		.style("stroke", nothingC)
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

		.style("stroke", updateC)
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

		.style("stroke", deleteC)
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

		.style("stroke", insertC)
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")
		.attr("id", "modulationmove")
		.attr("viewBox", "0 -6 11 12")
		.attr("fill", "white")
		.attr("stroke-width", strokeWidth)
		.attr("refX", refXModulation)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", moveC)
		.append("svg:path")
		.attr("d", "M0,0L5,5L10,0L5,-5Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", nothingC)
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

		.style("stroke", updateC)
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

		.style("stroke", deleteC)
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

		.style("stroke", insertC)
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "stimulationmove")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refXProduction)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.style("stroke", moveC)
		.append("svg:path")
		.attr("d", "M1,-5L1,4L10,0Z")
		.attr("class", "arrowHead");

	defs.append("marker")
		.attr("id", "catalysisnothing")
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

	defs.append("marker")
		.attr("id", "catalysisdelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", deleteC)
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

	defs.append("marker")
		.attr("id", "catalysisinsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", insertC)
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

	defs.append("marker")
		.attr("id", "catalysisupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", updateC)
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
	
	defs.append("marker")
		.attr("id", "catalysismove")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke", moveC)
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

	defs.append("marker")

		.attr("id", "inhibitionnothing")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", "4")
		.attr("fill", "white")
		.attr("refX", 2)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", nothingC)
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitioninsert")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", "4")
		.attr("fill", "white")
		.attr("refX", 2)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", insertC)
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitionupdate")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", "4")
		.attr("fill", "white")
		.attr("refX", 2)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", updateC)
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitiondelete")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", "4")
		.attr("fill", "white")
		.attr("refX", 2)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", deleteC)
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "inhibitionmove")
		.attr("viewBox", "0 -6 11 12")
		.attr("stroke-width", "4")
		.attr("fill", "white")
		.attr("refX", 2)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("fill", "white")
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", moveC)
		.attr("d", "M0,-5L0,5")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "necessarystimulationnothing")
		.attr("viewBox", "-2 -6 13 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", nothingC)
		.attr("d", "M-1,-5l0,10M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

	defs.append("marker")

		.attr("id", "necessarystimulationinsert")
		.attr("viewBox", "-2 -6 13 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", insertC)
		.attr("d", "M-1,-5l0,10M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

		defs.append("marker")

		.attr("id", "necessarystimulationdelete")
		.attr("viewBox", "-2 -6 13 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", deleteC)
		.attr("d", "M-1,-5l0,10M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

		defs.append("marker")

		.attr("id", "necessarystimulationmove")
		.attr("viewBox", "-2 -6 13 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", moveC)
		.attr("d", "M-1,-5l0,10M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");

		defs.append("marker")

		.attr("id", "necessarystimulationupdate")
		.attr("viewBox", "-2 -6 13 12")
		.attr("stroke-width", strokeWidth)
		.attr("fill", "white")
		.attr("refX", refX)
		.attr("refY", "0")
		.attr("markerWidth", marker)
		.attr("markerHeight", marker)
		.attr("orient", "auto")

		.append("svg:path")
		.style("stroke", updateC)
		.attr("d", "M-1,-5l0,10M2,-4L2,4L10,0L2,-4")
		.attr("class", "arrowHead");




}