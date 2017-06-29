import { combineReducers } from 'redux'

import { DETALLAR, LOGEAR } from '../actions'


// divido el store en dos partes independientes
const initialState_b = {
  botón: 'NINGUNO',
}
const initialState_n = {
  nombre: '',
}

const initialState_u = {
  name: '',
  pass: '',
  token: ''
}



const usuario = (state=initialState_u, action) => {

  switch (action.type) {

      case LOGEAR:
          return { ...state, name:action.name, pass:action.pass, token:action.token}

    default:
      return state
  }

}

// Entrada: estado anterior, action
// Salida:  estado posterior
const botonera = (state=initialState_b, action) => {

  switch (action.type) {

      case DETALLAR:
          return { ...state, botón: DETALLAR}

    default:
      return state
  }

}


const nombre = (state=initialState_n, action) => {

  switch (action.type) {

      case DETALLAR:
        return { ...state, nombre: action.nombre, cuisine: action.cuisine }

    default:
      return state
  }

}


const restaApp = combineReducers({
  botonera,
  nombre,
  usuario
})


export default restaApp
