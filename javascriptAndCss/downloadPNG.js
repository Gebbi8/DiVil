function downloadPNGfromSVG(svgID){
    function drawInlineSVG(ctx, rawSVG, callback) {

        var svg = new Blob([rawSVG], {type:"image/svg+xml;charset=utf-8"}),
            domURL = self.URL || self.webkitURL || self,
            url = domURL.createObjectURL(svg),
            img = new Image;
    
        img.onload = function () {
            ctx.drawImage(this, 0, 0);     
            domURL.revokeObjectURL(url);
            callback(this);
        };
    
        img.src = url;
    }
    
    // usage:
    drawInlineSVG(ctxt, svgText, function() {
        console.log(canvas.toDataURL());  // -> PNG data-uri
    });

}