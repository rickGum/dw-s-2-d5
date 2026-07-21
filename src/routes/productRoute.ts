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
import { authentication } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/autohrizeRole";
import { upload } from "../lib/multer";

const Product = Router();

Product.post(
  "/product",
  authentication,
  upload.single("image"),
  validate(createProductSchema),
  createProduct,
);
Product.get(
  "/product",
  authentication,
  authorizeRole(["ADMIN"]),
  getAllProduct,
);
Product.get("/product/:id", getProductById);
Product.put("/product/:id", updateProduct);
Product.delete(
  "/product/:id",
  authentication,
  authorizeRole(["ADMIN"]),
  deleteProduct,
);

export default Product;
