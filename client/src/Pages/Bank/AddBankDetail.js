import {
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
import { UserProfile } from "../User/UserProfile.js";

function AddBankDetail() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = JSON.parse(localStorage.getItem("updatedData")).data;
    const { id } = useParams();
    let initialValues = {
        accountNumber: userData.bankDetails.accountNumber,
        branchTransitNumber: userData.bankDetails.branchTransitNumber,
        institutionNumber: userData.bankDetails.institutionNumber,
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
            localStorage.setItem(
                "updatedData",
                JSON.stringify(updateData.data)
            );
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
            bg="bg.canvas"
        >
            <Sidebar user={user.userDetails.data}></Sidebar>
            <Container
                maxW="100%"
                py={{
                    base: "4",
                    md: "8",
                }}
                px={{
                    base: "0",
                    md: 8,
                }}
            >
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
                                                Bank Information
                                            </Heading>

                                            <Spacer />
                                        </Flex>
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
                                                                    .bankDetails
                                                                    .accountNumber
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
                                                            Institution Number
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
