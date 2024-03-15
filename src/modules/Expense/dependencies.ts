import { CreateExpenseCommand } from './application/CreateExpenseCommand'
import { EditExpenseCommand } from './application/EditExpenseCommand'
import { GetAllExpensesFromGroupQuery } from './application/GetAllExpensesFromGroupQuery'
import { RemoveExpenseCommand } from './application/RemoveExpenseCommand'
import { createLocaStorageExpenseRepository } from './infrastructure/LocalStorageExpenseRepository'

export const expenseRepository = createLocaStorageExpenseRepository()

export const useCasesExpense = {
  createExpenseCommand: new CreateExpenseCommand(expenseRepository),
  editExpenseCommand: new EditExpenseCommand(expenseRepository),
  getAllExpenseFromGroupQuery: new GetAllExpensesFromGroupQuery(expenseRepository),
  removeExpenseCommand: new RemoveExpenseCommand(expenseRepository)
}

export type UseCasesExpense = typeof useCasesExpense
