import User from "../model/User.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../utils/createJwtToken.js";

// ✅ Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword, type });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
console.log("email, ps",email,password)
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = createJwtToken(user);

        // Set token in HTTP-only cookie (More Secure)
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access
            secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS only)
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        res.json({ message: "Login successful", user,token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Get Users with Filtering & Pagination
export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", type = "" } = req.query;
        const offset = (page - 1) * limit;

        // Build search query
        let whereClause = {};
        if (search) {
            whereClause.name = { [Op.iLike]: `%${search}%` }; // Case-insensitive search
        }
        if (type) {
            whereClause.type = type; // Filter by type
        }

        // Fetch users with pagination
        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]], // Sort by latest users
        });

        res.json({
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            users,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        // Clear the token from cookies
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0) // Expire immediately
        });

        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

