import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import { DashboardLayout, ProfileContainer, Sidebar } from "../../layout";
import AttendanceTable from "./AttendanceTable.jsx";
function AttendanceWidget() {
    const user = JSON.parse(localStorage.getItem("profile"))?.userDetails?.data;
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            let result = await api.getAttendanceDetails();
            let filteredResult = result.data.data.filter(
                (item) => item.email === user.email
            );
            setData(filteredResult);
        } catch (error) {}
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    let initialValues = { inTime: "", outTime: "" };
    const formik = useFormik({
        initialValues,
        onSubmit: (formValues) => {
            try {
                formValues.inTime = formValues.inTime.replace(":", ".");
                formValues.outTime = formValues.outTime.replace(":", ".");
                let diff =
                    Number(formValues.inTime) - Number(formValues.outTime);
                formValues.totalHours = Math.abs(diff).toFixed(2);
                handleSubmit(formValues);
            } catch (error) {
                console.log(error);
            }
        },
    });

    const handleSubmit = async (values) => {
        values.email = user.email;
        try {
            const updateData = await api.addUserAttendanceDetailsById(
                user._id,
                values
            );
            fetchUserData();
            onClose();
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    const handleFormSubmit = async (values, record) => {
        console.log(values, record);
        try {
            const updateData = await api.updateAttendanceDetailsById(
                record._id,
                values
            );
            fetchUserData();
            onClose();
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user}></Sidebar>}
            <ProfileContainer>
                <Stack spacing="3">
                    <Flex justifyContent="space-between">
                        <Heading size="xs">
                            Attendance Timesheet Details
                        </Heading>
                        <Button onClick={onOpen} variant="primary">
                            Raise New Log
                        </Button>
                    </Flex>
                    {userData && (
                        <AttendanceTable
                            handleFormSubmit={handleFormSubmit}
                            user={user}
                            members={userData}
                        />
                    )}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader> New Attendance Log </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack divider={<StackDivider />}>
                                    <FormikProvider value={formik}>
                                        <Form>
                                            <Field name="inTime" key="inTime">
                                                {({ field }) => (
                                                    <FormControl id="inTime">
                                                        <FormLabel>
                                                            Time-in
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            type="time"
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="outTime" key="outTime">
                                                {({ field }) => (
                                                    <FormControl id="outTime">
                                                        <FormLabel>
                                                            Time-out
                                                        </FormLabel>
                                                        <Input
                                                            type="time"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Flex
                                                direction="row"
                                                justify="flex-end"
                                                py="4"
                                            >
                                                <Button
                                                    variant="outline"
                                                    mr={3}
                                                    onClick={onClose}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                >
                                                    Submit
                                                </Button>
                                            </Flex>
                                        </Form>
                                    </FormikProvider>
                                </Stack>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default AttendanceWidget;
