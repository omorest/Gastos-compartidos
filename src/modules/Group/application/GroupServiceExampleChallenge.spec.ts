import { describe, test, expect } from 'vitest'
import { GroupService } from './GroupService'
import { expectedExpensesDebts, expenseRepository, expenses, groupRepository, users } from './mockData'

describe('Group expenses example challenge', () => {
  const groupService = new GroupService(groupRepository, expenseRepository)
  test('should calculate the total expenses by participants', () => {
    const totalExpenses = groupService.totalExpensesByParticipant(users, expenses)

    const expected: typeof totalExpenses = [
      { id: '1', name: 'Fran', totalExpense: 100 },
      { id: '2', name: 'Alfonso', totalExpense: 63.4 },
      { id: '3', name: 'Raul', totalExpense: 0 },
      { id: '4', name: 'Jose', totalExpense: 0 }
    ]

    expect(totalExpenses).toEqual(expected)
  })

  test('should calculate the average of expenses between all participants', () => {
    const average = groupService.calculateAverageExpenses(expenses, users)
    const expected: number = 40.85
    expect(average).toEqual(expected)
  })

  test('should calculate the debts of each participant', () => {
    const totalExpensesByParticipant = [
      { id: '1', name: 'Fran', totalExpense: 100 },
      { id: '2', name: 'Alfonso', totalExpense: 63.4 },
      { id: '3', name: 'Raul', totalExpense: 0 },
      { id: '4', name: 'Jose', totalExpense: 0 }
    ]

    const debts = groupService.calculateDebts(users, totalExpensesByParticipant, 40.85)

    expect(debts).toEqual(expectedExpensesDebts)
  })

  test('should calculate all expenses debts', () => {
    const finalExpensesParticipants = groupService.calculateExpenses(users, expenses)
    expect(expectedExpensesDebts).toEqual(finalExpensesParticipants)
  })

  test('should calculate all transactions', () => {
    const transactions = groupService.calculateTransactions(users, expenses)
    const expected = [
      {
        participant: 'Raul',
        payments: [
          {
            to: 'Fran',
            amount: 40.85
          }
        ]
      },
      {
        participant: 'Jose',
        payments: [
          {
            to: 'Fran',
            amount: 18.3
          },
          {
            to: 'Alfonso',
            amount: 22.55
          }
        ]
      }
    ]
    expect(transactions).toEqual(expected)
  })
})
