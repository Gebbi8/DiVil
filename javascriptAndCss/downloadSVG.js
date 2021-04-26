function downloadSvg(domId){
    var domNode = document.getElementById(domId).outerHTML;

    var blob = new Blob([domNode], {type: "image/svg+xml;charset=utf-8"});
	saveAs(blob, "version-diff.svg");
}