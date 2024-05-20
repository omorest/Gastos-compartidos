const errorMessageName = 'Error: debe tener entre 1 y 30 caracteres'
const isValidNameGroup = (name: string): boolean => {
  return name.length > 0 && name.length <= 30
}

const errorMessageDescription = 'Error: la descripción no puede tener más de 100 caracteres'
const isValidDescriptionGroup = (description: string): boolean => {
  return description.length <= 100
}

const errorMessageParticipant = 'Error: debe tener entre 1 y 30 caracteres'
const isAValidParticipantName = (name: string): boolean => {
  return name.length > 0 && name.length <= 30
}

export const ValidatorsGroup = {
  isValidNameGroup: {
    validate: isValidNameGroup,
    errorMessage: errorMessageName
  },
  isValidDescriptionGroup: {
    validate: isValidDescriptionGroup,
    errorMessage: errorMessageDescription
  },
  isAValidParticipantName: {
    validate: isAValidParticipantName,
    errorMessage: errorMessageParticipant
  }
}
