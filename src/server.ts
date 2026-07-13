import express, {Request, Response} from "express";
import router from "./routes/userRoute";

const app = express();
const port = 3000;

app.use(express.json())

app.use("/api", router)

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
