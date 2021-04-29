//Info-Content
function getBivesData(v1, v2, callback){
	var command = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations", "inclAnnotations"];
	console.log(v1, v2);

	var bivesJob = {
		files:
		[
			v1,
			v2
		],
		commands:
			command
	};


	// call the bives wrapper script
	$.post (
		"bives/bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{
			//console.log(data);
			//$("#bivesReport").html ($.parseJSON (data).reportHtml);
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			var comodiAnnotation = $.parseJSON(data).separateAnnotations;
			//$("#sbgnJson").text(sbgnJson);
			var xmlDiff = $.parseJSON (data).xmlDiff;
			//console.log(xmlDiff);
			//console.log(xmlDocDiff, xmlDocSbml);
			showSbgn(sbgnJson, comodiAnnotation);
			//console.log(sbgnJson);
		}
	);
}
