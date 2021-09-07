function comodiAdder(data, changeType, path){
    
    if(changeType == "delete") path = 'oldPath="' + path + '"';
    else path = 'newPath="' + path + '"';
    return data[changeType][path];
}


function getComodiObj(xmlLines, comodi){


    var dataByKeys = {delete:{}, insert:{}, update:{}, move:{}};
    // produce double key array based on change + path. vlaue comodi term
    var key1 = null;

    xmlLines.forEach(line => {
        if(line.includes("triggeredBy=")) return;
        if(line.includes("insert>")){
            key1 = "insert";
            return;
        } 
        else if(line.includes("delete>")){
            key1 = "delete";
            return;
        } 
        else if(line.includes("update>")){
            key1 = "update";
            return;
        } 
        else if(line.includes("move>")){
            key1 = "move";
            return;
        } if(line.includes("bives>")){
            key1 = null;
            return;
        } 

        else if(key1 != null){ //v mit old bzw newPath belegen+

            var v = line.match(/id=\".*?\"/g)[0];
            var subKey = "";

            if(key1 == "delete"){
                subKey = line.match(/oldPath=\".*?\"/g)[0];
            } else {
                subKey = line.match(/newPath=\".*?\"/g)[0];
            }
            
            dataByKeys[key1][subKey] = v;
        }

        
    });
    
    var arr = [["delete", "deletion"], ["insert", "insertion"], ["update", "update"], ["move", "PermutationOfEntities"]];

    arr.forEach(pair => {
        Object.entries(dataByKeys[pair[0]]).forEach(data => {
            dataByKeys[pair[0]][data[0]] = grep(comodi, data[1]);
        });
    });

    console.log(dataByKeys);
    return dataByKeys;
}

function getHtmlChanges(xmlLines){
    //return id map with html coded changes for pop up overlay
    // structure: element id, list of changes: changid, change



    xmlLines.forEach(line => {

        //filter triggeredby
        if(line.includes("triggeredBy=")) return;

        
    });

}


function grep(comodi, id){

    id = id.slice(4,-1);
    //being as precise as possible improves the regex performance
    //<comodi:((?:insertion|deletion|move|update|PermutationOfEntities)) rdf:about="#1".*?\1>
    let regex = new RegExp('<comodi:' + '((?:insertion|deletion|move|update|PermutationOfEntities))' + ' rdf:about="file://bives-differences.patch#' + id + '".*?\\1>', "si");

    return comodi.match(regex)[0];

}