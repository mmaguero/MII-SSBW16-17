import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './index.css'
import App from './components/App'
import restaApp from './reducers'

let store = createStore(restaApp)

import { Listar, Añadir, Detallar } from './actions'
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// store.dispatch(Listar())
// store.dispatch(Añadir())
// store.dispatch(Detallar('restaurante pepe'))


// Stop listening to state updates
//unsubscribe()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
