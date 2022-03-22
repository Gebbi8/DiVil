function sboSwitch(sboTerm) {
	//console.log(sboTerm);
	switch (sboTerm) {
		case "SBO:0000247": return "simple chemical"; // simple chemical
		case "SBO:0000245": return "macromolecule"; // macromolecule
		case "SBO:0000354": return "nucleic acid feature"; // informational molecule segment
		case "SBO:0000421": return "simple chemical multimer"; // multimer of simple chemicals
		case "SBO:0000420": return "macromolecule multimer"; // multimer of macromolecules
		case "SBO:0000419": return "nucleic acid feature multimer"; // multimer of informational molecule segments
		case "SBO:0000253": return "complex"; // non-covalent complex
		case "SBO:0000418": return "complex multimer"; // multimer of complexes
		case "SBO:0000285": return "unspecified entity"; // material entity of unspecified nature
		case "SBO:0000291": return "source and sink"; // empty set
		case "SBO:0000405": return "perturbing agent"; // perturbing agent
		case "SBO:0000290": return "compartment"; // physical compartment
		case "SBO:0000395": return "submap"; // encapsulating process
		case "SBO:0000375": return "process"; // process
		case "SBO:0000397": return "omitted process"; // omitted process
		case "SBO:0000396": return "uncertain process"; // uncertain proces
		case "SBO:0000177": return "association"; // non-covalent binding
		case "SBO:0000180": return "dissociation"; // dissociation
		case "SBO:0000358": return "phenotype"; // phenotype
		case "SBO:0000173": return "and"; // and
		case "SBO:0000174": return "or"; // or
		case "SBO:0000238": return "not"; // not
		case "SBO:0000394": return "consumption"; // consumption
		case "SBO:0000393": return "production"; // production
		case "SBO:0000168": return "modulation"; // control
		case "SBO:0000170": return "stimulation"; // stimulation
		case "SBO:0000172": return "catalysis"; // catalysis
		case "SBO:0000169": return "inhibition"; // inhibition
		case "SBO:0000171": return "necessary stimulation"; // necessary stimulation
		case "SBO:0000398": return "logic arc"; // logical relationship
		// SBO terms from sbml specification
		case "SBO:0000019": return "modulation"; // modifier
		case "SBO:0000020": return "inhibition"; // inhibitor
		case "SBO:0000459": return "stimulation"; // stimulator
		case "SBO:0000013": return "catalysis"; // catalyst
		case "SBO:0000461": return "necessarystimulation"; // essential activator
		case "SBO:0000011": return "production"; // product
		case "SBO:0000010": return "consumption"; // reactant
		// child SBO terms from above SBO terms
		case "SBO:0000181": return "process";
		case "SBO:0000182": return "process";
		case "SBO:0000183": return "process";
		case "SBO:0000184": return "process";
		case "SBO:0000185": return "process";
		case "SBO:0000167": return "process";
		case "SBO:0000178": return "process";
		case "SBO:0000179": return "process";
		case "SBO:0000176": return "process";
		case "SBO:0000402": return "process";
		case "SBO:0000403": return "process";
		case "SBO:0000400": return "process";
		case "SBO:0000401": return "process";
		case "SBO:0000500": return "process";
		case "SBO:0000502": return "process";
		case "SBO:0000501": return "process";
		case "SBO:0000015": return "consumption";
		case "SBO:0000410": return "compartment";
		case "SBO:0000411": return "stimulation";
		case "SBO:0000407": return "inhibition";
		case "SBO:0000021": return "stimulation";
		case "SBO:0000543": return "complex";
		case "SBO:0000526": return "process";
		case "SBO:0000534": return "necessarystimulation";
		case "SBO:0000535": return "necessarystimulation";
		case "SBO:0000536": return "inhibition";
		case "SBO:0000537": return "inhibition";
		case "SBO:0000533": return "necessarystimulation";
		case "SBO:0000376": return "process";
		case "SBO:0000377": return "process";
		case "SBO:0000460": return "catalysis";
		case "SBO:0000462": return "stimulation";
		case "SBO:0000464": return "process";
		case "SBO:0000250": return "macromolecule";
		case "SBO:0000251": return "macromolecule";
		case "SBO:0000399": return "process";
		case "SBO:0000252": return "macromolecule";
		case "SBO:0000246": return "macromolecule";
		case "SBO:0000248": return "macromolecule";
		case "SBO:0000249": return "macromolecule";
		case "SBO:0000336": return "consumption";
		case "SBO:0000239": return "modulation";
		case "SBO:0000330": return "process";
		case "SBO:0000233": return "process";
		case "SBO:0000219": return "process";
		case "SBO:0000221": return "process";
		case "SBO:0000220": return "process";
		case "SBO:0000328": return "simple chemical";
		case "SBO:0000327": return "simple chemical";
		case "SBO:0000223": return "process";
		case "SBO:0000222": return "process";
		case "SBO:0000224": return "process";
		case "SBO:0000208": return "process";
		case "SBO:0000209": return "process";
		case "SBO:0000210": return "process";
		case "SBO:0000357": return "process";
		case "SBO:0000214": return "process";
		case "SBO:0000213": return "process";
		case "SBO:0000212": return "process";
		case "SBO:0000211": return "process";
		case "SBO:0000218": return "process";
		case "SBO:0000217": return "process";
		case "SBO:0000216": return "process";
		case "SBO:0000215": return "process";
		case "SBO:0000344": return "process";
		case "SBO:0000343": return "process";
		case "SBO:0000201": return "process";
		case "SBO:0000200": return "process";
		case "SBO:0000342": return "process";
		case "SBO:0000202": return "process";
		case "SBO:0000205": return "process";
		case "SBO:0000204": return "process";
		case "SBO:0000207": return "inhibition";
		case "SBO:0000206": return "inhibition";
		case "SBO:0000296": return "complex";
		case "SBO:0000297": return "complex";
		case "SBO:0000286": return "complex";
		case "unknown": return "modulation";
		case "stimulator": return "stimulation";
		case "inhibitor": return "inhibition";
		default: return "unspecified entity";
	}
}

