import axios from 'axios'
import * as actions from './actionTypes'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL

export function importSbml(formData) {
  const request = axios({
    method: 'post',
    url: `${API_URL}/api/uploadSbml`,
    data: formData,
  })
  return dispatch => {
    request
        .then(res => {
          const payload = JSON.parse(res.data)
          console.log(payload)
          dispatch({
            type: actions.IMPORT_SBML,
            payload,
          })
        })
        .catch(err => {
          console.error(err)
        })
  }
}
