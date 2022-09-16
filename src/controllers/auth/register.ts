import { Request, Response } from 'express';

import * as userService from '../../services/user';

import { IUserRegisterData } from '../../types/userType';

export async function register(req: Request<{}, {}, IUserRegisterData>, res: Response) {
    const { email, password } = req.body;

    await userService.register({ email, password });

    res.status(201).send();
}
