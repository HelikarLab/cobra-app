import React from 'react'
import { Row, Col, Button, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import SimulationGraph from './SimulationGraph'
import classnames from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy'

function Visualisation() {
  const [activeTab, toggle] = React.useState( 1);
  const analysisMetabolites = useStoreState(state => state.simulationTab.currentFBAModel.metabolites);
  const analysisReactions = useStoreState(state => state.simulationTab.currentFBAModel.reactions);
  const {resetUpdatedReactions,resetUpdatedGenes} = useStoreActions(actions => actions.simulationTab)
  function reset() {
    resetUpdatedReactions();
    resetUpdatedGenes();
  }

  return(
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 1 })}
            onClick={() => { toggle(1); reset() }}>
            Graph
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 2 })}
            onClick={() => { toggle(2); reset()}}>
            Escher Map
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Row style={{padding: "15px"}}>
            <SimulationGraph metabolites={analysisMetabolites} reactions={analysisReactions}/>
          </Row>
        </TabPane>
        <TabPane tabId={2}>
          <Row style={{padding: "15px"}}>
            Escher Map
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )

}

export default Visualisation
