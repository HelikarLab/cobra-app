import React from 'react'
import { Row, Col, Button} from 'reactstrap'
import {useStoreState, useStoreActions} from "easy-peasy";
import FluxControl from "../FluxControl";
import GeneControl from "../GeneControl";
import SimulationGraph from "../SimulationGraph";
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';


function SimulationTab() {

    const [activeTab, toggle] = React.useState( 1);

    const { reactions, metabolites, genes } = useStoreState(
        state => state.currentModel
    );

    const generateAnalysisModel = useStoreActions( action => action.generateAnalysisModel);

    function handleClick(e) {

        generateAnalysisModel({
                metabolites: metabolites.slice(0,5),
                genes: genes.slice(0,5),
                reactions: reactions.slice(0,5)
            })
    }

    return(
        <React.Fragment>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 1 })}
                            onClick={() => { toggle(1) }}>
                            Flux Balance Analysis
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => { toggle(2) }}>
                            Other Simulations
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>

                        <Row >

                            <Col md="7" >

                                <Row style={{padding: "20px"}}>

                                    <Col md="4">

                                        <h3>Environmental Variables</h3>

                                        <hr/>

                                        <Button
                                            onClick={
                                                handleClick
                                            }
                                            color="success" style={{position: "absolute",right: "20px"}}>Run the Simulation > </Button>

                                    </Col>

                                    <Col md="8">

                                        <FluxControl
                                            reactions={reactions}
                                        />
                                    </Col>

                                </Row>

                                <Row style={{padding: "20px"}}>

                                    <Col md="4">

                                    </Col>

                                    <Col md="8">

                                        <GeneControl
                                            genes={genes}/>
                                    </Col>

                                </Row>

                            </Col>

                            <Col md="5" >

                                <SimulationGraph reactions={reactions} metabolites={metabolites} />

                            </Col>

                        </Row>
                    </TabPane>
                    <TabPane tabId={2}>
                            Tab 2
                    </TabPane>
                </TabContent>



        </React.Fragment>
    )

}

export default SimulationTab;
