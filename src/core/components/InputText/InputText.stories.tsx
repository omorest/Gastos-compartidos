import type { Meta, StoryObj } from '@storybook/react'
import { InputText } from './InputText'

const meta: Meta<typeof InputText> = {
  component: InputText
}

export default meta

type Story = StoryObj<typeof InputText>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    defaultValue: 'Input Text'
  },
  storyName: 'Card Expense'
}
