export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })
}
