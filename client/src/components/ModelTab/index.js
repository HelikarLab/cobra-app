import React from 'react'
import { useStoreState } from 'easy-peasy'
import { Row, Col } from 'reactstrap'
import Graph from '../ModelGraph'
import ReactionsList from '../ReactionsList'
import MetabolitesList from '../MetabolitesList'
import InfoPanel from '../InfoPanel'
import GenesList from "../GenesList";
import ModelMetaData from "../ModelMetaData";

function ModelTab() {
    const [type, setType] = React.useState('');
    const [info, setInfo] = React.useState({});
    //const [modal, setModal] = React.useState(false)

    const { reactions, metabolites, genes,name } = useStoreState(
        state => state.currentModel
    );

    //const saveModel = useStoreActions(action => action.saveModel);

    return (
        <React.Fragment>
            {/*<Modal isOpen={modal} toggle={() => { setModal(!modal)}}>

                <ModalHeader toggle={() => {setModal(!modal) }}>
                    Save your SBML Model
                </ModalHeader>

                <ModalBody>
                    Are you sure?
                    <br />
                    <br />
                    <Button color="primary"  onClick={() => { saveModel()
                                                                setModal(!modal)}}>
                        Yes
                    </Button>

                    {` `}

                    <Button color="danger" onClick={() => setModal(!modal)}>
                        Cancel
                    </Button>

                </ModalBody>


            </Modal>*/}

            <Row style={{ padding: 20 }}>

                <Col md="4">

                    <Graph reactions={reactions} metabolites={metabolites} />

                    <ModelMetaData data={name} />

                </Col>

                <Col md="8">
                    <Row>

                        <Col>
                            <ReactionsList
                                reactions={reactions}
                                setInfo={setInfo}
                                setType={setType}
                            />
                        </Col>

                        <Col>
                            <MetabolitesList
                                metabolites={metabolites}
                                setInfo={setInfo}
                                setType={setType}
                            />
                        </Col>

                        <Col>
                            <GenesList
                                genes={genes}
                                setInfo={setInfo}
                                setType={setType}
                            />
                        </Col>


                    </Row>
                    <Row style={{ marginTop: 30 }}>

                        <Col>
                            <InfoPanel type={type} data={info} />
                        </Col>

                        {/*<Col>
                            <Button
                                style={{ float: 'right' }}
                                outline
                                color="success"
                                onClick={() => setModal(!modal)}
                                disabled={name ? false : true}>

                                Save Model
                            </Button>
                        </Col>*/}

                    </Row>

                    <Row>
                        <Col />
                    </Row>

                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ModelTab
