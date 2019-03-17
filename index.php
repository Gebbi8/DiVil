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


		<div class="col">
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
	</div>



	<div class="btn-toolbar">
		<div class="btn-group btn-group-toggle" id="bgSingle" data-toggle="buttons">
			<label id="btnKeep" class="btn btn-secondary">
	        <input type="radio" name="options">Keep
	    </label>
	    <label id="btnDiscard" class="btn btn-secondary">
	        <input type="radio" name="options">Discard
	    </label>
		</div>
		<div class="btn-group btn-group-toggle" id="bgChoice"  data-toggle="buttons">
			<label id="btnFromA" class="btn btn-secondary">
	        <input type="radio" name="options">From Model A
	    </label>
	    <label id="btnFromB" class="btn btn-secondary">
	        <input type="radio" name="options">From Model B
	    </label>
		</div>
		<div class="btn-group btn-group-toggle" id="bgAll"  data-toggle="buttons">
			<label id="btnAllA" class="btn btn-secondarye">
	        <input type="radio" name="options">All from A
	    </label>
	    <label id="btnAllB" class="btn btn-secondary">
	        <input type="radio" name="options">All from B
	    </label>
		</div>
	</div>


	<button id="downloadSBML" type="button" class="btn btn-success">Download SBML</button>



<script type="text/javascript">
		$(document).ready(
			function () {
				init ();
			});
</script>
</body>
</html>