function sboSwitchArc(sboTerm) {
	//console.log(sboTerm);
	switch (sboTerm) {
		case "SBO:0000247": return "simple chemical"; // simple chemical
		case "SBO:0000245": return "macromolecule"; // macromolecule
		case "SBO:0000354": return "nucleic acid feature"; // informational molecule segment
		case "SBO:0000421": return "simple chemical multimer"; // multimer of simple chemicals
		case "SBO:0000420": return "macromolecule multimer"; // multimer of macromolecules
		case "SBO:0000419": return "nucleic acid feature multimer"; // multimer of informational molecule segments
		case "SBO:0000253": return "complex"; // non-covalent complex
		case "SBO:0000418": return "complex multimer"; // multimer of complexes
		case "SBO:0000285": return "unspecified entity"; // material entity of unspecified nature
		case "SBO:0000291": return "source and sink"; // empty set
		case "SBO:0000405": return "perturbing agent"; // perturbing agent
		case "SBO:0000290": return "compartment"; // physical compartment
		case "SBO:0000395": return "submap"; // encapsulating process
		case "SBO:0000375": return "process"; // process
		case "SBO:0000397": return "omitted process"; // omitted process
		case "SBO:0000396": return "uncertain process"; // uncertain proces
		case "SBO:0000177": return "association"; // non-covalent binding
		case "SBO:0000180": return "dissociation"; // dissociation
		case "SBO:0000358": return "phenotype"; // phenotype
		case "SBO:0000173": return "and"; // and
		case "SBO:0000174": return "or"; // or
		case "SBO:0000238": return "not"; // not
		case "SBO:0000394": return "consumption"; // consumption
		case "SBO:0000393": return "production"; // production
		case "SBO:0000168": return "modulation"; // control
		case "SBO:0000170": return "stimulation"; // stimulation
		case "SBO:0000172": return "catalysis"; // catalysis
		case "SBO:0000169": return "inhibition"; // inhibition
		case "SBO:0000171": return "necessarystimulation"; // necessary stimulation
		case "SBO:0000398": return "logic arc"; // logical relationship
		// SBO terms from sbml specification
		case "SBO:0000019": return "modulation"; // modifier
		case "SBO:0000020": return "inhibition"; // inhibitor
		case "SBO:0000459": return "stimulation"; // stimulator
		case "SBO:0000013": return "catalysis"; // catalyst
		case "SBO:0000461": return "necessarystimulation"; // essential activator
		case "SBO:0000011": return "production"; // product
		case "SBO:0000010": return "consumption"; // reactant
		// child SBO terms from above SBO terms
		case "SBO:0000181": return "process";
		case "SBO:0000182": return "process";
		case "SBO:0000183": return "process";
		case "SBO:0000184": return "process";
		case "SBO:0000185": return "process";
		case "SBO:0000167": return "process";
		case "SBO:0000178": return "process";
		case "SBO:0000179": return "process";
		case "SBO:0000176": return "process";
		case "SBO:0000402": return "process";
		case "SBO:0000403": return "process";
		case "SBO:0000400": return "process";
		case "SBO:0000401": return "process";
		case "SBO:0000500": return "process";
		case "SBO:0000502": return "process";
		case "SBO:0000501": return "process";
		case "SBO:0000015": return "consumption";
		case "SBO:0000410": return "compartment";
		case "SBO:0000411": return "stimulation";
		case "SBO:0000407": return "inhibition";
		case "SBO:0000021": return "stimulation";
		case "SBO:0000543": return "complex";
		case "SBO:0000526": return "process";
		case "SBO:0000534": return "necessarystimulation";
		case "SBO:0000535": return "necessarystimulation";
		case "SBO:0000536": return "inhibition";
		case "SBO:0000537": return "inhibition";
		case "SBO:0000533": return "necessarystimulation";
		case "SBO:0000376": return "process";
		case "SBO:0000377": return "process";
		case "SBO:0000460": return "catalysis";
		case "SBO:0000462": return "stimulation";
		case "SBO:0000464": return "process";
		case "SBO:0000250": return "macromolecule";
		case "SBO:0000251": return "macromolecule";
		case "SBO:0000399": return "process";
		case "SBO:0000252": return "macromolecule";
		case "SBO:0000246": return "macromolecule";
		case "SBO:0000248": return "macromolecule";
		case "SBO:0000249": return "macromolecule";
		case "SBO:0000336": return "consumption";
		case "SBO:0000239": return "modulation";
		case "SBO:0000330": return "process";
		case "SBO:0000233": return "process";
		case "SBO:0000219": return "process";
		case "SBO:0000221": return "process";
		case "SBO:0000220": return "process";
		case "SBO:0000328": return "simple chemical";
		case "SBO:0000327": return "simple chemical";
		case "SBO:0000223": return "process";
		case "SBO:0000222": return "process";
		case "SBO:0000224": return "process";
		case "SBO:0000208": return "process";
		case "SBO:0000209": return "process";
		case "SBO:0000210": return "process";
		case "SBO:0000357": return "process";
		case "SBO:0000214": return "process";
		case "SBO:0000213": return "process";
		case "SBO:0000212": return "process";
		case "SBO:0000211": return "process";
		case "SBO:0000218": return "process";
		case "SBO:0000217": return "process";
		case "SBO:0000216": return "process";
		case "SBO:0000215": return "process";
		case "SBO:0000344": return "process";
		case "SBO:0000343": return "process";
		case "SBO:0000201": return "process";
		case "SBO:0000200": return "process";
		case "SBO:0000342": return "process";
		case "SBO:0000202": return "process";
		case "SBO:0000205": return "process";
		case "SBO:0000204": return "process";
		case "SBO:0000207": return "inhibition";
		case "SBO:0000206": return "inhibition";
		case "SBO:0000296": return "complex";
		case "SBO:0000297": return "complex";
		case "SBO:0000286": return "complex";
		case "unknown": return "modulation";
		case "stimulator": return "stimulation";
		case "inhibitor": return "inhibition";
		default: return "modulation";
	}
}
