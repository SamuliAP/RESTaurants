import { FETCH_USERS, CREATE_USER, DELETE_USER } from '../actionTypes'

// action creators
export const fetchUsers = ()   => ({ type: FETCH_USERS })
export const createUser = user => ({ type: CREATE_USER, payload: user })
export const deleteUser = user => ({ type: DELETE_USER, payload: user })