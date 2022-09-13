import { User } from '@prisma/client';

type TUserDetail = Omit<User, 'id'>;

interface TUserRegisterData extends TUserDetail {
    passwordConfirmation: string;
}

export { User, TUserRegisterData, TUserDetail };
