import supertest from 'supertest';
import client from '../../src/config/prisma';
import app from '../../src/app';

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users"`;
});

describe('Test POST /auth/register', () => {
    it('Return error 422 if no req body', async () => {
        const newUser = {};

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if empty fields', async () => {
        const newUser = { email: '', password: '', passwordConfirmation: '' };

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if different field type', async () => {
        const newUser = { email: 1, password: 2, passwordConfirmation: 3 };

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if email format wrong', async () => {
        const newUser = { email: 'email', password: 'Teste@123', passwordConfirmation: 'Teste@123' };

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return error 422 if password format wrong', async () => {
        const newUser1 = { email: 'visitor@com.br', password: 'pwd', passwordConfirmation: 'pwd' };

        const result1 = await supertest(app).post('/auth/register').send(newUser1);
        expect(result1.status).toBe(422);

        const newUser2 = {
            email: 'visitor@com.br',
            password: 'ABCDEFGHIJ1234567890!@#$%*()',
            passwordConfirmation: 'ABCDEFGHIJ1234567890!@#$%*()',
        };

        const result2 = await supertest(app).post('/auth/register').send(newUser2);
        expect(result2.status).toBe(422);
    });

    it('Return error 422 if different password confirmation', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: '123@Teste' };

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(422);
    });

    it('Return status 409 if user already exists', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: 'Teste@123' };
        await supertest(app).post('/auth/register').send(newUser);

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(409);
    });

    it('Return status 201 if user is created', async () => {
        const newUser = { email: 'visitor@com.br', password: 'Teste@123', passwordConfirmation: 'Teste@123' };

        const result = await supertest(app).post('/auth/register').send(newUser);
        expect(result.status).toBe(201);

        const createdUser = await client.user.findUnique({ where: { email: newUser.email } });
        expect(createdUser).not.toBeNull();
    });
});

afterAll(async () => {
    await client.$disconnect();
});
