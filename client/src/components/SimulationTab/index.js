import React from 'react'
import { Row, Col, Button} from 'reactstrap'
import {useStoreState, useStoreActions} from "easy-peasy";
import FluxControlForFBA from "../FluxControl/forFBA";
import GeneControlForFBA from "../GeneControl/forFBA";
import SimulationGraph from "../SimulationGraph";
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AnalysisInfo from "../AnalysisInfo";
import FluxResults from "../FluxResults";
import EssentialComponents from "../Essential Components";
import FluxControlForFVA from "../FluxControl/forFVA";
import GeneControlForFVA from "../GeneControl/forFVA";


function SimulationTab() {

    const [activeTab, toggle] = React.useState( 1);

    const currentReactions = useStoreState( state => state.currentModel.reactions);
    const currentGenes= useStoreState( state => state.currentModel.genes);

    const updatedGenes = useStoreState(state => state.updatedGenes);
    const updatedReactions = useStoreState(state => state.updatedReactions);

    const currentFVAReactions = useStoreState( state => state.currentAnalysisModel.reactions);
    const currentFVAGenes= useStoreState( state => state.currentAnalysisModel.genes);

    const analysisMetabolites = useStoreState(state => state.currentFBAModel.metabolites);
    const analysisReactions = useStoreState(state => state.currentFBAModel.reactions);
    const analysisGenes = useStoreState(state => state.currentFBAModel.genes);
    const name = useStoreState(state => state.currentFBAModel.name);
    const info = useStoreState(state=> state.currentFBAModel.objective_value);
    const analysisFVAReactions = useStoreState(state=> state.currentFVAModel.reactions);
    const analysisFVAName = useStoreState(state=>state.currentFVAModel.name);
    const analysisFVAInfo = useStoreState(state=> state.currentFVAModel.objective_value);


    const runFluxBalanceAnalysis = useStoreActions( action => action.runFluxBalanceAnalysis);
    const runFluxVariabilityAnalysis = useStoreActions( action => action.runFluxVariabilityAnalysis);

    const runEssentiality = useStoreActions(action=> action.runEssentiality);
    const runSyntheticLethality = useStoreActions(action=>action.runSyntheticLethality);

    function runFBA(e) {
        e.preventDefault();
        runFluxBalanceAnalysis({
                reactions: updatedReactions,
                genes: updatedGenes
            })
    }
    function runFVA(e) {
        e.preventDefault();
        runFluxVariabilityAnalysis({
            reactions: updatedReactions,
            genes: updatedGenes
        })
    }
    function runEssentialityFunction(e) {
        e.preventDefault();
        runEssentiality({
            str: "essentiality"
        })
    }
    function runSyntheticLethalityFunction(e) {
        e.preventDefault();
        runSyntheticLethality({
            str: "syntheticlethality"
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
                            Flux Variability Analysis
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => { toggle(3) }}>
                            Essentiality
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => { toggle(4) }}>
                            Synthetic Lethality
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    {/*
                        FLUX BALANCE ANALYSIS
                    */}
                    <TabPane tabId={1}>
                        <Row >
                            <Col md="7" >
                                <Row style={{padding: "20px"}}>
                                    <Col md="5">
                                        <h3>
                                        <Button
                                            onClick={
                                                runFBA
                                            }
                                            color="success" style={{position: "absolute",left: "25%"}}>Run the Simulation >
                                        </Button></h3>
                                        <br/><hr/>
                                        <AnalysisInfo name={name} info={info}/>
                                        <FluxResults
                                            height={"450px"}
                                            updatedReactions={analysisReactions}/>
                                    </Col>
                                    <Col md="7">
                                            <FluxControlForFBA
                                                height={"325px"}
                                                knockOff={false}
                                                updatedReactions={updatedReactions}
                                                reactions={currentReactions}
                                            />
                                            <br/>
                                            <GeneControlForFBA
                                                updatedGenes={updatedGenes}
                                                genes={currentGenes}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <SimulationGraph metabolites={analysisMetabolites} reactions={analysisReactions}  />
                            </Col>
                        </Row>
                    </TabPane>
                    {/*
                        FLUX VARIABILITY ANALYSIS
                    */}
                    <TabPane tabId={2}>
                        <Row >
                            <Col md="7" >
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <h3>
                                            <Button
                                                onClick={
                                                    runFVA
                                                }
                                                color="success" style={{position: "absolute",left: "25%"}}>Run the Simulation >
                                            </Button>
                                        </h3>
                                        <br/><hr/>
                                    </Col>
                                    <Col md="8">
                                        <FluxControlForFVA
                                            knockOff={true}
                                            height={"325px"}
                                            updatedReactions={updatedReactions}
                                            reactions={currentFVAReactions}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <AnalysisInfo name={analysisFVAName} info={analysisFVAInfo}/>
                                    </Col>
                                    <Col md="8">
                                        <GeneControlForFVA
                                            updatedGenes={updatedGenes}
                                            genes={currentFVAGenes}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <FluxResults
                                    height={"750px"}
                                    updatedReactions={analysisFVAReactions}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId={3}>
                        <Row >
                            <Col md="7" >
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <h3>
                                            <Button
                                                onClick={
                                                    runEssentialityFunction
                                                }
                                                color="success" style={{position: "absolute",left: "25%"}}>Run the Simulation >
                                            </Button>
                                        </h3>
                                        <br/><hr/>
                                        HERE THE USER WILL BE ABLE TO KNOCK OFF REACTIONS AND CONTROL FLUXES.
                                        BASED UPON THAT I WILL CALCULATE THE ESSENTIAL REACTIONS, FOR NOW, I HAVE DISPLAYED ALL THE REACTIONS JUST TO SHOW, HOW IT WOULD LOOK
                                    </Col>
                                    <Col md="8">
                                        <FluxControlForFBA
                                            height={"750px"}
                                            knockOff={true}
                                            // updatedReactions={updatedReactions}
                                            reactions={currentReactions}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <EssentialComponents
                                    height={"750px"}
                                    analysisReactions={analysisReactions}
                                    analysisGenes={analysisGenes}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId={4}>
                        <Row >
                            <Col md="7" >
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <h3>
                                            <Button
                                                onClick={
                                                    runSyntheticLethalityFunction
                                                }
                                                color="success" style={{position: "absolute",left: "25%"}}>Run the Simulation >
                                            </Button>
                                        </h3>
                                        <br/><hr/>
                                        HERE THE USER WILL BE ABLE TO KNOCK OFF REACTIONS OR GENES.
                                        IT WILL BE IN PAIR, TWO REACTIONS OR TWO GENES.
                                        BASED UPON THAT I WILL CALCULATE THE ESSENTIAL REACTIONS, FOR NOW, I HAVE DISPLAYED ALL THE REACTIONS AND GENES JUST TO SHOW, HOW IT WOULD LOOK
                                    </Col>
                                    <Col md="8">
                                        <FluxControlForFBA
                                            knockOff={true}
                                            height={"325px"}
                                            // updatedReactions={updatedReactions}
                                            reactions={currentReactions}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <AnalysisInfo name={name} />
                                    </Col>
                                    <Col md="8">
                                        <GeneControlForFBA
                                            // updatedGenes={updatedGenes}
                                            genes={currentGenes}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <EssentialComponents
                                    height={"750px"}
                                    analysisReactions={analysisReactions}
                                    analysisGenes={analysisGenes}/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>



        </React.Fragment>
    )

}

export default SimulationTab;
