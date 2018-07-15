import { FETCH_USERS, API_SUCCESS, API_FAILURE, CREATE_USER } from '../actionTypes'

const initialState = {
  fetching: false,
  user: null,
  users: [],
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS: return { ...state, fetching: true, errors: [] };
    case CREATE_USER: return { ...state, fetching: true, errors: [] };
    case API_SUCCESS: return { 
      ...state, 
      fetching: false, 
      users: Array.isArray(action.payload) ? action.payload : state.users,
      user: !Array.isArray(action.payload) ? action.payload : state.user 
    };
    case API_FAILURE: return { ...state, fetching: false, errors: action.errors };
    default: return state
  }
}