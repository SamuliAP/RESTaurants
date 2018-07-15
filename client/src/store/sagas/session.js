import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { CREATE_SESSION, DELETE_SESSION } from '../actionTypes'
import { createSession, deleteSession } from '../../api'

// watchers
export function* watchSession() {
  yield all([
    takeLatest(CREATE_SESSION, apiWorker, createSession),
    takeLatest(DELETE_SESSION, apiWorker, deleteSession)
  ])
}