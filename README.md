# DiVil

Background:
DiVil is a javascript based tool that produces interactive graphs.
The visualization is based on the Systems Biology Graphical Notation - Process Description (SBGN PD) standard.
The standard ist extended by adding colors to visualize differences between two versions of k.

## Input
The network information is provided by a JSON Object in the following format:

```{
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
}```

The object contains a list of nodes and a list of links. Nodes may have different attributes.
Supported attributes are:
	-bivesClass: update/move/insert/delete
	-comparment: ID of one containter
	-id: own ID
	-label: shown name of the node
	-class: SBO term (http://www.ebi.ac.uk/sbo/main/tree;jsessionid=C3708F6D884984AC240A7FFE222773D1?expandAll=exp&nodeId=1)

For links the following attributes are supported:
	-bivesclass: update/move/insert/delete
	-source: id of a node
	-class: SBO term (http://www.ebi.ac.uk/sbo/main/tree;jsessionid=C3708F6D884984AC240A7FFE222773D1?expandAll=exp&nodeId=1)
	-target: id of a node


## SBGN PD support
	
Out of an object like this DiVil produces a graph by using the D3.js (Copyright 2010-2017 Mike Bostock, https://d3js.org) library.
The map is computed by a force directed layout.

To produce a SBGN PD layout several parts are necessary.
In SBGN the symbol shows the kind/class of the entitity. D3, so far, does not provide an easy way to add symbols. Therfor the included symbols have to be extended by adding svg paths.
At this point the following symbols are supported:
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
	
The symbols are sized by their content. For example a simple chemical will grow with the size of its label and compartments are drawn around the contained nodes.

Furthermore different arrowheads are needed for SBGN PD.
The following are supported:
* Production
* Consumption
* Modulation
* Stimulation
* Catalysis
* Inhibition
* Necessary stimulation

Due to the usage of new symbols the length of each link is computed by a formula depending of its target node.
According to the SBGN PD specification a process nodes has one port for all ingoing elements and one port for each outgoing elements. Thus the start and ending point of each link is adjusted to the ports.

## SBO term mapping

The SBO terms are hierarchically structured but SBGN PD does not provide a unique symbol for every term. Therefor a mapping for each term to a SBGN PD class is provided.

## Highlighting differences

Based on the bivesClass the differences between two versions of a model can be highlighted.
Elements that are black were not target of a change. Updatet elements are orange, moved ones are blue and elements that occured only in the first version are red while the ones that are only part of the second version are green. 


## Interactivity

Based on the D3 capabilities the user can interact with the visualization to improve the layout or focus on specific parts of the model.
Nodes and comparments can be draged. Theres also a zoom functionality and the complete visualization can be moved by dragging the canvas.

## Download the visualization

With the help of the FileSaver.js Library (https://github.com/eligrey/FileSaver.js) the visualization can be saved in the SBGN-ML format by clicking the download button.
