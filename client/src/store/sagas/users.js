import { takeLatest, call, put } from "redux-saga/effects";

import { FETCH_USERS, API_SUCCESS, API_FAILURE} from '../actionTypes'
import { fetchUsers } from '../../api'

export function* watchFetchDog() {
  yield takeLatest(FETCH_USERS, workerFetchUsers)
}

function* workerFetchUsers() {
  try {
    const response = yield call(fetchUsers)
    const responseData = response.json()
    const users = responseData.data

    yield put({ type: API_SUCCESS, users})
  } catch(errors) {
    yield put({ type:API_FAILURE, errors })
  }
}