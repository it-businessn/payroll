export const generateOTP = () => {
    const OTP = otpGenerator.generate(10, {
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
export const hashedPassword = async (password) =>
    await bcrypt.hash(password, 10);
