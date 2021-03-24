function tickArrows(d) {
	//links for costum symbols and multiple links for inserts and updates
	var x1 = d.source.x,
		y1 = d.source.y,
		y2 = d.target.y,
		x2 = d.target.x;

	var element = d3.select("#" + d.target.id).select("path").node();
	var boundingBox = element.getBoundingClientRect();
	//console.log(boundingBox);
	var halfElementWidth = boundingBox.width / 2; ///currentZoom;
	var halfElementHeight = boundingBox.height / 2; ///currentZoom;


	elementClass = sboSwitchArc(d.class);

	//for process nodes: connect arcs to reactant and product ports if ports are activated
	if (document.getElementById("portToggle").checked) {
		if (elementClass == "consumption") {
			x2 = d.target.x - halfElementWidth;
		} else if (elementClass == "production") {
			var sourceWidth = d3.select("#" + d.source.id).select("path").node();
			if (sourceWidth != null) {
				sourceWidth = sourceWidth.getBoundingClientRect().width / 2 / currentZoom;
			} else sourceWidth = 0;
			x1 = d.source.x + sourceWidth;
		}
	}



	var targetClass = sboSwitch(d.target.class);

	//for strechted simpleChem -> targetClass == "simple chemical" && halfElementWidth * 2 <= 35.1)
	if (targetClass == "simple chemical" || targetClass == "source and sink" || ((targetClass == "dissociation" || targetClass == "association") && elementClass != "consumption")) {
		var m = (d.target.y - d.source.y) / (d.target.x - d.source.x);
		var rQuad = Math.pow(halfElementWidth, 2);
		var deter = Math.sqrt(rQuad / (1 + Math.pow((d.target.y - d.source.y) / (d.target.x - d.source.x), 2)));
		var xCross1 = -deter;
		var xCross2 = deter;
		var yCross1 = m * xCross1;
		var yCross2 = m * xCross2;

		if (d.target.x > d.source.x) {
			if (d.target.y > d.source.y) {
				x2 = d.target.x + xCross1;
				y2 = d.target.y + yCross1;
			} else {
				x2 = d.target.x + xCross1;
				y2 = d.target.y + yCross1;
			}
		} else {
			if (d.target.y > d.source.y) {
				x2 = d.target.x + xCross2;
				y2 = d.target.y + yCross2;
			} else {
				x2 = d.target.x + xCross2;
				y2 = d.target.y + yCross2;
			}
		}
	} else if (targetClass == "simple chemical") {
		var m = (d.target.y - d.source.y) / (d.target.x - d.source.x);
		var rectWidth = halfElementWidth * 2 / currentZoom - 17.5 / currentZoom;
		var rectHeight = halfElementHeight * 2;
		var rectM = rectHeight / (rectWidth);
		var rectY, rectX;

		if (Math.abs(m) > Math.abs(rectM)) {
			if (d.target.y > d.source.y) {
				rectY = rectHeight / 2;
			} else {
				rectY = -rectHeight / 2;
			}
			rectX = rectY / m;
			y2 = d.target.y - rectY;
			x2 = d.target.x - rectX;
		} else { // half circles
			var rQuad = 306.25;
			mQuad = Math.pow(m, 2);

			if (d.target.x > d.source.x) {
				var centerX = d.target.x - halfElementWidth * 2 / currentZoom - 17.5 / currentZoom;
				var centerY = d.target.y;

				var sY = centerY - d.source.y;
				var sX = -centerX + d.source.x;
				var tY = 0;
				var tX = d.target.x - centerX;

				m = (tY - sY) / (tX - sX);
				mQuad = Math.pow(m, 2);

				var n = (centerY - d.source.y) - m * (d.source.x - centerX);

				var nQuad = Math.pow(n, 2);
				var p = (m * n) / (1 + mQuad);
				var pQuad = Math.pow(p, 2);
				var q = (nQuad - rQuad) / (1 + mQuad)
				var deter = Math.sqrt(pQuad - q);

				var xCross = -p - deter;
				var yCross = m * xCross + n;

				x2 = centerX + xCross;
				y2 = centerY - yCross;
			} else {
				var centerX = d.target.x + halfElementWidth * 2 / currentZoom - 17.5 / currentZoom;
				var centerY = d.target.y;

				var sY = centerY - d.source.y;
				var sX = -centerX + d.source.x;
				var tY = 0;
				var tX = d.target.x - centerX;

				m = (tY - sY) / (tX - sX);
				mQuad = Math.pow(m, 2);

				var n = (centerY - d.source.y) - m * (d.source.x - centerX);

				var nQuad = Math.pow(n, 2);
				var p = (m * n) / (1 + mQuad);
				var pQuad = Math.pow(p, 2);
				var q = (nQuad - rQuad) / (1 + mQuad)
				var deter = Math.sqrt(pQuad - q);

				var xCross = -p + deter;
				var yCross = m * xCross + n;

				x2 = centerX + xCross;
				y2 = centerY - yCross;
			}

		}
	} else if (targetClass == "macromolecule") {
		var m = (d.target.y - d.source.y) / (d.target.x - d.source.x);
		var rectWidth = halfElementWidth * 2;
		var rectHeight = halfElementHeight * 2;
		var rectM = rectHeight / rectWidth;
		var rectY, rectX;

		if (Math.abs(m) > Math.abs(rectM)) {
			if (d.target.y > d.source.y) {
				rectY = rectHeight / 2;
			} else {
				rectY = -rectHeight / 2;
			}
			rectX = rectY / m;
			y2 = d.target.y - rectY;
			x2 = d.target.x - rectX;
		} else {
			if (d.target.x > d.source.x) {
				rectX = -rectWidth / 2;
			} else {
				rectX = rectWidth / 2;
			}
			rectY = m * rectX;
			y2 = d.target.y + rectY;
			x2 = d.target.x + rectX;
		}
	} else if (targetClass == "complex") {
		var m = (d.source.y - d.target.y) / (d.source.x - d.target.x);
		var n = d.target.y - m * d.target.x;

		//
		var absM = Math.abs(m);

		if (0.5 < absM && absM < 2) {
			var nR;

			if (m < 0) {
				if (d.target.x > d.source.x) { //3. Q
					nR = (d.target.y + 0.5 * halfElementHeight) - (d.target.x - halfElementWidth);
				} else { //1. Q
					nR = (d.target.y - 0.5 * halfElementHeight) - (d.target.x + halfElementWidth);
				}
				x2 = (nR - n) / (m - 1);
				y2 = m * x2 + n;
			} else {
				if (d.target.x > d.source.x) { //2. Q
					nR = (d.target.y - 0.5 * halfElementHeight) + (d.target.x - halfElementWidth);
				} else { //4. Q
					nR = (d.target.y + 0.5 * halfElementHeight) + (d.target.x + halfElementWidth);
				}
				x2 = (nR - n) / (m + 1);
				y2 = m * x2 + n;

			}



		} else if (absM < 0.5) {

			if (d.target.x > d.source.x) {
				x2 = d.target.x - halfElementWidth;
			} else {
				x2 = d.target.x + halfElementWidth;
			}
			y2 = m * x2 + n;
		} else {
			if (d.target.y > d.source.y) {
				y2 = d.target.y - halfElementHeight;
			} else {
				y2 = d.target.y + halfElementHeight;
			}
			x2 = (y2 - n) / m;
		}
	} else if ((targetClass == "process" || targetClass == "inhibition" || targetClass == "conusmption" || targetClass == "production" ||
			targetClass == "modulation" || targetClass == "stimulation" || targetClass == "catalysis" || targetClass == "necessary stimulation") && elementClass != "consumption" && elementClass != "production") {



		var m = (d.source.y - d.target.y) / (d.source.x - d.target.x);
		var n = d.target.y - d.target.x * m;
		/*		var rectWidth = boundingBox.width;
				var rectHeight = boundingBox.height;
				var rectM = rectHeight / rectWidth;
				var rectY, rectX; */

		if (Math.abs(m) > 1) {
			if (d.target.y > d.source.y) {
				y2 = d.target.y - halfElementHeight;
			} else {
				y2 = d.target.y + halfElementHeight;
			}

			//x2 = y2 / m - n;
			x2 = (y2 - n) / m;

		} else {

			if (d.target.x > d.source.x) {
				x2 = d.target.x - halfElementWidth;
			} else {
				x2 = d.target.x + halfElementWidth;;
			}
			y2 = m * x2 + n;
		}
	} else if (targetClass == "unspecified entity") {


		var m = (d.target.y - d.source.y) / (d.target.x - d.source.x);
		var w = halfElementWidth * 2;
		var h = halfElementHeight * 2;

		var deter = Math.sqrt(1 / (1 / Math.pow(w / 2, 2) + Math.pow(m, 2) / Math.pow(h / 2, 2)));
		var xCross1 = deter;
		var xCross2 = -deter;
		var yCross1 = m * xCross1;
		var yCross2 = m * xCross2;

		if (d.source.y < d.target.y) {
			if (d.source.x < d.target.x) {
				x2 = d.target.x + xCross2;
				y2 = d.target.y + yCross2;
			} else {
				x2 = d.target.x + xCross1;
				y2 = d.target.y + yCross1;
			}
		} else {
			if (d.source.x < d.target.x) {
				x2 = d.target.x - xCross1;
				y2 = d.target.y - yCross1;
			} else {
				x2 = d.target.x - xCross2;
				y2 = d.target.y - yCross2;
			}
		}
	}



	if (d.multiIndex != null) { // bend lines
		var pos = d.multiPos;
		if(sameLinks[d.multiIndex] % 2 == 1) pos++;

		var middleX = x1 + (x2-x1)/2;
		var middleY = y1 + (y2-y1)/2;

		var orthY = -(x2-x1)/2;
		var orthX = (y2-y1)/2;
		var lengthFaktor = 1/Math.sqrt(Math.pow(orthX, 2) + Math.pow(orthY, 2));
			
		if ((d.multiPos % 2 == 0 && !d.invert) || (d.multiPos % 2 == 1 && d.invert)){
			middleX = middleX - pos * 25 * lengthFaktor * orthX;
			middleY = middleY - pos * 25 * lengthFaktor * orthY;
			return "M" + x1 + "," + y1 + " Q" + middleX + "," + middleY + " " + x2 + "," + y2;
		} else {
			middleX = middleX + pos * 25 * lengthFaktor * orthX;
			middleY = middleY + pos * 25 * lengthFaktor * orthY;
			return "M" + x1 + "," + y1 + " Q" + middleX + "," + middleY + " " + x2 + "," + y2;
		}
		//return; //side 1
		//case 2:
		//case "insert": return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + (x2) + "," + y2; break;
		//case "delete": return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,0 " + (x2) + "," + y2; break;
		//default:

	} else {
		return "M" + x1 + "," + y1 + " L" + x2 + "," + y2; //straight line
	}

	//return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + x2 + "," + y2;


	//    link.filter(function(d){return sboSwitch(d.class) != 'consumption'})
	//     .attr("stroke-dasharray", function(d) {
	//            return this.getTotalLength() - 5;
	//          })
}

function positionLink_old(d) {
	return "M" + d.source.x + "," + d.source.y +
		" L" + d.target.x + "," + d.target.y;
}