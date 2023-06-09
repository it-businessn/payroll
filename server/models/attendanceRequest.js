export const AttendanceRequest = {
    leaveBalance: {
        type: Number,
        required: false,
    },
    totalLeaves: {
        type: Number,
        required: false,
    },
    requestedLeaves: {
        type: Number,
        required: true,
    },
    usedLeaves: {
        type: Number,
        required: false,
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
    created: {
        type: Date,
        default: new Date().toISOString(),
    },
};
