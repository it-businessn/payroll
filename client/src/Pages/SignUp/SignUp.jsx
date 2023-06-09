import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Country } from "country-state-city";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import { FormikForm, Logo } from "../../components";
import { UserSchema } from "../../config/userSchema.js";
import {
    signUpFormFields,
    signUpInitialValues,
} from "../../constants/constant.js";

const SignUp = () => {
    const navigate = useNavigate();
    const [hasError, setError] = useState("");
    const [countryList, setCountryList] = useState("");
    useEffect(() => {
        fetchCountry();
    }, []);
    const fetchCountry = async () => {
        try {
            let result = await Country.getAllCountries();
            setCountryList(result);
        } catch (error) {}
    };
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
        <Container
            py={{
                base: "3",
            }}
            maxW="3xl"
        >
            <Box>
                <Stack spacing="8">
                    <Stack align="center">
                        <Logo />
                        <Stack spacing="3" textAlign="center">
                            <Heading
                                size={{
                                    base: "xs",
                                    md: "sm",
                                }}
                            >
                                Create an account
                            </Heading>
                        </Stack>
                    </Stack>
                    {countryList && (
                        <FormikForm
                            id="sign-up"
                            formSubmit={handleSubmit}
                            schema={UserSchema}
                            initialValues={signUpInitialValues}
                            formFields={signUpFormFields}
                            countryList={countryList}
                        />
                    )}
                    <HStack justify="center" spacing="1">
                        <Text textStyle="sm" color="fg.muted">
                            Already have an account?
                        </Text>
                        <Link to="/sign-in">
                            <Button variant="text" size="sm">
                                Log in
                            </Button>
                        </Link>
                    </HStack>
                    {hasError && <Text color="red">{hasError}</Text>}
                </Stack>
            </Box>
        </Container>
    );
};
export default SignUp;
