import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    SimpleGrid,
    Spacer,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../../api/index.js";
import Sidebar from "../../../components/Sidebar.js";
import { UserSchema, userCurrency } from "../../../config/userSchema.js";
import { UserProfile } from "../../Home/UserProfile.js";
export default function EditUser() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = user.userDetails.data;
    const navigate = useNavigate();
    const { id } = useParams();

    let initialValues = {
        firstName: userData.firstName,
        middleName: userData.middleName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        dateOfJoining: userData.dateOfJoining,
        phoneNumber: userData.phoneNumber,
        streetNumber: userData.address.streetNumber,
        city: userData.address.city,
        state: userData.address.state,
        postalCode: userData.address.postalCode,
        country: userData.address.country,
        annualSalary: userData.annualSalary,
    };

    const [userResponseData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formik = useFormik({
        initialValues,
        validationSchema: UserSchema,
        onSubmit: (formValues) => {
            try {
                handleSubmit(formValues);
            } catch (error) {
                console.log(error);
            }
        },
    });

    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserById(id, values);
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <Flex
            as="section"
            direction={{
                base: "column",
                lg: "row",
            }}
            height="100vh"
            bg="bg.canvas"
            overflowY="auto"
        >
            <Sidebar user={userData}></Sidebar>
            <Container py="8" flex="1" maxW="100%">
                <Stack
                    spacing={{
                        base: "8",
                        lg: "6",
                    }}
                >
                    <FormikProvider value={formik}>
                        <Form>
                            <Card>
                                <CardBody>
                                    <Flex>
                                        <Box p="4">
                                            <Heading
                                                size="xs"
                                                textTransform="uppercase"
                                            >
                                                <UserProfile
                                                    user={userData}
                                                    image="https://tinyurl.com/yhkm2ek8"
                                                />
                                            </Heading>
                                        </Box>
                                        <Spacer />
                                        <Box p="4">
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                color="#383ab6"
                                                onClick={() => navigate(-1)}
                                            >
                                                Cancel
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="submit"
                                                variant="solid"
                                                color="#383ab6"
                                            >
                                                Update
                                            </Button>
                                        </Box>
                                    </Flex>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Stack divider={<StackDivider />}>
                                        <Flex>
                                            <Box p="4">
                                                <Heading
                                                    size="xs"
                                                    textTransform="uppercase"
                                                >
                                                    Personal Information
                                                </Heading>
                                            </Box>

                                            <Spacer />
                                        </Flex>
                                        <Box>
                                            <SimpleGrid columns={3} spacing={8}>
                                                <Field
                                                    name="firstName"
                                                    key="firstName"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="firstName">
                                                            <FormLabel>
                                                                First Name
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData.firstName
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="middleName"
                                                    key="middleName"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="middleName">
                                                            <FormLabel>
                                                                Middle Name
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData.middleName
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="lastName"
                                                    key="lastName"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="lastName">
                                                            <FormLabel>
                                                                Last Name
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData.lastName
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="phoneNumber"
                                                    key="phoneNumber"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="phoneNumber">
                                                            <FormLabel>
                                                                Phone Number
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData.phoneNumber
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="annualSalary"
                                                    key="annualSalary"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="annualSalary">
                                                            <FormLabel>
                                                                Annual Salary
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={userCurrency(
                                                                    userData
                                                                        .bankDetails
                                                                        .currency
                                                                ).format(
                                                                    userData.annualSalary
                                                                )}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="role" key="role">
                                                    {({ field }) => (
                                                        <FormControl id="role">
                                                            <FormLabel>
                                                                Role
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData.role
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </SimpleGrid>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Stack divider={<StackDivider />}>
                                        <Flex>
                                            <Box p="4">
                                                <Heading
                                                    size="xs"
                                                    textTransform="uppercase"
                                                >
                                                    Address
                                                </Heading>
                                            </Box>

                                            <Spacer />
                                        </Flex>

                                        <Box>
                                            <SimpleGrid columns={3} spacing={8}>
                                                <Field
                                                    name="streetNumber"
                                                    key="streetNumber"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="streetNumber">
                                                            <FormLabel>
                                                                Street Number
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        .address
                                                                        .streetNumber
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="city" key="city">
                                                    {({ field }) => (
                                                        <FormControl id="city">
                                                            <FormLabel>
                                                                City
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        .address
                                                                        .city
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="state" key="state">
                                                    {({ field }) => (
                                                        <FormControl id="state">
                                                            <FormLabel>
                                                                State / Province
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        .address
                                                                        .state
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="postalCode"
                                                    key="postalCode"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="postalCode">
                                                            <FormLabel>
                                                                ZIP/ Postal Code
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        .address
                                                                        .postalCode
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="country"
                                                    key="country"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="country">
                                                            <FormLabel>
                                                                Country
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        .address
                                                                        .country
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </SimpleGrid>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Form>
                    </FormikProvider>
                </Stack>
            </Container>
        </Flex>
    );
}
