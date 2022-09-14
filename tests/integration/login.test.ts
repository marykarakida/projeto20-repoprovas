import supertest from 'supertest';
import client from '../../src/config/prisma';
import app from '../../src/app';

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users"`;
});

describe('Test POST /auth/login', () => {
    it('Return error 422 if no req body', async () => {
        const newUser = {};

        const result = await supertest(app).post('/auth/login').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if empty fields', async () => {
        const user = { email: '', password: '' };

        const result = await supertest(app).post('/auth/login').send(user);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if different field type', async () => {
        const user = { email: 1, password: 2 };

        const result = await supertest(app).post('/auth/login').send(user);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if email format wrong', async () => {
        const user = { email: 'email', password: 'Teste@123' };

        const result = await supertest(app).post('/auth/login').send(user);
        expect(result.status).toBe(422);
    });

    it('Return error 400 if email is right but password is wrong', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: 'Teste@123' };
        await supertest(app).post('/auth/register').send(newUser);

        const wrongUser = { email: 'visitor@com.br', password: '123@Teste' };
        const loginResult = await supertest(app).post('/auth/login').send(wrongUser);
        expect(loginResult.status).toBe(400);
    });

    it('Return error 404 if email is wrong but password is right', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: 'Teste@123' };
        await supertest(app).post('/auth/register').send(newUser);

        const wrongUser = { email: 'stranger@com.br', password: 'Teste@123' };
        const loginResult = await supertest(app).post('/auth/login').send(wrongUser);
        expect(loginResult.status).toBe(404);
    });

    it('Return status 200 if login is successful', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: 'Teste@123' };
        await supertest(app).post('/auth/register').send(newUser);

        const rightUser = { email: 'visitor@com.br', password: 'Teste@123' };
        const loginResult = await supertest(app).post('/auth/login').send(rightUser);
        expect(loginResult.status).toBe(200);
        expect(typeof loginResult.body.token).toBe('string');
    });
});

afterAll(async () => {
    await client.$disconnect();
});
