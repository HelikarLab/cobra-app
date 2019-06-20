import React from 'react'
import { Formik } from 'formik'
import { useStoreActions } from 'easy-peasy'
import { Button, Form, FormText, FormGroup } from 'reactstrap'

function ImportSbmlForm({ closeModal }) {
  const importSbml = useStoreActions(action => action.importSbml)

  return (
    <React.Fragment>
      <Formik
        initialValues={{ file: '' }}
        onSubmit={(values, actions) => {
          if (values.file) {
            importSbml(values.file)
            closeModal()
          }
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <FormGroup>
              <input
                required
                type="file"
                name="file"
                placeholder="Upload"
                onChange={event => {
                  props.setFieldValue('file', event.currentTarget.files[0])
                }}
              />
              <FormText color="muted">
                Please upload a .sbml or .xml file which is formatted atleast in
                level 2 SBML for constraint (FBA) based models.
              </FormText>
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      />
    </React.Fragment>
  )
}

export default ImportSbmlForm
