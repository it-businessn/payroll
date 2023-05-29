import User from "../models/user.js";
import { calculatePay, getCurrency } from "../services/config.js";

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
        let userAddress = streetNumber + city;
        const newEmployee = await User.create({
            firstName,
            middleName,
            lastName,
            password,
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
        if (!newEmployee) {
            return response.status(400).json({
                error: "Unable to create new employee",
            });
        }
        response.status(200).json({ data: newEmployee });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
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
