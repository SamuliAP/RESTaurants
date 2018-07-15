import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { FETCH_USERS, CREATE_USER } from '../actionTypes'
import { fetchUsers, createUser } from '../../api'

// watchers
export function* watchUsers() {
  yield all([
    takeLatest(FETCH_USERS, apiWorker, fetchUsers),
    takeLatest(CREATE_USER, apiWorker, createUser)
  ])
}