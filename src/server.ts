import express from "express";

import User from "./routes/userRoute";
import Product from "./routes/productRoute";
import { errorHandler } from "./middlewares/errorHandler";
import { logMiddleware } from "./middlewares/logMiddleware";
import Auth from "./routes/authRoute";

const app = express();

const port = 3000;

app.use(express.json());
app.use(logMiddleware)
app.use("/api", User);
app.use("/api", Auth);
app.use("/api", Product);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
