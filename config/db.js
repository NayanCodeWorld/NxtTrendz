import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MANGODB_URL);
        console.log(`Connecting to mongooseDB: ${conn.connection.host}`);
    }catch(e){
        console.log(`Error in mongoDB ${e}`)
    }
}

export default connectDB;