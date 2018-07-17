import { 
  FETCH_RESTAURANTS, 
  CREATE_RESTAURANT, 
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT_ADDRESS,
  UPDATE_RESTAURANT_NAME
} from '../actionTypes'

// action creators
export const fetchRestaurants = () => ({ type: FETCH_RESTAURANTS })
export const createRestaurant = payload => ({ type: CREATE_RESTAURANT, payload})
export const deleteRestaurant = id => ({ type: DELETE_RESTAURANT, id})
export const updateRestaurantName = (payload, id) => ({ type: UPDATE_RESTAURANT_NAME, payload, id })
export const updateRestaurantAddress = (payload, id) => ({ type: UPDATE_RESTAURANT_ADDRESS, payload, id })