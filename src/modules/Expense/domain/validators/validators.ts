const errorMessageTitle = 'Campo requerido: título'
const isValidTitle = (title: string): boolean => {
  return Boolean(title && title.trim().length > 0)
}

const errorMessageCost = 'El valor debe ser mayor a 0: costo'
const isValidCost = (cost: number): boolean => {
  return (cost > 0)
}

const errorMessageCreationDate = 'La fecha no puede ser posterior a hoy: fecha de creación'
const isValidCreationDate = (creationDate: Date): boolean => {
  return (creationDate.getTime() < new Date().getTime())
}

const errorMessagePayerId = 'Campo requerido: ID del pagador'
const isValidPayerId = (payerId: string): boolean => {
  return Boolean(payerId && payerId.trim().length > 0)
}

export const Validators = {
  isValidTitle: {
    validate: isValidTitle,
    errorMessage: errorMessageTitle
  },
  isValidCost: {
    validate: isValidCost,
    errorMessage: errorMessageCost
  },
  isValidCreationDate: {
    validate: isValidCreationDate,
    errorMessage: errorMessageCreationDate
  },
  isValidPayerId: {
    validate: isValidPayerId,
    errorMessage: errorMessagePayerId
  }
}
