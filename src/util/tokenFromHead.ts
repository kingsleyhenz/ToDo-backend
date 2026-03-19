import type { Request } from 'express';
import { AppError } from '../error/errorHandler';

export const obtainTokenFromHeader = (req: Request): string => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        throw new AppError('No token found in header', 401);
    }
    const token = header.split(' ')[1];
    if (!token) throw new AppError('Token not found', 401);
    return token;
};