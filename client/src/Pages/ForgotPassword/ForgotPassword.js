import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { ResetPasswordSchema } from "../../config/userSchema";
import {
    resetPasswordFormFields,
    resetPasswordInitialValues,
} from "../../constants/constant.js";
import Logo from "../Home/Logo";

export const ForgotPassword = () => {
    const [hasError, setErrorMessage] = useState("");
    const [captionTitle, setCaptionTitle] = useState("");
    const handleSubmit = async (values) => {
        try {
            const response = await api.forgotPassword(values);
            setCaptionTitle(response.data.data);
            setErrorMessage("");
        } catch (error) {
            setCaptionTitle("Sorry! Unable to sent reset link!");
            setErrorMessage(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <Box
            bgGradient={{
                sm: "linear(to-r, brand.600, brand.600)",
            }}
            py={{
                base: "12",
                md: "24",
            }}
            display="flex"
            minH="100vh"
            alignItems="center"
        >
            <Container
                maxW="md"
                py={{
                    base: "0",
                    sm: "8",
                }}
                px={{
                    base: "4",
                    sm: "10",
                }}
                bg={{
                    base: "transparent",
                    sm: "bg.surface",
                }}
                boxShadow={{
                    base: "none",
                    sm: "xl",
                }}
                borderRadius={{
                    base: "none",
                    sm: "xl",
                }}
            >
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Logo />
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
                                Forgot your password?
                            </Heading>
                            <Text color="fg.muted">
                                You'll get an email with a reset link
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack spacing="6">
                        <Stack spacing="4">
                            {!captionTitle && (
                                <FormikForm
                                    formSubmit={handleSubmit}
                                    schema={ResetPasswordSchema}
                                    initialValues={resetPasswordInitialValues}
                                    formFields={resetPasswordFormFields}
                                />
                            )}
                            {captionTitle && (
                                <>
                                    <Text color="green">{captionTitle}</Text>
                                    <Link to="/">
                                        <Button width="100%" variant="primary">
                                            Back to Login
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Stack>
                        <HStack>
                            <Divider />
                            <Text textStyle="sm" color="fg.muted">
                                OR
                            </Text>
                            <Divider />
                        </HStack>
                    </Stack>

                    {hasError && <Text color="red">{hasError}</Text>}
                    <HStack spacing="1" justify="center">
                        <Text textStyle="sm" color="fg.muted">
                            Having issues?
                        </Text>
                        <Button variant="text" size="sm">
                            Contact us
                        </Button>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
};
