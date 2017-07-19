//Info-Content
function getBivesData(v1, v2, command){
	var data;
	//console.log(v1.url, v2.url);

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
			console.log(obj);
			$("#bivesReport").html ($.parseJSON (data).reportHtml);
		}
	);
}
