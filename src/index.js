import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"

import './assets/css/index.css'
import './assets/css/Fonts.css'

import App from './views/App'
import * as serviceWorker from './serviceWorker'
import reducers from "./reducers"
 
serviceWorker.register()
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);