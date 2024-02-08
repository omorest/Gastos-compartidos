import { type Page } from '@playwright/test'

export async function createExpense (page: Page, options: { title: string, amount: string, date: string, payer: string }): Promise<void> {
  await page.getByRole('button', { name: 'Nuevo Gasto' }).click()
  await page.getByPlaceholder('Título').fill(options.title)
  await page.getByPlaceholder('Cantidad').fill(options.amount)
  await page.locator('input[name="creationDate"]').fill(options.date)
  await page.waitForSelector('#selectNewForm')
  await page.selectOption('#selectNewForm', options.payer)

  await page.getByRole('button', { name: 'Añadir Gasto' }).click()
}
