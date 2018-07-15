import { get, post } from './api'

// GET all users
export const fetchUsers = () => get('/users')

// POST a new user
export const createUser = body => post('/users', { body })