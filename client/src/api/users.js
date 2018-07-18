import { get, post, del, patch } from './api'

// GET all users
export const fetchUsers = options => get('/users', options)

// POST a new user
export const createUser = options => post('/users', options)

export const deleteUser = (options, id) => del(`/users/${id}`, options)

export const updateUserRole = (options, id) => patch(`/users/${id}/role`, options)
export const updateUserEmail = (options, id) => patch(`/users/${id}/email`, options)
export const updateUserPassword = (options, id) => patch(`/users/${id}/password`, options)