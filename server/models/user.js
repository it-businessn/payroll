import mongoose from "mongoose";
const UserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
    },
    { collection: "UserInfo" }
);
export default mongoose.model("UserInfo", UserDetailsSchema);
