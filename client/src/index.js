import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'easy-peasy'
import { store } from './store'
import { Helmet } from 'react-helmet'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

ReactDOM.render(
  <StoreProvider store={store}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>FBA-APP</title>
    </Helmet>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
