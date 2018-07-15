import { takeLatest } from "redux-saga/effects";

import { apiWorker } from './workers'
import { FETCH_USERS, CREATE_USER } from '../actionTypes'
import { fetchUsers, createUser } from '../../api'

// watchers
export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS, apiWorker, fetchUsers)
}

export function* watchCreateUser() {
  yield takeLatest(CREATE_USER, apiWorker, createUser)
}