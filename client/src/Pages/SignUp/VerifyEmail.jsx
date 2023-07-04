import {
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    PinInput,
    PinInputField,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import { Logo } from "../../components";
import { CenterBoxLayout } from "../../layout";

const VerifyEmail = () => {
    const user = JSON.parse(localStorage.getItem("profile")) || "";

    const resetPasswordInitialValues = {
        email: user?.userDetails?.email,
        otp: "",
    };
    const [hasError, setErrorMessage] = useState("");
    const [OTP, setOTP] = useState("");
    const [emailSentText, setEmailSentText] = useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: { pin: "" },
        onSubmit: (formValues) => {
            try {
                handleSubmit();
            } catch (error) {
                console.log(error);
            }
        },
    });
    const handleSubmit = async () => {
        try {
            resetPasswordInitialValues.otp = OTP;
            const response = await api.verifyUser(resetPasswordInitialValues);
            if (response.data.data[0] === true) {
                setEmailSentText("Email verified successfully");
            } else {
                setEmailSentText("Invalid OTP");
            }
            setTimeout(() => {
                navigate("/");
            }, 3000);
            setErrorMessage("");
        } catch (error) {
            setEmailSentText("");
            setErrorMessage(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <CenterBoxLayout>
            <Stack spacing="6">
                <Logo />
                <Stack
                    spacing={{
                        base: "6",
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
                        Verify your Email
                    </Heading>
                    <Center
                        fontSize={{ base: "sm", sm: "md" }}
                        color={useColorModeValue("gray.800", "gray.400")}
                    >
                        A verification code has been sent to your email at
                    </Center>
                    <Center
                        fontSize={{ base: "sm", sm: "md" }}
                        fontWeight="bold"
                        color={useColorModeValue("gray.800", "gray.400")}
                    >
                        {user?.userDetails?.email}
                    </Center>
                    <HStack spacing="1" justify="center">
                        <FormikProvider value={formik}>
                            <Form>
                                <Field name="pin">
                                    {({ field, form }) => (
                                        <FormControl>
                                            <HStack>
                                                <PinInput
                                                    type="alphanumeric"
                                                    onChange={(value) =>
                                                        setOTP(value)
                                                    }
                                                >
                                                    <PinInputField />
                                                    <PinInputField />
                                                    <PinInputField />
                                                    <PinInputField />
                                                    <PinInputField />
                                                    <PinInputField />
                                                </PinInput>
                                            </HStack>
                                        </FormControl>
                                    )}
                                </Field>
                                <Stack>
                                    <Button
                                        marginTop="1em"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Verify
                                    </Button>
                                </Stack>
                            </Form>
                        </FormikProvider>
                    </HStack>
                    {emailSentText && (
                        <Text color="brand.500" align="center">
                            {emailSentText}
                        </Text>
                    )}
                    {hasError && (
                        <Text color="red" align={"center"}>
                            {hasError}
                        </Text>
                    )}
                </Stack>
            </Stack>
        </CenterBoxLayout>
    );
};
export default VerifyEmail;
