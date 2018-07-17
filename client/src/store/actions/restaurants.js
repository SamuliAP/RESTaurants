import { FETCH_RESTAURANTS, CREATE_RESTAURANT, DELETE_RESTAURANT } from '../actionTypes'

// action creators
export const fetchRestaurants = () => ({ type: FETCH_RESTAURANTS })
export const createRestaurant = restaurant => ({ type: CREATE_RESTAURANT, payload: restaurant})
export const deleteRestaurant = id => ({ type: DELETE_RESTAURANT, id: id})