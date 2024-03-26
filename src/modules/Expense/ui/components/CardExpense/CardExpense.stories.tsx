import type { Meta, StoryObj } from '@storybook/react'
import { CardExpense } from './CardExpense'

const meta: Meta<typeof CardExpense> = {
  component: CardExpense
}

export default meta

type Story = StoryObj<typeof CardExpense>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    expense: {
      id: '1',
      cost: 100,
      creationDate: new Date('2021-09-01'),
      groupId: '1',
      payerId: '1',
      paidBy: 'user 1',
      title: 'Expense 1'

    }
  }
}
