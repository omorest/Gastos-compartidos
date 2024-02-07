import { test, expect } from '@playwright/test'
import { createGroup } from '../utils/createGroup'

test.describe('Navigation Group', () => {
  test('Navigate to Group', async ({ page }) => {
    const nameGroup = 'Test Grupo'
    await page.goto('/')
    await createGroup(page, { name: nameGroup, participants: ['Oscar'] })
    const cardGroupElement = await page.$('[data-testid="card-group"]')
    await cardGroupElement?.click()

    expect(await page.getByRole('heading', { name: nameGroup }).isVisible()).toBeTruthy()
    expect(await page.getByText('Total: 0,00 €').isVisible()).toBeTruthy()
  })
})
