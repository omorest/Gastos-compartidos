import { test, expect } from '@playwright/test';


test.describe('Create Group', () => {

  test('should create a new group', async ({page}) => {
    await page.goto('/');
    await page.getByRole('heading', { name: 'Gastos Compartidos' }).isVisible();
    await page.getByRole('button', { name: 'Nuevo Grupo' }).click();
    await page.getByPlaceholder('Título').fill('Test Grupo');
    await page.getByPlaceholder('Descripción').fill('Test descripci');
    await page.getByPlaceholder('Nombre del participante').click();
    await page.getByPlaceholder('Nombre del participante').fill('Oscar');
    await page.getByRole('button', { name: 'Añadir Participante' }).click();
    await page.getByPlaceholder('Nombre del participante 2').fill('Richard');
    await page.getByRole('button', { name: 'Añadir Participante' }).click();
    await page.getByPlaceholder('Nombre del participante 3').fill('Adrián');
    await page.getByRole('button', { name: 'crear' }).click();
    await page.getByRole('heading', { name: 'Test Grupo' }).isVisible();
    await page.getByRole('heading', { name: 'Test descripción grupo' }).isVisible();
  });

  test('should create a new group and delete a participant in the form', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Nuevo Grupo' }).click();
    await page.getByPlaceholder('Título').fill('prueba2');
    await page.getByPlaceholder('Descripción').fill('descripción 2');
    await page.getByPlaceholder('Nombre del participante').click();
    await page.getByPlaceholder('Nombre del participante').fill('Oscar');
    await page.getByRole('button', { name: 'Añadir Participante' }).click();
    await page.getByPlaceholder('Nombre del participante 2').click();
    await page.getByPlaceholder('Nombre del participante 2').fill('Juan');
    const participantsForm = await page.getByText('ParticipantesAñadir');
    await participantsForm.getByRole('button').first().click();
    await page.getByRole('button', { name: 'Crear' }).click();
    await page.getByRole('heading', { name: 'Prueba2' }).isVisible();
    await page.getByRole('heading', { name: 'descripción 2' }).isVisible();
  });
})
