import { 
  FETCH_SESSION,
  CREATE_SESSION, 
  DELETE_SESSION, 
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  CREATE_SESSION_SUCCESS, 
  CREATE_SESSION_FAILURE, 
  DELETE_SESSION_FAILURE,
  DELETE_SESSION_SUCCESS,
} from '../actionTypes'

const initialState = {
  fetching: false,
  authenticated: false,
  user: null,
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SESSION: return { ...state, fetching: true, errors: [] };
    case CREATE_SESSION: return { ...state, fetching: true, errors: [] };
    case DELETE_SESSION: return { ...state, fetching: true, errors: [] };
    case FETCH_SESSION_SUCCESS: return { ...state, authenticated: true, errors: [], user: action.payload, fetching: false, };
    case FETCH_SESSION_FAILURE: return { ...state, authenticated: false, fetching: false, };
    case CREATE_SESSION_SUCCESS: return { ...state, authenticated: true, errors: [], user: action.payload, fetching: false, };
    case CREATE_SESSION_FAILURE: return { ...state, authenticated: false, fetching: false, errors: action.errors };
    case DELETE_SESSION_SUCCESS: return { ...state, authenticated: false, errors: [], fetching: false, };
    case DELETE_SESSION_FAILURE: return { ...state, fetching: false, authenticated: false, errors: action.errors };
    default: return state
  }
}