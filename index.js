import express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './config/dbConnect.js';
import todoRoute from './routes/todoRoutes.js';
dotenv.config();
dbConnect();
const app = express();

// Configure CORS to allow all origins
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'Pragma'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    optionsSuccessStatus: 200 // Support legacy browsers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/task", todoRoute)

const PORT = process.env.PORT || 10000
app.listen(PORT,console.log(`Server is running at ${PORT}`))