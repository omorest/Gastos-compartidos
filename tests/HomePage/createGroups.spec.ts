import { test, expect } from '@playwright/test'
import { createGroup } from '../utils/createGroup'

test.describe('Create Group', () => {
  test('should create a new group', async ({ page }) => {
    const infoGroup = {
      name: 'Test Grupo',
      description: 'Test descripción grupo',
      participants: ['Oscar', 'Richard', 'Adrián']
    }

    await page.goto('/')
    await createGroup(page, infoGroup)
    expect(await page.getByRole('heading', { name: infoGroup.name }).isVisible()).toBeTruthy()
    expect(await page.getByRole('heading', { name: infoGroup.description }).isVisible()).toBeTruthy()
  })

  test('should create a new group without description', async ({ page }) => {
    const infoGroup = {
      name: 'Test Grupo',
      participants: ['Oscar', 'Richard', 'Adrián']
    }

    await page.goto('/')
    await createGroup(page, infoGroup)
    expect(await page.getByRole('heading', { name: 'Test Grupo' }).isVisible()).toBeTruthy()
  })

  test('should create a new group and delete a participant in the form', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Nuevo Grupo' }).click()
    await page.getByPlaceholder('Título').fill('prueba2')
    await page.getByPlaceholder('Descripción').fill('descripción 2')
    await page.getByPlaceholder('Nombre del participante').click()
    await page.getByPlaceholder('Nombre del participante').fill('Oscar')
    await page.getByRole('button', { name: 'Añadir Participante' }).click()
    await page.getByPlaceholder('Nombre del participante 2').click()
    await page.getByPlaceholder('Nombre del participante 2').fill('Juan')
    const participantsForm = page.getByText('ParticipantesAñadir')
    await participantsForm.getByRole('button').first().click()
    await page.getByRole('button', { name: 'Crear' }).click()
    expect(await page.getByRole('heading', { name: 'Prueba2' }).isVisible()).toBeTruthy()
    expect(await page.getByRole('heading', { name: 'descripción 2' }).isVisible()).toBeTruthy()
  })
})
