import createSagaMiddleware from 'redux-saga'

import { watchUsers } from './users'
import { watchSession } from './session'
import { watchRestaurants } from './restaurants'
import { watchComments } from './comments'

const sagaMiddleware = createSagaMiddleware()

export const runSagas = () => {
  sagaMiddleware.run(watchUsers)
  sagaMiddleware.run(watchSession)
  sagaMiddleware.run(watchRestaurants)
  sagaMiddleware.run(watchComments)
} 

export default sagaMiddleware