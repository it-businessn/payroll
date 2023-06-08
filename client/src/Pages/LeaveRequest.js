import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import FormikForm from "../components/FormikForm";
const userAttendanceInitialValues = {
    requestedLeaves: "",
    leaveReason: "",
};
const userManagerAttendanceInitialValues = {
    leaveApproved: "",
    leaveRequestDecisionComment: "",
};
const userManagerAttendanceFormFields = [
    {
        field: "radio",
        margin: "dense",
        fullWidth: true,
        id: "leaveApproved",
        label: "leaveApproved ",
        size: "medium",
        name: "leaveApproved",
        type: "radio",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "leaveRequestDecisionComment",
        label: "leaveRequestDecisionComment ",
        size: "medium",
        name: "leaveRequestDecisionComment",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "button",
        variant: "solid",
        color: "#383ab6",
        id: "register",
        fullWidth: "100%",
        type: "submit",
        size: "lg",
        label: "Submit",
    },
];
const userAttendanceFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "requestedLeaves",
        label: "requestedLeaves ",
        size: "medium",
        name: "requestedLeaves",
        type: "number",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "leaveReason",
        label: "leaveReason ",
        size: "medium",
        name: "leaveReason",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "button",
        variant: "solid",
        color: "#383ab6",
        id: "register",
        fullWidth: "100%",
        type: "submit",
        size: "lg",
        label: "Submit",
    },
];
function LeaveRequest() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const { id } = useParams();
    const handleSubmit = async (values) => {
        try {
            values.role = user.userDetails.role;
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
            employee{" "}
            <FormikForm
                formSubmit={handleSubmit}
                initialValues={userAttendanceInitialValues}
                formFields={userAttendanceFormFields}
            />
            manager
            <FormikForm
                formSubmit={handleSubmit}
                initialValues={userManagerAttendanceInitialValues}
                formFields={userManagerAttendanceFormFields}
            />
        </div>
    );
}

export default LeaveRequest;
