import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { encryptPassword, generateOTP } from "../services/config.js";
import sendDefaultMail from "../utils/sendDefaultMail.js";
import sendEmail from "../utils/sendEmail.js";
export const signIn = async (request, response) => {
    const { email, password } = request.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser?.password
        );
        if (!isPasswordCorrect) {
            return response.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { email: existingUser?.email, id: existingUser?._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );
        response.status(201).json({ data: existingUser, token });
    } catch (error) {
        response.status(500).json({ error: "Something went wrong" });
    }
};
export const signUp = async (request, response) => {
    const {
        firstName,
        middleName,
        lastName,
        password,
        email,
        dateOfJoining,
        phoneNumber,
        postalCode,
        role,
        streetNumber,
        country,
        city,
        state,
        currency,
    } = request.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({
                error: "User already exists with the given email address",
            });
        }
        const newUser = await createUser(
            firstName,
            middleName,
            lastName,
            password,
            email,
            dateOfJoining,
            phoneNumber,
            postalCode,
            role,
            streetNumber,
            country,
            city,
            state,
            currency
        );
        if (!newUser[0]) {
            return response.status(400).json({
                error: "Unable to create new user",
            });
        }
        response.status(200).json({ data: newUser });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};

const createUser = async (
    firstName,
    middleName,
    lastName,
    password,
    email,
    dateOfJoining,
    phoneNumber,
    postalCode,
    role,
    streetNumber,
    country,
    city,
    currency,
    state
) => {
    const hashedPassword = await encryptPassword(password);
    const otpGenerated = generateOTP();

    const newUser = await User.create({
        firstName,
        middleName,
        lastName,
        password: hashedPassword,
        otp: otpGenerated,
        email,
        dateOfJoining,
        phoneNumber,
        role,
        address: {
            streetNumber,
            city,
            postalCode,
            state,
            country,
        },
        bankDetails: { currency },
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
export const verifyUser = async (request, response) => {
    const { email, otp } = request.body;
    try {
        const user = await validateUserSignUp(email, otp);
        response.status(200).json({ data: user });
    } catch (error) {
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
const validateUserSignUp = async (email, otp) => {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return response.status(404).json({ error: "User does not exist" });
    }
    if (existingUser && existingUser.otp !== otp) {
        return [false, "Invalid OTP"];
    }
    const updatedUser = await User.findByIdAndUpdate(existingUser._id, {
        $set: { active: true },
    });
    return [true, updatedUser];
};

export const forgotPassword = async (request, response) => {
    const { email } = request.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
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

        response.status(201).json({
            data: "A password reset link has been sent to your email account",
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Something went wrong" });
    }
};
export const resetPassword = async (request, response) => {
    const { id, token } = request.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return response.json({ data: "User does not exist!" });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        response.render("index", {
            email: verify.email,
            status: "Not verified ",
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "User  not Verified!" });
    }
};
export const setNewPassword = async (request, response) => {
    const { id, token } = request.params;
    const { password } = request.body;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return response.status(400).json({ status: "User Not Exists!!" });
    }
    try {
        const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const hashedPassword = await encryptPassword(password);
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

        response.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        response.json({ error: "Something Went Wrong" });
    }
};

export const getAllUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({ data: users });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};
export const getUserById = async (request, response) => {
    const { id } = request.params;

    try {
        const existingUser = await User.findById({ _id: id });
        response.status(200).json({ data: existingUser });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};
export const sendEmail1 = async (request, response) => {
    const text = await sendDefaultMail(
        "julikhosla17@gmail.com",
        "New Contact",
        request.body
    );
};
export const getCategoryByMonth = async (request, response) => {
    try {
        // db.collection.insertMany(arrData);
        const categoryCount = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%m", date: "$dateOfJoining" },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        response.status(200).json({ data: categoryCount });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};
