# DiVil
DiVil is a javascript based tool that produces interactive graphs. It aims to visualise differences between two versions of a model in a standard format. 
DiVil uses:
 * the Bives algorithm to detect those differences [(Scharm et al, 2015)](https://doi.org/10.1093/bioinformatics/btv484)
 * the Systems Biology Graphical Notation (SBGN) standard [(Le Novère et al, 2009)](http://dx.doi.org/10.1038/nbt.1558), more specifically the Process Description (PD) language, to visually represent the network with the differences highlighted.
SBGN-ML is the XML based format used to store an SBGN map. In DiVil, the SBGN-ML is extended with a color coded information to visualize the differences.

## Try it out
DiVil is used at http://most.sems.uni-rostock.de/. Go check it out!

## Input: Bives support
The network information is provided by a JSON Object in the following format:

```js
{
	"nodes":[
		{
		"bivesClass":"...",
		"compartment":"...",
		"id":"...",
		"label":"...",
		"class":"..."
		},
		...
	],
	"links":[
		{
		"bivesClass":"...",
		"source":"...",
		"class":"...",
		"target":"..."
		},
		...
	]
}
```

The object contains a list of nodes and a list of links which values are obtained from the Bives output. Nodes may have different attributes.
Supported attributes for nodes are:
* bivesClass: update/move/insert/delete
* comparment: ID of one containter
* id: own ID
* label: name of the node
* class: SBO term (http://www.ebi.ac.uk/sbo/main/tree;jsessionid=C3708F6D884984AC240A7FFE222773D1?expandAll=exp&nodeId=1)

Supported attributes for links are:
* bivesclass: update/move/insert/delete
* source: id of a input node
* class: SBO term (http://www.ebi.ac.uk/sbo/main/tree;jsessionid=C3708F6D884984AC240A7FFE222773D1?expandAll=exp&nodeId=1)
* target: id of an output node


## Output: SBGN PD support
DiVil produces a graph by using the D3.js (Copyright 2010-2017 Mike Bostock, https://d3js.org) library.
The map is computed by a force directed layout.

To produce a SBGN PD network several steps are necessary.

(1) In SBGN, each symbol relates to a specific type of entity (e.g, a rectangle with round corner is a macromolecule). They are called 'glyphs'. So far, D3 does not provide an easy way to add those symbols. Therefore the included symbols have to be extended by adding svg paths.
At this point the following SBGN glyphs are supported in DiVil:
* Process
* Dissociation
* Association
* Macromolecule
* Source and Sink
* Complex
* Pertubing Agent
* Unspecified Entity
* Simple Chemical
* Compartment
	
(2) The symbols are sized by their content. For example the size of a simple chemical will grow with the length of its label; compartments are drawn around the contained nodes.

(3) The relations in SBGN are called arcs. Different arrowheads represent different types of relation. It was needed to implement them as well.
The following SBGN arcs are supported in DiVil:
* Production
* Consumption
* Modulation
* Stimulation
* Catalysis
* Inhibition
* Necessary stimulation

(4) Due to the usage of new symbols the length of each link is computed by a formula depending on its target node.
According to the SBGN PD specification a process node has one port for all ingoing elements and one port for each outgoing elements. Thus the start and ending point of each link is adjusted to the ports' coordinates.

## SBO term mapping
The SBO terms are supported by SBGN. However, the SBO term follows a specific hierarchy and multiple SBO terms can relate to one SBGN entity. Consequently, a mapping for each term to a SBGN PD class is provided.

## Highlighting differences
Based on the bivesClass the differences between two versions of a model can be highlighted.
For the following, we consider that the first version is prior to the second version.
Black elements show entities that did not change between the two versions. Updated elements are orange, moved ones are blue and elements that are found only in the first version (e.g, entities present in the first version but deleted in the second version) are red while the ones that are only part of the second version (e.g, entities absent in the first version and created in the second version) are green.


## Interactivity
Based on the D3 capabilities the user can interact with the visualization to improve the layout or focus on specific parts of the model.
Nodes and compartments can be dragged. There is also a zoom functionality and the complete visualization can be moved by dragging the canvas.

## Download the visualization
With the help of the FileSaver.js Library (https://github.com/eligrey/FileSaver.js) the visualization can be saved in the SBGN-ML format by clicking the download button.

## Tests and show cases
An elementary user interface and test models are provided in this repository. Some of the models where changed by hand to test different elements.

## How to use DiVil
### For playing around
Just clone the repository and run it on your localhost.

### Integration in your website
You need to include the following files:
* javascript/sboTermMapping.js
* javascript/appendDefs.js
* javascript/showSbgn.js
* javascript/costumSymbol.js
* bives/bivesTool.js

Also provide a div with the id "bivesGraph"
```html
<div class="bivesContent" id="bivesGraph"></div>
```

To use the download function you also need:
* download.js
* FileSaver.js (3rd party)
* dom-to-image.js (3rd party)

And change the provided div to:
```html
<div class="bivesContent" id="bivesGraph">
	<button id="download">download</button>
</div>
```
