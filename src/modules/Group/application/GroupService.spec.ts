import { describe, test, expect } from 'vitest'
import { GroupService } from './GroupService'
import { expenseRepository, groupRepository } from './mockDataExampleChallenge'
import { type User } from '../../User/domain/User'
import { type Expense } from '../../Expense/domain/Expense'

export const users: User[] = [
  { id: '1', name: 'Oscar' },
  { id: '2', name: 'Adrian' },
  { id: '3', name: 'Richard' }
]

export const expenses: Expense[] = [
  {
    title: 'Cervezas',
    cost: 10.45,
    creationDate: new Date(),
    payerId: '1',
    id: '1',
    groupId: '1',
    paidBy: 'Oscar'
  },
  {
    title: 'Cena',
    cost: 50.64,
    creationDate: new Date(),
    payerId: '2',
    id: '2',
    groupId: '1',
    paidBy: 'Adrian'
  }
]

describe('Group expenses', () => {
  const groupService = new GroupService(groupRepository, expenseRepository)

  test('should calculate all transactions', () => {
    const transactions = groupService.calculateTransactions(users, expenses)
    const expected = [
      {
        participant: 'Oscar',
        payments: [
          {
            to: 'Adrian',
            amount: 9.91
          }
        ]
      },
      {
        participant: 'Richard',
        payments: [
          {
            to: 'Adrian',
            amount: 20.36
          }
        ]
      }
    ]
    expect(transactions).toEqual(expected)
  })
})
