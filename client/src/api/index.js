import axios from "axios";

const BASE_URL = {
    LOCAL: "http://localhost:5000",
};
const API = axios.create({
    baseURL: BASE_URL.LOCAL,
});

export const signIn = (formData) => API.post("/users/signIn", formData);
export const signUp = (formData) => API.post("/users/signUp", formData);
export const userData = (formData) => API.post("/userData", formData);
