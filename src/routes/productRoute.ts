import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../validations/productSchema";

const Product = Router();

Product.post("/product", validate(createProductSchema), createProduct);
Product.get("/product", getAllProduct);
Product.get("/product/:id", getProductById);
Product.put("/product/:id", updateProduct);
Product.delete("/product/:id", deleteProduct);

export default Product;
