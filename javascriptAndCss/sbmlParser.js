function foo(modelURL, callback){
  var xmlDoc;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      console.log("so far");
      if(typeof callback === "function"){
        return callback(xmlDoc);
      }
    }
  }, function(restults, status){
    callback(result[0].xmlDoc)
  };
  xmlhttp.open("GET", modelURL, true);
  xmlhttp.send();


}
