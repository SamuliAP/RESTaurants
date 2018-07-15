import createSagaMiddleware from 'redux-saga'

import { watchUsers } from './users'
import { watchSession } from './session'

const sagaMiddleware = createSagaMiddleware()

export const runSagas = () => {
  sagaMiddleware.run(watchUsers)
  sagaMiddleware.run(watchSession)
} 

export default sagaMiddleware