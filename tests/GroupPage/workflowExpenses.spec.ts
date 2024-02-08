import { test, expect, type Page } from '@playwright/test'
import { createGroup } from '../utils/createGroup'
import { createExpense } from '../utils/createExpense'

test.describe.serial('Workflow Expenses', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('Should Create Expense', async () => {
    const infoGroup = {
      name: 'Test Grupo',
      description: 'Test Description',
      participants: ['Oscar', 'Juan']
    }
    const infoExpense = { title: 'Comida', amount: '35.56', date: '2024-02-07', payer: 'Oscar' }
    await page.goto('/')
    await createGroup(page, infoGroup)
    const cardGroupElement = await page.$('[data-testid="card-group"]')
    await cardGroupElement?.click()

    expect(await page.getByRole('heading', { name: infoGroup.name }).isVisible()).toBeTruthy()
    expect(await page.getByText('Total: 0,00 €').isVisible()).toBeTruthy()
    await createExpense(page, infoExpense)

    expect(await page.getByText(infoExpense.title).isVisible()).toBeTruthy()
    expect(await page.getByText(`Pagado por ${infoExpense.payer}`).isVisible()).toBeTruthy()
  })

  test('should edit Expense', async () => {
    await page.getByRole('img').nth(3).click()
    await page.getByPlaceholder('Título').fill('Comida 2')
    await page.locator('input[name="creationDate"]').fill('2024-02-01')
    await page.getByRole('button', { name: 'Editar Gasto' }).click()
    expect(await page.getByText('Comida 2').isVisible()).toBeTruthy()
    expect(await page.getByText('1/2/2024').isVisible()).toBeTruthy()
  })

  test('should add another Expense', async () => {
    const infoExpense = { title: 'Comida 1', amount: '100', date: '2024-02-07', payer: 'Oscar' }
    await createExpense(page, infoExpense)
    expect(await page.getByText('Comida 1').isVisible()).toBeTruthy()
    expect(await page.getByText(`Pagado por ${infoExpense.payer}`).first().isVisible()).toBeTruthy()
  })

  test('should navigate to balance', async () => {
    await page.getByRole('button', { name: 'Balance' }).click()
    expect(await page.getByRole('heading', { name: 'Juan' }).isVisible()).toBeTruthy()
    expect(await page.getByText('Oscar 67,78 €').isVisible()).toBeTruthy()
  })

  test('should navigate to expenses and remove one', async () => {
    await page.getByRole('button', { name: 'Gastos' }).click()
    await page.getByTestId('removeExpense-Comida 2').click()
    expect(await page.getByText('Comida 2').isVisible()).toBeFalsy()
  })
})
