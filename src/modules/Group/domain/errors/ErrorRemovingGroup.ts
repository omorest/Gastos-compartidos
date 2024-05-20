export class ErrorRemovingGroup extends Error {
  constructor (message: string = 'Error removing group') {
    super(message)
    this.name = this.constructor.name
  }
}
