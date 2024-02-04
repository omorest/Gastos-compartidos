export const formateDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' })
}
