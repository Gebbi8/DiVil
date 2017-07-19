<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="javascriptAndCss/style.css">
	<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="thirdParty/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="javascriptAndCss/sboTermMapping.js"></script>
	<script type="text/javascript" src="javascriptAndCss/showSbgn.js"></script>
	<script type="text/javascript" src="javascriptAndCss/costumSymbol.js"></script>
	<script type="text/javascript" src="bives/bivesTool.js"></script>
	<script type="text/javascript" src="javascriptAndCss/download.js"></script>
	<script type="text/javascript" src="javascriptAndCss/fileSaver.js"></script>
	<script type="text/javascript" src="javascriptAndCss/appendDefs.js"></script>


</head>
<body>
<div id="left">
	<h2>DiVil</h2>
	<div id="modelSelection">
	<h1> Select two model versions </h1>
	<select id="versionChoice" class="box" size="10">
		<optgroup label="Schroebel2002 vs Chen2009">
			<option class="opt" value="test">BIOMD0000000019</option>
			<option class="opt" value="test">BIOMD0000000255</option>
		</optgroup>
		<optgroup label="Tyson1991 - Cell Cycle 2 var (BioModel 6)">
			<option class="opt" value="test">original</option>
		</optgroup>
		<optgroup label="modified Tyson1991 - Cell Cycle 2 var (BioModel 6)">

			<option class="opt" value="test">symbols</option>
			<option class="opt" value="test">updates</option>
			<option class="opt" value="test">deletion</option>
		</optgroup>
		<optgroup label="BioModel7/Novak1997_CellCycle">
			<option class="opt" value="test">R3</option>
			<option class="opt" value="test">R37</option>
		</optgroup>
		<optgroup label="BSA-laczsynth">
			<option class="opt" value="test">2012-11-10</option>
			<option class="opt" value="test">2012-11-11</option>
		</optgroup>
		<optgroup label="Diff different models - Test">
			<option class="opt" value="test">BIOM348</option>
			<option class="opt" value="test">BIOM349</option>
		</optgroup>
	</select>
	<button id="selectVersion">select</button>
	<button id="removeVersion">remove</button>
	</div>

	<div id="selectionDiv">
		<h1>Selection</h1>
		<select id="selection" class="box" size="2"></select>
	</div>
	<div>
		<button id="compareModels">compare</button>
	</div>
</div>

<div id="bivesGraph">

	<div id="buttons">
		<button id="sbgnMLdownload">Download SBGN-ML</button>
	</div>
</div>
<div id="bivesReport">
</div>
<script>
	var obj;
	//showSbgn(data);

	console.log(obj);
	document.getElementById("selectVersion").onclick = function() {
		var x = document.getElementById("selection");
		var y = document.getElementById("versionChoice");

		var option = document.createElement("option");
		option.text = y[y.selectedIndex].text;
		x.add(option);
	};
	document.getElementById("removeVersion").onclick = function() {
		    var x = document.getElementById("selection");
			x.remove(x.selectedIndex);
	}
	document.getElementById("sbgnMLdownload").onclick = function() {download(obj)};
	document.getElementById("compareModels").onclick = function() {obj = getBivesData("http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[0].text + ".xml",
																					"http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[1].text + ".xml",
																					["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);
  showSbgn(obj);
	console.log("http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[0].text + "",
	 						"http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[1].text + "",
							["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);};
	//document.getElementById("compareModels").onclick = function() {obj = getBivesData("http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R3", "http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R37", "reactionsSbgnJson");};
</script>
</body>
</html>
