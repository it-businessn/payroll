import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User does not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser?.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { email: existingUser?.email, id: existingUser?._id },
            "test",
            {
                expiresIn: "1h",
            }
        );
        res.status(201).json({ status: "ok", data: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            name,
            email,
            password: encryptedPassword,
        });

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
