import { Box, Stack, StackDivider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../../api/index.js";
import { UserSchema } from "../../../config/userSchema.js";
import { userFormFields } from "../../Login/loginFormFields.js";
import PersonalInfoCard from "./AddressCard.jsx";
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
        <Stack spacing="5" divider={<StackDivider />}>
            {/* <Stack
                    direction={{
                        base: "column",
                        lg: "row",
                    }}
                    spacing={{
                        base: "5",
                        lg: "8",
                    }}
                    justify="space-between"
                >
                    <Box flexShrink={0}>
                        <Text fontSize="lg" fontWeight="medium">
                            Your Profile
                        </Text>
                        <Text color="muted" fontSize="sm">
                            Tell others who you are
                        </Text>
                    </Box>
                    {!userFormInitialValues ? (
                        "Loading"
                    ) : (
                        <ProfileCard
                            maxW={{
                                lg: "3xl",
                            }}
                        />
                    )}
                </Stack> */}
            <Stack
                direction={{
                    base: "column",
                    lg: "row",
                }}
                spacing={{
                    base: "5",
                    lg: "8",
                }}
                justify="space-between"
            >
                <Box flexShrink={0}>
                    <Text fontSize="lg" fontWeight="medium">
                        Address
                    </Text>
                    <Text color="muted" fontSize="sm">
                        Your address to which we send your orders
                    </Text>
                </Box>
                {!userFormInitialValues ? (
                    "Loading"
                ) : (
                    <PersonalInfoCard
                        formSubmit={handleSubmit}
                        schema={UserSchema}
                        initialValues={userFormInitialValues}
                        formFields={userFormFields}
                        maxW={{
                            lg: "3xl",
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}
