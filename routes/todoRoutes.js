import  Express  from "express";
import { addTask } from "../controller/todoController.js";
import { Register, Login } from "../controller/regController.js";
import {isLogin} from "../middleware/LoggedIn.js";

const todoRoute = Express.Router();


todoRoute.post("/register",Register)

todoRoute.post("/login", Login)

todoRoute.post("/create",isLogin, addTask)



export default todoRoute