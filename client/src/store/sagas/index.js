import createSagaMiddleware from 'redux-saga'

import { watchUsers } from './users'
import { watchSession } from './session'
import { watchRestaurants } from './restaurants'

const sagaMiddleware = createSagaMiddleware()

export const runSagas = () => {
  sagaMiddleware.run(watchUsers)
  sagaMiddleware.run(watchSession)
  sagaMiddleware.run(watchRestaurants)
} 

export default sagaMiddleware