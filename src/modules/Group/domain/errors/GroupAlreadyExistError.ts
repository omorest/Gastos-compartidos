export class GroupAlreadyExistError extends Error {
  constructor (message: string = 'Group already exist') {
    super(message)
    // this.groupName = groupName
    this.name = this.constructor.name
  }
}
