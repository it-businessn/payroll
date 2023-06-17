import {
    Button,
    Heading,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm";
import { LoginSchema } from "../../config/userSchema";
import {
    loginFormFields,
    loginInitialValues,
} from "../../constants/constant.js";
import Logo from "../Home/Logo";
export const SignInForm = (props) => {
    const [hasError, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const userData = await api.signIn(values);
            const userDetails = userData?.data;
            const userToken = userData?.token;
            const profile = { userDetails, userToken };
            localStorage.setItem("profile", JSON.stringify(profile));
            userDetails.data.active
                ? navigate("/home")
                : navigate("/verify-email");
        } catch (error) {
            setError(error.response.data.error);
            console.log(error);
        }
    };
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    });
    return (
        <Stack spacing="8" {...props}>
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
                        Log in to your account
                    </Heading>
                    <HStack spacing="1" justify="center">
                        <Text color="fg.muted">Don't have an account?</Text>
                        <Link to="/sign-up">
                            <Button variant="text" size="lg">
                                Sign up
                            </Button>
                        </Link>
                    </HStack>
                </Stack>
            </Stack>
            <Stack spacing="5">
                <FormikForm
                    formSubmit={handleSubmit}
                    schema={LoginSchema}
                    initialValues={loginInitialValues}
                    formFields={loginFormFields}
                />
                {hasError && <Text color="red">{hasError}</Text>}
            </Stack>
        </Stack>
    );
};
