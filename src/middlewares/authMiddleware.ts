import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../helpers';
import { IUser } from '../types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) return res.status(401).send({ error: 'Необходима авторизация' });

        const { id } = verifyAccessToken(accessToken) as { id: IUser['_id'] };

        req.body = { ...req.body, userId: id };
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Необходима авторизация' });
    }
};
