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
<script type="text/javascript" src="javascriptAndCss/parseURL.js"></script>

	<link rel="stylesheet" href="thirdParty/bootstrap.min.css">
	<script src="thirdParty/popper.min.js"></script>
	<script src="thirdParty/bootstrap.min.js"></script>


	<script type="text/javascript" src="javascriptAndCss/init.js"></script>

</head>
<body>
<div class="container">
	<div class="row">


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
		<button id="btnKeep" type="button" class="btn btn-secondary">Keep</button>
		<button id="btnDiscard" type="button" class="btn btn-secondary">Discard</button>
	  <button id="btnFromA" type="button" class="btn btn-secondary">From Model A</button>
	  <button id="btnFromB" type="button" class="btn btn-secondary">From Model B</button>
		<button id="btnAllA" type="button" class="btn btn-secondary">Everything from A</button>
		<button id="btnAllB" type="button" class="btn btn-secondary">Everything from B</button>
	</div>

</div>
<script type="text/javascript">
		$(document).ready(
			function () {
				init ();
			});
</script>
</body>
</html>
