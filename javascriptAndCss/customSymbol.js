function customSymbol(node, nodeSize) {
	size = nodeSize;

	// DEFINE A COUPLE OF CUSTOM SYMBOLS
	var reactionSize = nodeSize * .3;
	var emptySize = nodeSize * 0.4;

	var reaction =
		"m -" + reactionSize * 0.5 + " -" + reactionSize * 0.5 +
		" h " + reactionSize +
		" v " + reactionSize +
		" h -" + reactionSize +
		" z ";

	var dissociation =
		"m -" + size * 0.5 + " -" + size * 0.5 +
		" m -" + size * 0.5 + " " + size * 0.5 +
		" a " + size + " " + size + " 0 1 0 " + size * 2 + " 0" +
		" a " + size + " " + size + " 0 1 0 -" + size * 2 + " 0" +
		" m " + size * 0.3 + " 0" +
		" a " + size * 0.7 + " " + size * 0.7 + " 0 1 0 " + size * 0.7 * 2 + " 0" +
		" a " + size * 0.7 + " " + size * 0.7 + " 0 1 0 -" + size * 0.7 * 2 + " 0" +
		" m -" + size * 0.3 + " 0" +
		" h -" + size / 2 +
		" m " + size * 3 + " 0" +
		" h -" + size / 2;

	var association =
		"m -" + size * 0.5 + " -" + size * 0.5 +
		" m -" + size * 0.5 + " " + size * 0.5 +
		" a " + size + " " + size + " 0 1 0 " + size * 2 + " 0" +
		" a " + size + " " + size + " 0 1 0 -" + size * 2 + " 0" +
		" h -" + size / 2 +
		" m " + size * 3 + " 0" +
		" h -" + size / 2;

	var macromolecule =
		"m -" + size * 0.8 + " -" + size * 0.3 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + size * 0.1 + " " + -size * 0.1 +
		" l " + size * 1.4 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + size * 0.1 + " " + size * 0.1 +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.4 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1 +
		" z ";

	var nucleicAcidFeature =
		"m -" + size * 0.75 + " -" + size * 0.4 +
		" l " + size * 1.5 + " 0" +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1 +
		" z ";

	var nucleicAcidFeatureMultimer =
		"m -" + size * 0.75 + " -" + size * 0.4 +
		" l " + size * 1.5 + " 0" +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1 +
		" z " +
		" m " + 1.5 * size + " " + 0.1 * size +
		" l " + size * 0.1 + " 0" +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1;

	var macromoleculeMultimer =
		"m -" + size * 0.8 + " -" + size * 0.3 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + size * 0.1 + " " + -size * 0.1 +
		" l " + size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + size * 0.1 + " " + size * 0.1 +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1 +
		" z " + 
		"m " + size * 1.5 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + size * 0.1 + " " + size * 0.1 +
		" l 0 " + size * 0.6 +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + size * 0.1 +
		" l " + -size * 1.3 + " 0" +
		" a " + size * 0.1 + " " + size * 0.1 + " 0 0 1 " + -size * 0.1 + " " + -size * 0.1;

	var unspecifiedEntity =
		"m -" + size + " -" + size * 0 +
		" a " + size * 0.5 + " " + size + " -90 0 1 " + size * 2 + " 0" +
		" a " + size * 0.5 + " " + size + " -90 0 1 -" + size * 2 + " 0";

	var sourceAndSink =
		"m -" + emptySize * 0.5 + " -" + emptySize * 0.5 +
		" m -" + emptySize * 0.5 + " " + emptySize * 0.5 +
		" a " + emptySize + " " + emptySize + " 0 1 0 " + emptySize * 2 + " 0" +
		" a " + emptySize + " " + emptySize + " 0 1 0 -" + emptySize * 2 + " 0" +
		" m 0 " + emptySize +
		" l " + 2 * emptySize + " -" + 2 * emptySize;

	var complex =
		"m -" + size * 1.5 + " -" + size * 0.5 +
		" m " + size * 0.25 + " 0" +
		" l " + size * 0.75 + " 0" +
		" l " + size * 0.25 + " " + size * 0.25 +
		" l 0 " + size * 0.5 +
		" l -" + size * 0.25 + " " + size * 0.25 +
		" l -" + size * 0.5 + " 0" +
		" l -" + size * 0.25 + " -" + size * 0.25 +
		" l 0 -" + size * 0.5 +
		" z ";

	var perturbingAgent =
		"m -" + size * 0.5 + " -" + size * 0.5 +
		" l " + size + " 0" +
		" l -" + size * 0.125 + " " + size * 0.5 +
		" l " + size * 0.125 + " " + size * 0.5 +
		" l -" + size + " " + " 0" +
		" l " + size * 0.125 + " -" + size * 0.5 +
		" z ";

	var simpleChemical =
		"m -" + size / 2 + " 0" +
		" a " + size / 2 + " " + size / 2 + " 0 1 0 " + size + " 0" +
		" a " + size / 2 + " " + size / 2 + " 0 1 0 -" + size + " 0";

	var simpleChemicalMulti =
		"m -" + size / 2 + " 0" +
		" a " + size / 2 + " " + size / 2 + " 0 1 0 " + size + " 0" +
		" a " + size / 2 + " " + size / 2 + " 0 1 0 -" + size + " 0" +
		" m " + size / 8.69565 + " " + size / 3.125 +
		" a " + size / 2 + " " + size / 2 + " 0 1 0 " + size * 0.9 + " " + -size / 2 +
		" a " + size / 2 + " " + size / 2 + " 0 0 0 " + -size / 6.6667 + " " + -size / 6.25; //+
	//" a " + size / 2 + " " + size / 2 + " 0 1 0 " + 7 * size / 8 + " -" + size / 2; // +
	//" a " + size / 2 + " " + size / 2 + " 0 1 0 -" + size + " 0";


	var missingNode =
		"m -" + size * 0.5 + " -" + size * 0.5 +
		"l " + size + " " + size +
		"m -" + size + " 0" +
		"l " + size + " -" + size;

	switch (node) {
		case 'simple chemical':
			return simpleChemical;
			break;
		case 'reaction':
		case 'process':
			return reaction;
			break;
		case 'dissociation':
			return dissociation;
			break;
		case 'association':
			return association;
			break;
		case 'macromolecule':
			return macromolecule;
			break;
		case 'nucleic acid feature':
			return nucleicAcidFeature;
			break;
		case 'unspecified entity':
			return unspecifiedEntity;
			break;
		case 'source and sink':
			return sourceAndSink;
			break;
		case 'complex':
			return complex;
			break;
		case 'perturbing agent':
			return perturbingAgent;
			break;
		case 'simple chemical multimer':
			return simpleChemicalMulti;
			break;
		case 'macromolecule multimer':
			return macromoleculeMultimer;
			break;
		case 'nucleic acid feature multimer':
			return nucleicAcidFeatureMultimer;
			break;
		default:
			console.log("missing node: " + node);
			return missingNode;

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