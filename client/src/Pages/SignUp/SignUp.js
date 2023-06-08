import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { UserSchema } from "../../config/userSchema.js";
import { userFormFields, userInitialValues } from "../Login/loginFormFields.js";
import "./SignUp.css";
import Copyright from "../Copyright.js";

export default function SignUp() {
    const navigate = useNavigate();
    const [hasError, setError] = React.useState("");
    const handleSubmit = async (values) => {
        try {
            const userData = await api.signUp(values);
            const userDetails = userData?.data;
            const profile = { userDetails: userDetails.data[1] };
            localStorage.setItem("profile", JSON.stringify(profile));
            navigate("/verify-email");
        } catch (error) {
            setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex
                flex={1}
                align={"center"}
                justify={"center"}
                sx={{ padding: "2em 0" }}
            >
                <Stack spacing={4} w={"full"} maxW={"1200px"}>
                    <Heading fontSize={"2xl"}>
                        Let's create your account
                    </Heading>
                    <FormikForm
                        formSubmit={handleSubmit}
                        schema={UserSchema}
                        initialValues={userInitialValues}
                        formFields={userFormFields}
                    />
                    {hasError && <Text fontSize="md">{hasError}</Text>}
                    <Stack pt={6}>
                        <Text align={"center"}>
                            Already have an account? &nbsp;
                            <Link to="/sign-in">
                                <Button color="#383ab6" variant="link">
                                    Sign In
                                </Button>
                            </Link>
                        </Text>
                    </Stack>
                    <Copyright sx={{ mt: 7 }} />
                </Stack>
            </Flex>
        </Stack>
    );
}
