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
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { AttendanceTable } from "./AttendanceTable.jsx";
function AttendanceWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setData] = useState(null);
    useEffect(() => {
        // fetchUserData(user?.userDetails.data._id);
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            let result = await api.getLeaveRequest();
            setData(result.data.data);
        } catch (error) {
        } finally {
        }
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    let initialValues = {
        leaveReason: "",
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
        values.raisedBy = user.email;
        values.durationOfLeave =
            moment(values.leaveEndDate).diff(
                moment(values.leaveStartDate),
                "days"
            ) + 1;
        try {
            const updateData = await api.raiseLeaveRequest(user._id, values);
            onClose();
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails.data}></Sidebar>}
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
                            user={user?.userDetails.data}
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
                                            <Field
                                                name="leaveStartDate"
                                                key="leaveStartDate"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="leaveStartDate">
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
                                            <Field
                                                name="leaveEndDate"
                                                key="leaveEndDate"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="leaveEndDate">
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
