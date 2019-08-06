import React from 'react'
import { Row, Col, Button, ListGroupItem } from 'reactstrap'
import {useStoreState, useStoreActions} from "easy-peasy";
import GeneControl from "./GeneControl/index";
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AnalysisInfo from "./AnalysisInfo";
import FluxResultsForFBA from "./FluxResults/forFBA";
import FluxResultsForFVA from "./FluxResults/forFVA";
import EssentialComponents from "./Essential Components";
import { Alert, notification } from 'antd'
import 'antd/dist/antd.css';
import FluxControl from "./FluxControl";
import {cloneDeep} from "lodash";
import Visualisation from './Visualisation'
import { toast } from 'react-toastify'


function SimulationTab() {

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Error! ',
            description:
                'For Synthetic Lethality, you can only knockout 2 reactions or 2 genes!',
        });
    };

    const [activeTab, toggle] = React.useState( 1);

    const filename = useStoreState(state => state.modelTab.currentModel.filename);

    const {reactions,genes }= useStoreState( state => state.modelTab.currentModel);
    const {updatedReactions, updatedGenes} = useStoreState( state => state.simulationTab);

    const analysisReactions = useStoreState(state => state.simulationTab.currentFBAModel.reactions);
    const name = useStoreState(state => state.simulationTab.currentFBAModel.name);
    const info = useStoreState(state=> state.simulationTab.currentFBAModel.objective_value);
    const analysisFVAReactions = useStoreState(state=> state.simulationTab.currentFVAModel.reactions);
    const analysisFVAName = useStoreState(state=>state.simulationTab.currentFVAModel.name);
    const analysisFVAInfo = useStoreState(state=> state.simulationTab.currentFVAModel.objective_value);
    const analysisEssentialityReactions = useStoreState(state => state.simulationTab.currentEssentialityModel.essentialReactions)
    const analysisEssentialityGenes= useStoreState(state => state.simulationTab.currentEssentialityModel.essentialGenes)

    const knockedOutReactions = useStoreState(state=>state.simulationTab.knockedOutReactions);

    const analysisSLInfo = useStoreState(state => state.simulationTab.currentSyntheticLethalityModel);

    const {runFluxBalanceAnalysis,runFluxVariabilityAnalysis,runEssentiality,runSyntheticLethality}=useStoreActions(actions => actions.simulationTab)
    const {resetUpdatedReactions,resetUpdatedGenes,resetKnockedOutReactions} = useStoreActions(actions => actions.simulationTab)

    function runFBA(e) {
        e.preventDefault();
        runFluxBalanceAnalysis({
                filename: filename,
                reactions: updatedReactions,
                genes: updatedGenes
            })
        toast.info("Running the Simulation")
        resetUpdatedReactions();
        resetUpdatedGenes();
        resetKnockedOutReactions();
    }
    function runFVA(e) {
        e.preventDefault();
        runFluxVariabilityAnalysis({
            reactions: updatedReactions,
            genes: updatedGenes
        })
        toast.info("Running the Simulation")
        resetUpdatedReactions();
        resetUpdatedGenes();
        resetKnockedOutReactions();
    }
    function runEssentialityFunction(e) {
        e.preventDefault();
        runEssentiality({
            reactions: updatedReactions,
            genes: updatedGenes
        })
        toast.info("Running the Simulation")
        resetUpdatedReactions();
        resetUpdatedGenes();
        resetKnockedOutReactions();
    }
    function runSyntheticLethalityFunction(e) {
        e.preventDefault();
        if(knockedOutReactions.length>2){
            openNotificationWithIcon('error')
        }
        else{
            runSyntheticLethality({
                reactions: updatedReactions,
                genes: updatedGenes
            })
        }
        toast.info("Running the Simulation")
        resetUpdatedReactions();
        resetUpdatedGenes();
        resetKnockedOutReactions();
    }
    function reset() {
        resetUpdatedReactions();
        resetUpdatedGenes();
    }

    return(
        <React.Fragment>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 1 })}
                            onClick={() => { toggle(1); reset() }}>
                            Flux Balance Analysis
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => { toggle(2); reset()}}>
                            Flux Variability Analysis
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => { toggle(3); reset() }}>
                            Essentiality
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => { toggle(4); reset()}}>
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
                                        <FluxResultsForFBA
                                            height={"450px"}
                                            updatedReactions={analysisReactions}/>
                                    </Col>
                                    <Col md="7">
                                        <FluxControl
                                          knockOff={false}
                                          height={"325px"}
                                          updatedReactions={updatedReactions}
                                          reactions={cloneDeep(reactions)}
                                        />
                                        <br/>
                                        <GeneControl
                                          updatedGenes={updatedGenes}
                                          genes={cloneDeep(genes)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <Visualisation />
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
                                        <FluxControl
                                          knockOff={true}
                                          height={"325px"}
                                          updatedReactions={updatedReactions}
                                          reactions={cloneDeep(reactions)}
                                          knockedOutReactions={[]}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <AnalysisInfo name={analysisFVAName} info={analysisFVAInfo}/>
                                    </Col>
                                    <Col md="8">
                                        <GeneControl
                                            updatedGenes={updatedGenes}
                                            genes={cloneDeep(genes)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <FluxResultsForFVA
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
                                    </Col>
                                    <Col md="8">
                                        <FluxControl
                                            knockOff={true}
                                            height={"750px"}
                                            updatedReactions={updatedReactions}
                                            reactions={cloneDeep(reactions)}
                                            knockedOutReactions={[]}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <EssentialComponents
                                    height={"750px"}
                                    analysisReactions={analysisEssentialityReactions}
                                    analysisGenes={analysisEssentialityGenes}
                                />
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
                                    </Col>
                                    <Col md="8">
                                        <FluxControl
                                          knockOff={true}
                                          height={"325px"}
                                          updatedReactions={updatedReactions}
                                          reactions={cloneDeep(reactions)}
                                          knockedOutReactions={knockedOutReactions}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{padding: "20px"}}>
                                    <Col md="4">
                                        <AnalysisInfo name={name} />
                                    </Col>
                                    <Col md="8">
                                        <GeneControl
                                          updatedGenes={updatedGenes}
                                          genes={cloneDeep(genes)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <Row style={{padding: "20px"}}>
                                    <Col md="12">
                                        {
                                            analysisSLInfo?
                                              analysisSLInfo.lethal?<Alert message="Lethal" type="success" />:<Alert message="Not Lethal" type="error" />
                                              : null
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>



        </React.Fragment>
    )

}

export default SimulationTab;
