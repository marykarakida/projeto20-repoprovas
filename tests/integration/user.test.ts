import supertest from 'supertest';
import client from '../../src/config/prisma';
import app from '../../src/app';

import { createUser, insertUser } from '../factories/userFactory';

describe('/auth', () => {
    beforeEach(async () => {
        await client.$executeRaw`TRUNCATE TABLE "users"`;
    });

    afterAll(async () => {
        await client.$disconnect();
    });

    describe('POST /auth/register', () => {
        describe('given that email and password are valid', () => {
            it('should return status code 201 and create user account', async () => {
                const newUser = createUser();

                const result = await supertest(app)
                    .post('/auth/register')
                    .send({ ...newUser, passwordConfirmation: newUser.password });
                expect(result.status).toBe(201);

                const createdUser = await client.user.findUnique({ where: { email: newUser.email } });
                expect(createdUser).not.toBeNull();
            });
        });

        describe('given that there is no req body', () => {
            it('should return status code 422', async () => {
                const newUser = {};

                const result = await supertest(app).post('/auth/register').send(newUser);
                expect(result.status).toBe(422);
            });
        });

        describe('given that the email is already linked to an account', () => {
            it('should return status code 409', async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const result = await supertest(app)
                    .post('/auth/register')
                    .send({ ...newUser, passwordConfirmation: newUser.password });
                expect(result.status).toBe(409);
            });
        });
    });

    describe('POST /auth/login', () => {
        describe('given that email and password is valid', () => {
            it('should return status code 200 and data with token', async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const result = await supertest(app).post('/auth/login').send(newUser);
                expect(result.status).toBe(200);
                expect(typeof result.body.token).toBe('string');
            });
        });

        describe('given that there is no req body', () => {
            it('should return status code 422', async () => {
                const wrongUser = {};

                const result = await supertest(app).post('/auth/login').send(wrongUser);
                expect(result.status).toBe(422);
            });
        });

        describe('given that email is wrong or is not linked to an account', () => {
            it('should return status code 403', async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const wrongUser = createUser('invalid-email');

                const result = await supertest(app).post('/auth/login').send(wrongUser);
                expect(result.status).toBe(403);
            });
        });

        describe('given that the account password is wrong', () => {
            it('should return status code 403', async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const wrongUser = createUser('invalid-pwd');

                const result = await supertest(app).post('/auth/login').send(wrongUser);
                expect(result.status).toBe(403);
            });
        });
    });
});
