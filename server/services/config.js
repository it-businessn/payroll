import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
export const generateOTP = () => {
    const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
export const encryptPassword = async (password) =>
    await bcrypt.hash(password, 10);
export const paymentConfigurationRule = () => {};
// payroll config settings
//biweekly or bimonthly, rules - payperiod calculate

//map currency of bank based on country
