import jwt from 'jsonwebtoken';
import { AppError } from '../error/errorHandler';

export const verifytoken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, (process.env.JWT_KEY as string) || '');
        return decoded;
    } catch (error: any) {
        throw new AppError(`Error verifying token: ${error.message}`, 401);
    }
};