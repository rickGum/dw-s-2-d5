import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const hello = (req: Request, res: Response) => {
  return res.json({
    message: `Hello TS and Express`,
  });
};

export const profile = (req: Request, res: Response) => {
  const { name } = req.params;
  return res.json({
    message: `hello ${name}`,
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "admin@mail.com" && password === "123456") {
    return res.status(200).json({
      success: true,
      message: "Login Admin berhasil!",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "email dan password tidak sesuai!",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  return res.status(200).json({
    message: "Register berhasil tanpa jwt",
    data: newUser,
  });
};

export const getAllUser = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      products: true,
    },
  });
  return res.status(200).json({
    message: "Berhasil tampil all data users",
    data: users,
  });
};
