import express, { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const { DB_LOCAL, MONGO_URI } = process.env;
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const start = async () => {
    try {
        await mongoose.connect(DB_LOCAL! || MONGO_URI!);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.log('start:', err);
    }
};
void start();
