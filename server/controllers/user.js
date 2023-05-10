import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";

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
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User does not exist" });
        }
        const token = jwt.sign(
            { email: existingUser?.email, id: existingUser?._id },
            "test",
            {
                expiresIn: "1h",
            }
        );
        const link = `${process.env.BASE_URL}/users/password-reset/${existingUser._id}/${token}`;
        await sendEmail(existingUser.email, "Password reset", link);

        res.status(201).json({
            status: "ok",
            message:
                "A password reset link has been sent to your email account",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User does not exist!" });
    }
    try {
        const verify = jwt.verify(token, "test");
        res.render("index", {
            email: verify.email,
            status: "Not verified ",
        });
    } catch (error) {
        console.log(error);
        res.send("User not Verified");
    }
};
export const setNewPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    try {
        const verify = await jwt.verify(token, "test");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: hashedPassword,
                },
            }
        );

        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
};
