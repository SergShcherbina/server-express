import { Response, Request } from 'express';
import { IUser } from '../types';
import { authRepositories } from '../repositories';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcryptjs';

class AuthController {
    registration = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                const { userName, password }: Omit<IUser, 'posts'> = await req.body;
                const hashPassword = bcrypt.hashSync(password, 7);
                const data = await authRepositories.registration(userName, hashPassword);

                if (!data) return res.status(400).send({ error: 'Пользователь с таким именем уже существует!' });
                res.status(200).send({ message: 'Регистрация прошла успешно!', user: data });
                return;
            }
            res.status(400).send({ errors: 'Некорректные данные при регистрации' });
        } catch (err) {
            res.status(500).send({ message: 'Что-то пошло не так, попробуйте еще раз', err });
        }
    };

    login = async (req: Request, res: Response) => {
        const username = req.body.username;
        res.send({ message: `Добро пожаловать, ${username}!` });
    };

    getMe = async (req: Request, res: Response) => {
        res.send({ message: 'token' });
    };

    logout = async (req: Request, res: Response) => {
        res.send({ message: 'Хорошего настроения!' });
    };
}

export const authController = new AuthController();
