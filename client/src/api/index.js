import axios from "axios";

const BASE_URL = {
    LOCAL: "http://localhost:5000",
    LIVE: "https://payroll-backend-6dzp.onrender.com",
};
const API = axios.create({
    baseURL: BASE_URL.LIVE,
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
export const addUserPaymentDetailsById = (id, formData) =>
    API.post(`/userOperation/payment/${id}`, formData);
export const updateUserBankDetailsById = (id, formData) =>
    API.put(`/userOperation/bank/${id}`, formData);
export const addUserAttendanceDetailsById = (id, formData) =>
    API.put(`/userOperation/attendance/${id}`, formData);
export const getGroupedDataByMonth = () => API.get("/getCategory");
