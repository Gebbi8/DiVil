function customSymbol(node, nodeSize ){
	size = nodeSize;

	// DEFINE A COUPLE OF CUSTOM SYMBOLS
	var reactionSize = nodeSize*.7;

	var reaction =
			"m -" + reactionSize*0.5 + " -" + reactionSize*0.5 +
			" h " + reactionSize +
			" v " + reactionSize +
			" h -" + reactionSize +
			" z ";

	var dissociation =
			"m -" + size * 0.5 + " -" + size * 0.5 +
			" m -" + size*0.5 + " " + size*0.5 +
			" a " + size + " " + size + " 0 1 0 " +  size * 2 + " 0" +
			" a " + size + " " + size + " 0 1 0 -" +  size * 2 + " 0" +
			" m " + size*0.3 + " 0" +
			" a " + size*0.7 + " " + size*0.7 + " 0 1 0 " +  size*0.7 * 2 + " 0" +
			" a " + size*0.7 + " " + size*0.7 + " 0 1 0 -" +  size*0.7 * 2 + " 0" +
			" m -" + size*0.3 + " 0" +
			//" m 0 " + size/2 +
			" h -" + size/2 +
			" m " + size*3 + " 0" +
			" h -" + size/2;

	var association =
			"m -" + size * 0.5 + " -" + size * 0.5 +
			" m -" + size*0.5 + " " + size*0.5 +
		  " a " + size + " " + size + " 0 1 0 " +  size * 2 + " 0" +
			" a " + size + " " + size + " 0 1 0 -" +  size * 2 + " 0" +
			" h -" + size/2 +
			" m " + size*3 + " 0" +
			" h -" + size/2;

	var macromolecule =
			"m -" + size*0.5 + " -" +size*0.5 +
			" m " + size*0.1 + " 0" +
			" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 -" + size*0.1 + " " + size*0.1 +
			" l 0 " + size*0.8 +
			" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 " + size*0.1 + " " + size*0.1 +
			" l " + size*0.8 + " 0" +
			" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 " + size*0.1 + " -" + size*0.1 +
			" l 0 -" + size*0.8 +
			" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 -" + size*0.1 + " -" + size*0.1 +
			" z ";

	var unspecifiedEntity =
			"m -" + size + " -" + size * 0 +
		  " a " + size*0.5 + " " + size + " -90 0 1 " +  size*2 + " 0" +
			" a " + size*0.5 + " " + size + " -90 0 1 -" +  size*2 + " 0";

	var sourceAndSinkSize = size *0.5;
	var sourceAndSink =
			"m -" + sourceAndSinkSize * 0.5 + " -" + sourceAndSinkSize * 0.5 +
	 		" m -" + sourceAndSinkSize*0.5 + " " + sourceAndSinkSize*0.5 +
	    " a " + sourceAndSinkSize + " " + sourceAndSinkSize + " 0 1 0 " +  sourceAndSinkSize * 2 + " 0" +
	 		" a " + sourceAndSinkSize + " " + sourceAndSinkSize + " 0 1 0 -" +  sourceAndSinkSize * 2 + " 0" +
	 		" m 0 " + sourceAndSinkSize +
	 		" l " + 2*sourceAndSinkSize + " -" + 2*sourceAndSinkSize;

	var complex =
			"m -" + size*0.5 + " -" + size*0.5 +
	 		" m " + size*0.1 + " 0" +
	 		" l " + size*0.8 + " 0" +
	 		" l " + size*0.1 + " " + size*0.1 +
	 		" l 0 " + size*0.8 +
	 		" l -" + size*0.1 + " " + size*0.1 +
	 		" l -" + size*0.8 + " 0" +
	 		" l -" + size*0.1 + " -" + size*0.1 +
	 		" l 0 -" + size*0.8 +
	 		" z ";

	var perturbingAgent =
			"m -" + size*0.5 + " -" + size*0.5 +
			" l " + size + " 0" +
			" l -" + size*0.125 + " " + size*0.5 +
			" l " + size*0.125 + " " + size*0.5 +
			" l -" + size + " " + " 0" +
			" l " + size*0.125 + " -" + size*0.5 +
			" z ";

	var simpleChemical =
		"m -" + size/2 + " 0" +
		" a " + size/2 + " " + size/2 + " 0 1 0 " +  size  + " 0" +
		" a " + size/2 + " " + size/2 + " 0 1 0 -" +  size  + " 0";

	var missingNode =
		"m -" + size*0.5 + " -" + size*0.5 +
		"l " + size + " " + size +
		"m -" + size + " 0" +
		"l " + size + " -" + size;


	switch (node) {
		case 'simple chemical': return simpleChemical; break;
		case 'reaction':
		case 'process':	return reaction; break;
		case 'dissociation': return dissociation; break;
		case 'association': return association; break;
		case 'macromolecule': return macromolecule; break;
		case 'unspecified entity': return unspecifiedEntity; break;
		case 'source and sink': return sourceAndSink; break;
		case 'complex': return complex; break;
		case 'perturbing agent': return perturbingAgent; break;
		default: console.log("missing node: " + node); return missingNode;

	}

}

/*  'process': reactionLayout,
  'production': reactionLayout,
  'consumption': reactionLayout,
  'modulation': reactionLayout,
  'stimulation': reactionLayout,
  'catalysis': reactionLayout,
  'necessary stimulation': reactionLayout,
*/
