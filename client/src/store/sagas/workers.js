import { call, put } from "redux-saga/effects";

export function* apiWorker(request, success, failure, params) {

  const response = yield call(
    request, 
    params && params.payload && { ...(params.payload) },
    params && params.id
  )
  const responseData = yield response.json()

  if(responseData.errors) {
    yield put({ type: failure, errors: responseData.errors })
  } else {
    yield put({ type: success, payload: responseData})
  }
}