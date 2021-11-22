function downloadPNG(svgID) {
  img = new Image(),
    serializer = new XMLSerializer(),
    svgStr = serializer.serializeToString(document.querySelector('#' + svgID));

  img.src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);

  // You could also use the actual string without base64 encoding it:
  //img.src = "data:image/svg+xml;utf8," + svgStr;

  var canvas = document.createElement("canvas");

  var w = document.querySelector('#' + svgID).getBoundingClientRect().width;
  var h = document.querySelector('#' + svgID).getBoundingClientRect().height;

  canvas.width = w;
  canvas.height = h;
  img.onload = function () {
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);

    var imgURL = canvas.toDataURL("image/png");


    var dlLink = document.createElement('a');
    dlLink.download = "divil.png";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    console.log(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  }
}


//Source of code: https://stackoverflow.com/questions/37235594/download-svg-as-a-png-image