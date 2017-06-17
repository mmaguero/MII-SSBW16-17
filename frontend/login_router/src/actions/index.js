

export const DETALLAR = 'DETALLAR'
export const LOGEAR   = 'LOGEAR'


export const Detallar = (nombre) => {
  return {
    type: DETALLAR,
    nombre
  }
}

export const Logear = (name, pass, token) => {
  return {
    type: LOGEAR,
    name,
    pass,
    token
  }
}
