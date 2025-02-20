import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


export const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //logic to create user 
        const { name, email, password } = req.body;
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save({ session });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
        res.status(201).json({ token });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser[0],
                token
            }
        });
    } catch (error) {
        await session.abortTransaction();
    }
}
export const signIn = async (req, res) => {
    //logic to sign in user
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error("Invalid password");
        error.statusCode = 400;
        throw error;
    }
    //generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
            user,
            token
        }
    });
}
export const signOut = async (req, res) => {
    //logic to sign out user
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User signed out successfully"
    });
}
