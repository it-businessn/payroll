import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be a valid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Name required"),
    email: Yup.string()
        .email("Email must be a valid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});
