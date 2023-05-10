import mongoose from "mongoose";
const UserDetailsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        email: { type: String, unique: true, required: true },
        password: {
            type: String,
            required: true,
        },
        created: {
            type: String,
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
        otp: {
            type: String,
            required: true,
        },
    },
    { collection: "UserInfo" }
);
export default mongoose.model("UserInfo", UserDetailsSchema);
