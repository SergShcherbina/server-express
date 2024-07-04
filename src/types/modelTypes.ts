import { ObjectId, Schema } from 'mongoose';

export interface IUser {
    _id: ObjectId;
    userName: string;
    password: string;
    posts: Schema.Types.ObjectId[];
}
