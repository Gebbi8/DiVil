function comodiAdder(data, changeType, path){
    
    if(changeType == "delete") path = 'oldPath="' + path + '"';
    else path = 'newPath="' + path + '"';
    return data[changeType][path];
}


function getStructeredData(xmlLines, comodi, v1, v2){

    //files
        // Create a DOMParser
    var parser = new DOMParser();

    // Use it to turn your xmlString into an XMLDocument
    var oldDoc = parser.parseFromString(v1, "application/xml");
    var newDoc = parser.parseFromString(v2, "application/xml");
    
    // var request = new XMLHttpRequest();
    // request.open("GET", v1, true);
    // request.responseType = 'document';
    // request.overrideMimeType('text/xml');
    // request.onload = function () {
    //     if (request.readyState === request.DONE) {
    //         if (request.status === 200) {
    //             console.log(request.responseXML);
    //             oldDoc = request.responseXML;
    //         }
    //     }
    //     alert();
    // };
    // request.send(null);
    moveMap = {};

    var dataByNetwork = {}; //element id, changetype, changeinfo/changehtml
    var dataByKeys = {};
    // produce double key array based on change + path. vlaue comodi term
    var changeType = null;
    var changes = "";

    //debugging
    var i = 0;
    // -- create move map
    let moveFlag = 0;
    xmlLines.forEach(line => {
        if(line.includes("<move>")){
            moveFlag = 1;
            return;
        } 
        if(line.includes("</move>")){
            moveFlag = 0;
            return;
        } 
        if(moveFlag){
           // console.log(line)
            let oldPath = regEx(line, "oldPath");
            let newPath = regEx(line, "newPath");
            moveMap[oldPath] = newPath;
        }
    })

    xmlLines.forEach(line => {
        //skip all changes that are irrelevant for the graph and child nodes of kinetic law
        if(line.includes("triggeredBy=") || line.includes("listOfRules[") || line.includes("/notes[") ||
                line.includes("/listOfFunctionDefinitions[") || line.includes("listOfUnitDefinitions[") || line.includes("/sbml[1]/model[1]/listOfParameters[")) return;
        if(line.includes("insert>")){
            changeType = "insert";
            return;
        } 
        if(line.includes("delete>")){
            changeType = "delete";
            return;
        } 
        if(line.includes("update>")){
            changeType = "update";
            return;
        } 
        if(line.includes("move>")){
            changeType = "move";
            return;
        }
        if(line.includes("bives>")){
            changeType = null;
            return;
        } 

        if(changeType != null){ //second key old bzw newPath belegen


            var id = line.match(/id=\".*?\"/g)[0];  //for comodi grep           
            
            elementType = line.match(/<.*? /g)[0].slice(1,-1);

            // if(changeType == "move" && line.includes("oldPath")){   
            //     console.log(line);
            //     let oldPath = regEx(line, "oldPath");
            //     let newPath = regEx(line, "newPath");
            //     if(oldPath == newPath) return; //same path means there is no move (?), other elements might be inserted before thats it
            //     moveMap[oldPath] = newPath;
            //     //console.log(moveMap);
            // }

            let path;

            if(line.includes("/annotation[")){           

                if(changeType == "delete"){
                     //= new RegExp('oldPath="(.*?)\"', 'g');
                     path = regEx(line, "oldPath");
                   // path = line.match(/oldPath=\".*?\"/g)[0];
                } else {
                   // regex = new RegExp('newPath="(.*?)\"', 'g');
                    path = regEx(line, "newPath")
                    //path = line.match(/newPath=\".*?\"/g)[0];
                }
    
                //var path = regex.exec(line)[1];
            
                //alert(path);
                //shorten path
                path = path.substr(0, path.indexOf("/annotation"));
                if(changeType == "delete" && moveMap[path]) path = moveMap[path]; //parent of deleted annotation was moved

                if(dataByKeys[path] == null) changes = "";
                else changes = dataByKeys[path].popup;
                if(changes.includes("<li>Annotations were changed,")) return;

                changes += "<li>Annotations were changed, which is not displayed here.</li>"
                dataByKeys[path] = {"comodi": id, "popup": changes};
               return;
            }
            

            if(changeType == "delete"){
                path = regEx(line, "oldPath")
               // path = line.match(/oldPath=\".*?\"/g)[0];
            } else {
                path = regEx(line, "newPath")
                //path = line.match(/newPath=\".*?\"/g)[0];
            }

            //var path = regex.exec(line)[1];
           
           
            // if(path == "/sbml[1]/model[1]/listOfSpecies[1]/species[1]" && i > 0) {    
            //     console.log("------------");
            //     console.log(dataByKeys[path].popup );
            // }

            if(line.includes("/kineticLaw[1]")){
                //console.log(path);
               // alert(path);
                path = path.substr(0, path.indexOf("/kineticLaw[1]"));
                //console.log("path shortend to be added correctly: ", path);
            } 
            else if(line.includes("/listOfModifiers[1]")) path = path.substr(0, path.indexOf("/listOfModifiers[1]"));
            else if(line.includes("/listOfReactants[1]")) path = path.substr(0, path.indexOf("/listOfReactants[1]"));
            else if(line.includes("/listOfProducts[1]")) path = path.substr(0, path.indexOf("/listOfProducts[1]"));

            //console.log("org: ", path);
            if(changeType == "delete" && moveMap[path]) {path = moveMap[path];} //check weather the path was changed due to a move

            if(dataByKeys[path] == null) changes = "";
            else {
                changes = dataByKeys[path].popup;
               // return;
                if(line.includes("/kineticLaw[1]")){              //path already handled -> math already added

                    //alert(changes); 
                    if(changes.includes("Kinetic law<")) return; //kinetic law has already been added
                    //else alert(path);
                }   
            }
            //console.log("add: ", path);
            //console.log(line);

            changes = changes + addChange(changeType, elementType, line, oldDoc, newDoc, dataByKeys, path);
            //if(changes.includes("undefined")) alert(line);
            dataByKeys[path] = {"comodi": id, "popup": changes};

            //  console.log(dataByKeys);
            // if(path == "/sbml[1]/model[1]/listOfSpecies[1]/species[1]") {
            //     i++;
            //     console.log(path);
            //     console.log(dataByKeys[path].popup );


            //     alert("123");
            // }
        }

        //console.log(dataByKeys);
    });
    
    var arr = [["delete", "deletion"], ["insert", "insertion"], ["update", "update"], ["move", "PermutationOfEntities"]];

   // arr.forEach(pair => {
        Object.entries(dataByKeys).forEach(data => {
            //console.log(data);
            comodiGrep = "COMODI todo"; // grep(comodi, data[1].comodi);
            
            dataByKeys[data[0]].comodi = comodiGrep; //!!!!!!!!!!!!!! add all changes
        });
   // });

    return dataByKeys;
}

function addChange(changeType, elementType, line, oldDoc, newDoc, dataByKeys, addPath){
    var htmlChange = "";
    var oldValue, newValue;
    var elementName = "";

    elementType = elementType[0].toUpperCase() + elementType.substring(1);

    if(changeType == "update"){
        if(line.includes("/kineticLaw[")){
            //get path
            var oldPath = regEx(line, "oldPath");
            oldPath = getLocalXPath(oldPath);
            var newPath = regEx(line, "newPath");
            newPath = getLocalXPath(newPath);
            var mathIndexOld = oldPath.indexOf("/*[local-name()='math']");
            var mathIndexNew = newPath.indexOf("/*[local-name()='math']");

            if(mathIndexOld >= 0){
                if(mathIndexNew < 0) console.log("ERROR: Math in old but not in new path.")
                var helpString = oldPath.substr(mathIndex + 23);
                oldPath = oldPath.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));

                helpString = newPath.substr(mathIndex + 23);
                newPath = newPath.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));
            }


            //console.log(oldDoc, path);
            var mathMLOld = oldDoc.evaluate(oldPath, oldDoc, null, XPathResult.ANY_TYPE, null);
            var resultOld = mathMLOld.iterateNext().innerHTML;
            console.log(resultOld);

            var mathMLNew = newDoc.evaluate(newPath, newDoc, null, XPathResult.ANY_TYPE, null);
            var resultNew = mathMLNew.iterateNext().innerHT<ML;
            console.log(resultNew);
            
            return htmlChange += resultOld + " -> " + resultNew;
            // var updates = xmlDocDiff.evaluate(
            //     "/bives/update/*",
            //     xmlDocDiff,
            //     null,
            //     XPathResult.ANY_TYPE,
            //     null
            //   );
        }


        if(elementType == "Attribute"){
            elementName = regEx(line, "name");
            oldValue = regEx(line, "oldValue");
            newValue = regEx(line, "newValue");
        } else {
            oldValue = regEx(line, "oldText");
            newValue = regEx(line, "newText");
        }
        return htmlChange += "<li>" + elementType + " <em><b>" + elementName + "</b></em>" + " has changed: <span class='delete-color'>" + oldValue + "</span> &rarr;  <span class='insert-color'>" + newValue + "</span></li>";
    }

    // if(changeType == "insert"){
    //     if(elementType == "Attribute"){
    //         elementName = regEx(line, "name");
    //         newValue = regEx(line, "newValue");
    //         return htmlChange += "<li>" + elementType + " <em><b>" + elementName + "</b></em> was added: <span class='insert-color'>" + newValue + "</span></li>";
    //     }
        
    //     if(elementType == "Node"){
    //         if(line.includes("newValue=")) newValue = regEx(line, "newValue");
    //         else {
    //             newValue =  regEx(line, "newTag");
    //             if(newValue == "math"){
    //                 alert("got math");
    //                 //console.log(line);
    //                 return htmlChange += "<li>Math handling of inserted Node missing.</li>";
    //             }
    //         }

    //         if(newValue == "reaction"){
    //             htmlChange += "<li><em><b><span class='insert-color'>Reaction</span></b></em> was added</li>";
    //             let newPath = regEx(line, "newPath");
    //             //htmlChange += "<li><em><b>Kinetic law</em></b>:</li>";
    //             htmlChange += "<ul><li>Math: " + getMath(newPath, newDoc) + "</li>";
    //             htmlChange += getParameters(newPath, newDoc, line);
    //             htmlChange += getParameters(newPath, newDoc, line);
    //             return htmlChange += "</ul>";
    //         }
    //        // alert(line);
    //         return htmlChange += "Species <em><b><span class='insert-color'>" + newValue[0].toUpperCase() + newValue.substring(1) + "</span></b></em> was added";

    //     }

    //     if(elementType == "Text") newValue = regEx(line, "newText");
    //     //console.log(newValue, elementType);
    // } 

    if(changeType == "move"){
        let oldParent = regEx(line, "oldParent");
        let newParent = regEx(line, "newParent");
        if(newParent == oldParent || moveMap[oldParent] == newParent){
            let oldPath = regEx(line, "oldPath"); 
            let newPath = regEx(line, "newPath");
            moveMap[oldPath] = newPath;
            return ""; //only the order of elements changed -> irrelevant for graph
        } 

        while(oldParent.lastIndexOf("/") != -1){
            oldParent = oldParent.substr(0, oldParent.lastIndexOf("/"));
            newParent = newParent.substr(0, newParent.lastIndexOf("/"));
            if(moveMap[oldParent] == newParent) return ""; //an ancestor was moved, most likely this move is triggered (but how to make sure?)
        }
        
       // if(moveMap[oldParent] == newParent) return ""; //the parent move for some reason triggered a move of this node

        if(newParent.includes("/math[")){ //display move 
            alert("math move");
            return "oldMath" +  "<<rarr" + "newMath";
           
        } 
        //console.log("move", oldParent);
        //console.log(moveMap);
        alert("! unhandled move");
        return "UNHANDLED MOVE: " + line;
    }

    let changeClass = "bives-default";
    let changeFill = "nothing";
    let tag, doc, docPath;

    if(changeType == "delete") {
        changeClass = "delete-color";
        changeFill = "deleted";
        doc = oldDoc;
        docPath = "oldPath";
        value = "oldValue";
        tag = "oldTag";
    } else if (changeType == "insert") {
        changeClass = "insert-color";
        changeFill = "added";
        doc = newDoc;
        docPath = "newPath";
        value = "newValue";
        tag = "newTag";
    }

    if(elementType == "Attribute"){
        //change on an reaction element
        if(line.includes("/kineticLaw[")){
            if(line.includes("/math[")){
                alert("delete on math attribute");
            } else if(line.includes("/parameter[")){
                alert("attribute change on local parameter");
            } else {
                console.log(line);
                // alert("unidentified attribute change, delete");
                return htmlChange += "<li>Attribute <em><b><span class='" + changeClass + "'>" + regEx(line, "name") + "</span></em></b> of kinetic law was " + changeFill + "</li>";
            }


        } else if(line.includes("listOfReactants[1]") || line.includes("listOfProducts[1]") || line.includes("listOfModifiers[1]")){

            elementName = regEx(line, "name");
            oldValue = regEx(line, value);
            oldPath = getLocalXPath(regEx(line, docPath));
            console.log(oldPath);
            let reactant = doc.evaluate(oldPath, doc, null, XPathResult.ANY_TYPE, null);
            let reactantName = reactant.iterateNext().attributes.species.value;
            let participantRole;
            if(line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if(line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";
            return  "<li>" + elementType + "<span class='" + changeClass + "'><em><b>" + elementName + "</b></em></span> of Reactant <em><b>" + reactantName + "</b></em> was " + changeFill + ": <span class='" + changeClass + "'>" + oldValue + "</span></li>";
        }

        //normal change
        elementName = regEx(line, "name");
        oldValue = regEx(line, value);
        //alert(line);
        return htmlChange += "<li>" + elementType + " <em><b>" + elementName + "</b></em> was " + changeFill + ": <span class='" + changeClass + "'>" + oldValue + "</span></li>";
    }
        
    if(elementType == "Node") {
        let val;
        if(changeType == "insert"){

            if(line.includes("newValue=")) val = regEx(line, "newValue");
            else {
                val =  regEx(line, "newTag");
            }
            //alert("!!!!!")// do it only for reactions not for compartments!
            if(line.includes("/reaction[")){
                let path = getLocalXPath(regEx(line, docPath));
               // console.log(path, path.lastIndexOf("/*"), path.indexOf("[local-name()='reaction']"));
               // alert(path.lastIndexOf("/*") - path.indexOf("[local-name()='reaction']"));
                if(path.lastIndexOf("/*") - path.indexOf("[local-name()='reaction']") == -2 ){
                //    alert("reaction added");
                    htmlChange += "<li><em><b><span class='insert-color'>Reaction</span></b></em> was added</li>";
                    let newPath = regEx(line, "newPath");
                    //htmlChange += "<li><em><b>Kinetic law</em></b>:</li>";
                    //console.log(newPath, line);

                    htmlChange += "<ul>" + getAllParticipant(newPath, newDoc, changeClass);
                    // console.log(htmlChange);
                    // alert();
                    htmlChange += "<li><b><span class='insert-color'>Math</span></b>: " + getMath(newPath, newDoc) + "</li>";
                    htmlChange += "<li><b><span class='insert-color'>Parameters</span></b>: " + getParameters(newPath, newDoc, line) + "</li>";
                    //htmlChange += (newPath, newDoc, line);
                    return htmlChange += "</ul>";
                }
            }
        }
        // console.log(line, changeType, docPath);
        // console.log(regEx(line, docPath));
        // console.log(addPath, dataByKeys[addPath]);
        let nodeTag = regEx(line, tag);
        if(val == "listOfReactants" && dataByKeys[addPath].popup.includes("Reactants</span></b>:")) return "";
        if(val == "listOfProducts" && dataByKeys[addPath].popup.includes("Products</span></b>:")) return "";
        if(val == "listOfParameters" && dataByKeys[addPath].popup.includes("Products</span></b>:")) return "";


        if(line.includes("/math[")){
            if(dataByKeys[addPath].popup.includes("<math xmlns=")) return ""; //math already added, e.g. modifier added
            else{
                console.log(dataByKeys[addPath].popup);
                console.log(changeType, docPath)
                console.log(line);
               // alert("math stuff");
                let path = regEx(line, docPath);
                //console.log(path, docPath, line);
                return htmlChange += "!!---><li><em><b><span class='" + changeClass + "'>Math</span></b></em> was " + changeFill + ":</li> " + getMath(path, doc);
            } 
        }


        if(val == "listOfModifiers"){          //listOfModifiers changed
            if(dataByKeys[addPath].popup.includes("Modifiers</span></b>:")) return "";      //for some reason bives sometimes has an untriggered change on modifiers although the whol reaction is added. BiVeS bug?
            return htmlChange += getModifiers(regEx(line, docPath), doc, changeClass, changeFill);
        }
        if(val == "modifierSpeciesReference"){          //single modifier changed
            return htmlChange += getSingleModifier(regEx(line, docPath), doc, changeClass, changeFill);
        }
        if(line.includes("oldValue=")) oldValue = regEx(line, value);
        else oldValue =  nodeTag;

        if(val == "kineticLaw" && dataByKeys[addPath].popup.includes("Math</span></b>:")) return "";
        else {
            //console.log(val, dataByKeys[addPath]);
            if(val == "kineticLaw") alert("kinetic law issue");
        }

        if(line.includes("speciesReference") || line.includes("modifierSpeciesReference")){ //single Participant added/deleted u
            
            //console.log(line);
            //elementName = regEx(line, "name");
            //oldValue = regEx(line, value);
            let path = getLocalXPath(regEx(line, docPath));
            //console.log(path);
            let reactant = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
            let reactantName = reactant.iterateNext().attributes.species.value;
            let participantRole;
            if(line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if(line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";
            return  "<li>" + participantRole + " <span class='" + changeClass + "'><em><b>" + reactantName + "</b></em></span> was " + changeFill + "</li>";
        }

        if(line.includes("listOfReactants") || line.includes("listOfProducts") || line.includes("listOfModifiers")){
            let path = regEx(line, docPath);
            //console.log(path);
            //let reactant = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
           //let reactantName = reactant.iterateNext().attributes.species.value;
           if(line.includes("listOfModifiers")) path += "/modifierSpeciesReference";
           else path += "/speciesReference";
            let participantRole;
            if(line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if(line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";
            console.log(path);
            alert();
            let participantsList = getParticipants(path, doc);
            return  "<li> List of  <span class='" + changeClass + "'><em><b>" + participantRole + "s</b></em></span> was " + changeFill + ":</li>" + participantsList;

        }

        //It seems that there is a bug in BiVeS: the dupreez example shows a move in the ATP to ADP reaction and also a deletion of the first reactant, as well as an insert of the first reactant. Both are ATP which seems buggy.
        if(changeType == "delete" && oldValue == "speciesReference"){
            return htmlChange += "<li>"+ line + "    HIER?<em><b><span class='" + changeClass + "'>" + oldValue[0].toUpperCase() + oldValue.substring(1) + "</span></b></em> was " + changeFill + "</li>";
        }
        if(changeType == "insert") {
            
            console.log(line);
            alert("take care of insert");
        }
        return htmlChange += "<li>"+ line + "    HIER?<em><b><span class='" + changeClass + "'>" + oldValue[0].toUpperCase() + oldValue.substring(1) + "</span></b></em> was " + changeFill + "</li>";

    }

    if(line.includes("/math[")){
        if(dataByKeys[addPath].popup.includes("<math xmlns=")) return "";
        //else return htmlChange += "<li>Math added: " + getMath(newPath, newDoc) + "</li>";

        console.log(changeType);
        let path = regEx(line, docPath);
        //console.log(path, docPath, line);
        return htmlChange += "<li>hiiiieeer??????    Math " + changeFill + ":</li> " + getMath(path, doc);
    } 
    

    if(line.includes("/kineticLaw[")){
        //get path
        console.log(line);
        alert("SHOULD NOT BE REACHABLE!");
        //alert("kinetic law was " + changeFill);
        var path = regEx(line, docPath);
        path = getLocalXPath(path);
        var mathIndex = path.indexOf("/*[local-name()='math']");

        if(mathIndex >= 0){
            var helpString = path.substr(mathIndex + 23);
            path = path.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));
        }


        //console.log(doc, path);
        var mathML = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
        var result = mathML.iterateNext().innerHTML;
        //console.log(result);
        
        return htmlChange += result + "<-----------------";
        // var updates = xmlDocDiff.evaluate(
        //     "/bives/update/*",
        //     xmlDocDiff,
        //     null,
        //     XPathResult.ANY_TYPE,
        //     null
        //   );
    }
    //return "<li>Some kind of " + changeType + " change is missing!</li>";
    
        //htmlChange += elementType + " <em>" + elementName + "</em> was added: " + newValue;


    return "<li> TODO: " + changeType + " " + elementType + "</li>";
    
}

function getMath(path, doc){
    // var path = regEx(line, "newPath");
    //console.log(path, path.indexOf("/kineticLaw[1]/math[1]/"));
    if(path.indexOf("/kineticLaw[1]/math[1]/") != -1) path = path.substr(0, path.indexOf("/kineticLaw[1]/math[1]/"));
    path += "/kineticLaw[1]/math[1]";
    path = getLocalXPath(path);
    //var mathIndex = path.indexOf("/*[local-name()='math']");

    // if(mathIndex >= 0){
    //     var helpString = path.substr(mathIndex + 23);
    //     path = path.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));
    // }

    //console.log(path);

    var mathML = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
    //console.log(mathML);

    return mathML.outerHTML;//.iterateNext().innerHTML;
}

function getParameters(path, doc, line){
    path += "/kineticLaw[1]/listOfParameters[1]/parameter";
    path = getLocalXPath(path);

    let parameters = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let node = null;
    let parameterlist = "";
    while(node = parameters.iterateNext()){
        parameterlist += "<li>" + node.attributes.name.value + ": " + node.attributes.value.value + "</li>";
    }
    if(parameterlist != "") parameterlist = "<ul>" + parameterlist + "</ul>";
    else parameterlist += "No parameters listed in the document";
    //console.log(parameters);
    //alert(parameters);
    return parameterlist;
}

function getAllParticipant(path, doc, changeClass, changeFill){
    //Reactants
    let participantsList = "";
    let rPath = path + "/listOfReactants/speciesReference";
   
    participantsList += "<li><span class='" + changeClass + "'><b>Reactants</span></b>: ";
    participantsList +=  getParticipants(rPath, doc, changeClass, changeFill);

    //Products
    let pPath = path + "/listOfProducts/speciesReference";
    participantsList += "<li><span class='" + changeClass + "'><b>Products</span></b>: ";
    participantsList +=  getParticipants(pPath, doc, changeClass, changeFill);

    //Modifiers
    let mPath = path + "/listOfModifiers/modifierSpeciesReference";
    participantsList += "<li><span class='" + changeClass + "'><b>Modifiers</span></b>: ";
    participantsList +=  getParticipants(mPath, doc, changeClass, changeFill);

    return participantsList;

    // let pPath = path + "/listOfProducts/speciesReference";
    // participantsList += "<li><span class='" + changeClass + "'><b>Products</span></b>: ";
    // participantsList +=  getParticipants(pPath, doc, changeClass, changeFill);
    // //Modifiers

    // path += "/modifierSpeciesReference";
    // path = getLocalXPath(path);

    // let modifiers = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    // let node = null;
    // let modifiersList = "<li><span class='" + changeClass + "'><em><b>List of modifiers</span></em></b> was " + changeFill + ". Former modifiers:</li><ul>";
    // while(node = modifiers.iterateNext()){
    //     modifiersList += "<li><em><b>" + node.attributes.species.value + "</em></b></li>";
    // }
    // modifiersList += "</ul>";
    // console.log(modifiers);
    // return modifiersList;
}

function getParticipants(path, doc, changeClass, changeFill){
    path = getLocalXPath(path);
    let participant = null;
    let participants = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);

    let participantsList = "";
    while(participant = participants.iterateNext()){
        participantsList += "<li>" + participant.attributes.species.nodeValue + "</li>";
    }
   
    if(participantsList != "") participantsList = "</li><ul>" + participantsList + "</ul>";
    else return "&#8709</li>";

    return participantsList;
}

function getModifiers(path, doc, changeClass, changeFill){
    path += "/modifierSpeciesReference";
    path = getLocalXPath(path);

    let modifiers = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let node = null;
    let modifiersList = "<li><span class='" + changeClass + "'><em><b>List of modifiers</span></em></b> was " + changeFill + ". Former modifiers:</li><ul>";
    while(node = modifiers.iterateNext()){
        modifiersList += "<li><em><b>" + node.attributes.species.value + "</em></b></li>";
    }
    modifiersList += "</ul>";
    //console.log(modifiers);
    return modifiersList;
}

function getSingleModifier(path, doc, changeClass, changeFill){
    path = getLocalXPath(path);
    let modifier = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let mod = modifier.iterateNext();
    //console.log(mod);
    let species =  mod.attributes.species.nodeValue;
    //console.log(species);
    return "<li>Modifier <span class='" + changeClass + "'><em><b>" + species + "</b></em></span> was " + changeFill + "</li>";
}

function getLocalXPath(path) {
    var pathArray;
    var returnPath = "";

    path = path.substr(1);
    pathArray = path.split("/");
    for (var j = 0; j < pathArray.length; j++) {
      var splitArr = pathArray[j].split("[");

      if (splitArr[0] == "text()") {
        //add special cases
        returnPath += "/" + splitArr[0] + "[" + splitArr[1];
      } else if(splitArr[1] == null) {//last element not specified -> path to group
        returnPath += "/*[local-name()='" + splitArr[0] + "']";
      } else returnPath += "/*[local-name()='" + splitArr[0] + "'][" + splitArr[1];
    }
    //returnPath += '/*:' + pathArray[pathArray.length-1];
    return returnPath;
}

function regEx(line, attribute){
   // console.log(line, attribute);
    regex = new RegExp(attribute + '="(.*?)\"', 'g');
    return regex.exec(line)[1];
}

function grep(comodi, id){

    id = id.slice(4,-1);
    //being as precise as possible improves the regex performance
    //<comodi:((?:insertion|deletion|move|update|PermutationOfEntities)) rdf:about="#1".*?\1>
    let regex = new RegExp('<comodi:' + '((?:insertion|deletion|move|update|PermutationOfEntities))' + ' rdf:about="file://bives-differences.patch#' + id + '".*?\\1>', "si");

    return comodi.match(regex)[0];

}