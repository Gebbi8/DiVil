//get Parameter from URL and return hash map
function parseParams(params) {
    params = params.substr(1);
    //console.log(typeof (params));
    params = params.split(',');

    let map = {};
    params.forEach(p => {
        let pair = p.split(':')
        map[pair[0]] = pair[1]
    });

    return map;
}

//handle biomodel requests
function compareFromBiomodels(model, version1, version2) {
    //curl -X GET "https://www.ebi.ac.uk/biomodels/model/files/BIOMD0000000123.2" -H  "accept: application/json"

    let filename1;
    let filename2;

    var urlV1 = "https://www.ebi.ac.uk/biomodels/model/files/" + model + '.' + version1;
    var urlV2 = "https://www.ebi.ac.uk/biomodels/model/files/" + model + '.' + version2;

    var xhrV1 = new XMLHttpRequest();
    xhrV1.responseType = 'json';
    xhrV1.open("GET", urlV1);





    xhrV1.setRequestHeader("accept", "application/json");
    xhrV1.onreadystatechange = function () {
        if (xhrV1.readyState === 4) {
            if (xhrV1.status === 404) {
                toggleModal('errorModal', xhrV1.response.errorMessage);
                return;
            }

            filename1 = xhrV1.response["main"][0].name;
            xhrV2.send();
        }
    };

    var xhrV2 = new XMLHttpRequest();
    xhrV2.open("GET", urlV2);
    xhrV2.responseType = 'json';
    xhrV2.setRequestHeader("accept", "application/json");

    xhrV2.onreadystatechange = function () {
        if (xhrV2.readyState === 4) {
            console.log(xhrV2.status);
            filename2 = xhrV2.response["main"][0].name;

            //callDiVil with URL to Biomodels
            //e.g. https://www.ebi.ac.uk/biomodels/model/download/BIOMD0000000123.2?filename=BIOMD0000000123_url.xml

            let base = "https://www.ebi.ac.uk/biomodels/model/download/";
            let url1 = base + model + '.' + version1 + '?filename=' + filename1;
            let url2 = base + model + '.' + version2 + '?filename=' + filename2;

            //get files for popup
            let file1, file2;

            var xhrFile1 = new XMLHttpRequest();
            xhrFile1.open("GET", url1);
            xhrFile1.responseType = 'xml';
            xhrFile1.setRequestHeader("accept", "application/xml");

            var xhrFile2 = new XMLHttpRequest();
            xhrFile2.open("GET", url1);
            xhrFile2.responseType = 'xml';
            xhrFile2.setRequestHeader("accept", "application/xml");


            xhrFile2.onreadystatechange = function () {
                if (xhrFile2.readyState === 4) {
                    console.log(xhrFile2.response);
                    file2 = xhrFile2.response;

                    //everything should be done here
                    //call Bives with urls
                    getBivesData(
                        url1,
                        url2,
                        1, //flag to mark that files will be retrieved via URL
                        file1,
                        file2
                    );
                }
            };

            xhrFile1.onreadystatechange = function () {
                if (xhrFile1.readyState === 4) {
                    console.log(xhrFile1.response);
                    file1 = xhrFile1.response;
                    xhrFile2.send();
                }
            };

            xhrFile1.send();



        }
    };

    xhrV1.send();
}

function toggleModal(modalId, error) {
    //fill modal with error message
    document.getElementById('errorModal').getElementsByClassName('modal-body')[0].innerHTML = error;
    //toggle it
    var myModal = new bootstrap.Modal(document.getElementById(modalId), 'data-bs-focus');
    myModal.toggle();

    alert(error);

}
