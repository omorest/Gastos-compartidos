import { test, expect, type Page } from '@playwright/test'
import { createGroup } from '../utils/createGroup'

async function createExpense (page: Page, options: { title: string, amount: string, date: string, payer: string }): Promise<void> {
  await page.getByRole('button', { name: 'Nuevo Gasto' }).click()
  await page.getByPlaceholder('Título').fill(options.title)
  await page.getByPlaceholder('Cantidad').fill(options.amount)
  await page.locator('input[name="creationDate"]').fill(options.date)
  await page.getByTestId('select-payer').click()
  await page.selectOption('select[name="selectPayer"]', { label: options.payer })
  await page.getByRole('button', { name: 'Añadir Gasto' }).click()
}

test.describe.serial.only('Create Expense', () => {
  test('Create Expense', async ({ page }) => {
    const infoGroup = {
      name: 'Test Grupo',
      description: 'Test Description',
      participants: ['Oscar', 'Juan', 'Maria']
    }
    const infoExpense = { title: 'Comida', amount: '35.56', date: '2024-02-07', payer: 'Oscar', participants: ['Oscar', 'Juan', 'Maria'] }
    await page.goto('/')
    await createGroup(page, infoGroup)
    const cardGroupElement = await page.$('[data-testid="card-group"]')
    await cardGroupElement?.click()

    expect(await page.getByRole('heading', { name: infoGroup.name }).isVisible()).toBeTruthy()
    expect(await page.getByText('Total: 0,00 €').isVisible()).toBeTruthy()
    await createExpense(page, infoExpense)

    expect(await page.getByText(infoExpense.title).isVisible()).toBeTruthy()
    expect(await page.getByText(`Pagado por ${infoExpense.payer}`).isVisible()).toBeTruthy()

    // await page.getByRole('img').nth(3).click()
    // await page.getByPlaceholder('Título').click()
    // await page.getByPlaceholder('Título').fill('Comida 2')
    // await page.locator('input[name="creationDate"]').fill('2024-02-01')
    // await page.getByRole('button', { name: 'Editar Gasto' }).click()
    // await page.getByText('Comida').click()
    // await page.getByText('1/2/').click()

    // await page.getByRole('button', { name: 'Nuevo Gasto' }).click()
    // await page.getByPlaceholder('Título').click()
    // await page.getByPlaceholder('Título').fill('Comida 1')
    // await page.getByPlaceholder('Cantidad').click()
    // await page.getByPlaceholder('Cantidad').fill('045.2')
    // await page.locator('input[name="creationDate"]').fill('2024-01-29')
    // await page.getByRole('combobox').selectOption('28f62550-0d1f-40a2-b4c1-d055b8ed7b49')
    // await page.getByRole('combobox').selectOption('c0b4069e-4e5c-4ff4-9281-97f6e2797fe1')
    // await page.getByRole('button', { name: 'Añadir Gasto' }).click()
    // await page.getByText('Comida 1').click()

    // // balance
    // await page.getByRole('button', { name: 'Balance' }).click()
    // await page.getByRole('heading', { name: 'Oscar' }).click()
    // await page.getByText('Juan 8,64 €').click()
    // await page.getByText('María 18,28 €').click()

    // await page.getByRole('button', { name: 'Gastos' }).click()

    // await page.locator('div:nth-child(2) > .expense-section-list-row-icons > span:nth-child(2) > .tabler-icon > path').first().click()
  })
})
