import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import './index.css'
import App from './App'

import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './core/store'

const store = configureStore()
registerServiceWorker()


const render = Component =>
  ReactDOM.render(// eslint-disable-line react/no-render-return-value
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default// eslint-disable-line global-require
    render(NextApp)
  })
}
