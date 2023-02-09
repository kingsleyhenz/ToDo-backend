import express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './config/dbConnect.js';
import todoRoute from './routes/todoRoutes.js';
dotenv.config();
dbConnect();
const app = express();
app.use(express.json())

app.use(cors({
    origin: '*'
}
))
app.options('*', cors())
app.use(
    cors({
        credentials: true,
        origin: true,
        allowedHeaders: "*"
    })
)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use("/api/v1/task", todoRoute)

const PORT = process.env.PORT || 10000
app.listen(PORT,console.log(`Server is running at ${PORT}`))