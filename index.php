<!doctype html>
<html lang="en">
<head>
	<title>Merge Prototype</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="stylesheet" href="thirdParty/github.css">


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
	<link rel="stylesheet" href="javascriptAndCss/style.css">
	<script src="thirdParty/popper.min.js"></script>
	<script src="thirdParty/bootstrap.min.js"></script>


	<script type="text/javascript" src="javascriptAndCss/init.js"></script>

</head>
<body>
	<div class="container-fluid">
		<div class="row" id="pageHeader">

		</div>
		<div class="row main">
			<div class="col-md-1 text-center">
				<div id="changeOfSum">
				</div>
				<div id="typeOfChange">
				</div>
				<div class="btn-toolbar justify-content-center">
					<div class="btn-group-vertical btn-group-toggle leftBtns" id="bgSingle" data-toggle="buttons">
						<label id="btnKeep" class="btn btn-outline-primary choiceBtns">
				        <input type="radio" name="options">Keep
				    </label>
				    <label id="btnDiscard" class="btn btn-outline-primary choiceBtns">
				        <input type="radio" name="options">Discard
				    </label>
					</div>
					<div class="btn-group-vertical btn-group-toggle leftBtns" id="bgChoice"  data-toggle="buttons">
						<label id="btnFromA" class="btn btn-outline-primary choiceBtns">
				        <input type="radio" name="options">From Model A
				    </label>
				    <label id="btnFromB" class="btn btn-outline-primary choiceBtns">
				        <input type="radio" name="options">From Model B
				    </label>
					</div>
				</div>
			</div>

		<div class="col-md-10">
			<div id="carousel" class="carousel slide">
			  <div class="carousel-inner" id="innerCarousel">

			  </div>
			</div>
			<a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="false"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="false"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

		<div class="col-md-1">
			<div class="btn-toolbar justify-content-center">
				<div class="btn-group-vertical btn-group-toggle" id="bgAll"  data-toggle="buttons">
					<label id="btnAllA" class="btn btn-outline-primary choiceBtns">
							<input type="radio" name="options">Model A
					</label>
					<label id="btnAllB" class="btn btn-outline-primary choiceBtns">
							<input type="radio" name="options">Model B
					</label>
				</div>
			</div>
		</div>
	</div>

		<div class="progress">
	  	<div id="progressBar" class="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>
		</div>
		<button id="downloadSBML" type="button" class="btn btn-success btn-lg btn-block" disabled aria-disabled="true">Download SBML</button>


<script type="text/javascript">
		$(document).ready(
			function () {
				init ();
			});
</script>
</body>
</html>
