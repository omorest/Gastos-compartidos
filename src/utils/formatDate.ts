export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' })
}
