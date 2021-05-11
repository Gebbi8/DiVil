function comodiAdder(data, changeType, path){
    return data[changeType][path];
}

function comodiParser(xmlDiff, comodi){

    const splitLines = str => str.split(/\r?\n/);

    var strLines = splitLines(xmlDiff);
    var dataByKeys = {delete:{}, insert:{}, update:{}, move:{}};
    // produce double key array based on change + path. vlaue comodi term
    var key1 = null;

    strLines.forEach(line => {
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
            dataByKeys[pair[0]][data[0]] = grep(comodi, pair[1], data[1]);
        });
    });

    console.log(dataByKeys);
    return dataByKeys;
}
//irgendwie noch regex nur abhängig von id
function grep(comodi, changeType, id){
    //     <comodi:(.*?) rdf:about="#1".*?\1>
    id = id.slice(4,-1);
    let regex = new RegExp('<comodi:' + '(.*?)' + ' rdf:about="#' + id + '".*?\\1>', "si");
    return comodi.match(regex)[0];

}