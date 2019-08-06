import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import NavBar from './components/Navbar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ImportSbmlForm from './components/Navbar/ImportSbmlForm'
import SavedModels from './components/Navbar/SavedModels'
toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
});

function App() {
    const [importModal, setImportModal] = React.useState(false)
    const [savedModal, setSavedModal] = React.useState(false)

  return (
    <React.Fragment>
          <NavBar importModel={() => {setImportModal(!importModal)}}
                  savedModels={() => setSavedModal(!importModal)}/>
            <Modal isOpen={importModal} toggle={() => {setImportModal(!importModal)}}>
                <ModalHeader toggle={() => {setImportModal(!importModal)}}>
                  Import an existing SBML Model
                </ModalHeader>
                <ModalBody>
                  <ImportSbmlForm closeModal={() => {setImportModal(!importModal)}}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={savedModal} toggle={() => setSavedModal(!savedModal)}>
                <ModalHeader toggle={() => setSavedModal(!savedModal)}>
                    Saved Models
                </ModalHeader>
                <ModalBody>
                    <SavedModels />
                </ModalBody>
            </Modal>
    </React.Fragment>
  )
}

export default App
