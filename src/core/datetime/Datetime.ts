export class Datetime {
  static format (date: Date): string {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' })
  }
}
