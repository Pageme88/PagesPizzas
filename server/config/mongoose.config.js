import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: 'pizzazDB',
        });
        console.log("Create tonight's dinner!!!");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default dbConnect;