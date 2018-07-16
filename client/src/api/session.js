import { get, post, del } from './api'

export const getSession = options => get('/session', options)
export const createSession = options => post('/session', options)
export const deleteSession = options => del('/session', options)