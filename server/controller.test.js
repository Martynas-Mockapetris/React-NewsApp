import { jest } from '@jest/globals';
import { createNew } from './controllers/newsController.js';

describe('newsController Testas', () => {
  test('createNew patikrina ar meta privalomus laukus teisingai', async () => {
    // Susikuriu tusčius laukus nes noriu patikrint error
    const req = {
      body: {
        title: '',
        content: '',
        author: ''
      }
    };
    // Susikuriu response
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Pasileidžiu su fake duomenimis funkciją
    await createNew(req, res);

    // Patikrinu ar statusas yra 400 ir ar meta klaidos pranešimą
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Visi laukai privalomi' });
  });
});
