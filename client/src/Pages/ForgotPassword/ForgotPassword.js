import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import * as React from "react";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { ResetPasswordSchema } from "../../config/userSchema.js";
import "../Login/Login.css";
import {
    resetPasswordFormFields,
    resetPasswordInitialValues,
} from "./passwordResetFormFields.js";

export default function ForgotPassword() {
    const [hasError, setErrorMessage] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
    const handleSubmit = async (values) => {
        try {
            const response = await api.forgotPassword(values);
            setEmailSentText(response.data.data);
            setErrorMessage("");
        } catch (error) {
            setEmailSentText("");
            setErrorMessage(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
            >
                {!emailSentText && (
                    <>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", md: "3xl" }}
                        >
                            Forgot your password?
                        </Heading>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                            You&apos;ll get an email with a reset link
                        </Text>
                        <FormikForm
                            formSubmit={handleSubmit}
                            schema={ResetPasswordSchema}
                            initialValues={resetPasswordInitialValues}
                            formFields={resetPasswordFormFields}
                        />
                    </>
                )}
                {emailSentText && (
                    <>
                        <Text gutterBottom>Reset Complete!</Text>
                        <Text variant="subtitle2" color="text.success">
                            {emailSentText}.
                        </Text>
                        <Link to="/">
                            <Button
                                size="lg"
                                bg={"#383ab6"}
                                color={"white"}
                                _hover={{
                                    bg: "#494bc7",
                                }}
                                width="100%"
                                color="#383ab6"
                                variant="solid"
                            >
                                Back to Login
                            </Button>
                        </Link>
                    </>
                )}
                {hasError && <Text color="red">{hasError}</Text>}
            </Stack>
        </Flex>
    );
}
