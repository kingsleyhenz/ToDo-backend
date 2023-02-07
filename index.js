import express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './config/dbConnect.js';
import todoRoute from './routes/todoRoutes.js';
dotenv.config();
dbConnect();
const app = express();
app.use(express.json())

app.use(cors())
app.use("/api/v1/task", todoRoute)

const PORT = process.env.PORT || 10000
app.listen(PORT,console.log(`Server is running at ${PORT}`))