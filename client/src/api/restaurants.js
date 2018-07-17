import { get, post, del } from './api'

export const getRestaurants = options => get('/restaurants', options)
export const createRestaurant = options => post('/restaurants', options)
export const deleteRestaurant = (options, id) => del(`/restaurants/${id}`, options)