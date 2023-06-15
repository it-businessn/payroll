import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
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
            <Sidebar user={user.userDetails.data}>
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
                    {" "}
                    <Box
                        bg="#fff"
                        boxShadow={{
                            base: "none",
                            md: "sm",
                        }}
                        borderRadius={{
                            base: "none",
                            md: "lg",
                        }}
                    >
                        <Stack spacing="5">
                            <Box pt="5">
                                <Stack
                                    direction={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    justify="space-between"
                                >
                                    <Text fontSize="lg" fontWeight="medium">
                                        Your Leave/Attendance Information
                                    </Text>

                                    <Flex
                                        direction="row"
                                        justify="flex-end"
                                        py="4"
                                    >
                                        <Button
                                            onClick={onOpen}
                                            variant="solid"
                                            color="#383ab6"
                                        >
                                            Raise Request
                                        </Button>
                                    </Flex>
                                </Stack>
                            </Box>
                            <Box overflowX="auto">
                                {userData && (
                                    <AttendanceTable
                                        user={userData}
                                        members={userData.attendanceDetails}
                                    />
                                )}
                            </Box>{" "}
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        Raise Leave Request
                                    </ModalHeader>
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
                                                                    Number of
                                                                    days
                                                                    requested
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                />
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
                                                                <Input
                                                                    {...field}
                                                                />
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
                                                            color="#383ab6"
                                                            mr={3}
                                                            onClick={onClose}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button
                                                            type="submit"
                                                            variant="solid"
                                                            color="#383ab6"
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
                    </Box>
                </Container>
            </Sidebar>
        </Flex>
    );
}

export default AttendanceWidget;
