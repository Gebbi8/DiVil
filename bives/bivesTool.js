//Info-Content
function getBivesData(v1, v2, callback){
	var command = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"];
	//console.log(v1, v2);

	if(v1.includes("./testModels/")){
		v1 = loadTestFile(v1);
		//console.log(v1);
	}

	if(v2.includes("./testModels/")){
		v2 = loadTestFile(v2);
		//console.log(v2);
	}

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
			var report = $.parseJSON (data).reportHtml;
			console.log(report);
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			console.log(sbgnJson);
			var comodiAnnotation = $.parseJSON(data).separateAnnotations;
			//$("#sbgnJson").text(sbgnJson);
			var xmlDiff = $.parseJSON (data).xmlDiff;
			console.log(xmlDiff);
			//console.log(comodiAnnotation);
			//console.log(report);
			//console.log(xmlDocDiff, xmlDocSbml);
			showSbgn(sbgnJson, xmlDiff, comodiAnnotation, v1, v2);
			console.log($.parseJSON (sbgnJson));
		}
	);

	function loadTestFile(filePath) {
		var result = null;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", filePath, false);
		xmlhttp.send();
		if (xmlhttp.status==200) {
		  result = xmlhttp.responseText;
		}
		return result;
	  }
}
