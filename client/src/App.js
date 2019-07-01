import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import NavBar from './components/NavBar'
import ImportSbmlForm from './components/ImportSbmlForm'


function App() {
  const [modal, setModal] = React.useState(false);

  return (
    <React.Fragment>

      <NavBar
        importModel={() => {
          setModal(!modal)
        }}
      />

      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(!modal)
        }}>

        <ModalHeader
          toggle={() => {
            setModal(!modal)
          }}>

          Import an existing SBML Model
        </ModalHeader>

        <ModalBody>

          <ImportSbmlForm
            closeModal={() => {
              setModal(!modal)
            }}/>

        </ModalBody>
      </Modal>

        {/*
        <ModelTab />

        */}

        {/*
        <SimulationTab />
        */}

    </React.Fragment>
  )
}

export default App
