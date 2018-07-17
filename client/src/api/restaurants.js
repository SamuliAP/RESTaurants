import { get, post, del, patch } from './api'

export const getRestaurants = options => get('/restaurants', options)
export const createRestaurant = options => post('/restaurants', options)
export const deleteRestaurant = (options, id) => del(`/restaurants/${id}`, options)
export const updateRestaurantName = (options, id) => patch(`/restaurants/${id}/name`, options)
export const updateRestaurantAddress = (options, id) => patch(`/restaurants/${id}/address`, options)