import jwt from 'jsonwebtoken';

export const generateAccessToken = <T>(payload: T) => {
    return jwt.sign({ id: payload }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
