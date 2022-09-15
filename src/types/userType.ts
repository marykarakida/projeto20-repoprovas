import { User } from '@prisma/client';

type TUserDetail = Omit<User, 'id'>;

interface IUserRegisterData extends TUserDetail {
    passwordConfirmation: string;
}

export { IUserRegisterData, TUserDetail };
