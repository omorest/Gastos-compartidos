import { type Expense } from '../../Expense/domain/Expense'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { type User } from '../../User/domain/User'
import { type GroupRepository } from '../domain/GroupRepository'

export const groupRepository: GroupRepository = {
  create: async group => group,
  remove: async () => {},
  edit: async group => group,
  get: async () => null,
  getAll: async () => []
}

export const expenseRepository: ExpenseRepository = {
  create: async expense => [expense],
  remove: async () => {},
  edit: async expense => expense,
  getAllFromGroup: async () => [],
  removeAllFromGroup: async () => {},
  getAll: async () => []
}

export const users: User[] = [
  { id: '1', name: 'Fran' },
  { id: '2', name: 'Alfonso' },
  { id: '3', name: 'Raul' },
  { id: '4', name: 'Jose' }
]

export const expenses: Expense[] = [
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

export const expectedExpensesDebts = [
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
