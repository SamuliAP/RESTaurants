import { FETCH_USERS, API_SUCCESS, API_FAILURE } from '../actionTypes'

const initialState = {
  fetching: false,
  users: [],
  errors: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS: return { ...state, fetching: true, error: null }
    case API_SUCCESS: return { ...state, fetching: false, users: action.users }
    case API_FAILURE: return { ...state, fetching: false, users: [], errors: action.errors }
    default: return state
  }
}