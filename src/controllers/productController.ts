import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price),
       stock: Number(stock),
       category: category
      },
    });
    return res.status(201).json({
      message: "Proudct Create!",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server down",
    });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({
      message: "All product",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server down",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not Found",
      });
    }

    return res.status(200).json({
      message: "Detail tampil",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server down",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category
      },
    });
    return res.status(200).json({
      message: "Product Updated Success",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server down",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      message: "Product deleted Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server down",
    });
  }
};
