import { FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '../actionTypes'

// action creators
export const fetchComments = () => ({ type: FETCH_COMMENTS })
export const createComment = payload => ({ type: CREATE_COMMENT, payload })
export const deleteComment = id => ({ type: DELETE_COMMENT, id })