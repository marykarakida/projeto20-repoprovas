import supertest from 'supertest';
import client from '../../src/config/prisma';
import app from '../../src/app';

import { createInsertTestData, createTest, insertTest } from '../factories/testFactory';
import { createUser, insertUser } from '../factories/userFactory';
import { generateToken } from '../../src/utils/jwtUtils';

describe('/tests', () => {
    beforeEach(async () => {
        await client.$executeRaw`TRUNCATE TABLE "users"`;
        await client.$executeRaw`TRUNCATE TABLE "tests"`;
    });

    afterAll(async () => {
        await client.$disconnect();
    });

    describe('POST /tests', () => {
        describe('given that user is authenticated and input fields are valid', () => {
            it('should return status code 201 and create test', async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = generateToken({ id: insertedUser.id });

                const newTest = createInsertTestData();

                const result = await supertest(app)
                    .post('/tests')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(201);
            });
        });

        describe('given that token is invalid', () => {
            it('should return status code 401', async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = generateToken({ id: insertedUser.id + 1 });

                const newTest = createInsertTestData();

                const result = await supertest(app)
                    .post('/tests')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(401);
            });
        });

        describe('given that there is no req body', () => {
            it('should return status code 422', async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = generateToken({ id: insertedUser.id });

                const newTest = {};

                const result = await supertest(app)
                    .post('/tests')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(422);
            });
        });

        describe('given that category does not exist', () => {
            it('should return status code 404', async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = generateToken({ id: insertedUser.id });

                const newTest = createInsertTestData('invalid-category');

                const result = await supertest(app)
                    .post('/tests')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(404);
            });
        });

        describe('given that a pdf url has already been uploaded', () => {
            it('should return status code 409', async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = generateToken({ id: insertedUser.id });

                const newTest = createTest();
                await insertTest(newTest);

                const duplicatedTest = createInsertTestData('valid', newTest.pdfUrl);

                const result = await supertest(app)
                    .post('/tests')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(duplicatedTest);
                expect(result.status).toBe(409);
            });
        });
    });
});
