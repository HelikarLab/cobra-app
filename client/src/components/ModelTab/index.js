import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Graph from './ModelGraph'
import ReactionsList from './ReactionsList'
import MetabolitesList from './MetabolitesList'
import InfoPanel from './InfoPanel'
import GenesList from "./GenesList";
import ModelMetaData from "./ModelMetaData";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function ModelTab() {
    const [type, setType] = React.useState('');
    const [info, setInfo] = React.useState({});
    const [modal, setModal] = React.useState(false)

    const { reactions, metabolites, genes,name } = useStoreState(
        state => state.modelTab.currentModel
    );
    const saveModel = useStoreActions(actions => actions.modelTab.saveModel)

    return (
        <React.Fragment>
            <Modal isOpen={modal} toggle={() => {setModal(!modal)}}>
                <ModalHeader toggle={() => {setModal(!modal)}}>
                    Save your SBML Model
                </ModalHeader>
                <ModalBody>
                    Are you sure?
                    <br />
                    <br />
                    <Button color="primary"
                        onClick={async () => {
                            const temp = await saveModel()
                            if (temp.error) toast.error(temp.message)
                            else toast.success(temp.message)
                            setModal(!modal)
                        }}>
                        Yes
                    </Button>
                    {` `}
                    <Button color="danger" onClick={() => setModal(!modal)}>
                        Cancel
                    </Button>
                </ModalBody>
            </Modal>
            <Row style={{ padding: 20 }}>
                <Col md="4">
                    <Graph reactions={reactions} metabolites={metabolites} />
                    <ModelMetaData data={name} />
                    <Row style={{ marginTop: 30 }}>
                        <Col>
                            <Button
                                style={{ float: 'left' }}
                                outline
                                color="success"
                                disabled={name ? false : true}
                                onClick={() => setModal(!modal)}
                                >
                                Save Model
                            </Button>
                        </Col>
                    </Row>
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
