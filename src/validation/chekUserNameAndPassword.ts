import { body } from 'express-validator';

export const checkUserNameAndPassword = [
    body('userName', 'Некорректное имя пользователя').trim().isLength({ min: 2, max: 30 }).escape(),
    body('password', 'Некорректный пароль').trim().isLength({ min: 4, max: 20 }).escape(),
];
