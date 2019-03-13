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

function createSlides(obj, xmlDocDiff, xmlDocSbmlOld, xmlDocSbmlNew) {
	var data = JSON.parse(obj);
	console.log(xmlDocDiff, "new Doc", xmlDocSbmlNew, "old Doc",  xmlDocSbmlOld);
	var xDiff, xSbml;

	var deletes = xmlDocDiff.evaluate("//delete/child::node()", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var inserts = xmlDocDiff.evaluate("//insert/child::node()", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var updates = xmlDocDiff.evaluate("//update/child::node()", xmlDocDiff, null, XPathResult.ANY_TYPE,null);
	var moves = xmlDocDiff.evaluate("//move/child::node()", xmlDocDiff, null, XPathResult.ANY_TYPE,null);

	console.log(deletes.iterateNext(), moves.iterateNext(), inserts.iterateNext(), updates.iterateNext());

	var deleted = deletes.iterateNext();
  var first = true;

	while(deleted != null){
		// present deleted element
	//	console.log(deleted)//, xmlDocSbmlOld.evaluate(deleted.t, xmlDocSbmlOld, null, XPathResult.ANY_TYPE, null));
  var carouselItem;
  if(first) {
    carouselItem = '<div class="carousel-item active"><div class="d-block w-100"><p>Test</p></div\n</div>'
    first = false;
  } else {
    carouselItem = '<div class="carousel-item"><div class="d-block w-100"><p>Test</p></div\n</div>'

  }

    $( "#innerCarousel" ).append( carouselItem );

		deleted = deletes.iterateNext();
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
