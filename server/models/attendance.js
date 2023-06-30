import mongoose from "mongoose";
const AttendanceSchema = new mongoose.Schema(
    {
        email: { type: String, required: false },
        inTime: {
            type: String,
            required: false,
        },
        outTime: {
            type: String,
            required: false,
        },
        totalHours: {
            type: String,
            required: false,
        },
        created: {
            type: Date,
            default: new Date().toISOString(),
        },
    },
    { collection: "AttendanceLog" }
);
export default mongoose.model("AttendanceLog", AttendanceSchema);
