export class ErrorRemovingAllExpensesFromGroup extends Error {
  constructor (message = 'Error removing all expenses from group') {
    super(message)
    this.name = this.constructor.name
  }
}
