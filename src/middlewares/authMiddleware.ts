import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({message: "Akses ditolak, token tidak ada"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    (req as any).user = decoded
    next()
    
  } catch (error) {
    return res.status(403).json({message: "Token tidak validyah"})
  }
};
