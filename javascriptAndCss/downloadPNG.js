function downloadPNGfromSVG(svgID){

    var svgString = new XMLSerializer()
      .serializeToString(document.querySelector('#'+svgID));

    var canvas = document.createElement("canvas");
    var w=document.querySelector('#'+svgID).getBoundingClientRect().width;
    var h=document.querySelector('#'+svgID).getBoundingClientRect().height;

    canvas.width = w;
    canvas.height = h;
    

    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8"
    });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function() {
      //ctx.drawImage(img, 0, 0);
      canvas.getContext("2d").drawImage(img,0,0,w,h);
      var imgURL = canvas.toDataURL("image/png");
       DOMURL.revokeObjectURL(imgURL);
      var dlLink = document.createElement('a');
      dlLink.download = "image";
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href]
                                  .join(':');
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    }
    img.src = url;
}

//Source of code: https://stackoverflow.com/questions/37235594/download-svg-as-a-png-image