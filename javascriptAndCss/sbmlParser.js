function foo(modelURL, callback){
  var xmlDoc;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      console.log(this);
      if(typeof callback === "function"){
        return callback(xmlDoc);
      }
    }
  }, function(restult, status){
    consol.log(result);
    callback(result[0].xmlDoc)
  };
  xmlhttp.open("GET", 'http://localhost/GitRepos/DiVil/proxy.php?url=' + modelURL, true);
  // If specified, responseType must be empty string or "document"
  xmlhttp.responseType = 'document';

  // Force the response to be parsed as XML
  xmlhttp.overrideMimeType('text/xml');
  xmlhttp.send();


}
