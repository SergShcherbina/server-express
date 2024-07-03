import mongoose, { Schema } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    posts: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        username: {
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
