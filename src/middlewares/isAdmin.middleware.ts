import { Request, Response } from "express";





const isAdmin = (req: Request, res: Response, next: Function) => {
    if (req.user && req.user.role === "admin") {
        return next(); 
    }
    return res.status(403).json({ message: "Access denied, admin only." }); 
};