import { PhoneIcon } from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    StackDivider,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../../api/index.js";
import { UserProfile } from "../../../components";
import { UserSchema } from "../../../config/userSchema.js";
import { ROUTE_PATH, TOAST, USER_ROLE } from "../../../constants/constant.js";
import { DashboardLayout, ProfileContainer, Sidebar } from "../../../layout";
export default function EditUser() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = user?.userDetails?.data;
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

    const toast = useToast();
    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserById(id, values);
            toast(TOAST.SUCCESS);
            navigate(ROUTE_PATH.PROFILE);
        } catch (error) {
            toast(TOAST.ERROR);

            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {userData && <Sidebar user={userData} />}
            <ProfileContainer>
                <FormikProvider value={formik}>
                    <Form>
                        <Stack
                            spacing={{
                                base: "8",
                                lg: "6",
                            }}
                        >
                            <Card>
                                <CardBody>
                                    <Flex>
                                        <Stack
                                            spacing={{
                                                base: "5",
                                                sm: "6",
                                            }}
                                        >
                                            <UserProfile
                                                user={userData}
                                                image="https://tinyurl.com/yhkm2ek8"
                                            />
                                        </Stack>
                                        <Spacer />
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </Button>
                                        &nbsp;
                                        <Button type="submit" variant="primary">
                                            Update
                                        </Button>
                                    </Flex>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Stack divider={<StackDivider />}>
                                        <Flex>
                                            <Heading size="xs">
                                                Personal Information
                                            </Heading>

                                            <Spacer />
                                        </Flex>
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
                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents="none">
                                                                <PhoneIcon color="gray.300" />
                                                            </InputLeftElement>
                                                            <Input
                                                                type="tel"
                                                                placeholder="Phone number"
                                                                defaultValue={
                                                                    userData.phoneNumber
                                                                }
                                                                {...field}
                                                            />
                                                        </InputGroup>
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
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                color="gray.300"
                                                                fontSize="1.2em"
                                                                children="$"
                                                            />
                                                            <Input
                                                                defaultValue={
                                                                    userData.annualSalary
                                                                }
                                                                {...field}
                                                            />
                                                        </InputGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="role" key="role">
                                                {({ field }) => (
                                                    <FormControl id="role">
                                                        <FormLabel>
                                                            Role
                                                        </FormLabel>
                                                        <Select
                                                            placeholder={
                                                                userData.role
                                                            }
                                                            {...field}
                                                        >
                                                            {Object.values(
                                                                USER_ROLE
                                                            ).map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </SimpleGrid>
                                    </Stack>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Stack divider={<StackDivider />}>
                                        <Flex>
                                            <Heading size="xs">Address</Heading>

                                            <Spacer />
                                        </Flex>

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
                                                                userData.address
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
                                                                userData.address
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
                                                                userData.address
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
                                                                userData.address
                                                                    .postalCode
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="country" key="country">
                                                {({ field }) => (
                                                    <FormControl id="country">
                                                        <FormLabel>
                                                            Country
                                                        </FormLabel>
                                                        <Input
                                                            defaultValue={
                                                                userData.address
                                                                    .country
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </SimpleGrid>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Stack>
                    </Form>
                </FormikProvider>
            </ProfileContainer>
        </DashboardLayout>
    );
}
