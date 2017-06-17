import { combineReducers } from 'redux'

import { LISTAR, AÑADIR, DETALLAR } from '../actions'


// divido el store en dos partes independientes
const initialState_b = {
  botón: 'NINGUNO',
}
const initialState_n = {
  nombre: '',
}


// Entrada: estado anterior, action
// Salida:  estado posterior
const botonera = (state=initialState_b, action) => {

  switch (action.type) {
    case LISTAR:
      return { ...state, botón: LISTAR }

      case AÑADIR:
        return { ...state, botón: AÑADIR }

      case DETALLAR:
          return { ...state, botón: DETALLAR}

    default:
      return state
  }

}


const nombre = (state=initialState_n, action) => {

  switch (action.type) {

      case DETALLAR:
        return { ...state, nombre: action.nombre }

    default:
      return state
  }

}


const restaApp = combineReducers({
  botonera,
  nombre
})


export default restaApp
