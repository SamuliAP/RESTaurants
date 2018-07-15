import { call, put } from "redux-saga/effects";

export function* apiWorker(request, success, failure, params) {
  console.log(success)
  const response     = yield call(request, params && params.payload && {...(params.payload)})
  const responseData = yield response.json()

  if(responseData.errors) {
    yield put({ type: failure, errors: responseData.errors })
  } else {
    yield put({ type: success, payload: responseData})
  }
}