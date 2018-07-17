import { CREATE_SESSION, DELETE_SESSION, FETCH_SESSION } from '../actionTypes'

// action creators
export const fetchSession = () => ({ type:FETCH_SESSION })
export const createSession = payload => ({ type:CREATE_SESSION, payload })
export const deleteSession = () => ({ type:DELETE_SESSION })