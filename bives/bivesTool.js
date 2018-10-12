//Info-Content
function getBivesData(v1, v2, command, callback){
	var data;
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
			//obj = showSbgn(JSON.parse(data).reactionsSbgnJson);
		//	$("#demo2").text($.parseJSON (data).xmlDiff);
			var dataJson = $.parseJSON (data);

				parser = new DOMParser();
				var xmlDocDiff = parser.parseFromString(dataJson.xmlDiff,"text/xml");
				var xmlDocSbml;


				foo("testModels/" + document.getElementById("selection")[1].text + ".xml", function(xmlDoc){
				  console.log(xmlDoc); // this is where you get the return value
					xmlDocSbml = xmlDoc;
					console.log(xmlDocDiff, xmlDocSbml);
					document.getElementById("sbmlDownload").onclick = function() {downloadSBML(sbgnJson, xmlDocDiff, xmlDocSbml)};
				});


				$("#demo2").text(xmlDiffToXmlJson($.parseJSON (data).xmlDiff));
	//		$("#bivesReport").html ($.parseJSON (data).reportHtml);
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			console.log(xmlDocDiff, xmlDocSbml);
			showSbgn(sbgnJson);

		}
	);
}
