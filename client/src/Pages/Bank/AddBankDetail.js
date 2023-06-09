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
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.js";
import { UserProfile } from "../Home/UserProfile.js";

function AddBankDetail() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = user.userDetails.data;
    const { id } = useParams();
    let initialValues = {
        accountNumber: "",
        branchTransitNumber: "",
        institutionNumber: "",
        dateOfJoining: userData.dateOfJoining,
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (formValues) => {
            try {
                handleSubmit(formValues);
            } catch (error) {
                console.log(error);
            }
        },
    });
    const handleSubmit = async (values) => {
        values.country = userData.address.country;
        try {
            const updateData = await api.updateUserBankDetailsById(id, values);
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
                                                    Bank Information
                                                </Heading>
                                            </Box>

                                            <Spacer />
                                        </Flex>
                                        <Box>
                                            <SimpleGrid columns={3} spacing={8}>
                                                <Field
                                                    name="accountNumber"
                                                    key="accountNumber"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="accountNumber">
                                                            <FormLabel>
                                                                Account Number
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        ?.bankDetails
                                                                        ?.accountNumber
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="branchTransitNumber"
                                                    key="branchTransitNumber"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="branchTransitNumber">
                                                            <FormLabel>
                                                                Branch Transit
                                                                Number
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        ?.bankDetails
                                                                        ?.branchTransitNumber
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field
                                                    name="institutionNumber"
                                                    key="institutionNumber"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="institutionNumber">
                                                            <FormLabel>
                                                                Institution
                                                                Number
                                                            </FormLabel>
                                                            <Input
                                                                defaultValue={
                                                                    userData
                                                                        ?.bankDetails
                                                                        ?.institutionNumber
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

export default AddBankDetail;
