import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_NAME,
  UPDATE_RESTAURANT_NAME__SUCCESS,
  UPDATE_RESTAURANT_NAME__FAILURE,
  UPDATE_RESTAURANT_ADDRESS,
  UPDATE_RESTAURANT_ADDRESS__SUCCESS,
  UPDATE_RESTAURANT_ADDRESS__FAILURE
} from '../actionTypes'
import { 
  getRestaurants, 
  createRestaurant, 
  deleteRestaurant,
  updateRestaurantName,
  updateRestaurantAddress 
} from '../../api'

// watchers
export function* watchRestaurants() {
  yield all([
    takeLatest(
      FETCH_RESTAURANTS, 
      apiWorker, 
      getRestaurants, 
      FETCH_RESTAURANTS_SUCCESS, 
      FETCH_RESTAURANTS_FAILURE
    ),

    takeLatest(
      CREATE_RESTAURANT, 
      apiWorker, 
      createRestaurant, 
      CREATE_RESTAURANT_SUCCESS, 
      CREATE_RESTAURANT_FAILURE
    ),

    takeLatest(
      DELETE_RESTAURANT, 
      apiWorker, 
      deleteRestaurant, 
      DELETE_RESTAURANT_SUCCESS, 
      DELETE_RESTAURANT_FAILURE
    ),

    takeLatest(
      UPDATE_RESTAURANT_ADDRESS, 
      apiWorker, 
      updateRestaurantAddress, 
      UPDATE_RESTAURANT_ADDRESS__SUCCESS, 
      UPDATE_RESTAURANT_ADDRESS__FAILURE
    ),
    
    takeLatest(
      UPDATE_RESTAURANT_NAME, 
      apiWorker, 
      updateRestaurantName, 
      UPDATE_RESTAURANT_NAME__SUCCESS, 
      UPDATE_RESTAURANT_NAME__FAILURE
    ),
  ])
}