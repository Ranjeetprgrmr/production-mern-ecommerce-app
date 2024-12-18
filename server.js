import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//configure env
dotenv.config();

//database config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//cors
app.use(cors()); 

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client/build')));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//port
const PORT = process.env.PORT || 8080;

//RUN LISTEN
app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.rainbow)
})
