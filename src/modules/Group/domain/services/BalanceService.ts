import { type Expense } from '../../../Expense/domain/Expense'
import { type User } from '../../../User/domain/User'
import { type Group } from '../Group'

export interface Balance {
  participant: string
  payments: Array<{
    to: string
    amount: number
  }>
}

export class BalanceService {
  private totalExpensesByParticipant (participants: User[], expensesGroup: Expense[]): Array<{
    id: string
    name: string
    totalExpense: number
  }> {
    return participants.map(participant => {
      const participantExpense: number = expensesGroup
        .filter(expense => expense.paidBy === participant.name)
        .reduce((acc, currentExpense) => {
          return acc + currentExpense.cost
        }, 0)

      return {
        id: participant.id,
        name: participant.name,
        totalExpense: participantExpense
      }
    })
  }

  private calculateAverageExpenses (expensesGroup: Expense[], participants: User[]): number {
    const totalExpenses = expensesGroup.reduce((acc, expense) => acc + expense.cost, 0)
    const averageExpenses = totalExpenses / participants.length
    return averageExpenses
  }

  private calculateDebts (participants: User[], totalExpensesByParticipant: Array<{ id: string, totalExpense: number }>, averageExpenses: number): Array<{ idParticipant: string, participant: string, balance: number }> {
    return participants.map(participant => {
      const participantExpense = totalExpensesByParticipant.find(expenseParticipant => expenseParticipant.id === participant.id)
      const balance = participantExpense ? Math.round((participantExpense.totalExpense - averageExpenses) * 100) / 100 : 0

      return { idParticipant: participant.id, participant: participant.name, balance }
    })
  }

  private calculateExpenses (participants: User[], expenses: Expense[]): Array<{ idParticipant: string, participant: string, balance: number }> {
    const totalExpensesByParticipant = this.totalExpensesByParticipant(participants, expenses)
    const averageExpenses = this.calculateAverageExpenses(expenses, participants)
    const debts = this.calculateDebts(participants, totalExpensesByParticipant, averageExpenses)

    return debts
  }

  private calculateTransactions (participants: User[], expensesFromGroup: Expense[]): Balance[] {
    const debts = this.calculateExpenses(participants, expensesFromGroup)
    const debtors = debts.filter(debtor => debtor.balance < 0)
    const creditors = debts.filter(creditor => creditor.balance > 0)

    let indexDebtor = 0
    let indexCreditor = 0

    const transactions: Balance[] = []

    while (indexDebtor < debtors.length && indexCreditor < creditors.length) {
      const deudor = debtors[indexDebtor]
      const creditor = creditors[indexCreditor]

      const cantidad = Math.min(-deudor.balance, creditor.balance)
      deudor.balance = Math.round((deudor.balance + cantidad) * 100) / 100
      creditor.balance = Math.round((creditor.balance - cantidad) * 100) / 100

      const deudorAlreadtExists = transactions.find(transaction => transaction.participant === deudor.participant)

      if (deudorAlreadtExists) {
        deudorAlreadtExists.payments.push({
          to: creditor.participant,
          amount: cantidad
        })
      } else {
        transactions.push({
          participant: deudor.participant,
          payments: [{
            to: creditor.participant,
            amount: cantidad
          }]
        })
      }

      if (deudor.balance === 0) indexDebtor++
      if (creditor.balance === 0) indexCreditor++
    }

    return transactions
  }

  async getBalances (group: Group, expensesGroup: Expense[]): Promise<Balance[]> {
    const expensesFromGroup = expensesGroup
    return this.calculateTransactions(group.participants, expensesFromGroup)
  }
}
