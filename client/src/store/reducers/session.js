import { CREATE_SESSION, SESSION_API_SUCCESS, SESSION_API_FAILURE, DELETE_SESSION } from '../actionTypes'

const initialState = {
  fetching: false,
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_SESSION: return { ...state, fetching: true, errors: [] };
    case DELETE_SESSION: return { ...state, fetching: true, errors: [] };
    case SESSION_API_SUCCESS: return { ...state, fetching: false, };
    case SESSION_API_FAILURE: return { ...state, fetching: false, errors: action.errors };
    default: return state
  }
}