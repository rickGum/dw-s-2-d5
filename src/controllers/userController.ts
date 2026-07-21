import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export const hello = (req: Request, res: Response) => {
  return res.json({
    message: `Hello TS and Express`,
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

export const transferPoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    const sender = await prisma.user.findUnique({
      where: {
        id: Number(senderId),
      },
    });

    const receiver = await prisma.user.findUnique({
      where: {
        id: Number(receiverId),
      },
    });

    if (!sender) {
      throw new Error("Sender tidak ditemukan");
    }

    if (!receiver) {
      throw new Error("Receiver tidak ditemukan");
    }

    if (senderId === receiverId) {
      throw new Error("Tidak boleh transfer ke diri sendiri");
    }

    if (sender.points < amount) {
      throw new Error("Point tidak cukup");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: Number(senderId),
        },
        data: {
          points: {
            decrement: Number(amount),
          },
        },
      }),
      prisma.user.update({
        where: {
          id: Number(receiverId),
        },
        data: {
          points: {
            increment: Number(amount),
          },
        },
      }),
    ]);

    return res.status(200).json({
      message: "Transfer berhasil",
    });
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Profile berhasil diambil",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
