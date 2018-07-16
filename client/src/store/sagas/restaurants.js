import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE
} from '../actionTypes'
import { getRestaurants } from '../../api'

// watchers
export function* watchRestaurants() {
  yield all([
    takeLatest(FETCH_RESTAURANTS, apiWorker, getRestaurants, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_FAILURE),
  ])
}