export class Currency {
  static format (value: number): string {
    return new Intl
      .NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
      .format(value)
  }
}
