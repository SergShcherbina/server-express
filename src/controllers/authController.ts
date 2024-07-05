import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
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

                const isExistUser: IUser | null = await authRepositories.findUserByName(userName);
                if (isExistUser) return res.status(400).send({ error: 'Пользователь с таким именем уже существует!' });

                await authRepositories.createUser(userName, hashPassword);
                res.status(200).send({ message: 'Регистрация прошла успешно!' });
                return;
            }
            res.status(400).send({ error: 'Некорректные данные при регистрации' });
        } catch (err) {
            res.status(500).send({ error: 'Что-то пошло не так, попробуйте еще раз' });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).send({ error: 'Некорректные данные при входе' });

            const { userName, password }: Omit<IUser, 'posts' | '_id'> = await req.body;
            const user: IUser | null = await authRepositories.findUserByName(userName);

            if (!user) return res.status(400).send({ error: 'Пользователь с таким именем не найден' });

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).send({ error: 'Некорректные данные при входе' });
            }

            const accessToken = generateAccessToken(user._id);

            res.status(200).send({
                message: `Добро пожаловать, ${userName}!`,
                accessToken,
                user: { id: user._id, userName },
            });
        } catch (err) {
            res.status(500).send({ error: 'Что-то пошло не так, попробуйте еще раз' });
        }
    };

    getMe = async (req: Request, res: Response) => {
        try {
            const user = await authRepositories.findUserById(req.body.userId);

            if (!user) return res.status(401).send({ error: 'Необходима авторизация' });

            res.send({ message: `Пользователь ${user.userName} авторизован` });
        } catch (err) {
            res.status(500).send({ error: 'Что-то пошло не так, попробуйте еще раз' });
        }
    };
}

export const authController = new AuthController();
