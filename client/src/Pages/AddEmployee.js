import React from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/index.js";
import FormikForm from "../components/FormikForm";
import { UserSchema } from "../config/userSchema";
import { userFormFields, userInitialValues } from "./Login/loginFormFields";
function AddEmployee() {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const userData = await api.addEmployee(values);
            navigate("/");
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <div style={{ width: "100%", padding: "5em 10em", margin: 0 }}>
            <h1>Add New Employee</h1>
            <FormikForm
                formSubmit={handleSubmit}
                schema={UserSchema}
                initialValues={userInitialValues}
                formFields={userFormFields}
            />
        </div>
    );
}

export default AddEmployee;
