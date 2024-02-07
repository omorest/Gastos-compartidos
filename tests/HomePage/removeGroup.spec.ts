import { test, expect } from '@playwright/test'

test.describe('Remove Group', () => {
  // TODO fail button remove
  test('should remove a group', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Nuevo Grupo' }).click()
    await page.getByPlaceholder('Título').fill('Nuevo grupo')
    await page.getByPlaceholder('Descripción').fill('Descripción Nuevo')
    await page.getByPlaceholder('Nombre del participante').click()
    await page.getByPlaceholder('Nombre del participante').fill('Oscar')
    await page.getByRole('button', { name: 'Crear' }).click()
    expect(await page.getByRole('heading', { name: 'Nuevo grupo', exact: true }).isVisible()).toBeTruthy()
    await page.pause()
    const removeGroupElement = await page.$('[data-testid="removeGroup"]')
    await removeGroupElement?.click()
    expect(await page.getByRole('heading', { name: 'Nuevo grupo', exact: true }).isVisible()).toBeFalsy()
  })
})
