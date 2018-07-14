import createSagaMiddleware from 'redux-saga'

import { watchFetchDog } from './users'

const sagaMiddleware = createSagaMiddleware()

export const runSagas = () => {
  sagaMiddleware.run(watchFetchDog)
} 

export default sagaMiddleware