import { get } from './api'

export const getRestaurants = options => get('/restaurants', options)