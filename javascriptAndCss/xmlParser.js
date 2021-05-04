function deleteTriggered(xmlTest_){

    var xmlTest = `<?xml version="1.0" encoding="UTF-8"?>
<bives type="fullDiff" id="bivesPatch">
  <!--BiVeS compiled with: [BiVeS Core v1.9.2] [BiVeS SBML v1.9.1] -->
  <update />
  <delete>
    <attribute name="sbo" id="1" oldValue="SBO:0000248" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[2]" />
    <node id="3" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="3" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" oldTag="species" />
    <attribute name="compartment" id="4" triggeredBy="3" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" />
    <attribute name="id" id="5" triggeredBy="3" oldValue="nuc" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" />
    <attribute name="initialConcentration" id="6" triggeredBy="3" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" />
    <attribute name="name" id="7" triggeredBy="3" oldValue="nucleicAcidFeat" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" />
    <attribute name="sbo" id="8" triggeredBy="3" oldValue="SBO:0000250" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[3]" />
    <node id="9" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="4" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" oldTag="species" />
    <attribute name="compartment" id="10" triggeredBy="9" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" />
    <attribute name="id" id="11" triggeredBy="9" oldValue="sim" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" />
    <attribute name="initialConcentration" id="12" triggeredBy="9" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" />
    <attribute name="name" id="13" triggeredBy="9" oldValue="simpleChem" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" />
    <attribute name="sbo" id="14" triggeredBy="9" oldValue="SBO:0000247" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[4]" />
    <node id="15" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="5" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" oldTag="species" />
    <attribute name="compartment" id="16" triggeredBy="15" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" />
    <attribute name="id" id="17" triggeredBy="15" oldValue="com" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" />
    <attribute name="initialConcentration" id="18" triggeredBy="15" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" />
    <attribute name="name" id="19" triggeredBy="15" oldValue="complex" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" />
    <attribute name="sbo" id="20" triggeredBy="15" oldValue="SBO:0000248" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[5]" />
    <node id="21" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="6" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" oldTag="species" />
    <attribute name="compartment" id="22" triggeredBy="21" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" />
    <attribute name="id" id="23" triggeredBy="21" oldValue="pert" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" />
    <attribute name="initialConcentration" id="24" triggeredBy="21" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" />
    <attribute name="name" id="25" triggeredBy="21" oldValue="pertubingAgent" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" />
    <attribute name="sbo" id="26" triggeredBy="21" oldValue="SBO:0000405" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[6]" />
    <node id="27" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="7" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" oldTag="species" />
    <attribute name="compartment" id="28" triggeredBy="27" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" />
    <attribute name="id" id="29" triggeredBy="27" oldValue="macMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" />
    <attribute name="initialConcentration" id="30" triggeredBy="27" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" />
    <attribute name="name" id="31" triggeredBy="27" oldValue="mac multimer" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" />
    <attribute name="sbo" id="32" triggeredBy="27" oldValue="SBO:0000420" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[7]" />
    <node id="33" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="8" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" oldTag="species" />
    <attribute name="compartment" id="34" triggeredBy="33" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" />
    <attribute name="id" id="35" triggeredBy="33" oldValue="simMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" />
    <attribute name="initialConcentration" id="36" triggeredBy="33" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" />
    <attribute name="name" id="37" triggeredBy="33" oldValue="simple Multimer" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" />
    <attribute name="sbo" id="38" triggeredBy="33" oldValue="SBO:0000421" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[8]" />
    <node id="39" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="9" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" oldTag="species" />
    <attribute name="compartment" id="40" triggeredBy="39" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" />
    <attribute name="id" id="41" triggeredBy="39" oldValue="nucMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" />
    <attribute name="initialConcentration" id="42" triggeredBy="39" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" />
    <attribute name="name" id="43" triggeredBy="39" oldValue="nucMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" />
    <attribute name="sbo" id="44" triggeredBy="39" oldValue="SBO:0000419" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[9]" />
    <node id="45" oldParent="/sbml[1]/model[1]/listOfSpecies[1]" oldChildNo="10" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" oldTag="species" />
    <attribute name="compartment" id="46" triggeredBy="45" oldValue="compartment1" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" />
    <attribute name="id" id="47" triggeredBy="45" oldValue="compMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" />
    <attribute name="initialConcentration" id="48" triggeredBy="45" oldValue="0" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" />
    <attribute name="name" id="49" triggeredBy="45" oldValue="compMulti" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" />
    <attribute name="sbo" id="50" triggeredBy="45" oldValue="SBO:0000418" oldPath="/sbml[1]/model[1]/listOfSpecies[1]/species[10]" />
    <node id="51" oldParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" oldTag="reaction" />
    <attribute name="id" id="52" triggeredBy="51" oldValue="v1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" />
    <attribute name="name" id="53" triggeredBy="51" oldValue="sigb syn" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" />
    <node id="54" triggeredBy="51" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfProducts[1]" oldTag="listOfProducts" />
    <node id="55" triggeredBy="54" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfProducts[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfProducts[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="56" triggeredBy="55" oldValue="x" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfProducts[1]/speciesReference[1]" />
    <node id="57" triggeredBy="51" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" oldChildNo="2" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfModifiers[1]" oldTag="listOfModifiers" />
    <node id="58" triggeredBy="57" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfModifiers[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfModifiers[1]/modifierSpeciesReference[1]" oldTag="modifierSpeciesReference" />
    <attribute name="species" id="59" triggeredBy="58" oldValue="mac" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfModifiers[1]/modifierSpeciesReference[1]" />
    <node id="60" oldParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="2" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]" oldTag="reaction" />
    <attribute name="id" id="61" triggeredBy="60" oldValue="v2" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]" />
    <attribute name="name" id="62" triggeredBy="60" oldValue="lacz syn" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]" />
    <node id="63" triggeredBy="60" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfProducts[1]" oldTag="listOfProducts" />
    <node id="64" triggeredBy="63" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfProducts[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfProducts[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="65" triggeredBy="64" oldValue="mac" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfProducts[1]/speciesReference[1]" />
    <node id="66" triggeredBy="60" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]" oldChildNo="2" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfModifiers[1]" oldTag="listOfModifiers" />
    <node id="67" triggeredBy="66" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfModifiers[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfModifiers[1]/modifierSpeciesReference[1]" oldTag="modifierSpeciesReference" />
    <attribute name="species" id="68" triggeredBy="67" oldValue="compMulti" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[2]/listOfModifiers[1]/modifierSpeciesReference[1]" />
    <node id="69" oldParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="3" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]" oldTag="reaction" />
    <attribute name="id" id="70" triggeredBy="69" oldValue="v3" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]" />
    <attribute name="name" id="71" triggeredBy="69" oldValue="x syn" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]" />
    <node id="72" triggeredBy="69" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]/listOfProducts[1]" oldTag="listOfProducts" />
    <node id="73" triggeredBy="72" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]/listOfProducts[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]/listOfProducts[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="74" triggeredBy="73" oldValue="compMulti" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[3]/listOfProducts[1]/speciesReference[1]" />
    <node id="75" oldParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="4" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]" oldTag="reaction" />
    <attribute name="id" id="76" triggeredBy="75" oldValue="v4" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]" />
    <attribute name="name" id="77" triggeredBy="75" oldValue="sigb degr" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]" />
    <node id="78" triggeredBy="75" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]/listOfReactants[1]" oldTag="listOfReactants" />
    <node id="79" triggeredBy="78" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]/listOfReactants[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]/listOfReactants[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="80" triggeredBy="79" oldValue="pert" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[4]/listOfReactants[1]/speciesReference[1]" />
    <node id="81" oldParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="5" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]" oldTag="reaction" />
    <attribute name="id" id="82" triggeredBy="81" oldValue="v5" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]" />
    <attribute name="name" id="83" triggeredBy="81" oldValue="lacz degr" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]" />
    <node id="84" triggeredBy="81" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfReactants[1]" oldTag="listOfReactants" />
    <node id="85" triggeredBy="84" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfReactants[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfReactants[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="86" triggeredBy="85" oldValue="com" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfReactants[1]/speciesReference[1]" />
    <node id="87" triggeredBy="81" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]" oldChildNo="2" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfModifiers[1]" oldTag="listOfModifiers" />
    <node id="88" triggeredBy="87" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfModifiers[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfModifiers[1]/modifierSpeciesReference[1]" oldTag="modifierSpeciesReference" />
    <attribute name="species" id="89" triggeredBy="88" oldValue="nuc" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[5]/listOfModifiers[1]/modifierSpeciesReference[1]" />
    <node id="91" oldParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[6]/listOfReactants[1]" oldChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[6]/listOfReactants[1]/speciesReference[1]" oldTag="speciesReference" />
    <attribute name="species" id="92" triggeredBy="91" oldValue="x" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[6]/listOfReactants[1]/speciesReference[1]" />
  </delete>
  <insert>
    <attribute name="sboTerm" id="2" newValue="SBO:0000248" newPath="/sbml[1]/model[1]/listOfSpecies[1]/species[2]" />
    <node id="93" newParent="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfReactants[1]" newChildNo="1" newPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfReactants[1]/speciesReference[1]" newTag="speciesReference" />
    <attribute name="species" id="94" triggeredBy="93" newValue="mac" newPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]/listOfReactants[1]/speciesReference[1]" />
  </insert>
  <move>
    <node id="90" oldParent="/sbml[1]/model[1]/listOfReactions[1]" newParent="/sbml[1]/model[1]/listOfReactions[1]" oldChildNo="6" newChildNo="1" oldPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[6]" newPath="/sbml[1]/model[1]/listOfReactions[1]/reaction[1]" />
  </move>
</bives>`;

var comodiDoc = 
    `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:comodi="http://purl.uni-rostock.de/comodi/comodi#" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:ore="http://www.openarchives.org/ore/terms/" xmlns:pav="http://purl.org/pav/" xmlns:prov="http://www.w3.org/ns/prov#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">
    <prov:Activity rdf:about="#createPatch">
      <prov:generated>
        <ore:Aggregation rdf:about="#bivesPatch">
          <ore:aggregates>
            <comodi:Deletion rdf:about="#29">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#27">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#18">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#15">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#44">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#39">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#87">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#81">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#53">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#51">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#64">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#63">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy>
                    <comodi:Deletion rdf:about="#60">
                      <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
                      <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                    </comodi:Deletion>
                  </comodi:wasTriggeredBy>
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#75">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#3">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#41">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#39" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#9">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#19">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#15" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#50">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#45">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#61">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#60" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#47">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#45" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#63" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#49">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#45" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#35">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#33">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#37">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#33" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#8">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#3" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Insertion rdf:about="#93">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
            </comodi:Insertion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#23">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#21">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#32">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#27" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#12">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#9" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#81" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#78">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy rdf:resource="#75" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#20">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#15" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#55">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#54">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#51" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#66">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy rdf:resource="#60" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#28">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#27" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#17">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#15" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#86">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#85">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy>
                    <comodi:Deletion rdf:about="#84">
                      <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
                      <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                      <comodi:wasTriggeredBy rdf:resource="#81" />
                    </comodi:Deletion>
                  </comodi:wasTriggeredBy>
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#52">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#51" />
            </comodi:Deletion>
          </ore:aggregates>
          <rdf:type rdf:resource="http://www.w3.org/ns/prov#Entity" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#72">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#69">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#74">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#73">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#72" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#69" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#58">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#57">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#51" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Insertion rdf:about="#2">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionNetworkDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
            </comodi:Insertion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#40">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#39" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#60" />
          <ore:aggregates rdf:resource="#51" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#46">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#45" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#62">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#60" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#48">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#45" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#34">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#33" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#5">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#3" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#43">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#39" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#7">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#3" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#92">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#91">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#89">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#88">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#87" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#22">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#21" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#31">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#27" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#11">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#9" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#80">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#79">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#78" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#77">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#75" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#39" />
          <ore:aggregates rdf:resource="#88" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#25">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#21" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#27" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#14">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#9" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#83">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#81" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#16">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#15" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#85" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#71">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#69" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#73" />
          <ore:aggregates rdf:resource="#57" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#68">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy>
                <comodi:Deletion rdf:about="#67">
                  <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
                  <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
                  <comodi:wasTriggeredBy rdf:resource="#66" />
                </comodi:Deletion>
              </comodi:wasTriggeredBy>
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#59">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#58" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:PermutationOfEntities rdf:about="#90">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ReactionDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlNode" />
            </comodi:PermutationOfEntities>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#45" />
          <ore:aggregates rdf:resource="#54" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#65">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#64" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#33" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#4">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#3" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#42">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#39" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#6">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#3" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#91" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#30">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#27" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#1">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#36">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#33" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#38">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#33" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Insertion rdf:about="#94">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#93" />
            </comodi:Insertion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#24">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#SpeciesSetup" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#21" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#26">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#21" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#13">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityName" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#9" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#82">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#81" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#15" />
          <ore:aggregates rdf:resource="#84" />
          <ore:aggregates rdf:resource="#79" />
          <ore:aggregates rdf:resource="#21" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#70">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#69" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#10">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#9" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates>
            <comodi:Deletion rdf:about="#56">
              <comodi:affects rdf:resource="http://purl.uni-rostock.de/comodi/comodi#ParticipantDefinition" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#55" />
            </comodi:Deletion>
          </ore:aggregates>
          <ore:aggregates rdf:resource="#67" />
          <ore:aggregates>
            <comodi:Deletion rdf:about="#76">
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#EntityIdentifier" />
              <comodi:appliesTo rdf:resource="http://purl.uni-rostock.de/comodi/comodi#XmlAttribute" />
              <comodi:wasTriggeredBy rdf:resource="#75" />
            </comodi:Deletion>
          </ore:aggregates>
        </ore:Aggregation>
      </prov:generated>
      <prov:wasAssociatedWith>
        <prov:SoftwareAgent rdf:about="#bives">
          <pav:version>BiVeS compiled with: [BiVeS Core v1.9.2] [BiVeS SBML v1.9.1]</pav:version>
          <rdfs:label>BiVeS</rdfs:label>
        </prov:SoftwareAgent>
      </prov:wasAssociatedWith>
    </prov:Activity>
  </rdf:RDF>
</bives>`;


    const splitLines = str => str.split(/\r?\n/);

    var strLines = splitLines(xmlTest);
    var dataByKeys = {delete:{}, insert:{}, update:{}, move:{}};
    // produce double key array based on change + path. vlaue comodi term
    var key1 = null;

    strLines.forEach(line => {
        if(line.includes("triggeredBy=")) return;
        if(line.includes("insert>")){
            key1 = "insert";
            return;
        } 
        else if(line.includes("delete>")){
            key1 = "delete";
            return;
        } 
        else if(line.includes("update>")){
            key1 = "update";
            return;
        } 
        else if(line.includes("move>")){
            key1 = "move";
            return;
        } if(line.includes("bives>")){
            key1 = null;
            return;
        } 

        else if(key1 != null){ //v mit old bzw newPath belegen+

            var v = line.match(/id=\".*?\"/g)[0];
            var subKey = "";

            if(key1 == "delete"){
                subKey = line.match(/oldPath=\".*?\"/g)[0];
            } else {
           //     k = "doc2"
                subKey = line.match(/newPath=\".*?\"/g)[0];
            }
            
            dataByKeys[key1][subKey] = v;
        }

        
    });
    console.log(dataByKeys);
    
    var arr = [["delete", "deletion"], ["insert", "insertion"], ["update", "update"], ["move", "PermutationOfEntities"]];

    arr.forEach(pair => {
        Object.entries(dataByKeys[pair[0]]).forEach(data => {
            console.log(data);
            console.log(grep(comodiDoc, pair[1], data[1]));
        });
    });


    //grep(comodiDoc, "deletion", "id=\"76\"");
}
//irgendwie noch regex nur abhängig von id
function grep(comodiDoc, changeType, id){
    //create regex e.g.: <comodi:Deletion rdf:about="#76"> ; id: "id=\"51\""
    //                   /<comodi:Deletion rdf:about="#76">.*?<\/comodi:Deletion>/si
    id = id.slice(4,-1);
    let regex = new RegExp('<comodi:' + '.*?' + ' rdf:about="#' + id + '">.*?' + changeType + '>', "si");

    console.log(regex)
    console.log( comodiDoc.match(regex)[0]);
    return comodiDoc.match(regex)[0];

}