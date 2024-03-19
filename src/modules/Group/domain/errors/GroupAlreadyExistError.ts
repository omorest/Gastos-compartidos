export class GroupAlreadyExistError extends Error {
  constructor (message: string = 'Group already exist') {
    super(message)
    this.name = this.constructor.name
  }
}
