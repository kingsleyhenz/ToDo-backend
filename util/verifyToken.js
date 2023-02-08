import jwt from 'jsonwebtoken'

export const verifytoken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded;
    } catch (error) {
        throw new Error(`Error verifying token: ${error.message}`);
    }
}