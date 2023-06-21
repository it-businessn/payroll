import LeaveRequest from "../models/leaveRequest.js";
import User from "../models/user.js";
export const getAllLeaveDetails = async (request, response) => {
    try {
        const result = await LeaveRequest.find();
        response.status(200).json({ data: result });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};
export const raiseLeaveRequest = async (request, response) => {
    const { id } = request.params;
    const {
        raisedBy,
        approverName,
        leaveStartDate,
        leaveEndDate,
        leaveType,
        leaveReason,
        durationOfLeave,
    } = request.body;
    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const newLeaveRequest = await LeaveRequest.create({
            raisedBy,
            approverName,
            durationOfLeave,
            leaveStartDate,
            leaveEndDate,
            leaveType,
            leaveReason,
            leaveApproved: false,
            leaveRequestDecisionComment: "Pending",
            leaveRequestStatus: "Pending",
            leaveBalance: 20 - durationOfLeave,
            totalLeaves: 20,
            usedLeaves: 0,
        });
        response.status(200).json({ data: newLeaveRequest });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateLeaveRequest = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;
    const userRequestToUpdate = { ...userRequest, _id: id };

    try {
        const existingUser = await LeaveRequest.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const updatedUser = await LeaveRequest.findByIdAndUpdate(
            id,
            userRequestToUpdate,
            { new: true }
        );
        console.log(existingUser, updatedUser);
        response.status(200).json({ data: updatedUser });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
updateLeaveRequest;
