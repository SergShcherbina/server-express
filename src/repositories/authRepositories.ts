import User from '../models/User';
import { IUser } from '../types';

class AuthRepositories {
    async registration(userName: IUser['userName'], password: IUser['password']) {
        try {
            const isExistUser: IUser | null = await User.findOne({ userName });

            if (isExistUser) return null;

            return await new User({ userName, password }).save();
        } catch (err) {
            throw new Error('Failed to register user');
        }
    }
    // login() {}
    //getMe() {}
    //logout() {}
}
export const authRepositories = new AuthRepositories();
