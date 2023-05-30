import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import FormikForm from "../components/FormikForm.js";
import { UserSchema } from "../config/userSchema.js";
import { userFormFields } from "./Login/loginFormFields.js";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetchUserData(id);
    }, []);
    const [userFormInitialValues, setUserFormInitialValues] = useState(null);

    const [userResponseData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchUserData = async (id) => {
        try {
            const userData = await api.getUserById(id);
            setData(userData.data.data);
            setUserFormInitialValues({
                firstName: userData.data.data.firstName,
                middleName: userData.data.data.middleName,
                lastName: userData.data.data.lastName,
                email: userData.data.data.email,
                password: userData.data.data.password,
                role: userData.data.data.role,
                dateOfJoining: userData.data.data.dateOfJoining,
                phoneNumber: userData.data.data.phoneNumber,
                streetNumber: userData.data.data.address.streetNumber,
                city: userData.data.data.address.city,
                state: userData.data.data.address.state,
                postalCode: userData.data.data.address.postalCode,
                country: userData.data.data.address.country,
            });
            setLoading(false);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserById(id, values);
            navigate("/");
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <div style={{ width: "100%", padding: "5em 10em", margin: 0 }}>
            <h1>Edit User</h1>
            {!userFormInitialValues ? (
                "Loading"
            ) : (
                <FormikForm
                    formSubmit={handleSubmit}
                    schema={UserSchema}
                    initialValues={userFormInitialValues}
                    formFields={userFormFields}
                />
            )}
        </div>
    );
}
