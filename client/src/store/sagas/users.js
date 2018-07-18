import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_USERS, 
  CREATE_USER, 
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_EMAIL_FAILURE,
  UPDATE_USER_EMAIL_SUCCESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_FAILURE,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_FAILURE,
  UPDATE_USER_ROLE_SUCCESS
} from '../actionTypes'

import { 
  fetchUsers, 
  createUser, 
  updateUserEmail, 
  updateUserPassword, 
  updateUserRole,
  deleteUser
} from '../../api'

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

    takeLatest(
      CREATE_USER, 
      apiWorker, 
      createUser, 
      CREATE_USER_SUCCESS, 
      CREATE_USER_FAILURE
    ),

    takeLatest(
      DELETE_USER,
      apiWorker,
      deleteUser,
      DELETE_USER_SUCCESS,
      DELETE_USER_FAILURE
    ),

    takeLatest(
      UPDATE_USER_EMAIL, 
      apiWorker, 
      updateUserEmail, 
      UPDATE_USER_EMAIL_SUCCESS, 
      UPDATE_USER_EMAIL_FAILURE
    ),

    takeLatest(
      UPDATE_USER_PASSWORD, 
      apiWorker, 
      updateUserPassword, 
      UPDATE_USER_PASSWORD_SUCCESS, 
      UPDATE_USER_PASSWORD_FAILURE
    ),

    takeLatest(
      UPDATE_USER_ROLE, 
      apiWorker, 
      updateUserRole, 
      UPDATE_USER_ROLE_SUCCESS, 
      UPDATE_USER_ROLE_FAILURE
    )
  ])
}