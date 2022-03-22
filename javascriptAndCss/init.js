//this shall function as an interface for divil
import * as showSbgn from './showSbgn.js';


export function callDiVil(sbgnJson) {
    console.log("hey, welcome inside the divil plugin");
    showSbgn.showSbgn(sbgnJson, {}, {}, {}, {}); //showSbgn(data, xmlDiff, comodiAnnotation, v1, v2);
}


