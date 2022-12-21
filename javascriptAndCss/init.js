window.onload = function () {
    var obj;

    // document.getElementById("compareModels").onclick = function () {

    // 	obj = getBivesData("http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + document
    // 		.getElementById("selection")[0].text + ".xml",
    // 		"http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + document.getElementById(
    // 			"selection")[1].text + ".xml",
    // 		["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations", "inclAnnotations"]);
    // }
    //document.getElementById("sbgnMLdownload").onclick = function() {console.log(obj); download(obj)};
    //document.getElementById("sbmlDownload").onclick = function() {console.log(obj); downloadSBML(obj)};
    //showSbgn(obj);
    // console.log("http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[0].text + "",
    //  			"http://localhost/SBI-Rep/divil/testModels/000006/" + document.getElementById("selection")[1].text + "",
    //				["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);};
    //document.getElementById("compareModels").onclick = function() {obj = getBivesData("http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R3", "http://localhost/SBI-Rep/masterthesis_tom/implementation/testModels/BioModel7/Novak1997_CellCycle-R37", "reactionsSbgnJson");};


    // getBivesData(
    // 	"http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + "GlyphsAndArcs_noTypo1" + ".xml",
    // 	"http://hopper.informatik.uni-rostock.de/GitRepos/DiVil/testModels/" + "GlyphsAndArcs_noTypo1" + ".xml",
    // 	["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations", "inclAnnotations"]);

    //let testJson = "testModels/testJson/Kummer5vs6.json";
    // let testJson = "testModels/testJson/toyModel-same.json";
    //let testJson = "testModels/testJson/testJson+Comodi/toyModel.json";
    //  let testJson = "testModels/testJson/julias.json";
    //  $.get(testJson, function(data){
    //  	showSbgn(data, null);
    //  }, 'text');

    //assign examples from local files
    document.getElementById("e1Kummer").onclick = function () {
        assignExamples("Kummer2000/2012-12-12/BIOMD0000000329.xml", "Kummer2000/2015-04-16/BIOMD0000000329.xml")
    };
    document.getElementById("e2Liebal").onclick = function () {
        assignExamples("Liebal1-BIOMD0000000461.xml", "Liebal3-BIOMD0000000461.xml")
    };
    document.getElementById("e3Dupreez").onclick = function () {
        assignExamples("dupreez/dupreez6.xml", "dupreez/dupreez7.xml")
    };
    document.getElementById("e4Julia").onclick = function () {
        assignExamples("julia/v1.xml", "julia/v2.xml")
    };

    function assignExamples(file1, file2) {
        getBivesData(
            "./testModels/" + file1, // + ".xml",
            "./testModels/" + file2, // + ".xml",
        );
    }

    var hiddenTests = {
        "omex": ["sarma2012/BIOMD0000000444-v1.omex", "sarma2012/BIOMD0000000444-v2.omex"],
        "xml": ["sarma2012/BIOMD0000000444-v1.xml.origin", "sarma2012/BIOMD0000000444-v2.xml"],
        "paths": ["gitCompare/Liebal3-BIOMD0000000461.xml", "gitCompare/Liebal-fake-test2.xml"],
        "singleChange": ["Kummer2000-v2.xml", "Kummer2000-v2-singleParaChange.xml"],
        "nodesAndArcs": ["julia/v1.xml", "julia/v2.xml"]
    }

    //check if URL has attributes
    //s: source of models, biom -> biomodels database
    const queryString = window.location.search;
    console.log(queryString);
    if (queryString) {
        window.onload = function () {
            let params = parseParams(queryString);

            if (params['s'] == 'biom') {
                //alert("source is biomodels");
                let model = params['m'];
                let version1 = params['v1'];
                let version2 = params['v2'];

                if (!model || !version1 || !version2)
                    toggleModal('errorModal', "The provided URL parameters are not well formed!");
                else compareFromBiomodels(model, version1, version2);
            } else {
                toggleModal('errorModal', "The provided URL parameters are not well formed.");
                document.getElementById("e1Kummer").click();
            }
        }

    } else {


        document.getElementById("e1Kummer").click();
        //assignExamples(hiddenTests["omex"][0], hiddenTests["omex"][1]);
        //assignExamples(hiddenTests["xml"][0], hiddenTests["xml"][1]);
        //assignExamples(hiddenTests["paths"][0], hiddenTests["paths"][1]);
        //assignExamples(hiddenTests["singleChange"][0], hiddenTests["singleChange"][1]);
        //assignExamples(hiddenTests["nodesAndArcs"][0], hiddenTests["nodesAndArcs"][1]);

    }
    document.getElementById("compareModels").addEventListener("click", submitLocalFiles);
}