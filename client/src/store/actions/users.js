import { 
  FETCH_USERS, 
  CREATE_USER, 
  DELETE_USER, 
  UPDATE_USER_EMAIL, 
  UPDATE_USER_PASSWORD, 
  UPDATE_USER_ROLE 
} from '../actionTypes'

// action creators
export const fetchUsers = ()   => ({ type: FETCH_USERS })
export const createUser = user => ({ type: CREATE_USER, payload: user })
export const deleteUser = id => ({ type: DELETE_USER, id })
export const updateUserEmail = (payload, id) => ({ type: UPDATE_USER_EMAIL, payload, id })
export const updateUserRole = (payload, id) => ({ type: UPDATE_USER_ROLE, payload, id })
export const updateUserPassword = (payload, id) => ({ type: UPDATE_USER_PASSWORD, payload, id })