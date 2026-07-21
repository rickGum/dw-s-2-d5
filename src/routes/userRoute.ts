import { Router } from "express";
import {
  getAllUser,
  hello,
  profile,
  transferPoint,
} from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { transferSchema } from "../validations/transferSchema";
import { authentication } from "../middlewares/authMiddleware";

const User = Router();

User.get("/hello", hello);
User.get("/alluser", getAllUser);
User.post("/transfer", validate(transferSchema), transferPoint);
User.get("/profile", authentication, profile);

export default User;
