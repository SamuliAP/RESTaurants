import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_USERS, 
  CREATE_USER, 
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE 
} from '../actionTypes'
import { fetchUsers, createUser } from '../../api'

// watchers
export function* watchUsers() {
  yield all([
    takeLatest(
      FETCH_USERS, 
      apiWorker, 
      fetchUsers, 
      FETCH_USERS_SUCCESS, 
      FETCH_USERS_FAILURE
    ),

    takeLatest(CREATE_USER, 
      apiWorker, 
      createUser, 
      CREATE_USER_SUCCESS, 
      CREATE_USER_FAILURE
    )
  ])
}