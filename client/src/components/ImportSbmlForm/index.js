/* eslint-env browser */
import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Form, FormText, FormGroup } from 'reactstrap'
import { importSbml } from '../../store/actions/actionCreators'

class ImportSbmlForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Formik initialValues={{ file: '' }}
          onSubmit={(values, actions) => {
            if (values.file) {
              const formData = new FormData()
              formData.append('file', values.file, values.file.name)
              this.props.importSbml(formData)
              this.props.closeModal()
            }
          }}
          render={(props) => (
            <Form onSubmit={props.handleSubmit}>
              <FormGroup>
                <input required type='file' name='file' placeholder='Upload' onChange={(event) => {
                  props.setFieldValue('file', event.currentTarget.files[0])
                }} />
                <FormText color='muted'>
                    Please upload a .sbml or .xml file which is formatted for constrain based (FBA) models.
                </FormText>
              </FormGroup>
              <Button color='primary' type='submit'>Submit</Button>
            </Form>
          )}
        />
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps, { importSbml })(ImportSbmlForm)
