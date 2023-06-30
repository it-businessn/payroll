import Attendance from "../models/attendance.js";
import User from "../models/user.js";

export const getAttendanceLogs = async (request, response) => {
    try {
        const result = await Attendance.find();
        response.status(200).json({ data: result });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

export const addAttendanceLogs = async (request, response) => {
    const { id } = request.params;
    const { inTime, outTime, totalHours, email } = request.body;
    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const newRequest = await Attendance.create({
            email,
            inTime,
            outTime,
            totalHours,
        });
        response.status(200).json({ data: newRequest });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateAttendanceLog = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;

    const userRequestToUpdate = { ...userRequest, _id: id };

    try {
        const existingRequest = await User.find({ _id: id });
        if (!existingRequest) {
            return response
                .status(404)
                .json({ error: " Request does not exist" });
        }
        const updatedRequest = await Attendance.findByIdAndUpdate(
            id,
            userRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedRequest });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
