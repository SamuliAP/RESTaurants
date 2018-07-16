import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_SESSION,
  CREATE_SESSION, 
  DELETE_SESSION,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE, 
  CREATE_SESSION_SUCCESS, 
  CREATE_SESSION_FAILURE, 
  DELETE_SESSION_FAILURE,
  DELETE_SESSION_SUCCESS
} from '../actionTypes'
import { getSession, createSession, deleteSession } from '../../api'

// watchers
export function* watchSession() {
  yield all([
    takeLatest(FETCH_SESSION, apiWorker, getSession, FETCH_SESSION_SUCCESS, FETCH_SESSION_FAILURE),
    takeLatest(CREATE_SESSION, apiWorker, createSession, CREATE_SESSION_SUCCESS, CREATE_SESSION_FAILURE),
    takeLatest(DELETE_SESSION, apiWorker, deleteSession, DELETE_SESSION_SUCCESS, DELETE_SESSION_FAILURE),
  ])
}