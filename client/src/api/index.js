import axios from "axios";

const BASE_URL = {
    LOCAL: "http://localhost:5000",
};
const API = axios.create({
    baseURL: BASE_URL.LOCAL,
});

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
export const verifyUser = (formData) => API.post("/user/verify-user", formData);
export const getAllUsers = () => API.get("/user");
export const getUserById = (id) => API.get(`/user/${id}`);
export const updateUserById = (id, formData) =>
    API.put(`/userOperation/${id}`, formData);
export const forgotPassword = (formData) =>
    API.post("/user/forgot-password", formData);
export const updateUserPaymentDetailsById = (id, formData) =>
    API.put(`/userOperation/payment/${id}`, formData);
export const updateUserBankDetailsById = (id, formData) =>
    API.put(`/userOperation/bank/${id}`, formData);
export const updateUserAttendanceDetailsById = (id, formData) =>
    API.put(`/userOperation/attendance/${id}`, formData);
