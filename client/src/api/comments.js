import { put, get, post, del } from './api'

export const getComments = options => get(`/comments`, options)
export const createComment = options => post(`/comments`, options)
export const deleteComment = (options, id) => del(`/comments/${id}`, options)
export const updateComment = (options, id) => put(`/comments/${id}`, options)