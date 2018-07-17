import { FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '../actionTypes'

// action creators
export const fetchComments = () => ({ type: FETCH_COMMENTS })
export const createComment = comment => ({ type: CREATE_COMMENT, payload: comment })
export const deleteComment = id => ({ type: DELETE_COMMENT, id: id })