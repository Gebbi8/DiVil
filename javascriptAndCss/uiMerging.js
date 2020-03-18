/* add those elements
<div class="carousel-item active">
    <img src="" class="d-block w-100" alt="">
</div>
<div class="carousel-item">
  <img src="" class="d-block w-100" alt="">
</div>
<div class="carousel-item">
  <img src="" class="d-block w-100" alt="">
</div>
*/

function createSlides(obj, xmlDocDiff, sbmlDocOld, sbmlDocNew) {
	var data = JSON.parse(obj);
	console.log(xmlDocDiff, "new Doc", sbmlDocNew, "old Doc",  sbmlDocOld);
	var xDiff, xSbml;

	var deletes = xmlDocDiff.evaluate("/bives/delete/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var inserts = xmlDocDiff.evaluate("/bives/insert/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var updates = xmlDocDiff.evaluate("/bives/update/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var moves = xmlDocDiff.evaluate("/bives/move/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);

	var deleted = deletes.iterateNext();
  var first = true;
var c = 3
	while(deleted && c > 0){
    if(!deleted.attributes.triggeredBy){
      var noNamespace = getLocalXPath(deleted.attributes.oldPath.value);
      console.log(noNamespace);
      var xPathResult = sbmlDocOld.evaluate("/*:sbml[1]/*:model[1]/*:listOfSpecies[1]/*:species[1]/*:annotation[1]/*:COPASI[1]/*:RDF[1]/*:Description[1]/*:created[1]", sbmlDocOld, null, XPathResult.ANY_TYPE,null);
      var xmlSnippet = xPathResult.iterateNext();
      console.log(xmlSnippet);
    }
    //console.log(deleted.triggeredBy);
  //  console.log(deleted.childNodes[0].nodeValue);
    //console.log(deleted.childNodes[0].nodeValue);

		// present deleted element
	//	console.log(deleted)//, xmlDocSbmlOld.evaluate(deleted.t, xmlDocSbmlOld, null, XPathResult.ANY_TYPE, null));
    var carouselItem = '<div class="carousel-item ';
    // set first element as active
    if(first) {
      carouselItem += 'active';
      first = false;
    }
    carouselItem += '"><div class="d-block w-50">';

/////// add slide content here

    //carousel


///////
    carouselItem += '</div\n</div>';





    $( "#innerCarousel" ).append( carouselItem );
		deleted = deletes.iterateNext();


    c--;
	}

	var insert = inserts.iterateNext();
	while(insert != null){
		// present inserted element

		insert = inserts.iterateNext();
	}

	var update = updates.iterateNext();
	while(update != null){
		// present updated content


		update = updates.iterateNext();
	}

	var move = moves.iterateNext();
	while(move != null){
		// present moved content

		move = moves.iterateNext();
	}
}

function getLocalXPath(path){
	var pathArray;
  var returnPath = "";
	path = path.substr(1);
	pathArray = path.split("/");
	for(j = 0; j < pathArray.length-1; j++){
		returnPath += '/*:' + pathArray[j];
	}
  returnPath += '/*:' + pathArray[pathArray.length-1];

	return returnPath;
}
