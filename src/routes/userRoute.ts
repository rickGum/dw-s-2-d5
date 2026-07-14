import { Router } from "express";
import { hello, login, profile } from "../controllers/userController";


const User = Router()

User.get("/hello", hello)
User.get("/profile/:name", profile)
User.post("/login", login)

export default User