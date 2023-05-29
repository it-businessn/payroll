import axios from "axios";

const BASE_URL = {
    LOCAL: "http://localhost:5000",
};
const API = axios.create({
    baseURL: BASE_URL.LOCAL,
});

export const signIn = (formData) => API.post("/users/signIn", formData);
export const signUp = (formData) => API.post("/users/signUp", formData);
export const verifyUser = (formData) =>
    API.post("/users/verify-user", formData);
export const userData = (formData) => API.post("/userData", formData);
export const forgotPassword = (formData) =>
    API.post("/users/forgot-password", formData);
export const getAllEmployee = () => API.get("/employee");
export const addEmployee = (formData) => API.post("/employee", formData);
export const getEmployeeById = (id) => API.get("/employee/" + id);
export const updateEmployeeById = (id, formData) =>
    API.put(`/employee/${id}`, formData);
export const updateEmployeePaymentDetailsById = (id, formData) =>
    API.put(`/employee/payment/${id}`, formData);
export const updateEmployeeBankDetailsById = (id, formData) =>
    API.put(`/employee/bank/${id}`, formData);
export const updateEmployeeAttendanceDetailsById = (id, formData) =>
    API.put(`/employee/attendance/${id}`, formData);
