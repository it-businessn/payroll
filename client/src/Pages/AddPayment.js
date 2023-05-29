import React from "react";
import FormikForm from "../components/FormikForm";
import * as api from "../api/index.js";
import { UserSchema } from "../config/userSchema";
import { userFormFields, userInitialValues } from "./Login/loginFormFields";

function AddPayment() {
    const handleSubmit = async (values) => {
        try {
            const userData = await api.signIn(values);
            const userDetails = userData?.data;
            const userToken = userData?.token;
            const profile = { userDetails, userToken };
            localStorage.setItem("profile", JSON.stringify(profile));
            // userData.active ? navigate("/home") : navigate("/verify-email");
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <FormikForm
            formSubmit={handleSubmit}
            schema={UserSchema}
            initialValues={userInitialValues}
            formFields={userFormFields}
        />
    );
}

export default AddPayment;
