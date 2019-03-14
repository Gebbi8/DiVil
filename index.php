<!doctype html>
<html lang="en">
<head>
	<title>Merge Prototype</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="javascriptAndCss/style.css">
	<link rel="stylesheet" href="thirdParty/atom-one-light.css">

	<script type="text/javascript" src="thirdParty/d3.min.js"></script>
	<script type="text/javascript" src="thirdParty/highlight.pack.js"></script>
	<script type="text/javascript" src="thirdParty/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="javascriptAndCss/sboTermMapping.js"></script>
	<script type="text/javascript" src="javascriptAndCss/showSbgn.js"></script>
	<script type="text/javascript" src="javascriptAndCss/customSymbol.js"></script>
	<script type="text/javascript" src="bives/bivesTool.js"></script>
	<script type="text/javascript" src="javascriptAndCss/download.js"></script>
	<script type="text/javascript" src="javascriptAndCss/downloadSBML.js"></script>
	<script type="text/javascript" src="thirdParty/FileSaver.js"></script>
	<script type="text/javascript" src="javascriptAndCss/appendDefs.js"></script>
	<script type="text/javascript" src="javascriptAndCss/sbmlParser.js"></script>
	<script type="text/javascript" src="javascriptAndCss/xmlDiffParser.js"></script>
	<script type="text/javascript" src="javascriptAndCss/arrowsOnNodes.js"></script>
	<script type="text/javascript" src="javascriptAndCss/uiMerging.js"></script>

	<link rel="stylesheet" href="thirdParty/bootstrap.min.css">
	<script src="thirdParty/popper.min.js"></script>
	<script src="thirdParty/bootstrap.min.js"></script>



</head>
<body>
<div class="container">
	<div class="row">
<div class ="col" id="left">
	<h4>Merger Proto</h4>
	<div id="modelSelection">
	<h1> Select two model versions </h1>
	<select id="versionChoice" class="box" size="10">
		<optgroup label="PK Cycle">
			<option class="opt" value="test">model_MOR_AC</option>
			<option class="opt" value="test">model_PKA_cycle</option>
		</optgroup>
		<optgroup label="PK Cycle">
			<option class="opt" value="test">PKA_cycle_l2v5</option>
			<option class="opt" value="test">PKA_cycle_MOR_l2v4</option>
		</optgroup>
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

<div class ="col-6" id="bivesGraph">
	<form>
		Toggle process node ports
		<input type="checkbox" id="portToggle">
	</form>
	<div id="buttons">
		<button id="sbgnMLdownload">Download SBGN-ML</button>
	</div>
	<div id="buttons">
		<button id="sbmlDownload">Download SBML</button>
	</div>
	<div id="buttons">
		<button id="createSlides">Create UI for merging</button>
	</div>

</div>

<div class="col-4">
	<div id="carousel" class="carousel slide">
	  <div class="carousel-inner" id="innerCarousel">

	  </div>
	</div>
	<a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</div>

<div class="btn-group" role="group" aria-label="Basic example">
	<button type="button" class="btn btn-secondary">Keep</button>
	<button type="button" class="btn btn-secondary">Discard</button>
  <button type="button" class="btn btn-secondary">From Model A</button>
  <button type="button" class="btn btn-secondary">From Model B</button>
	<button type="button" class="btn btn-secondary">Everything from A</button>
	<button type="button" class="btn btn-secondary">Everything from B</button>
</div>

</div>



<div id="bivesReport">
</div>
<div id="demo">
</div>
<div id="demo2">
</div>








<!-- <div id="carouselExampleIndicators" class="carousel slide">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> -->









<script>
	var obj;

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

	document.getElementById("compareModels").onclick = function() {

		obj = getBivesData("http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + document.getElementById("selection")[0].text + ".xml",
											 "http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + document.getElementById("selection")[1].text + ".xml",
											 ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);
	}
	//document.getElementById("sbgnMLdownload").onclick = function() {console.log(obj); download(obj)};
	//document.getElementById("sbmlDownload").onclick = function() {console.log(obj); downloadSBML(obj)};
  //showSbgn(obj);
	// console.log("http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[0].text + "",
	//  						"http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[1].text + "",
	// 						["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);};
	//document.getElementById("compareModels").onclick = function() {obj = getBivesData("http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R3", "http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R37", "reactionsSbgnJson");};
</script>
</body>
</html>
