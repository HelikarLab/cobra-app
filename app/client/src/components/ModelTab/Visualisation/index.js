import React from 'react'
import { Row, Col, Button, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import classnames from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy'
import Graph from './ModelGraph'

function Visualisation() {
  const [activeTab, toggle] = React.useState( 1);
  const { reactions, metabolites, genes,name } = useStoreState(state => state.modelTab.currentModel);

  return(
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 1 })}
            onClick={() => { toggle(1) }}>
            Graph
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 2 })}
            onClick={() => { toggle(2)}}>
            Escher Map
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Row style={{padding: "15px"}}>
            <Graph reactions={reactions} metabolites={metabolites} />
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
