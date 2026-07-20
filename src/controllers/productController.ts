import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, stock, category } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        // ini rev dulu ntar ganti jwt
        author: {
          connect: {
            id: 1,
          },
        },
      },
    });
    return res.status(201).json({
      message: "Proudct Create!",
      data: newProduct,
    });
  } catch (error) {
     next(error);
  }
};

export const getAllProduct = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { search, minPrice } = req.query;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = req.query.order === "asc" ? "asc" : "desc";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
        price: {
          gte: minPrice ? Number(minPrice) : 0,
        },
      },
      take: limit,
      skip: skip,
      orderBy: {
        [sortBy]: order,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const totalData = await prisma.product.count();

    return res.status(200).json({
      message: "All product",
      meta: {
        current_page: page,
        limit: limit,
        total_data: totalData,
        total_pages: Math.ceil(totalData / limit),
      },
      data: products,
    });
  } catch (error) {
     next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
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
        category,
      },
    });
    return res.status(200).json({
      message: "Product Updated Success",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
  }
};
