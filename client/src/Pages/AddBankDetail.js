import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import FormikForm from "../components/FormikForm";
const userBankInitialValues = {
    accountNumber: "",
    branchTransitNumber: "",
    institutionNumber: "",
};
const userBankFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "accountNumber",
        label: "Account Number",
        size: "medium",
        name: "accountNumber",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "branchTransitNumber",
        label: "branchTransitNumber ",
        size: "medium",
        name: "branchTransitNumber",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "institutionNumber",
        label: "institutionNumber ",
        size: "medium",
        name: "institutionNumber",
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
        label: "Add",
    },
];
function AddBankDetail() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const { id } = useParams();
    const handleSubmit = async (values) => {
        values.country = user.userDetails.address.country;
        try {
            const updateData = await api.updateUserBankDetailsById(id, values);
            navigate("/");
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <div style={{ width: "100%", padding: "5em 10em", margin: 0 }}>
            <h1>Add Bank Details </h1>
            <FormikForm
                formSubmit={handleSubmit}
                initialValues={userBankInitialValues}
                formFields={userBankFormFields}
            />
        </div>
    );
}

export default AddBankDetail;
