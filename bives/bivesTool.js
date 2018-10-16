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
			console.log(data);
			//obj = showSbgn(JSON.parse(data).reactionsSbgnJson);
		//	$("#demo2").text($.parseJSON (data).xmlDiff);
				var dataJson = $.parseJSON (data);
				document.getElementById("sbgnMLdownload").onclick = function() {download(data)};
				parser = new DOMParser();
				var xmlDocDiff = parser.parseFromString(dataJson.xmlDiff,"text/xml");
				var xmlDocSbmlNew, xmlDocSbmlOld;
				console.log(document.getElementById("selection")[0].text, document.getElementById("selection")[1].text);
				foo("testModels/" + document.getElementById("selection")[0].text + ".xml", function(xmlDocOld){
				  console.log(xmlDocOld); // this is where you get the return value
					xmlDocSbmlOld = xmlDocOld;
					foo("testModels/" + document.getElementById("selection")[1].text + ".xml", function(xmlDocNew){
						console.log(xmlDocNew); // this is where you get the return value
						xmlDocSbmlNew = xmlDocNew;
						document.getElementById("sbmlDownload").onclick = function() {downloadSBML(sbgnJson, xmlDocDiff, xmlDocSbmlOld, xmlDocNew)};
						document.getElementById("sbgnMLdownload").onclick = function() {download(sbgnJson)};
					});
				});




	//			$("#demo2").text(xmlDiffToXmlJson($.parseJSON (data).xmlDiff));
	//		$("#bivesReport").html ($.parseJSON (data).reportHtml);
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			//console.log(xmlDocDiff, xmlDocSbml);
			showSbgn(sbgnJson);

		}
	);
}
