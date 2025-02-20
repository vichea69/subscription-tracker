import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";

// Register a new user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(201).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

// Login user
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

// Get current logged in user
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}; 