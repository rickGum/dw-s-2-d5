import { Router } from "express";
import { getAllUser, hello, login, profile, register } from "../controllers/userController";


const User = Router()

User.get("/hello", hello)
User.get("/profile/:name", profile)
User.post("/login", login)
User.post("/register", register )
User.get("/alluser", getAllUser )

export default User