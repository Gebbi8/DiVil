//Info-Content
function getBivesData(v1, v2, callback){
	var command = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"];
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
			//var report = $.parseJSON (data).reportHtml;
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			var comodiAnnotation = $.parseJSON(data).separateAnnotations;
			//$("#sbgnJson").text(sbgnJson);
			var xmlDiff = $.parseJSON (data).xmlDiff;
			console.log(xmlDiff);
			//console.log(comodiAnnotation);
			//console.log(report);
			//console.log(xmlDocDiff, xmlDocSbml);
			showSbgn(sbgnJson, xmlDiff, comodiAnnotation);
			//console.log(sbgnJson);
		}
	);
}
