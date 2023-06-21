import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema(
    {
        raisedBy: {
            type: String,
            required: true,
        },
        approverName: {
            type: String,
            required: true,
        },
        durationOfLeave: {
            type: Number,
            required: false,
        }, //number of days requested
        leaveStartDate: {
            type: Date,
            required: true,
        },
        leaveEndDate: {
            type: Date,
            required: true,
        },
        leaveType: {
            type: String,
            required: true,
        },
        leaveReason: {
            type: String,
            required: true,
        },
        leaveApproved: {
            type: Boolean,
            required: false,
        },
        leaveRequestDecisionComment: {
            type: String,
            required: false,
        },
        leaveRequestStatus: {
            type: String,
            required: false,
        },
        leaveBalance: {
            type: Number,
            required: false,
        },
        totalLeaves: {
            type: Number,
            required: false,
        },
        usedLeaves: {
            type: Number,
            required: false,
        },
        created: {
            type: Date,
            default: new Date().toISOString(),
        },
    },
    { collection: "LeaveDetails" }
);

export default mongoose.model("LeaveDetails", LeaveRequestSchema);
