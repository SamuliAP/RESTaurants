import { CREATE_SESSION, DELETE_SESSION, FETCH_SESSION } from '../actionTypes'

// action creators
export const fetchSession = () => ({ type:FETCH_SESSION })
export const createSession = credentials => ({ type:CREATE_SESSION, payload:credentials })
export const deleteSession = () => ({ type:DELETE_SESSION })