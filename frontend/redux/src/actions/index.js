

export const LISTAR   = 'LISTAR'
export const AÑADIR   = 'AÑADIR'
export const DETALLAR = 'DETALLAR'

export const Listar = () => {
  return {
    type: LISTAR
  }
}


export const Añadir = () => {
  return {
    type: AÑADIR
  }
}


export const Detallar = (nombre) => {
  return {
    type: DETALLAR,
    nombre
  }
}
