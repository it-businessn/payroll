import { Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Pages/Home/Logo.jsx";
import * as api from "../api/index.js";
import { LoginSchema } from "../config/userSchema.jsx";
import { loginFormFields, loginInitialValues } from "../constants/constant.jsx";
import FormikForm from "./FormikForm.jsx";
export const SignInForm = ({ title }) => {
    const [hasError, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            const userData = await api.signIn(values);
            const userDetails = userData?.data;
            const userToken = userData?.token;
            const profile = { userDetails, userToken };
            localStorage.setItem("profile", JSON.stringify(profile));
            userDetails.data.active
                ? navigate("/home")
                : navigate("/verify-email");
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.error);
            console.log(error);
        }
    };
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    });
    return (
        <Stack spacing="8">
            <Stack spacing="6">
                {isMobile && <Logo />}
                <Stack
                    spacing={{
                        base: "2",
                        md: "3",
                    }}
                    textAlign="center"
                >
                    <Heading
                        size={{
                            base: "xs",
                            md: "sm",
                        }}
                    >
                        {title}
                    </Heading>
                </Stack>
            </Stack>
            <Stack spacing="5">
                <FormikForm
                    formSubmit={handleSubmit}
                    schema={LoginSchema}
                    initialValues={loginInitialValues}
                    formFields={loginFormFields}
                    isLoading={isLoading}
                />
                {hasError && <Text color="red">{hasError}</Text>}
            </Stack>
        </Stack>
    );
};