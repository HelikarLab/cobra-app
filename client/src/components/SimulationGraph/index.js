import React from 'react'
import NetViz from 'ccnetviz'
import { UncontrolledTooltip, Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap'
import { Icon } from 'react-icons-kit'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import GraphLegend from './GraphLegend'
import './style.scss'

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            edges: [],
            compartments: [],
            currentCompartment : null,
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.selectCompartment = this.selectCompartment.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    removeDuplicates = (originalArray, prop) => {
        let newArray = [];
        let lookupObject  = {};
        let i;
        for( i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i][prop]);
        }
        this.setState({
            compartments: newArray
        })
    };
    generateReactionNodes = reactions => {
        const reactionNodes = reactions.map(reaction => {
            return {
                label: reaction.id,
                style: 'reactionNode',
            }
        });
        return reactionNodes
    };

    findNode = (object, nodes) => {
        let temp;
        nodes.filter((node, index) => {
            if (node.label === object.label) {
                return (temp = index)
            } else {
                return false
            }
        });
        return temp
    };

    generateReactionEdges = (reactions, nodes, edgeStyle) => {
        const reactionsEdges = [];
        reactions.map(reaction => {
            reaction.reactants.map(reactant => {
                if (reaction.reversible) {
                    if(reaction.reactants.length===1) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reactant}, nodes)],
                            target: nodes[this.findNode({label: reaction.id}, nodes)],
                            style: 'reversibleReactantEdgeThin',
                        })
                    }
                    else if(reaction.reactants.length===2) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reactant}, nodes)],
                            target: nodes[this.findNode({label: reaction.id}, nodes)],
                            style: 'reversibleReactantEdgeNarrow',
                        })
                    }
                    else if(reaction.reactants.length===3) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reactant}, nodes)],
                            target: nodes[this.findNode({label: reaction.id}, nodes)],
                            style: 'reversibleReactantEdgeMedium',
                        })
                    }
                    else if(reaction.reactants.length===4) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reactant}, nodes)],
                            target: nodes[this.findNode({label: reaction.id}, nodes)],
                            style: 'reversibleReactantEdgeWide',
                        })
                    }
                    else{
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reactant}, nodes)],
                            target: nodes[this.findNode({label: reaction.id}, nodes)],
                            style: 'reversibleReactantEdgeThick',
                        })
                    }
                }
                else {
                    if(reaction.reactants.length===1){
                        return reactionsEdges.push({
                            source: nodes[this.findNode({ label: reactant }, nodes)],
                            target: nodes[this.findNode({ label: reaction.id }, nodes)],
                            style: 'reactantEdgeThin',
                        })
                    }
                    else if(reaction.reactants.length===2){
                        return reactionsEdges.push({
                            source: nodes[this.findNode({ label: reactant }, nodes)],
                            target: nodes[this.findNode({ label: reaction.id }, nodes)],
                            style: 'reactantEdgeNarrow',
                        })
                    }
                    else if(reaction.reactants.length===3){
                        return reactionsEdges.push({
                            source: nodes[this.findNode({ label: reactant }, nodes)],
                            target: nodes[this.findNode({ label: reaction.id }, nodes)],
                            style: 'reactantEdgeMedium',
                        })
                    }
                    else if(reaction.reactants.length===4){
                        return reactionsEdges.push({
                            source: nodes[this.findNode({ label: reactant }, nodes)],
                            target: nodes[this.findNode({ label: reaction.id }, nodes)],
                            style: 'reactantEdgeWide',
                        })
                    }
                    else {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({ label: reactant }, nodes)],
                            target: nodes[this.findNode({ label: reaction.id }, nodes)],
                            style: 'reactantEdgeThick',
                        })
                    }

                }
            });
            return reaction.products.map(product => {
                if (reaction.reversible) {
                    if(reaction.products.length===1) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'reversibleProductEdgeThin',
                        })
                    }
                    else if(reaction.products.length===2) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'reversibleProductEdgeNarrow',
                        })
                    }
                    else if(reaction.products.length===3) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'reversibleProductEdgeMedium',
                        })
                    }
                    else if(reaction.products.length===4) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'reversibleProductEdgeWide',
                        })
                    }
                    else {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'reversibleProductEdgeThick',
                        })
                    }
                }
                else {
                    if(reaction.products.length===1) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'productEdgeThin',
                        })
                    }
                    else if(reaction.products.length===2) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'productEdgeNarrow',
                        })
                    }
                    else if(reaction.products.length===3) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'productEdgeMedium',
                        })
                    }
                    else if(reaction.products.length===4) {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'productEdgeWide',
                        })
                    }
                    else {
                        return reactionsEdges.push({
                            source: nodes[this.findNode({label: reaction.id}, nodes)],
                            target: nodes[this.findNode({label: product}, nodes)],
                            style: 'productEdgeThick',
                        })
                    }
                }
            })
        });
        return reactionsEdges
    };

    componentDidMount(prevState) {

        this.self = new NetViz(this.refs.graph, {
            styles: {
                background: {
                    color: 'rgb(255, 255, 255)',
                },
                node: {
                    minSize: 6,
                    maxSize: 16,
                    color: 'rgb(47, 109, 206)',
                    texture: require('../../assets/circle.png'),
                    label: {
                        hideSize: 16,
                        color: 'rgb(0, 0, 0)',
                    },
                },
                edge: {
                    width: 1,
                    color: 'rgb(50, 50, 50)',
                    arrow: {
                        minSize: 1,
                        maxSize: 16,
                        aspect: 1,
                        texture: require('../../assets/arrow.png'),
                        hideSize: 1,
                    },
                    type: 'line',
                },
                reactionNode: {color: 'rgb(200, 0, 0)',},

                reactantEdgeThin: {color: 'rgb(89, 249, 2)',width: 1},
                reactantEdgeNarrow: {color: 'rgb(89, 249, 2)',width: 2},
                reactantEdgeMedium: {color: 'rgb(89, 249, 2)',width: 3},
                reactantEdgeWide: {color: 'rgb(89, 249, 2)',width: 4},
                reactantEdgeThick: {color: 'rgb(89, 249, 2)',width: 5},

                productEdgeThin: {color: 'rgb(255, 246, 0)',width: 1},
                productEdgeNarrow: {color: 'rgb(255, 246, 0)',width: 2},
                productEdgeMedium: {color: 'rgb(255, 246, 0)',width: 3},
                productEdgeWide: {color: 'rgb(255, 246, 0)',width: 4},
                productEdgeThick: {color: 'rgb(255, 246, 0)', width: 5},

                reversibleReactantEdgeThin: { color: 'rgb(89, 249, 2)', type: 'dashed', width : 1 },
                reversibleReactantEdgeNarrow: { color: 'rgb(89, 249, 2)', type: 'dashed', width : 2 },
                reversibleReactantEdgeMedium: { color: 'rgb(89, 249, 2)', type: 'dashed', width : 3 },
                reversibleReactantEdgeWide: { color: 'rgb(89, 249, 2)', type: 'dashed', width : 4 },
                reversibleReactantEdgeThick: { color: 'rgb(89, 249, 2)', type: 'dashed', width : 5 },

                reversibleProductEdgeThin: { color: 'rgb(255, 246, 0)', type: 'dashed', width : 1 },
                reversibleProductEdgeNarrow: { color: 'rgb(255, 246, 0)', type: 'dashed', width : 2 },
                reversibleProductEdgeMedium: { color: 'rgb(255, 246, 0)', type: 'dashed', width : 3 },
                reversibleProductEdgeWide: { color: 'rgb(255, 246, 0)', type: 'dashed', width : 4 },
                reversibleProductEdgeThick: { color: 'rgb(255, 246, 0)', type: 'dashed', width : 5 },
            },
            onChangeViewport: function(viewport) {},
            onLoad: function() {},
            getNodesCount() {},
            getEdgesCount() {},
            onDrag: function(viewport) {},
            onZoom: function(viewport) {},
            onClick: function() {
                return false
            },
            onDblClick: function() {},
            passiveEvts: true,
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.reactions !== this.props.reactions ||
            prevProps.metabolites !== this.props.metabolites ||
            prevState.currentCompartment !== this.state.currentCompartment)
        {

            let sorted = this.props.reactions
                .sort((a, b) => a.compartments.localeCompare(b.compartments));
            this.removeDuplicates(sorted, "compartments");

            // For every compartment
            if (this.state.currentCompartment === "'All'" || this.state.currentCompartment === null) {

                const {metabolites} = this.props;


                let reactionNodes = this.generateReactionNodes(this.props.reactions);
                let nodes = [];
                for (let i = 0; i < metabolites.length; i++) {
                    nodes.push({label: metabolites[i].id})
                }
                reactionNodes.map(node => {
                    return nodes.push(node)
                });
                let edges = this.generateReactionEdges(this.props.reactions, nodes);
                this.setState({nodes: nodes,edges: edges},function generateGraph() {
                    if (prevState !== this.state) {
                        const nodes = this.state.nodes;
                        const edges = this.state.edges;
                        this.self.set(nodes, edges, 'force');
                        this.self.draw()
                    }
                });

            }

            // For one particular compartment
            if (this.state.currentCompartment !== null && this.state.currentCompartment !== "'All'") {

                const {metabolites} = this.props;

                // Code to filter the compartments
                let filteredMetabolites = [];
                let filteredReactions = [];
                for (let i = 0; i < this.props.reactions.length; i++) {
                    if (this.props.reactions[i].compartments === this.state.currentCompartment) {
                        filteredReactions.push(this.props.reactions[i]);
                    }
                }
                for (let i = 0; i < metabolites.length; i++) {
                    if (metabolites[i].compartment === this.state.currentCompartment) {
                        filteredMetabolites.push(metabolites[i]);
                    }
                }

                let reactionNodes = this.generateReactionNodes(filteredReactions);
                let nodes = [];
                for (let i = 0; i < filteredMetabolites.length; i++) {
                    nodes.push({label: filteredMetabolites[i].id})
                }
                reactionNodes.map(node => {
                    return nodes.push(node)
                });

                let edgeStyle = [];
                filteredReactions.map((reaction,index)=>{
                    if(reaction.reversible === true){
                        edgeStyle = edgeStyle.concat({
                            index: index,
                            width : (reaction.upper_bound - reaction.lower)/200
                        })
                    }
                    else{
                        edgeStyle = edgeStyle.concat({
                            index: index,
                            width : (reaction.upper_bound - reaction.lower)/100
                        })
                    }
                });
                let edges = this.generateReactionEdges(filteredReactions, nodes, edgeStyle);


                this.setState({nodes: nodes,edges: edges},function generateGraph() {
                    if (prevState !== this.state) {

                        const nodes = this.state.nodes;
                        const edges = this.state.edges;
                        this.self.set(nodes, edges, 'force');
                        this.self.draw()
                    }
                });
            }
        }
    }

    selectCompartment = params =>events=> {
        this.setState({
            currentCompartment: params
        });
    };

    render() {
        return (
            <div>
                <h3 className="text-muted">
                    Graph{` `}
                    <Icon icon={infoCircle} id="graph-legend-info" />
                    <UncontrolledTooltip placement="right" target="graph-legend-info">
                        <GraphLegend />
                    </UncontrolledTooltip>
                    {this.props.reactions?<div>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Compartments
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={
                                        this.selectCompartment("'All'")
                                    }
                                > All </DropdownItem>
                                {
                                    this.state && this.state.compartments && this.state.compartments.map((compartment,index)=>{
                                        return(
                                            <DropdownItem
                                                onClick={
                                                    this.selectCompartment(compartment)
                                                }
                                            >{compartment}</DropdownItem>
                                        )
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                        <h5>Current Compartment: {(this.state && this.state.currentCompartment) ===null ? 'All' : (this.state.currentCompartment)}</h5>
                    </div> : null
                    }
                </h3>
                <canvas ref="graph" width="760" height="720" className="graph-canvas" />
            </div>
        )
    }
}

export default Graph
