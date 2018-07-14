import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers';
import sagaMiddleware, { runSagas } from '../sagas'

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

runSagas()

export default store;