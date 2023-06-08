import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
} from "@chakra-ui/react";

import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

function PersonalInfoCard({ initialValues, schema, formSubmit, formFields }) {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (formValues) => {
            try {
                formSubmit(formValues);
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <FormikProvider value={formik}>
            <Form>
                <Box bg="bg-surface" boxShadow="sm" borderRadius="lg">
                    <Stack
                        spacing="6"
                        px={{
                            base: "4",
                            md: "6",
                        }}
                        py={{
                            base: "5",
                            md: "6",
                        }}
                    >
                        <Stack
                            spacing="9"
                            direction={{
                                base: "column",
                                md: "row",
                            }}
                        >
                            <Field name="firstName" key="firstName">
                                {({ field, form }) => (
                                    <FormControl id="firstName">
                                        <FormLabel>First Name</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="middleName" key="middleName">
                                {({ field, form }) => (
                                    <FormControl id="middleName">
                                        <FormLabel>Middle Name</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="lastName" key="lastName">
                                {({ field, form }) => (
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Field name="phoneNumber" key="phoneNumber">
                            {({ field, form }) => (
                                <FormControl id="phoneNumber">
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input {...field} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="streetNumber" key="streetNumber">
                            {({ field, form }) => (
                                <FormControl id="streetNumber">
                                    <FormLabel>Street</FormLabel>
                                    <Input {...field} />
                                </FormControl>
                            )}
                        </Field>
                        <Stack
                            spacing="6"
                            direction={{
                                base: "column",
                                md: "row",
                            }}
                        >
                            <Field name="city" key="city">
                                {({ field, form }) => (
                                    <FormControl id="city">
                                        <FormLabel>City</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="state" key="state">
                                {({ field, form }) => (
                                    <FormControl id="state">
                                        <FormLabel>State / Province</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Stack
                            spacing="6"
                            direction={{
                                base: "column",
                                md: "row",
                            }}
                        >
                            <Field name="postalCode" key="postalCode">
                                {({ field, form }) => (
                                    <FormControl id="postalCode">
                                        <FormLabel>ZIP/ Postal Code</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="country" key="country">
                                {({ field, form }) => (
                                    <FormControl id="country">
                                        <FormLabel>Country</FormLabel>
                                        <Input {...field} />
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Flex
                        direction="row"
                        justify="flex-end"
                        py="4"
                        px={{
                            base: "4",
                            md: "6",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="outline"
                            color="#383ab6"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        &nbsp;
                        <Button type="submit" variant="solid" color="#383ab6">
                            Save
                        </Button>
                    </Flex>
                </Box>
            </Form>
        </FormikProvider>
    );
}

export default PersonalInfoCard;
