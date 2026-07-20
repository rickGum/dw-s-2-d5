import { Router } from "express";
import { getAllUser, hello, login, profile, register, transferPoint } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { transferSchema } from "../validations/transferSchema";


const User = Router()

User.get("/hello", hello)
User.get("/profile/:name", profile)
User.post("/login", login)
User.post("/register", register )
User.get("/alluser", getAllUser )
User.post("/transfer",validate(transferSchema), transferPoint )

export default User