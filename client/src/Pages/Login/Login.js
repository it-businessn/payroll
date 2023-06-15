import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { LoginSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright.js";
import "./Login.css";
import { loginFormFields, loginInitialValues } from "./loginFormFields.js";
export default function Login() {
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
    return (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex flex={1}>
                <Image
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src={
                        "https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=1060&t=st=1686351582~exp=1686352182~hmac=ccf1a43bb22cebc2353784a5fa04abf12c61f774a97936d1d825985b9e45ad39"
                    }
                />
            </Flex>
            <Flex
                p={8}
                flex={1}
                flexDirection="column"
                align={"center"}
                justify="space-evenly"
            >
                <Stack spacing={4} w={"full"} maxW={"md"}>
                    <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                    <FormikForm
                        formSubmit={handleSubmit}
                        schema={LoginSchema}
                        initialValues={loginInitialValues}
                        formFields={loginFormFields}
                    />
                    {hasError && <Text fontSize="md">{hasError}</Text>}
                    <Stack pt={6}>
                        <Text align={"center"}>
                            Don't have an account? &nbsp;
                            <Link to="/sign-up">
                                <Button color="#383ab6" variant="link">
                                    Sign Up
                                </Button>
                            </Link>
                        </Text>
                    </Stack>
                </Stack>
                <Copyright sx={{ mt: 7 }} />
            </Flex>
        </Stack>
    );
}
