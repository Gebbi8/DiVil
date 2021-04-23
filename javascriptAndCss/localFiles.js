function submitLocalFiles(formdata){

    var myFile = $('#formFile1').prop('files');
console.log(myFile);

    let v1 = formdata.formFile1.files[0];
    let v2 = formdata.formFile2.files[0];

    let file1, file2;

    console.log(v1);
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
      }   
    
      var input = document.getElementById('formFile1');
      if (!input) {
        alert("Um, couldn't find the fileinput element.");
      }
      else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      }
      else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");               
      }
      else {
        var reader = new FileReader();
        reader.onload = function(e1)
        {
            file1 = e1.target.result;
            var reader2 = new FileReader();
            reader2.onload = function(e2)
            {
                file2 = e2.target.result;
                getBivesData(file1, file2);

            };
            reader2.readAsBinaryString(v2);
        };
        reader.readAsBinaryString(v1);

      }
    }
