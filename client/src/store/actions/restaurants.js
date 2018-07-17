import { FETCH_RESTAURANTS, CREATE_RESTAURANT } from '../actionTypes'

// action creators
export const fetchRestaurants = () => ({ type: FETCH_RESTAURANTS })
export const createRestaurant = restaurant => ({ type: CREATE_RESTAURANT, payload: restaurant})