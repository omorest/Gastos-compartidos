export class Datetime {
  static format (date: Date): string {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })
  }

  static formatForInput (date: Date): string {
    return date.toISOString().split('T')[0]
  }
}
