import { Schema } from 'mongoose';

export interface IUser {
    userName: string;
    password: string;
    posts: Schema.Types.ObjectId[];
}
