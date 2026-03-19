import jwt from 'jsonwebtoken';

const genToken = (id: any): string => {
    return jwt.sign({ id }, (process.env.JWT_KEY as string) || '', { expiresIn: '30d' });
};

export default genToken;