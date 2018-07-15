import { CREATE_SESSION, API_SUCCESS, API_FAILURE, DELETE_SESSION } from '../actionTypes'

const initialState = {
  fetching: false,
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_SESSION: return { ...state, fetching: true, errors: [] };
    case DELETE_SESSION: return { ...state, fetching: true, errors: [] };
    case API_SUCCESS: return { ...state, fetching: false, };
    case API_FAILURE: return { ...state, fetching: false, errors: action.errors };
    default: return state
  }
}