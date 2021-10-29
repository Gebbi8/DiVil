//Info-Content
function getBivesData(v1, v2, callback){

	//callBives(v1, v2);

		// 	check1 = checkFile(v1);
		// 	check2 = checkFile(v2);

		// 	console.log(check1, check2);
		// 	if(check1 == "SBML" && check2 == "SBML") resolve("OK");
		// 	else reject("ERROR");
		// }
	



	var command = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"];
	//console.log(v1, v2);

		// if(v1.includes("./testModels/")){
		// 	v1 = loadTestFile(v1);
		// 	//console.log(v1);
		// }



	// checkFile(v1);
	// checkFile(v2);

	// var bivesJob = {
	// 	files:
	// 	[
	// 		v1,
	// 		v2
	// 	],
	// 	commands:
	// 		command
	// };


	// // call the bives wrapper script
	// $.post (
	// 	"bives/bives.php",
	// 	"bivesJob=" + JSON.stringify (bivesJob),
	// 	function (data)
	// 	{
	// 		//console.log(data);
	// 		var report = $.parseJSON (data).reportHtml;
	// 		console.log(report);
	// 		var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
	// 		console.log(sbgnJson);
	// 		var comodiAnnotation = $.parseJSON(data).separateAnnotations;
	// 		//$("#sbgnJson").text(sbgnJson);
	// 		var xmlDiff = $.parseJSON (data).xmlDiff;
	// 		console.log(xmlDiff);
	// 		//console.log(comodiAnnotation);
	// 		//console.log(report);
	// 		//console.log(xmlDocDiff, xmlDocSbml);
	// 		showSbgn(sbgnJson, xmlDiff, comodiAnnotation, v1, v2);
	// 		console.log($.parseJSON (sbgnJson));
	// 	}
	// );
	const callBives = (file1, file2) => {
		//first load test file from local storage (if they are testfiles)
		const load = new Promise( (resolve, reject) => {
			let f1 = loadTestFile(file1);
			if(f1){
				console.log(f1);
				//alert("japp");
			} else f1 = file1;
	
			let f2 = loadTestFile(file2);
			if(f2){
				//alert("jippi");
			} else f2 = file2;
	
			if(f1 != null && f2 != null){
				resolve([f1, f2]);
			} 
			else reject("Error occured");
		})
	
		load.then(([f1, f2]) => {
			const check = new Promise((checked, failed) => {
				let f1Type;
				checkF(f1).then((type1) => {
					f1Type = type1;
					if(f1Type) {
						checkF(f2).then((type2) => {
							if(type2) checked([type1, type2]);
							else failed("failed on file 2");
						})

					} else failed("failed on file 1");
				})
				.catch((error) => {
					console.log(error)
					alert("Error while file check!");
				});
				
				// let f2Type = checkF(f2);
				// if(f2Type) console.log(f2Type);


				// console.log(f1Type, f2Type);
				
				// if(f1Type == "SBML" && f2Type == "SBML"){
				// 	checked([f1Type, f2Type]);
				// } else failed("Failed to check the files" + f1Type);
				//if(f1Type)
			})

			check.then(([f1Type, f2Type]) => {
				console.log(f1Type, f2Type);
				if(f1Type == "SBML" && f2Type == "SBML"){
					commands = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"];
					compareModels(f1, f2, commands);
				}
				console.log("nottin os far");

			})
			.catch((error) => {
				console.log(error);
				//alert("eee");
			})
			
			//check files with bives (and mabye manually for type?)


			//console.log(f1Type, f2Type);
		})
		.catch((error) => {
			console.log("load failed");
		})
	}
	 callBives(v1,v2);
	// 	.then(data => {
	// 		console.log(data);
	// 		console.log("sucessssss");
	// 	})
	// 	.catch((err) =>{
	// 		console.log("promis recjected");
	// 	})

	
}

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

const checkF = (file) => {
	return new Promise((resolve, reject) => {
		console.log(file);
		//alert();
		var bivesJob = {
			files:	[file],
			commands: ["documentType"]
		};
	
		$.post (
			"bives/bives.php",
			"bivesJob=" + JSON.stringify (bivesJob),
			function (data)
			{
				console.log(data);
				let fileType = $.parseJSON(data).documentType;
				console.log(fileType[1]);
				
				alert("check file");
				if(fileType) resolve(fileType[1]);
				else reject("meh");
			}
		);
	})
}

function compareModels(f1, f2, command){
	var bivesJob = {
	 	files:
	 	[
	 		f1,
	 		f2
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
	 		showSbgn(sbgnJson, xmlDiff, comodiAnnotation, f1, f2);
	 		console.log($.parseJSON (sbgnJson));
	 	}
	 );
}
		
		// let xmlhttp = new XMLHttpRequest();
		// xmlhttp.addEventListener("readystatechange", () => {
		// 	if (request.readyState === 4 && request.status === 200) {
		// 		let data = JSON.parse(request.responseText);
		// 		resolve(data);
		// 	} else if (request.readyState === 4) {
		// 		reject("error getting resources");
			
		// 	}
		// })
		// xmlhttp.open("GET", filePath, false);
		// xmlhttp.send();
		// if (xmlhttp.status==200) {
		//   result = xmlhttp.responseText;
		// }
	

