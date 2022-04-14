//Info-Content
function getBivesData(v1, v2, callback) {
	alert("TEST");
	const callBives = (file1, file2) => {
		//first load test file from local storage (if they are testfiles)
		const load = new Promise((resolve, reject) => {
			let f1;
			if (file1.startsWith("./")) f1 = loadTestFile(file1);
			//else f1 = loadLocalFile(file1);

			if (f1) {
				//console.log(f1);
				//alert("japp");
			} else f1 = file1;

			let f2;
			if (file2.startsWith("./")) f2 = loadTestFile(file2);
			//else f2 = loadLocalFile(file2);
			if (f2) {
				//alert("jippi");
			} else f2 = file2;

			if (f1 != null && f2 != null) {
				resolve([f1, f2]);
			}
			else reject("File could not be loaded. Please contact: tom.gebhardt@uni-rostock.de.");
		})

		load.then(([f1, f2]) => {
			const check = new Promise((checked, failed) => {
				let f1Type;
				checkF(f1).then((type1) => {
					f1Type = type1;
					if (f1Type) {
						checkF(f2).then((type2) => {
							if (type2) checked([type1, type2]);
							else failed("The second file does not encode an SBML model.");
						})

					} else failed("The first file does not encode an SBML model.");
				});
			})

			check.then(([f1Type, f2Type]) => {
				//console.log(f1Type, f2Type);
				if (f1Type == "SBML" && f2Type == "SBML") {
					commands = ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"];
					compareModels(f1, f2, commands);
				}
			}).catch((error) => {
				alert(error);
			})

			//check files with bives (and mabye manually for type?)


			//console.log(f1Type, f2Type);
		})
			.catch((error) => {
				alert(error);
				console.log("load failed");
			})
	}
	callBives(v1, v2);
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
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}

function loadLocalFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, true);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}

const checkF = (file) => {
	return new Promise((resolve, reject) => {
		//console.log(file);
		//alert();
		var bivesJob = {
			files: [file],
			commands: ["documentType"]
		};

		$.post(
			"bives/bives.php",
			"bivesJob=" + JSON.stringify(bivesJob),
			function (data) {
				console.log(data);
				let fileType = JSON.parse(data).documentType;
				//console.log(fileType[1]);

				//alert("check file");
				if (fileType) resolve(fileType[1]);
				else reject("Failed to load file.");
			}
		);
	})
		.catch((error) => {
			alert(error);
			console.log("load failed");
		})
}

function compareModels(f1, f2, command) {
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
	$.post(
		"bives/bives.php",
		"bivesJob=" + JSON.stringify(bivesJob),
		function (data) {
			//console.log(data);
			var report = JSON.parse(data).reportHtml;
			//console.log(report);
			var sbgnJson = JSON.parse(data).reactionsSbgnJson;
			//console.log(sbgnJson);
			var comodiAnnotation = JSON.parse(data).separateAnnotations;
			//$("#sbgnJson").text(sbgnJson);
			var xmlDiff = JSON.parse(data).xmlDiff;
			console.log(xmlDiff);
			//console.log(comodiAnnotation);
			//console.log(report);
			//console.log(xmlDocDiff, xmlDocSbml);
			alert("wird das getriggert?");
			showSbgn(sbgnJson, xmlDiff, comodiAnnotation, f1, f2);
			//console.log($.parseJSON (sbgnJson));
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
