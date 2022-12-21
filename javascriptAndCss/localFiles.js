function submitLocalFiles() {



  //let v1 = formdata.formFile1.files[0];
  //let v2 = formdata.formFile2.files[0];

  let v1 = document.getElementById("formFile1");
  let v2 = document.getElementById("formFile2");

  let file1, file2;




  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    alert('The File APIs are not fully supported in this browser.');
    return;
  }

  if (!v1 || !v2) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!v1.files || !v2.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (v1.files[0] == null || v2.files[0] == null) {
    alert("Please select two files before clicking 'Compare'");
  }
  else {

    var reader = new FileReader();

    reader.onload = function (e1) {
      file1 = e1.target.result;
      console.debug(file1);
      var reader2 = new FileReader();
      reader2.onload = function (e2) {



        file2 = e2.target.result;

        console.debug(file2);
        getBivesData(file1, file2);

      };
      reader2.readAsBinaryString(v2.files[0]);
    };


    reader.readAsBinaryString(v1.files[0]);

  }
}
