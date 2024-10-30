import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user: IUser | null = await User.findById(id).select("-password");
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error:any) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};