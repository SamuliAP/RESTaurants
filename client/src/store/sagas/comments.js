import { takeLatest, all } from "redux-saga/effects";

import { apiWorker } from './workers'
import { 
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  CREATE_COMMENT,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS
} from '../actionTypes'
import { getComments, createComment, deleteComment } from '../../api'

// watchers
export function* watchComments() {
  yield all([
    takeLatest(FETCH_COMMENTS, apiWorker, getComments, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE),
    takeLatest(CREATE_COMMENT, apiWorker, createComment, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE),
    takeLatest(DELETE_COMMENT, apiWorker, deleteComment, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE),
  ])
}