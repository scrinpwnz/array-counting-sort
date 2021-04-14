import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './store'
import { context } from '@reatom/react'

ReactDOM.render(
  <context.Provider value={store}>
    <App />
  </context.Provider>,
  document.getElementById('root')
)
