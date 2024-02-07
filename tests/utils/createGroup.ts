import { type Page } from '@playwright/test'

export async function createGroup (page: Page, options: { name: string, description?: string, participants: string[] }): Promise<void> {
  await page.getByRole('heading', { name: 'Gastos Compartidos' }).isVisible()
  await page.getByRole('button', { name: 'Nuevo Grupo' }).click()
  await page.getByPlaceholder('Título').fill(options.name)
  if (options.description) {
    await page.getByPlaceholder('Descripción').fill(options.description)
  }

  for (const [index, participant] of options.participants.entries()) {
    const placeHolder = 'Nombre del participante' + (index === 0 ? '' : ` ${index + 1}`)
    await page.getByPlaceholder(placeHolder).fill(participant)

    if (index < options.participants.length - 1) {
      await page.getByRole('button', { name: 'Añadir Participante' }).click()
    }
  }
  await page.getByRole('button', { name: 'crear' }).click()
}
