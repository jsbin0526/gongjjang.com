// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './_components/App'
import axios from 'axios'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'
import Reducer from './_reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

axios.defaults.withCredentials = true

const store = createStore(Reducer, composeWithDevTools(
  applyMiddleware(promiseMiddleware, ReduxThunk)
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
