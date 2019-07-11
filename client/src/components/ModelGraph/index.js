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
      currentCompartment: null,
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
    let lookupObject = {};
    let i;
    for (i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      if(lookupObject[i][prop].length<5) {
        newArray.push(lookupObject[i][prop]);
      }
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

  generateReactionEdges = (reactions, nodes) => {
    const reactionsEdges = [];
    reactions.map(reaction => {
      reaction.reactants.map(reactant => {
        if (reaction.reversible) {
          return reactionsEdges.push({
            source: nodes[this.findNode({label: reactant}, nodes)],
            target: nodes[this.findNode({label: reaction.id}, nodes)],
            style: 'reversibleReactantEdge',
          })
        } else {
          return reactionsEdges.push({
            source: nodes[this.findNode({label: reactant}, nodes)],
            target: nodes[this.findNode({label: reaction.id}, nodes)],
            style: 'reactantEdge',
          })
        }
      });
      return reaction.products.map(product => {
        if (reaction.reversible) {
          return reactionsEdges.push({
            source: nodes[this.findNode({label: reaction.id}, nodes)],
            target: nodes[this.findNode({label: product}, nodes)],
            style: 'reversibleProductEdge',
          })
        } else {
          return reactionsEdges.push({
            source: nodes[this.findNode({label: reaction.id}, nodes)],
            target: nodes[this.findNode({label: product}, nodes)],
            style: 'productEdge',
          })
        }
      })
    });
    return reactionsEdges
  };

  componentDidMount(prevState, prevProps) {



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
        reactionNode: {
          color: 'rgb(200, 0, 0)',
        },
        reactantEdge: {
          color: 'rgb(89, 249, 2)',
        },
        productEdge: {
          color: 'rgb(255, 246, 0)',
        },
        reversibleReactantEdge: { color: 'rgb(89, 249, 2)', type: 'dashed' },
        reversibleProductEdge: { color: 'rgb(255, 246, 0)', type: 'dashed' },
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
    });

    if(this.props.reactions && this.props.metabolites) {

      let sorted = this.props.reactions
          .sort((a, b) => a.compartments.localeCompare(b.compartments));
      this.removeDuplicates(sorted, "compartments");

      const {metabolites} = this.props;

      let reactionNodes = this.generateReactionNodes(this.props.reactions)
      let nodes = [];
      for (let i = 0; i < metabolites.length; i++) {
        nodes.push({label: metabolites[i].id})
      }
      reactionNodes.map(node => {
        return nodes.push(node)
      });
      let edges = this.generateReactionEdges(this.props.reactions, nodes);
      this.setState({nodes, edges});


      this.setState({nodes: nodes,edges: edges},function generateGraph() {
          const nodes = this.state.nodes;
          const edges = this.state.edges;
          this.self.set(nodes, edges, 'force');
          this.self.draw()

      });
    }

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

        let edges = this.generateReactionEdges(filteredReactions, nodes);
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
                > 'All' </DropdownItem>
                {
                  this.state && this.state.compartments && this.state.compartments.map((compartment,index)=>{
                    return(
                        <DropdownItem
                            key={index}
                            onClick={
                              this.selectCompartment(compartment)
                            }
                        >{compartment}</DropdownItem>
                    )
                  })
                }
              </DropdownMenu>
            </Dropdown>
          <h5>Current Compartment: {(this.state && this.state.currentCompartment) ===null ? "'All'" : (this.state.currentCompartment)}</h5>
          </div> : null
          }
        </h3>
        <canvas ref="graph" width="600" height="550" className="graph-canvas" />
      </div>
    )
  }
}

export default Graph
