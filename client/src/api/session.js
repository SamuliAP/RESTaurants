import { post, del } from './api'

export const createSession = options => post('/session', options)
export const deleteSession = options => del('/session', options)