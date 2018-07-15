import { combineReducers } from 'redux'

import usersReducer from './users'
import sessionReducer from './session'

const rootReducer = combineReducers({
  usersReducer,
  sessionReducer
})

export default rootReducer