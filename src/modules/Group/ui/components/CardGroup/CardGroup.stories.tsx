import type { Meta, StoryObj } from '@storybook/react'
import CardGroup from './CardGroup'

const meta: Meta<typeof CardGroup> = {
  component: CardGroup
}

export default meta

type Story = StoryObj<typeof CardGroup>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    group: {
      id: '1',
      name: 'Group 1',
      description: 'Description of group 1',
      creationDate: new Date('2021-09-01'),
      participants: [{ id: '1', name: 'user 1' }, { id: '2', name: 'user 2' }, { id: '3', name: 'user 3' }]
    }
  },
  storyName: 'Card Expense'
}
