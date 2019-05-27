import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import UploadSbml from './components/UploadSbml'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>COBRA APP</h1>
        <UploadSbml />
      </PersistGate>
    </Provider>
  )
}

export default App
