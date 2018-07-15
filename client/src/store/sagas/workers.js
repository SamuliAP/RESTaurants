import { call, put } from "redux-saga/effects";
import { API_SUCCESS, API_FAILURE } from '../actionTypes'

export function* apiWorker(request, params) {
  
  const response     = yield call(request, params && params.payload && {...(params.payload)})
  const responseData = yield response.json()

  if(responseData.errors) {
    yield put({ type: API_FAILURE, errors: responseData.errors })
  } else {
    yield put({ type: API_SUCCESS, payload: responseData})
  }
}