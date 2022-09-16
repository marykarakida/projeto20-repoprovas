import { Request, Response } from 'express';

import * as userService from '../../services/user';

import { TUserDetail } from '../../types/userType';

interface ILoginResBody {
    token: string;
}

export async function login(req: Request<{}, {}, TUserDetail>, res: Response<ILoginResBody>) {
    const { email, password } = req.body;

    const token = await userService.login({ email, password });

    res.status(200).send({ token });
}
