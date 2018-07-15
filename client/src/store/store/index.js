import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers';
import sagaMiddleware, { runSagas } from '../sagas'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // TODO TÄMÄ POIS
  applyMiddleware(sagaMiddleware)
)

runSagas()

export default store;