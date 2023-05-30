import {
    Button,
    Center,
    Flex,
    FormControl,
    HStack,
    Heading,
    PinInput,
    PinInputField,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";

export default function VerifyEmail() {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("profile") || "")
    );
    const resetPasswordInitialValues = {
        email: user.userDetails.email,
        otp: "",
    };
    const [hasError, setErrorMessage] = React.useState("");
    const [OTP, setOTP] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
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
        console.log(OTP);
        try {
            resetPasswordInitialValues.otp = OTP;
            const response = await api.verifyUser(resetPasswordInitialValues);
            navigate("/users");
            if (response.user[0] === true) {
                setEmailSentText("Email verified successfully");
            } else {
                setEmailSentText("Invalid OTP");
            }
            navigate("/verify-email");
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
                my={10}
            >
                <Center>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: "2xl", md: "3xl" }}
                    >
                        Verify your Email
                    </Heading>
                </Center>
                <Center
                    fontSize={{ base: "sm", sm: "md" }}
                    color={useColorModeValue("gray.800", "gray.400")}
                >
                    A verification code has been sent to your email.
                </Center>
                <Center color={useColorModeValue("gray.800", "gray.400")}>
                    Enter your OTP below
                </Center>
                <Center
                    fontSize={{ base: "sm", sm: "md" }}
                    fontWeight="bold"
                    color={useColorModeValue("gray.800", "gray.400")}
                >
                    {user.userDetails.email}
                </Center>
                <FormikProvider value={formik}>
                    <Form>
                        <Field name="pin">
                            {({ field, form }) => (
                                <FormControl>
                                    <Center>
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
                                    </Center>
                                </FormControl>
                            )}
                        </Field>
                        <Stack spacing={6}>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                type="submit"
                            >
                                Verify
                            </Button>
                        </Stack>
                    </Form>
                </FormikProvider>
                {emailSentText && <Text align={"center"}>{emailSentText}</Text>}
                {hasError && <Text align={"center"}>{hasError}</Text>}
            </Stack>
        </Flex>
    );
}
