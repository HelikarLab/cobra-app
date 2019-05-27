/* eslint-env browser */
import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'

function UploadSbml () {
  return (
    <React.Fragment>
      <Formik initialValues={{ upload: '' }}
        onSubmit={(values, actions) => {
          const formData = new FormData()
          formData.append('file', values.file, values.file.name)
          axios.post('/api/uploadSbml', formData)
        }}
        render={(props) => (
          <form onSubmit={props.handleSubmit}>
            <input type='file' name='file' placeholder='Upload' onChange={(event) => {
              props.setFieldValue('file', event.currentTarget.files[0])
            }} />
            <button type='submit'>Submit</button>
          </form>
        )}
      />
    </React.Fragment>
  )
}

export default UploadSbml
