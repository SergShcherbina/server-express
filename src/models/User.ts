import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
