import { 
  FETCH_USERS, 
  CREATE_USER, 
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_EMAIL_FAILURE,
  UPDATE_USER_EMAIL_SUCCESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_FAILURE,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_FAILURE,
  UPDATE_USER_ROLE_SUCCESS
} from '../actionTypes'

const initialState = {
  fetching: false,
  users: [],
  errors: [],
  emailErrors: [],
  passwordErrors: [],
  roleErrors: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS: return { ...state, fetching: true, errors: [] };
    case CREATE_USER: return { ...state, fetching: true, errors: [] };
    case DELETE_USER: return { ...state, fetching: true, errors: []}
    case DELETE_USER_SUCCESS: return { ...state, fetching: false, users: state.users.filter(user => {
      return user._id !== action.payload._id
    })}
    case DELETE_USER_FAILURE: return { ...state, fetching: false, errors: action.errors }
    case FETCH_USERS_SUCCESS: return { ...state, fetching: false, users: action.payload };
    case FETCH_USERS_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case CREATE_USER_SUCCESS: return { ...state, fetching: false, users: [ ...(state.users), action.payload ] };
    case CREATE_USER_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case UPDATE_USER_EMAIL: return { ...state, fetching: true, emailErrors: [] };
    case UPDATE_USER_PASSWORD: return { ...state, fetching: true, passwordErrors: [] };
    case UPDATE_USER_ROLE: return { ...state, fetching: true, roleErrors: [] };
    case UPDATE_USER_EMAIL_FAILURE: return { ...state, fetching: false, emailErrors: action.errors };
    case UPDATE_USER_ROLE_FAILURE: return { ...state, fetching: false, roleErrors: action.errors };
    case UPDATE_USER_PASSWORD_FAILURE: return { ...state, fetching: false, passwordErrors: action.errors };
    case UPDATE_USER_EMAIL_SUCCESS: return { ...state, fetching: false, 
      users: state.users.length === 0 ? [action.payload] : state.users.map(val => {
        if(val._id === action.payload._id) {
          return action.payload
        } else {
          return val
        }
      })
    };
    case UPDATE_USER_ROLE_SUCCESS: return { ...state, fetching: false, 
      users: state.users.length === 0 ? [action.payload] : state.users.map(val => {
        if(val._id === action.payload._id) {
          return action.payload
        } else {
          return val
        }
      })
    };
    case UPDATE_USER_PASSWORD_SUCCESS: return { ...state, fetching: false, 
      users: state.users.length === 0 ? [action.payload] : state.users.map(val => {
        if(val._id === action.payload._id) {
          return action.payload
        } else {
          return val
        }
      })
    };
    default: return state
  }
}