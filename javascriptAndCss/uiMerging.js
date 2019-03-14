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
  //carousel settings
  $('.carousel').carousel({
    interval: 0
  })




	var data = JSON.parse(obj);
	console.log(xmlDocDiff, "new Doc", sbmlDocNew, "old Doc",  sbmlDocOld);
	var xDiff, xSbml;

	var deletes = xmlDocDiff.evaluate("/bives/delete/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var inserts = xmlDocDiff.evaluate("/bives/insert/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var updates = xmlDocDiff.evaluate("/bives/update/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var moves = xmlDocDiff.evaluate("/bives/move/*", xmlDocDiff, null, XPathResult.ANY_TYPE,null);

	var deleted = deletes.iterateNext();
  var first = true;

	while(deleted){
    if(!deleted.attributes.triggeredBy){


      var noNamespace = getLocalXPath(deleted.attributes.oldPath.value);
      //console.log(noNamespace);
      var xPathResult = sbmlDocOld.evaluate(noNamespace, sbmlDocOld, null, XPathResult.ANY_TYPE, null);
      var xmlSnippet = xPathResult.iterateNext();

      if(xmlSnippet == null ) {
				console.log("find a solution for XPath: " + noNamespace);
			}

			var carouselItem = '<div class="carousel-item delete">';

			carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );
      $(".carousel-item").last().text(xmlSnippet.outerHTML)
      $('.carousel-item').last().each(function(i, block) {
       	hljs.highlightBlock(block);
       });
    }
		deleted = deletes.iterateNext();
	}





	var insert = inserts.iterateNext();
	while(insert != null){
		// present inserted element
    if(!insert.attributes.triggeredBy){


      var noNamespace = getLocalXPath(insert.attributes.newPath.value);
      //console.log(noNamespace);
      var xPathResult = sbmlDocNew.evaluate(noNamespace, sbmlDocNew, null, XPathResult.ANY_TYPE, null);
      var xmlSnippet = xPathResult.iterateNext();

      if(xmlSnippet == null ) {
        console.log("find a solution for XPath: " + noNamespace);
      }

      var carouselItem = '<div class="carousel-item insert">';

      carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );
      $(".carousel-item").last().text(xmlSnippet.outerHTML)
      $('.carousel-item').last().each(function(i, block) {
        hljs.highlightBlock(block);
       });
    }
		insert = inserts.iterateNext();
	}

	var update = updates.iterateNext();
	while(update != null){
		// present updated content
    if(!update.attributes.triggeredBy){


      var noNamespaceA = getLocalXPath(update.attributes.oldPath.value);
      var noNamespaceB = getLocalXPath(update.attributes.newPath.value);

      //console.log(noNamespace);
      var xPathResultA = sbmlDocOld.evaluate(noNamespaceA, sbmlDocOld, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetA = xPathResultA.iterateNext();

      var xPathResultB = sbmlDocNew.evaluate(noNamespaceB, sbmlDocNew, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetB = xPathResultB.iterateNext();

      if(xmlSnippet == null ) {
        console.log("find a solution for XPath: " + noNamespace);
      }

      var carouselItem = '<div class="carousel-item update">';

      carouselItem += '<div class="updateA"></div>'
      carouselItem += '<div class="updateB"></div>'

      carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );
      $(".updateA").last().text(xmlSnippetA.outerHTML)
      $(".updateB").last().text(xmlSnippetB.outerHTML)
      $('.updateA').last().each(function(i, block) {
        console.log(i, block);
        hljs.highlightBlock(block);
       });
       $('.updateB').last().each(function(i, block) {
         console.log(i, block);
         hljs.highlightBlock(block);
        });
    }

		update = updates.iterateNext();
	}

	var move = moves.iterateNext();
	while(move != null){
    // present moved content
    if(!move.attributes.triggeredBy){


      var noNamespaceA = getLocalXPath(move.attributes.oldPath.value);
      var noNamespaceB = getLocalXPath(move.attributes.newPath.value);

      //console.log(noNamespace);
      var xPathResultA = sbmlDocOld.evaluate(noNamespaceA, sbmlDocOld, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetA = xPathResultA.iterateNext();

      var xPathResultB = sbmlDocNew.evaluate(noNamespaceB, sbmlDocNew, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetB = xPathResultB.iterateNext();

      if(xmlSnippet == null ) {
        console.log("find a solution for XPath: " + noNamespace);
      }

      var carouselItem = '<div class="carousel-item move">';

      carouselItem += '<div class="moveA"></div>'
      carouselItem += '<div class="moveB"></div>'

      carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );
      $(".moveA").last().text(xmlSnippetA.outerHTML)
      $(".moveB").last().text(xmlSnippetB.outerHTML)
      $('.moveA').last().each(function(i, block) {
        console.log(i, block);
        hljs.highlightBlock(block);
       });
       $('.moveB').last().each(function(i, block) {
         console.log(i, block);
         hljs.highlightBlock(block);
        });
    }

    move = moves.iterateNext();
	}



  $('.carousel-item').first().addClass('active');
}





function getLocalXPath(path){
	var pathArray;
  var returnPath = "";
	path = path.substr(1);
	pathArray = path.split("/");
	for(j = 0; j < pathArray.length; j++){
		var splitArr = pathArray[j].split("[");

		if(splitArr[0] == "text()"){                                                  //add special cases
			returnPath += '/' + splitArr[0] + '[' + splitArr[1];
		} else 	returnPath += "/*[local-name()='" + splitArr[0] + "'][" + splitArr[1];
	}
  //returnPath += '/*:' + pathArray[pathArray.length-1];

	return returnPath;
}
