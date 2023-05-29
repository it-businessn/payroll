import mongoose from "mongoose";
import { AttendanceRequest } from "./attendanceRequest.js";
import { BankDetail } from "./bankDetail.js";
import { Address, EmergencyContact } from "./contactDetail.js";
import { PaymentTransaction } from "./paymentTransaction.js";

const UserDetailsSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: { type: String, unique: true, required: true },
        role: { type: String, required: true },
        password: {
            type: String,
            required: true,
        },
        created: {
            type: Date,
            default: new Date().toISOString(),
        },
        lastActive: {
            type: String,
            required: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        dateOfJoining: {
            type: Date,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        emergencyContact: {
            type: EmergencyContact,
            required: false,
        },
        address: {
            type: Address,
            required: true,
        },
        preferredModeOfPayment: {
            type: String,
            default: "Direct Deposit",
            required: false,
        },
        bankDetails: {
            type: BankDetail,
            required: false,
        },
        userBankDetailsApproved: {
            type: Boolean,
            required: false,
        },
        annualSalary: {
            type: Number,
            required: false,
        },
        attendanceDetails: [{ type: AttendanceRequest, required: false }],
        paymentInfo: [{ type: PaymentTransaction, required: false }],
        otp: {
            type: String,
            required: false,
        },
    },
    { collection: "UserInfo" }
);

export default mongoose.model("UserInfo", UserDetailsSchema);
