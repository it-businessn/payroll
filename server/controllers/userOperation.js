import User from "../models/user.js";
import {
    calculatePay,
    getCurrencyAndUpdateBankDetails,
} from "../services/config.js";

export const updateUser = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;
    const userRequestToUpdate = { ...userRequest, _id: id };

    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            userRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedUser });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateUserPaymentDetails = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;

    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        userRequest.paymentInfo = calculatePay(
            userRequest.annualSalary,
            userRequest.dateOfJoining
        );
        const userPaymentRequestToUpdate = { ...userRequest, _id: id };
        const updatedUserPaymentDetails = await User.findByIdAndUpdate(
            id,
            userPaymentRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedUserPaymentDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateUserBankDetails = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;

    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        userRequest.bankDetails = getCurrencyAndUpdateBankDetails(userRequest);
        const userBankRequestToUpdate = { ...userRequest, _id: id };
        const updatedUserBankDetails = await User.findByIdAndUpdate(
            id,
            userBankRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedUserBankDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateUserLeaveAttendanceDetails = async (request, response) => {
    const { id } = request.params;
    const userRequest = request.body;

    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        // userRequest.attendanceDetails.currency = getCurrency(
        //     userRequest.country
        // );
        // const userBankRequestToUpdate = { ...userRequest, _id: id };
        // const updatedUserBankDetails = await User.findByIdAndUpdate(
        //     id,
        //     userBankRequestToUpdate,
        //     { new: true }
        // );
        // response.status(200).json({ data: updatedUserBankDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const deleteUser = async (request, response) => {
    const { id } = request.params;

    try {
        const existingUser = await User.find({ _id: id });
        if (!existingUser) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const deletedUser = await User.findByIdAndRemove(id);
        response.status(200).json({
            data: `User with id ${id} deleted successfully ${deletedUser}`,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
