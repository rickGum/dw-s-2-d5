import express from "express";

import User from "./routes/userRoute";
import Product from "./routes/productRoute";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", User);
app.use("/api", Product);

app.listen(port, () => {
  console.log(`Server berjalan di ${port}`);
});
