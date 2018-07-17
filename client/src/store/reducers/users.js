import { 
  FETCH_USERS, 
  CREATE_USER, 
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE 
} from '../actionTypes'

const initialState = {
  fetching: false,
  users: [],
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS: return { ...state, fetching: true, errors: [] };
    case CREATE_USER: return { ...state, fetching: true, errors: [] };
    case FETCH_USERS_SUCCESS: return { ...state, fetching: false, users: action.payload };
    case FETCH_USERS_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case CREATE_USER_SUCCESS: return { ...state, fetching: false, users: [ ...(state.users), action.payload ] };
    case CREATE_USER_FAILURE: return { ...state, fetching: false, errors: action.errors };
    default: return state
  }
}