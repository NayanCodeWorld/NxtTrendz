import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
 

//1. Create express instance
const app = express();

//2. configure env for useing environment variables
dotenv.config()

//3.0 mondgodb connection
//3.1 Install Mongoose
//3.2 Import Mongoose
//3.3 Connect to MongoDB => mongoose.connect('mongodb://localhost/mydatabase'); => in config.js
//3.4 Define a Schema => const personSchema = new mongoose.Schema({ name: String, age: Number, email: String})  => models file
//3.5 Create a Model =>  const Person = mongoose.model('Person', personSchema); => models file
//3.6 Use the Model as database instance
connectDB();

//4. Middlewares
app.use(cors()) //to resolve clashing in two ports
app.use(express.json()) // convert all body content to json
app.use(morgan('dev')) //configure morgan middleware

const PORT = process.env.PORT || 3002;

//5. routes 
//auth routes
app.use('/auth', authRoute);
//category routes
app.use('/category', categoryRoutes);
//Product routes
app.use('/product', productRoutes);

//6. listen action
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));