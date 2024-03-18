export class GroupError extends AggregateError {
  constructor (message: string, public code: string) {
    super(message)
  }
}

export class GroupNameError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
