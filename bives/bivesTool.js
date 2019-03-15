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

console.log(v1, v2, command);

	// call the bives wrapper script
	$.post (
		"bives/bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{
			dataCatch = data;
		}
	).done(function(){
		//save diff in local storage
		//sessionStorage.setItem(v1.model+"_"+v1.versionid+"_"+v2.versionid, dataCatch);
		//console.log("saved in sessionStorage");
		prepareData($.parseJSON (dataCatch), v1, v2);
	});

	//createSlides($.parseJSON (data).xmlDiff, , y);

}

function prepareData(data, v1, v2){
	console.log(v1, v2);
	parser = new DOMParser();
	var xmlDocDiff = parser.parseFromString(data.xmlDiff,"text/xml");

  var xmlOld;

	foo(v1, function(xmlDocOld){
		//console.log(xmlDocOld); // this is where you get the return value
        xmlOld = xmlDocOld;
		foo(v2, function(xmlDocNew){
			console.log(xmlOld, xmlDocNew); // this is where you get the return value
			createSlides(xmlDocDiff, xmlOld, xmlDocNew);
		});
	});
}
