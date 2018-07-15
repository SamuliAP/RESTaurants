import createSagaMiddleware from 'redux-saga'

import { watchFetchUsers, watchCreateUser } from './users'

const sagaMiddleware = createSagaMiddleware()

export const runSagas = () => {
  sagaMiddleware.run(watchFetchUsers)
  sagaMiddleware.run(watchCreateUser)
} 

export default sagaMiddleware