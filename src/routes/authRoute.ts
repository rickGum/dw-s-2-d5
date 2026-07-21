import { Router } from "express";
import { login, register } from "../controllers/authController";
import { upload } from "../lib/multer";

const Auth = Router()

Auth.post(
    "/register",
    upload.single("profilePicture"),
    register
);
Auth.post("/login", login)

export default Auth