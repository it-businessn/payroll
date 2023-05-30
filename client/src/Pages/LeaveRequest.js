import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import FormikForm from "../components/FormikForm";
import {
    userPaymentFormFields,
    userPaymentInitialValues,
} from "./Login/loginFormFields";

function LeaveRequest() {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserAttendanceDetailsById(
                id,
                values
            );
            navigate("/");
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <div style={{ width: "100%", padding: "5em 10em", margin: 0 }}>
            <h1>Your Leave/Attendance Summary</h1>
            <FormikForm
                formSubmit={handleSubmit}
                initialValues={userPaymentInitialValues}
                formFields={userPaymentFormFields}
            />
        </div>
    );
}

export default LeaveRequest;
