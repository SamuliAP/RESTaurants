import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { FETCH_USERS, CREATE_USER, USERS_API_SUCCESS, USERS_API_FAILURE } from '../actionTypes'
import { fetchUsers, createUser } from '../../api'

// watchers
export function* watchUsers() {
  yield all([
    takeLatest(FETCH_USERS, apiWorker, fetchUsers, USERS_API_SUCCESS, USERS_API_FAILURE),
    takeLatest(CREATE_USER, apiWorker, createUser, USERS_API_SUCCESS, USERS_API_FAILURE)
  ])
}