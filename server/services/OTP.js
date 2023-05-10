import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
export const generateOTP = () => {
    const OTP = otpGenerator.generate(10, {
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
export const encryptPassword = async (password) =>
    await bcrypt.hash(password, 10);
