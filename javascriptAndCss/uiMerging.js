function createSlides(xmlDocDiff, sbmlDocOld, sbmlDocNew) {
  //save the decision in array: array pos equals slide number
  var decisionArr = [];

  //carousel settings
  $('.carousel').carousel({
    interval: 0
  });



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

      decisionArr.push(["delete", -1, xmlSnippet, noNamespace]);

      if(xmlSnippet == null ) {
				console.log("find a solution for XPath: " + noNamespace);
			}

			var carouselItem = '<div class="carousel-item delete text-center">';

			carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );

      //replace angle brackets and run hljs
  //    console.log(xmlSnippet);
      if(xmlSnippet.nodeName != "#text") {
        plainXmlSnippet = xmlSnippet.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");
        $(".delete").last().append('<pre><code class="xml">\n' + plainXmlSnippet + '\n</code><pre>' );
      } else {
        $(".delete").last().append('<pre><code class="xml">\n' + xmlSnippet.data +  '\n</code><pre>');
      }


      //$(".carousel-item").last().append('<pre><code class="xml">\n' + plainXmlSnippet + '\n</code><pre>' ); //.replace(/(?:\r\n|\r|\n)/g, '<br>')

    //  console.log('<pre><code class="xml">\n' + xmlSnippet.outerHTML + '\n</code><pre>', $('pre code'));
      $('pre code').last().each(function(i, block) {
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

      decisionArr.push(["insert", -1, xmlSnippet]);

      if(xmlSnippet == null ) {
        console.log("find a solution for XPath: " + noNamespace);
      }

      var carouselItem = '<div class="carousel-item insert text-center">';

      carouselItem += '</div>';


      $( "#innerCarousel" ).append( carouselItem );
      if(xmlSnippet.nodeName != "#text") {
        plainXmlSnippet = xmlSnippet.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");
        $(".insert").last().append('<pre><code class="xml">\n' + plainXmlSnippet + '\n</code><pre>' );
      } else {
        $(".insert").last().append('<pre><code class="xml">\n' + xmlSnippet.data +  '\n</code><pre>');
      }
      $('pre code').last().each(function(i, block) {
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


      var xPathResultA = sbmlDocOld.evaluate(noNamespaceA, sbmlDocOld, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetA = xPathResultA.iterateNext();

      console.log(xmlSnippetA.nodeName);



      var xPathResultB = sbmlDocNew.evaluate(noNamespaceB, sbmlDocNew, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetB = xPathResultB.iterateNext();

      decisionArr.push(["update", -1, xmlSnippetA, xmlSnippetB]);

      var carouselItem = '<div class="carousel-item update text-center">';

      carouselItem += '<div class="updateA"></div>'
      carouselItem += '<div class="updateB"></div>'

      carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );

      console.log(xmlSnippetA.nodeName != "#text");

      if(xmlSnippetA.nodeName != "#text") {
        plainXmlSnippetA = xmlSnippetA.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");
        plainXmlSnippetB = xmlSnippetB.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");

        $(".updateA").last().append('<pre><code class="xml">\n' + plainXmlSnippetA + '\n</code><pre>' );
        $(".updateB").last().append('<pre><code class="xml">\n' + plainXmlSnippetB + '\n</code><pre>' );
      } else {
        console.log(typeof xmlSnippetA.data, xmlSnippetA);
        $(".updateA").last().append('<pre><code class="xml">\n' + xmlSnippetA.data +  '\n</code><pre>');
        $(".updateB").last().append('<pre><code class="xml">\n' + xmlSnippetB.data +  '\n</code><pre>');
        console.log("takecare of text");
      }



      $('.updateA').last().each(function(i, block) {
        hljs.highlightBlock(block);
       });
       $('.updateB').last().each(function(i, block) {
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


      var xPathResultA = sbmlDocOld.evaluate(noNamespaceA, sbmlDocOld, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetA = xPathResultA.iterateNext();

      console.log(xmlSnippetA.nodeName);



      var xPathResultB = sbmlDocNew.evaluate(noNamespaceB, sbmlDocNew, null, XPathResult.ANY_TYPE, null);
      var xmlSnippetB = xPathResultB.iterateNext();

      decisionArr.push(["move", -1, xmlSnippetA, xmlSnippetB, noNamespaceA]);

      var carouselItem = '<div class="carousel-item move text-center">';

      carouselItem += '<div class="moveA"></div>'
      carouselItem += '<div class="moveB"></div>'

      carouselItem += '</div>';

      $( "#innerCarousel" ).append( carouselItem );

      console.log(xmlSnippetA.nodeName != "#text");

      if(xmlSnippetA.nodeName != "#text") {
        plainXmlSnippetA = xmlSnippetA.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");
        plainXmlSnippetB = xmlSnippetB.outerHTML.replace(new RegExp(['<'],"g"), "&lt;").replace(new RegExp(['>'],"g"), "&gt;");

        $(".moveA").last().append('<pre><code class="xml">\n' + plainXmlSnippetA + '\n</code><pre>' );
        $(".moveB").last().append('<pre><code class="xml">\n' + plainXmlSnippetB + '\n</code><pre>' );
      } else {
        console.log(typeof xmlSnippetA.data, xmlSnippetA);
        $(".moveA").last().append('<pre><code class="xml">\n' + xmlSnippetA.data +  '\n</code><pre>');
        $(".moveB").last().append('<pre><code class="xml">\n' + xmlSnippetB.data +  '\n</code><pre>');
        console.log("takecare of text");
      }



      $('.moveA').last().each(function(i, block) {
        hljs.highlightBlock(block);
       });
       $('.moveB').last().each(function(i, block) {
         hljs.highlightBlock(block);
        });
    }

    move = moves.iterateNext();
	}



  $('.carousel-item').first().addClass('active');

  initButtons();

  console.log(decisionArr);
  var currentIndex = 0;

  $('#changeOfSum').text("Change: " + (1 + currentIndex) + " of " + $('.carousel-item').length);
  $('#typeOfChange').text("Type of change: " + decisionArr[currentIndex][0]);

  //slide manager

  $('#carousel').on('slid.bs.carousel', function (ev) {
    var slideClass = ev.relatedTarget.classList;
    showButtons(ev.relatedTarget.classList);

    currentIndex = ev.to;

    //show decision by toogling the right button
    var slideCategory = decisionArr[currentIndex][0];
    var decision = decisionArr[currentIndex][1];
    updateBtns(slideCategory, decision),

    //update currentNode and change type
    $('#changeOfSum').text("Change: " + (1 + currentIndex) + " / " + $('.carousel-item').length);
    $('#typeOfChange').text("Type of change: " + decisionArr[currentIndex][0]);

  });




  //save decision
  $('#btnKeep').on('click', function (e) {
    decisionArr[currentIndex][1] = 0;
    checkBtn();
  });

  $('#btnDiscard').on('click', function (e) {
    decisionArr[currentIndex][1] = 1;
    checkBtn();
  });

  $('#btnFromA').on('click', function (e) {
    decisionArr[currentIndex][1] = 0;
    checkBtn();
  });

  $('#btnFromB').on('click', function (e) {
    decisionArr[currentIndex][1] = 1;
    checkBtn();
  });

  $('#downloadSBML').on('click', function (e) {
    downloadSBML(decisionArr, sbmlDocOld, sbmlDocNew);
  });

  $('#btnAllA').on('click', function (e) {
    for(var i = 0; i< decisionArr.length; i++){
      if(decisionArr[i][0] == 'delete' || decisionArr[i][0] == 'move' || decisionArr[i][0] == 'update'){
        decisionArr[i][1] = 0;
      }
    }
    updateBtns(decisionArr[currentIndex][0], decisionArr[currentIndex][1]);
    checkBtn();
  });

  $('#btnAllB').on('click', function (e) {
    for(var i = 0; i< decisionArr.length; i++){
      if(decisionArr[i][0] == 'insert'){
        decisionArr[i][1] = 0;
      } else if(decisionArr[i][0] == 'move' || decisionArr[i][0] == 'update'){
        decisionArr[i][1] = 1;
      }
    }
    updateBtns(decisionArr[currentIndex][0], decisionArr[currentIndex][1]);
    checkBtn();

  });

  function checkBtn(){
    var sumDecided = 0;
    var enableDownload = true;
    for(var i = 0; i < decisionArr.length; i++){
      if(decisionArr[i][1] != -1){
         sumDecided++;
      } else enableDownload = false;
    }
    $('#progressBar').width("" + 100 / decisionArr.length * sumDecided + "%")
    if(enableDownload) $('#downloadSBML').prop('disabled', false);
  }

  function updateBtns(slideCategory, decision){
    $('.choiceBtns').removeClass('active');
    if(decision == 0){
      if(slideCategory == 'insert' || slideCategory == 'delete'){
        $('#btnKeep').button('toggle');
      }  else {
        $('#btnFromA').button('toggle');
      }

    } else if(decision == 1){
      if(slideCategory == 'move' || slideCategory == 'update') $('#btnFromB').button('toggle');
      else $('#btnDiscard').button('toggle');
    }
  }
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
