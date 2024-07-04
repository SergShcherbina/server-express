import jwt from 'jsonwebtoken';
import { IUser } from '../types';

export const generateAccessToken = (payload: IUser['_id']) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
