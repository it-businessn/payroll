import {
    Button,
    Card,
    CardBody,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    SimpleGrid,
    Spacer,
    Stack,
    StackDivider,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.jsx";
import { ROUTE_PATH, TOAST } from "../../constants/constant.jsx";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { UserProfile } from "../User/UserProfile.jsx";

function AddBankDetail() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = user?.userDetails?.data;
    const navigate = useNavigate();
    const { id } = useParams();
    let initialValues = {
        accountNumber: userData?.bankDetails?.accountNumber,
        branchTransitNumber: userData?.bankDetails?.branchTransitNumber,
        institutionNumber: userData?.bankDetails?.institutionNumber,
        dateOfJoining: userData?.dateOfJoining,
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
    const toast = useToast();
    const handleSubmit = async (values) => {
        values.country = userData.address.country;
        try {
            const updateData = await api.updateUserBankDetailsById(id, values);
            toast(TOAST.SUCCESS);
            navigate(ROUTE_PATH.BANK);
        } catch (error) {
            toast(TOAST.ERROR);
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            <Sidebar user={user?.userDetails.data}></Sidebar>
            <ProfileContainer>
                {userData && (
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
                                            <Button
                                                type="submit"
                                                variant="primary"
                                            >
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
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Stack>
                        </Form>
                    </FormikProvider>
                )}
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default AddBankDetail;
