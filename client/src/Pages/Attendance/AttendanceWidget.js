import {
    Button,
    Container,
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
import Sidebar from "../../components/Sidebar";
import { AttendanceTable } from "./AttendanceTable.js";
function AttendanceWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData(user.userDetails.data._id);
    }, []);
    const fetchUserData = async (id) => {
        try {
            let user = await api.getUserById(id);
            setData(user.data.data);
        } catch (error) {
        } finally {
        }
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    let initialValues = {
        requestedLeaves: "",
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
        try {
            const updateData = await api.addUserAttendanceDetailsById(
                userData._id,
                values
            );
            onClose();
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
            <Sidebar user={user.userDetails.data}></Sidebar>
            <Container
                py={{
                    base: "4",
                    md: "8",
                }}
                px={{
                    base: "0",
                    md: 8,
                }}
                maxW="100%"
            >
                <Stack spacing="3">
                    <Flex direction="row" py="4" justifyContent="space-between">
                        <Heading size="xs">
                            Your Leave/Attendance Information
                        </Heading>
                        <Button onClick={onOpen} variant="primary">
                            Raise Request
                        </Button>
                    </Flex>
                    {userData && (
                        <AttendanceTable
                            user={userData}
                            members={userData.attendanceDetails}
                        />
                    )}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Raise Leave Request</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack divider={<StackDivider />}>
                                    <FormikProvider value={formik}>
                                        <Form>
                                            <Field
                                                name="requestedLeaves"
                                                key="firstName"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="requestedLeaves">
                                                        <FormLabel>
                                                            Number of days
                                                            requested
                                                        </FormLabel>
                                                        <Input {...field} />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field
                                                name="leaveReason"
                                                key="leaveReason"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="leaveReason">
                                                        <FormLabel>
                                                            Reason
                                                        </FormLabel>
                                                        <Input {...field} />
                                                    </FormControl>
                                                )}
                                            </Field>
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
            </Container>
        </Flex>
    );
}

export default AttendanceWidget;
