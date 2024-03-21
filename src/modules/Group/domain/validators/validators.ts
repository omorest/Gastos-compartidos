export const isValidNameGroup = (name: string): boolean => {
  return name.length > 0 && name.length <= 30
}

export const isValidDescriptionGroup = (description: string): boolean => {
  return description.length <= 100
}

export const isAValidParticipantName = (name: string): boolean => {
  return name.length > 0 && name.length <= 30
}
