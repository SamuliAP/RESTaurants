import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { CREATE_SESSION, DELETE_SESSION, SESSION_API_SUCCESS, SESSION_API_FAILURE } from '../actionTypes'
import { createSession, deleteSession } from '../../api'

// watchers
export function* watchSession() {
  yield all([
    takeLatest(CREATE_SESSION, apiWorker, createSession, SESSION_API_SUCCESS, SESSION_API_FAILURE),
    takeLatest(DELETE_SESSION, apiWorker, deleteSession, SESSION_API_SUCCESS, SESSION_API_FAILURE)
  ])
}