import { combineReducers } from 'redux'

import usersReducer from './users'
import sessionReducer from './session'
import restaurantsReducer from './restaurants'

const rootReducer = combineReducers({
  usersReducer,
  sessionReducer,
  restaurantsReducer
})

export default rootReducer