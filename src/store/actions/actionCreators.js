import axios from 'axios'
import * as actions from './actionTypes'

export function importSbml (formData) {
  const request = axios({
    method: 'post',
    url: `/api/uploadSbml`,
    data: formData
  })
  return dispatch => {
    request
      .then(res => {
        const payload = JSON.parse(res.data)
        dispatch({
          type: actions.IMPORT_SBML,
          payload
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
