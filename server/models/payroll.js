import mongoose from "mongoose";
const PayrollSchema = new mongoose.Schema(
    {
        lastPayDate: {
            type: Date,
            required: false,
        },
        nextPayDate: {
            type: Date,
            required: false,
        },
        deduction: {
            CPP: { type: Number, required: false },
            EI: { type: Number, required: false },
            Tax: { type: Number, required: false },
        },
        gross: {
            type: Number,
            required: true,
        },
        netPay: {
            type: Number,
            required: false,
        },
        created: {
            type: Date,
            default: new Date().toISOString(),
            required: false,
        },
        currency: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: false,
        },
        dateOfJoining: {
            type: Date,
            required: false,
        },
    },
    { collection: "PayrollDetail" }
);

export default mongoose.model("PayrollDetail", PayrollSchema);
