import User from "../models/user.js";
import {
    calculatePay,
    encryptPassword,
    generateOTP,
    getCurrency,
} from "../services/config.js";
import sendEmail from "../utils/sendEmail.js";

export const getAllEmployees = async (request, response) => {
    try {
        const employees = await User.find();
        response.status(200).json({ data: employees });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

export const getEmployeeById = async (request, response) => {
    const { id } = request.params;

    try {
        const existingEmployee = await User.findById({ _id: id });
        response.status(200).json({ data: existingEmployee });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

export const addEmployee = async (request, response) => {
    const {
        firstName,
        middleName,
        lastName,
        password,
        email,
        dateOfJoining,
        phoneNumber,
        postalCode,
        role,
        streetNumber,
        country,
        city,
        state,
    } = request.body;

    try {
        const existingEmployee = await User.findOne({ email });
        if (existingEmployee) {
            return response.status(400).json({
                error: "User already exists with the given email address",
            });
        }
        const newUser = await createUser(
            firstName,
            middleName,
            lastName,
            password,
            email,
            dateOfJoining,
            phoneNumber,
            postalCode,
            role,
            streetNumber,
            country,
            city,
            state
        );
        if (!newUser[0]) {
            return response.status(400).json({
                error: "Unable to create new user",
            });
        }
        response.status(200).json({ data: newUser });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};

const createUser = async (
    firstName,
    middleName,
    lastName,
    password,
    email,
    dateOfJoining,
    phoneNumber,
    postalCode,
    role,
    streetNumber,
    country,
    city,
    state
) => {
    const hashedPassword = await encryptPassword(password);
    const otpGenerated = generateOTP();

    const newUser = await User.create({
        firstName,
        middleName,
        lastName,
        password: hashedPassword,
        otp: otpGenerated,
        email,
        dateOfJoining,
        phoneNumber,
        role,
        address: {
            streetNumber,
            city,
            postalCode,
            state,
            country,
        },
    });
    if (!newUser) {
        return [false, "Unable to sign you up"];
    }
    try {
        await sendEmail(email, "Set OTP", otpGenerated);
        return [true, newUser];
    } catch (error) {
        return [false, "Unable to sign up, Please try again later", error];
    }
};
export const updateEmployee = async (request, response) => {
    const { id } = request.params;
    const employeeRequest = request.body;
    const employeeRequestToUpdate = { ...employeeRequest, _id: id };

    try {
        const existingEmployee = await User.find({ _id: id });
        if (!existingEmployee) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const updatedEmployee = await User.findByIdAndUpdate(
            id,
            employeeRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedEmployee });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateEmployeePaymentDetails = async (request, response) => {
    const { id } = request.params;
    const employeeRequest = request.body;

    try {
        const existingEmployee = await User.find({ _id: id });
        if (!existingEmployee) {
            return response.status(404).json({ error: "User does not exist" });
        }
        employeeRequest.paymentInfo = calculatePay(
            employeeRequest.annualSalary,
            employeeRequest.dateOfJoining
        );
        const employeePaymentRequestToUpdate = { ...employeeRequest, _id: id };
        const updatedEmployeePaymentDetails = await User.findByIdAndUpdate(
            id,
            employeePaymentRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedEmployeePaymentDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateEmployeeBankDetails = async (request, response) => {
    const { id } = request.params;
    const employeeRequest = request.body;

    try {
        const existingEmployee = await User.find({ _id: id });
        if (!existingEmployee) {
            return response.status(404).json({ error: "User does not exist" });
        }
        employeeRequest.bankDetails.currency = getCurrency(
            employeeRequest.country
        );
        const employeeBankRequestToUpdate = { ...employeeRequest, _id: id };
        const updatedEmployeeBankDetails = await User.findByIdAndUpdate(
            id,
            employeeBankRequestToUpdate,
            { new: true }
        );
        response.status(200).json({ data: updatedEmployeeBankDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const updateEmployeeLeaveAttendanceDetails = async (
    request,
    response
) => {
    const { id } = request.params;
    const employeeRequest = request.body;

    try {
        const existingEmployee = await User.find({ _id: id });
        if (!existingEmployee) {
            return response.status(404).json({ error: "User does not exist" });
        }
        // employeeRequest.attendanceDetails.currency = getCurrency(
        //     employeeRequest.country
        // );
        // const employeeBankRequestToUpdate = { ...employeeRequest, _id: id };
        // const updatedEmployeeBankDetails = await User.findByIdAndUpdate(
        //     id,
        //     employeeBankRequestToUpdate,
        //     { new: true }
        // );
        // response.status(200).json({ data: updatedEmployeeBankDetails });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
export const deleteEmployee = async (request, response) => {
    const { id } = request.params;

    try {
        const existingEmployee = await User.find({ _id: id });
        if (!existingEmployee) {
            return response.status(404).json({ error: "User does not exist" });
        }
        const deletedEmployee = await User.findByIdAndRemove(id);
        response.status(200).json({
            data: `User with id ${id} deleted successfully ${deletedEmployee}`,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
