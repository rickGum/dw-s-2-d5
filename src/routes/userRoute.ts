import { Router } from "express";
import { hello, login, profile } from "../controllers/userController";


const router = Router()

router.get("/hello", hello)
router.get("/profile/:name", profile)
router.post("/login", login)

export default router