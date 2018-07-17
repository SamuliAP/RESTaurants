import { get, post } from './api'

export const getRestaurants = options => get('/restaurants', options)
export const createRestaurant = options => post('/restaurants', options)