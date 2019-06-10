import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'
import NodeGraph from './components/NodeGraph'
import ReactionsList from './components/ReactionsList'
import MetabolitesList from './components/MetabolitesList'
import GenesList from './components/GenesList'

function App () {

    const [modal, setModal] = React.useState(false);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavBar importModel={() => {
                    setModal(!modal)
                }} />
                <Modal isOpen={modal} toggle={() => {
                    setModal(!modal)
                }}>
                    <ModalHeader toggle={() => {
                        setModal(!modal)
                    }}>Import an existing SBML Model</ModalHeader>
                    <ModalBody>
                        <ImportSbmlForm closeModal={() => {
                            setModal(!modal)
                        }} />
                    </ModalBody>
                </Modal>
                <div>
                    <Row >
                        <Col md={4}>
                                <NodeGraph />
                        </Col>
                        <Col md={8} style={{ width: "650px!important"}}>
                            <Row>
                                <ReactionsList />
                            </Row>
                            <Row>
                                <MetabolitesList />
                            </Row>
                            <Row>
                                <GenesList />
                            </Row>
                        </Col>
                    </Row>
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App
