import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcryptjs';
import { authRepositories } from '../repositories';
import { generateAccessToken } from '../helpers';
import { IUser } from '../types';

class AuthController {
    registration = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                const { userName, password }: Omit<IUser, 'posts' | '_id'> = await req.body;
                const hashPassword = bcrypt.hashSync(password, 7);
                const data = await authRepositories.registration(userName, hashPassword);

                if (!data) return res.status(400).send({ message: 'Пользователь с таким именем уже существует!' });
                res.status(200).send({ message: 'Регистрация прошла успешно!', user: data });
                return;
            }
            res.status(400).send({ errors: 'Некорректные данные при регистрации' });
        } catch (err) {
            res.status(500).send({ message: 'Что-то пошло не так, попробуйте еще раз' });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).send({ errors: 'Некорректные данные при входе' });

            const { userName, password }: Omit<IUser, 'posts' | '_id'> = await req.body;
            const user: IUser | null = await authRepositories.findUserByName(userName);

            if (!user) return res.status(400).send({ errors: 'Пользователь с таким именем не найден' });

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).send({ errors: 'Некорректные данные при входе' });
            }

            const accessToken = generateAccessToken(user._id);

            res.status(200).send({
                message: `Добро пожаловать, ${userName}!`,
                accessToken,
                user: { id: user._id, userName },
            });
        } catch (err) {
            res.status(500).send({ message: 'Что-то пошло не так, попробуйте еще раз' });
        }
    };

    getMe = async (req: Request, res: Response) => {
        res.send({ message: 'token' });
    };

    logout = async (req: Request, res: Response) => {
        res.send({ message: 'Хорошего настроения!' });
    };
}

export const authController = new AuthController();
