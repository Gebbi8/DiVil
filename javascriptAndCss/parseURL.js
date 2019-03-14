function parseURL(){
  var url = location.hash.slice(1);
	console.log(url);
  var models = url.split('&&');
  console.log(models);

  getBivesData(models[0], models[1], ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"]);
}
