//Info-Content
function getBivesData(v1, v2, command){
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
			console.log(data);
			$("#bivesReport").html ($.parseJSON (data).reportHtml);
			var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
			console.log(sbgnJson);
			showSbgn(sbgnJson);
			document.getElementById("sbmlDownload").onclick = function() {downloadSBML(sbgnJson)};
		}
	);
}
