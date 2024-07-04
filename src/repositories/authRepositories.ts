import User from '../models/User';
import { IUser } from '../types';

class AuthRepositories {
    async findUserByName(userName: IUser['userName']) {
        try {
            return await User.findOne({ userName });
        } catch (err) {
            throw new Error('Failed to login user');
        }
    }
    async findUserById(userId: IUser['_id']) {
        try {
            return await User.findOne({ _id: userId });
        } catch (err) {
            throw new Error('Failed to login user');
        }
    }
    async createUser(userName: IUser['userName'], password: IUser['password']) {
        try {
            return await new User({ userName, password }).save();
        } catch (err) {
            throw new Error('Failed to create user');
        }
    }
}
export const authRepositories = new AuthRepositories();
