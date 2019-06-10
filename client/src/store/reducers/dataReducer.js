import {
  IMPORT_SBML
} from '../actions/actionTypes'

const INITIAL_STATE = {
  model: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IMPORT_SBML:
      return { ...state, model: action.payload.model }
    default:
      return state
  }
}
