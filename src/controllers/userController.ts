import { Request, Response } from "express";

export const hello = (req:Request, res:Response) => {
    return res.json({
        message: `Hello TS and Express`
    })
}

export const profile = (req:Request, res:Response) => {
    const {name} = req.params
    return res.json({
        message: `hello ${name}`
    })
}


export const login = (req:Request, res:Response) => {
const {email, password} = req.body
if (email === "admin@mail.com" && password === "123456") {
    return res.status(200).json({
        success: true,
        message: "Login Admin berhasil!"
    })
}else{
    return res.status(401).json({
        success: false,
        message: "email dan password tidak sesuai!"
    })
}
}