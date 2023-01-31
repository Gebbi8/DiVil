//this shall function as an interface for divil
import * as showSbgn from './showSbgn';
import * as xmlParser from './xmlParser';

export function initDivil(xmlDiff, v1, v2) {
    //init all static/computed properties
    let xmlLines = xmlDiff.split(/\r?\n/);
    let structeredData = xmlParser.getStructeredData(xmlLines, {}, v1, v2);

    return structeredData;

};

export function stopD3ForceOfDivil(containerID) {
    showSbgn.stopD3ForceOfDivil(containerID);
}


export function callDiVil(sbgnJson, xmlDiff, v1, v2, containerID, changeListID, structeredData) {

    showSbgn.showSbgn(sbgnJson, xmlDiff, {}, v1, v2, containerID, changeListID, structeredData); //showSbgn(data, xmlDiff, comodiAnnotation, v1, v2);
}


