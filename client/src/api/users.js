import { get, post } from './api'

// GET all users
export const fetchUsers = options => get('/users', options)

// POST a new user
export const createUser = options => post('/users', options)