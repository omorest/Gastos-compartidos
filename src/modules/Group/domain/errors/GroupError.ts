export class GroupError extends AggregateError {
  constructor (message: string, public code: string) {
    super(message)
  }
}
