import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type TPayload = string | object | Buffer;

export function generateToken(payload: TPayload): string {
    const { JWT_EXPIRE } = process.env;
    const expiresIn = isNaN(Number(JWT_EXPIRE)) ? JWT_EXPIRE : Number(JWT_EXPIRE);

    return jwt.sign(payload, process.env.TOKEN_SECRET as Secret, { expiresIn });
}

export function verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.TOKEN_SECRET as Secret);
}
