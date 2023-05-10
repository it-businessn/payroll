import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateOTP } from "../services/OTP.js";
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
            process.env.JWT_SECRET_KEY,
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
        const newUser = await createUser(name, email, password);
        if (!newUser[0]) {
            return res.status(400).send({
                message: "Unable to create new user",
            });
        }
        res.status(200).json({ newUser });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const verifyUser = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await validateUserSignUp(email, otp);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};
const validateUserSignUp = async (email, otp) => {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ error: "User does not exist" });
    }
    if (existingUser && existingUser.otp !== otp) {
        return [false, "Invalid OTP"];
    }
    const updatedUser = await User.findByIdAndUpdate(existingUser._id, {
        $set: { active: true },
    });
    return [true, updatedUser];
};
const createUser = async (name, email, password) => {
    const hashedPassword = await hashedPassword(password);
    const otpGenerated = generateOTP();

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        otp: otpGenerated,
    });
    if (!newUser) {
        return [false, "Unable to sign you up"];
    }
    try {
        await sendEmail(email, "Set OTP", otpGenerated);
        return [true, newUser];
    } catch (error) {
        return [false, "Unable to sign up, Please try again later", error];
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
            process.env.JWT_SECRET_KEY,
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
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
        const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const hashedPassword = await hashedPassword(password);
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
