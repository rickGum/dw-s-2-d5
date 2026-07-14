import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController";

const Product = Router();

Product.post("/product", createProduct);
Product.get("/product", getAllProduct);
Product.get("/product/:id", getProductById);
Product.put("/product/:id", updateProduct);
Product.delete("/product/:id", deleteProduct);

export default Product;
