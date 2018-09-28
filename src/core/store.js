import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import reducer from '../reducers/root'


export const history = createBrowserHistory()

const createRootReducer = () =>
  combineReducers({
    root: reducer,
  })

export default function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    connectRouter(history)(createRootReducer()) /* preloadedState, */,
    composeEnhancers(applyMiddleware(thunk, logger, routerMiddleware(history))),
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers/root', () => {
        store.replaceReducer(createRootReducer())
      })
    }
  }

  return store
}
