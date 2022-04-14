//this shall function as an interface for divil
import * as showSbgn from './showSbgn';


export function callDiVil(sbgnJson, xmlDiff, v1, v2, containerID) {
    console.log("hey, welcome inside the divil plugin");

    alert("cheekz!");

    showSbgn.showSbgn(sbgnJson, xmlDiff, {}, v1, v2, containerID); //showSbgn(data, xmlDiff, comodiAnnotation, v1, v2);
}


