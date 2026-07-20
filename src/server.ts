import express from "express";

import User from "./routes/userRoute";
import Product from "./routes/productRoute";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import { logMiddleware } from "./middlewares/logMiddleware";

const app = express();

const port = 3000;

app.use(express.json());
app.use(logMiddleware)
app.use("/api", User);
app.use("/api",apiKeyMiddleware, Product);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
