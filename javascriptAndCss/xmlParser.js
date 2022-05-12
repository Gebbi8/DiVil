function getStructeredData(xmlLines, comodi, v1, v2) {

    var parser = new DOMParser();

    // Use it to turn your xmlString into an XMLDocument
    var oldDoc = parser.parseFromString(v1, "application/xml");
    var newDoc = parser.parseFromString(v2, "application/xml");


    moveMap = {};

    var dataByNetwork = {}; //element id, changetype, changeinfo/changehtml
    var dataByKeys = {};

    // produce double key array based on change + path. vlaue comodi term
    var changeType = null;
    var changes = "";
    var ids;

    //debugging
    var i = 0;
    // -- create move map
    let moveFlag = 0;
    xmlLines.forEach(line => {
        if (line.includes("<move>")) {
            moveFlag = 1;
            return;
        }
        if (line.includes("</move>")) {
            moveFlag = 0;
            return;
        }
        if (moveFlag) {
            // console.log(line)
            let oldPath = regEx(line, "oldPath");
            let newPath = regEx(line, "newPath");
            moveMap[oldPath] = newPath;
        }
    })

    xmlLines.forEach(line => {
        //skip all changes that are irrelevant for the graph and child nodes of kinetic law
        if (line.includes("triggeredBy=") || line.includes("listOfRules[") || line.includes("/notes[") ||
            line.includes("/listOfFunctionDefinitions[") || line.includes("listOfUnitDefinitions[") || line.includes("/sbml[1]/model[1]/listOfParameters[")) return;
        if (line.includes("insert>")) {
            changeType = "insert";
            return;
        }
        if (line.includes("delete>")) {
            changeType = "delete";
            return;
        }
        if (line.includes("update>")) {
            changeType = "update";
            return;
        }
        if (line.includes("move>")) {
            changeType = "move";
            return;
        }
        //if change changes of the singel classes where detected or list ends/starts return and set to type to null
        if (line.includes("bives>") || line.includes("<insert />") || line.includes("<delete />") || line.includes("<update />") || line.includes("<move />")) {
            changeType = null;
            return;
        }

        if (changeType != null) { //second key old bzw newPath belegen

            var id = regEx(line, "id");  //for comodi grep           

            elementType = line.match(/<.*? /g)[0].slice(1, -1);

            // if(changeType == "move" && line.includes("oldPath")){   
            //     console.log(line);
            //     let oldPath = regEx(line, "oldPath");
            //     let newPath = regEx(line, "newPath");
            //     if(oldPath == newPath) return; //same path means there is no move (?), other elements might be inserted before thats it
            //     moveMap[oldPath] = newPath;
            //     //console.log(moveMap);
            // }

            let path;

            if (line.includes("/annotation[")) {

                if (changeType == "delete") {
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
                if (changeType == "delete" && moveMap[path]) path = moveMap[path]; //parent of deleted annotation was moved

                if (dataByKeys[path] == null) {
                    changes = "";
                    ids = [];
                }
                else {
                    changes = dataByKeys[path].popup;
                    ids = dataByKeys[path].comodi;
                }
                if (changes.includes("<li>Annotations were changed,")) return;

                ids.push(id);
                changes += "<li>Annotations were changed, which is not displayed here.</li>"
                dataByKeys[path] = { "comodi": ids, "popup": changes };
                return;
            }


            if (changeType == "delete") {
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

            if (line.includes("/kineticLaw[1]")) {
                //console.log(path);
                // alert(path);
                path = path.substr(0, path.indexOf("/kineticLaw[1]"));
                //console.log("path shortend to be added correctly: ", path);
            }
            else if (line.includes("/listOfModifiers[1]")) path = path.substr(0, path.indexOf("/listOfModifiers[1]"));
            else if (line.includes("/listOfReactants[1]")) path = path.substr(0, path.indexOf("/listOfReactants[1]"));
            else if (line.includes("/listOfProducts[1]")) path = path.substr(0, path.indexOf("/listOfProducts[1]"));

            //console.log("org: ", path);
            if (changeType == "delete" && moveMap[path]) { path = moveMap[path]; } //check weather the path was changed due to a move

            if (dataByKeys[path] == null) {
                changes = "";
                ids = [id];
            }
            else {
                changes = dataByKeys[path].popup;
                ids = dataByKeys[path].comodi;
                ids.push(id);
                // return;
                if (line.includes("/kineticLaw[1]")) {              //path already handled -> math already added

                    if (changes.includes("Kinetic law<")) return; //kinetic law has already been added
                }
            }


            if (changeType == "delete" && elementType == "node") {

                let oldTag = regEx(line, "oldTag");
                if (oldTag == "species" || oldTag == "compartment" || oldTag == "reaction") path = "old-" + path;
            }

            changes = changes + addChange(changeType, elementType, line, oldDoc, newDoc, dataByKeys, path);
            dataByKeys[path] = { "comodi": ids, "popup": changes };

        }

    });

    var arr = [["delete", "deletion"], ["insert", "insertion"], ["update", "update"], ["move", "PermutationOfEntities"]];

    Object.entries(dataByKeys).forEach(data => {
        //console.log(data);

        let comodiChanges = ""
        data[1].comodi.forEach(id => {
            comodiChanges += grep(comodi, id);
        })
        dataByKeys[data[0]].comodi = comodiChanges; //add all changes
    });

    return dataByKeys;
}

function addChange(changeType, elementType, line, oldDoc, newDoc, dataByKeys, addPath) {
    var htmlChange = "";
    var oldValue, newValue;
    var elementName = "";

    let changeClass = "bives-default";
    let changeFill = "nothing";
    let tag, doc, docPath;
    let path;

    if (changeType == "delete") {               //set paths and docs according to change type
        changeClass = "delete-color";
        changeFill = "deleted";
        doc = oldDoc;
        docPath = "oldPath";
        value = "oldValue";
        tag = "oldTag";
        path = regEx(line, docPath);

    } else if (changeType == "insert") {
        changeClass = "insert-color";
        changeFill = "added";
        doc = newDoc;
        docPath = "newPath";
        value = "newValue";
        tag = "newTag";
        path = regEx(line, docPath);

    } else if (changeType == "update") {
        changeClass = "update-color";
    }



    elementType = elementType[0].toUpperCase() + elementType.substring(1);

    if (changeType == "update") {
        if (line.includes("/kineticLaw[")) {
            var oldPath = regEx(line, "oldPath");
            oldPath = getLocalXPath(oldPath);
            var newPath = regEx(line, "newPath");
            newPath = getLocalXPath(newPath);
            if (line.includes("/listOfParam")) { //update of local Parameter
                let changedAttr = regEx(line, "name");
                let oldVal = regEx(line, "oldValue");
                let newVal = regEx(line, "newValue");
                // let oldParameter = oldDoc.evaluate(oldPath, oldDoc, null, XPathResult.ANY_TYPE, null).iterateNext();
                let newParameter = newDoc.evaluate(newPath, newDoc, null, XPathResult.ANY_TYPE, null).iterateNext();

                let parameterName;
                if (newParameter.attributes.name) parameterName = newParameter.attributes.name.value;
                else parameterName = newParameter.attributes.id;
                return htmlChange += "<li>Attribute <em><b><span class='" + changeClass + "'>" + changedAttr + "</span></b></em> of local parameter <b><em>" + parameterName + "</em></b> changed: " + oldVal + " &rarr; " + newVal;
            }
            //get path

            var mathIndexOld = oldPath.indexOf("/*[local-name()='math']");
            var mathIndexNew = newPath.indexOf("/*[local-name()='math']");

            if (mathIndexOld >= 0) {
                if (mathIndexNew < 0) console.log("ERROR: Math in old but not in new path.");
                var helpString = oldPath.substr(mathIndex + 23);
                oldPath = oldPath.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));

                helpString = newPath.substr(mathIndex + 23);
                newPath = newPath.substr(0, mathIndex + 23) + helpString.substr(0, helpString.indexOf("/"));
            }


            var mathMLOld = oldDoc.evaluate(oldPath, oldDoc, null, XPathResult.ANY_TYPE, null);
            var resultOld = mathMLOld.iterateNext().innerHTML;
            console.log(resultOld);

            var mathMLNew = newDoc.evaluate(newPath, newDoc, null, XPathResult.ANY_TYPE, null);
            var resultNew = mathMLNew.iterateNext().innerHTML;
            //console.log(resultNew);

            return htmlChange += resultOld + " &rarr; " + resultNew;
            // var updates = xmlDocDiff.evaluate(
            //     "/bives/update/*",
            //     xmlDocDiff,
            //     null,
            //     XPathResult.ANY_TYPE,
            //     null
            //   );
        }


        if (elementType == "Attribute") {
            elementName = regEx(line, "name");
            oldValue = regEx(line, "oldValue");
            newValue = regEx(line, "newValue");
        } else {
            oldValue = regEx(line, "oldText");
            newValue = regEx(line, "newText");
        }
        let effectedNode = regEx(line, "newPath");
        effectedNode = effectedNode.substring(effectedNode.lastIndexOf("/") + 1, effectedNode.lastIndexOf("["));
        return htmlChange += "<li>" + elementType + " <em><b>" + elementName + "</b></em> of <em><b>" + effectedNode + "</b></em> has changed: <span class='delete-color'>" + oldValue + "</span> &rarr;  <span class='insert-color'>" + newValue + "</span></li>";
    }

    if (changeType == "move") {
        let oldParent = regEx(line, "oldParent");
        let newParent = regEx(line, "newParent");
        if (newParent == oldParent || moveMap[oldParent] == newParent) {
            let oldPath = regEx(line, "oldPath");
            let newPath = regEx(line, "newPath");
            moveMap[oldPath] = newPath;
            return ""; //only the order of elements changed -> irrelevant for graph
        }

        while (oldParent.lastIndexOf("/") != -1) {
            oldParent = oldParent.substr(0, oldParent.lastIndexOf("/"));
            newParent = newParent.substr(0, newParent.lastIndexOf("/"));
            if (moveMap[oldParent] == newParent) return ""; //an ancestor was moved, most likely this move is triggered (but how to make sure?)
        }

        // if(moveMap[oldParent] == newParent) return ""; //the parent move for some reason triggered a move of this node

        // if(newParent.includes("/math[")){ //display move 
        //     alert("math move");
        //     return "oldMath" +  "<<rarr" + "newMath";

        // } 
        //console.log("move", oldParent);
        //console.log(moveMap);
        alert("A change (move) occured that is currently not handled by DiVil. Please contact tom.gebhardt@uni-rostock.de. At best you already attach you files to the mail.");
        return "UNHANDLED MOVE: " + line;
    }

    if (elementType == "Attribute") {
        //change on an reaction element
        let name;
        if (regEx(line, "name")) name = regEx(line, "name");
        else name = regEx(line, "id");
        if (line.includes("/kineticLaw[")) { //change is in child node of kinetic law
            if (line.includes("/math[")) {
                alert(changeType + " on math attribute"); //is not expected to occur
            } else if (line.includes("/parameter[") || line.includes("/localParameter[")) { // change on parameter attribute in kin. law //localParameter for SBML version 3
                let changeValue = regEx(line, value);

                //get node
                path = getLocalXPath(path);
                let node = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
                node = node.iterateNext();
                let parameterName;
                if (node.attributes.name) parameterName = node.attributes.name.nodeValue;
                else {
                    parameterName = node.attributes.id.nodeValue;
                }
                return htmlChange += "<li>Attribute <span class='" + changeClass + "'><em><b>" + name + "</b></em></span> of local paramter <em><b>" + parameterName + "</b></em> was " + changeFill + ": <span class='" + changeClass + "'><em><b>" + changeValue + "</b></em></span></li>";
            } else {
                return htmlChange += "<li>Attribute <em><b><span class='" + changeClass + "'>" + regEx(line, "name") + "</span></em></b> of kinetic law was " + changeFill + "</li>";
            }


        } else if (line.includes("listOfReactants[1]") || line.includes("listOfProducts[1]") || line.includes("listOfModifiers[1]")) {

            //console.log(line);

            elementName = regEx(line, "name");
            let val = regEx(line, value);
            path = getLocalXPath(regEx(line, docPath));
            let participant = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
            //console.log(path);
            participant = participant.iterateNext();
            let participantName = participant.attributes.species.value;
            let participantRole;
            if (line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if (line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";

            // console.log(participantRole, doc.getElementById(participantName));

            //grep name of species if available
            let getName = doc.getElementById(participantName);
            //console.log(getName.attributes);
            if (getName.attributes.name) participantName = getName.attributes.name.value;

            return "<li>" + elementType + " <span class='" + changeClass + "'><em><b>" + elementName + "</b></em></span> of " + participantRole + " <em><b>" + participantName + "</b></em> was " + changeFill + ": <span class='" + changeClass + "'>" + val + "</span></li>";
        }

        //normal change
        elementName = regEx(line, "name");
        oldValue = regEx(line, value);
        //alert(line);
        return htmlChange += "<li>" + elementType + " <em><b>" + elementName + "</b></em> was " + changeFill + ": <span class='" + changeClass + "'>" + oldValue + "</span></li>";
    } // end of Attribute handling

    if (elementType == "Node") {
        let val;
        if (line.includes("newValue") || line.includes("oldValue")) val = regEx(line, value);
        else val = regEx(line, tag);

        if (val == "kineticLaw") { //kinetic law was added/deleted

            path += "/math[1]"; //path to math of the specific law
            let math = getMath(path, doc);
            if (math) htmlChange += "<li><b><span class='" + changeClass + "'>Kinetic Law</span></b> was " + changeFill + ": " + math + "</li>";
            else htmlChange += "<li><b><span class='" + changeClass + "'>Kinetic law</span></b> was " + changeFill + " without math.</li>";
            return htmlChange;
        }

        if (changeType == "insert") {
            // do it only for reactions not for compartments!   //TODO: checken ob es das auch für deletes gibt -> mergen oder adaptieren
            if (line.includes("/reaction[")) {
                path = getLocalXPath(regEx(line, docPath));

                if (path.lastIndexOf("/*") - path.indexOf("[local-name()='reaction']") == -2) {
                    htmlChange += "<li><em><b><span class='insert-color'>Reaction</span></b></em> was added</li>";
                    let newPath = regEx(line, "newPath");

                    htmlChange += "<ul>" + getAllParticipant(newPath, newDoc, changeClass);

                    let math = getMath(newPath, newDoc);
                    if (math) htmlChange += "<li><b><span class='insert-color'>Math</span></b>: " + math + "</li>";

                    let parameters = getParameters(newPath, newDoc, line);
                    if (parameters) htmlChange += "<li><b><span class='insert-color'>Parameters</span></b>: " + parameters + "</li>";
                    return htmlChange += "</ul>";
                }

            }



        }
        // console.log(line, changeType, docPath);
        // console.log(regEx(line, docPath));
        // console.log(addPath, dataByKeys[addPath]);
        let nodeTag = regEx(line, tag);
        if (val == "listOfReactants" && dataByKeys[addPath].popup.includes("Reactants</span></b>:")) return "";
        if (val == "listOfProducts" && dataByKeys[addPath].popup.includes("Products</span></b>:")) return "";
        if (val == "listOfParameters" && dataByKeys[addPath].popup.includes("Parameters</span></b>:")) return "";
        if (val == "listOfLocalParameters" && dataByKeys[addPath].popup.includes("Parameters</span></b>:")) return "";


        if (line.includes("/math[")) {
            if (dataByKeys[addPath].popup.includes("<math xmlns=")) { //math already added, e.g. modifier added
                console.log("multiple changes in one kinetic law");
                //alert("Error: Change in a kinetic law that was already")
                return "";
            }
            else { //hier changes inside kinetic law. no full delete or insert
                // console.log(dataByKeys[addPath].popup);
                // console.log(changeType, docPath)
                // console.log(line);
                // alert("math stuff");
                path = regEx(line, docPath);
                //console.log(path, docPath, line);
                math = getMath(path, doc);
                //console.log(math);
                //alert("Math stuff");

                let oldMath, newMath;
                console.log(path, moveMap);

                path = path.substr(0, path.indexOf("/kineticLaw"))
                console.log(path);
                //alert("!!");

                if (changeType == "delete") {
                    oldMath = getMath(path, doc);
                    console.log(path);
                    newMath = getMath(moveMap[path], newDoc);
                } else {
                    newMath = getMath(path, doc);
                    //reverse moveMap?
                    moveMap.forEach((move) => {
                        if (move[1] == path) {
                            oldMath = getMath(move[0], oldDoc);
                            //alert("wololo");
                            return;
                        }
                    })
                    if (oldMath == null) {
                        oldMath = getMath(path, oldDoc);
                        //alert("aha");
                    }
                }

                return htmlChange += "Math changed: <span class='delete-color'>" + oldMath + "</span> &rarr;  <span class='insert-color'>" + newMath + "</span>";
                //return htmlChange += "!!---><li><em><b><span class='" + changeClass + "'>Math</span></b></em> was " + changeFill + ":</li> " + getMath(path, doc) + "<---";
            }
        }

        if (val == "listOfModifiers") {          //listOfModifiers changed
            if (dataByKeys[addPath].popup.includes("Modifiers</span></b>:")) return "";      //for some reason bives sometimes has an untriggered change on modifiers although the whol reaction is added. BiVeS bug?
            return htmlChange += getModifiers(regEx(line, docPath), doc, changeClass, changeFill);
        }
        if (val == "modifierSpeciesReference") {          //single modifier changed
            //console.log(line);
            return htmlChange += getSingleModifier(regEx(line, docPath), doc, changeClass, changeFill);
        }
        if (line.includes("oldValue=")) oldValue = regEx(line, value);
        else oldValue = nodeTag;

        if (val == "kineticLaw" && dataByKeys[addPath].popup.includes("Math</span></b>:")) return ""; //kinetic law changed but already in popup due to other changes
        else {
            //alert(val)
            console.log(val, addPath, dataByKeys[addPath]);
            console.log(line, docPath, "type:", changeType, changeClass, changeFill);
            if (val == "kineticLaw") alert("kinetic law issue");
        }

        if (line.includes("speciesReference") || line.includes("modifierSpeciesReference")) { //single Participant added/deleted u
            //alert("okay :/");
            //console.log(line);
            //elementName = regEx(line, "name");
            //oldValue = regEx(line, value);
            path = getLocalXPath(regEx(line, docPath));
            //console.log(path);
            let participant = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
            let participantName = participant.iterateNext().attributes.species.value;
            let participantRole;
            if (line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if (line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";

            //grep name of species if available

            let node = doc.getElementById(participantName);
            if (node.hasAttribute("name")) participantName = node.attributes.name.value;

            return "<li>" + participantRole + " <span class='" + changeClass + "'><em><b>" + participantName + "</b></em></span> was " + changeFill + "</li>";
        }

        if (line.includes("listOfReactants") || line.includes("listOfProducts") || line.includes("listOfModifiers")) {
            path = regEx(line, docPath);
            //console.log(path);
            //let reactant = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
            //let reactantName = reactant.iterateNext().attributes.species.value;
            if (line.includes("listOfModifiers")) path += "/modifierSpeciesReference";
            else path += "/speciesReference";
            let participantRole;
            if (line.includes("listOfReactants[1]")) participantRole = "Reactant";
            else if (line.includes("listOfProducts[1]")) participantRole = "Product";
            else participantRole = "Modifier";
            //console.log(path);
            //alert();
            let participantsList = getParticipants(path, doc);
            return "<li> List of  <span class='" + changeClass + "'><em><b>" + participantRole + "s</b></em></span> was " + changeFill + ":</li>" + participantsList;

        }

        //It seems that there is a bug in BiVeS: the dupreez example shows a move in the ATP to ADP reaction and also a deletion of the first reactant, as well as an insert of the first reactant. Both are ATP which seems buggy.
        if (changeType == "delete" && oldValue == "speciesReference") {
            console.log(line);
            return htmlChange += "<li>" + line + "<em><b><span class='" + changeClass + "'>" + oldValue[0].toUpperCase() + oldValue.substring(1) + "</span></b></em> was " + changeFill + "</li>";
        }
        // if(changeType == "insert") {

        //     console.log(line);
        //     alert("take care of insert");
        // }
        return htmlChange += "<li><em><b><span class='" + changeClass + "'>" + oldValue[0].toUpperCase() + oldValue.substring(1) + "</span></b></em> was " + changeFill + "</li>";

    }

    if (line.includes("/math[")) {
        if (dataByKeys[addPath].popup.includes("<math xmlns=")) return "";
        //else return htmlChange += "<li>Math added: " + getMath(newPath, newDoc) + "</li>";

        console.log(changeType);
        path = regEx(line, docPath);
        //console.log(path, docPath, line);
        return htmlChange += "<li>Math " + changeFill + ":</li> " + getMath(path, doc);
    }


    //return "<li>Some kind of " + changeType + " change is missing!</li>";

    //htmlChange += elementType + " <em>" + elementName + "</em> was added: " + newValue;


    return "<li> TODO: " + changeType + " " + elementType + ". You found an unhandled change, please contact the developer: tom.gebhardt@uni-rostock.de</li>";

}

function getMath(path, doc) {

    if (path.indexOf("/kineticLaw[1]/math[1]/") != -1) {
        path = path.substr(0, path.indexOf("/kineticLaw[1]/math[1]/"));
        path += "/kineticLaw[1]/math[1]";
    }

    path = getLocalXPath(path);
    var mathML = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null).iterateNext();

    if (mathML == null) return mathML;
    return mathML.outerHTML;
}

function getParameters(path, doc, line) {
    if (line.includes("listOfLocalParameters")) path += "/kineticLaw[1]/listOfLocalParameters[1]/parameter";
    else path += "/kineticLaw[1]/listOfParameters[1]/parameter";

    path = getLocalXPath(path);

    let parameters = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let node = null;
    let parameterlist = "";
    while (node = parameters.iterateNext()) {
        parameterlist += "<li>" + node.attributes.name.value + ": " + node.attributes.value.value + "</li>";
    }
    if (parameterlist != "") parameterlist = "<ul>" + parameterlist + "</ul>";
    else parameterlist += "No parameters listed in the document";

    return parameterlist;
}

function getAllParticipant(path, doc, changeClass, changeFill) {
    //Reactants
    let participantsList = "";
    let rPath = path + "/listOfReactants/speciesReference";

    participantsList += "<li><span class='" + changeClass + "'><b>Reactants</span></b>: ";
    participantsList += getParticipants(rPath, doc, changeClass, changeFill);

    //Products
    let pPath = path + "/listOfProducts/speciesReference";
    participantsList += "<li><span class='" + changeClass + "'><b>Products</span></b>: ";
    participantsList += getParticipants(pPath, doc, changeClass, changeFill);

    //Modifiers
    let mPath = path + "/listOfModifiers/modifierSpeciesReference";
    participantsList += "<li><span class='" + changeClass + "'><b>Modifiers</span></b>: ";
    participantsList += getParticipants(mPath, doc, changeClass, changeFill);

    return participantsList;
}

function getParticipants(path, doc, changeClass, changeFill) {
    path = getLocalXPath(path);
    let participant = null;
    let participants = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);

    let participantsList = "";
    while (participant = participants.iterateNext()) {
        let participantName = participant.attributes.species.nodeValue;
        //grep name of species if available
        let node = doc.getElementById(participantName);
        if (node.hasAttribute("name")) participantName = node.attributes.name.value;
        participantsList += "<li>" + participantName + "</li>";
    }

    if (participantsList != "") participantsList = "</li><ul>" + participantsList + "</ul>";
    else return "&#8709</li>";

    return participantsList;
}

//könnte man in die Fkt davor intigrieren
function getModifiers(path, doc, changeClass, changeFill) {
    path += "/modifierSpeciesReference";
    path = getLocalXPath(path);

    let modifiers = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let node = null;
    let modifiersList = "<li><span class='" + changeClass + "'><em><b>List of modifiers</span></em></b> was " + changeFill + ":</li><ul>";
    while (node = modifiers.iterateNext()) {
        let participantName = node.attributes.species.nodeValue;
        //grep name of species if available
        let getName = doc.getElementById(participantName).attributes.name.value;
        if (getName) participantName = getName;
        modifiersList += "<li><em><b>" + participantName + "</em></b></li>";
    }
    modifiersList += "</ul>";
    return modifiersList;
}

function getSingleModifier(path, doc, changeClass, changeFill) {
    path = getLocalXPath(path);
    let modifier = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
    let mod = modifier.iterateNext();
    let speciesName = mod.attributes.species.nodeValue;
    let getName = doc.getElementById(speciesName);
    if (getName.attributes.name) speciesName = getName.attributes.name.value;

    return "<li>Modifier <span class='" + changeClass + "'><em><b>" + speciesName + "</b></em></span> was " + changeFill + "</li>";
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
        } else if (splitArr[1] == null) {//last element not specified -> path to group
            returnPath += "/*[local-name()='" + splitArr[0] + "']";
        } else returnPath += "/*[local-name()='" + splitArr[0] + "'][" + splitArr[1];
    }
    //returnPath += '/*:' + pathArray[pathArray.length-1];
    return returnPath;
}

function regEx(line, attribute) {
    regex = new RegExp(attribute + '="(.*?)\"', 'g');
    return regex.exec(line)[1];
}

function grep(comodi, id) {
    let regex = new RegExp('<comodi:' + '((?:Insertion|Deletion|Move|Update|PermutationOfEntities))' + ' rdf:about="file://bives-differences.patch#' + id + '".*?\\1>', "si");
    let comodiSnippet = comodi.match(regex)[0];


    let type = comodiSnippet.substring(8, comodiSnippet.indexOf(" "));
    let firstSpace = comodiSnippet.indexOf(" ");

    comodiSnippet =
        `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:comodi="http://purl.uni-rostock.de/comodi/comodi#">
                <rdf:Description rdf:about ="#` + id + '">' + comodiSnippet +
        `</rdf:Description>
          </rdf:RDF>`;
    return comodiSnippet;
}

function stringInsert(string, pos, insert) {
    return string.substring(0, pos) + insert + string.substring(pos);
}