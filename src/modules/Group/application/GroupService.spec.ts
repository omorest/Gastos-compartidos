import { describe, it, expect } from 'vitest'
import { type GroupRepository } from '../domain/GroupRepository'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { GroupService } from './GroupService'
import { type User } from '../../User/domain/User'
import { type Expense } from '../../Expense/domain/Expense'

const groupRepository: GroupRepository = {
  create: async group => group,
  remove: async groupId => {},
  edit: async group => group,
  get: async groupId => null,
  getAll: async () => []
}

const expenseRepository: ExpenseRepository = {
  create: async expense => [expense],
  remove: async expenseId => {},
  edit: async expense => expense,
  getAllFromGroup: async groupId => [],
  removeAllFromGroup: async groupId => {},
  getAll: async () => []
}

const users: User[] = [
  { id: '1', name: 'Fran' },
  { id: '2', name: 'Alfonso' },
  { id: '3', name: 'Raul' },
  { id: '4', name: 'Jose' }
]

const expenses: Expense[] = [
  {
    title: 'Cena',
    cost: 100,
    creationDate: new Date(),
    payerId: '1',
    id: '1',
    groupId: '1',
    paidBy: 'Fran'
  },
  {
    title: 'Taxi',
    cost: 10,
    creationDate: new Date(),
    payerId: '2',
    id: '2',
    groupId: '1',
    paidBy: 'Alfonso'
  },
  {
    title: 'Compra',
    cost: 53.4,
    creationDate: new Date(),
    payerId: '2',
    id: '3',
    groupId: '1',
    paidBy: 'Alfonso'
  }
]

const expectedExpensesDebts = [
  {
    idParticipant: '1',
    participant: 'Fran',
    balance: 59.15
  },
  {
    idParticipant: '2',
    participant: 'Alfonso',
    balance: 22.55
  },
  {
    idParticipant: '3',
    participant: 'Raul',
    balance: -40.85
  },
  {
    idParticipant: '4',
    participant: 'Jose',
    balance: -40.85
  }
]

describe.only('GroupService', () => {
  const groupService = new GroupService(groupRepository, expenseRepository)
  it('should calculate the total expenses by participants', () => {
    const totalExpenses = groupService.totalExpensesByParticipant(users, expenses)

    const expected: typeof totalExpenses = [
      { id: '1', name: 'Fran', totalExpense: 100 },
      { id: '2', name: 'Alfonso', totalExpense: 63.4 },
      { id: '3', name: 'Raul', totalExpense: 0 },
      { id: '4', name: 'Jose', totalExpense: 0 }
    ]

    expect(totalExpenses).toEqual(expected)
  })

  it('should calculate the average of expenses between all participants', () => {
    const average = groupService.calculateAverageExpenses(expenses, users)
    const expected: number = 40.85
    expect(average).toEqual(expected)
  })

  it('should calculate the debts of each participant', () => {
    const totalExpensesByParticipant = [
      { id: '1', name: 'Fran', totalExpense: 100 },
      { id: '2', name: 'Alfonso', totalExpense: 63.4 },
      { id: '3', name: 'Raul', totalExpense: 0 },
      { id: '4', name: 'Jose', totalExpense: 0 }
    ]

    const debts = groupService.calculateDebts(users, totalExpensesByParticipant, 40.85)

    expect(expectedExpensesDebts).toEqual(debts)
  })

  it('should calculate all expenses debts', () => {
    const finalExpensesParticipants = groupService.calculateExpenses(users, expenses)
    expect(expectedExpensesDebts).toEqual(finalExpensesParticipants)
  })
})
