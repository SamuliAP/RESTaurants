import { combineReducers } from 'redux'

import usersReducer from './users'
import sessionReducer from './session'
import restaurantsReducer from './restaurants'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  usersReducer,
  sessionReducer,
  restaurantsReducer,
  commentsReducer
})

export default rootReducer