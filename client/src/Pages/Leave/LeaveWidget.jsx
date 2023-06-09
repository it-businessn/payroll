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
    Select,
    Stack,
    StackDivider,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import { LEAVE_TYPES, TOAST } from "../../constants/constant.js";
import { DashboardLayout, ProfileContainer, Sidebar } from "../../layout";
import LeaveTable from "./LeaveTable.jsx";
function LeaveWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            let result = await api.getLeaveRequest();
            setData(result.data.data);
        } catch (error) {}
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

    const toast = useToast();
    const handleSubmit = async (values) => {
        values.raisedBy = user?.userDetails.data.email;
        values.durationOfLeave =
            moment(values.leaveEndDate).diff(
                moment(values.leaveStartDate),
                "days"
            ) + 1;
        try {
            const updateData = await api.raiseLeaveRequest(
                user?.userDetails.data._id,
                values
            );
            fetchUserData();
            toast(TOAST.SUCCESS);
            onClose();
        } catch (error) {
            toast(TOAST.ERROR);
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails.data} />}
            <ProfileContainer>
                <Stack spacing="3">
                    <Flex justifyContent="space-between">
                        <Heading size="xs">Leave Requests</Heading>
                        <Button onClick={onOpen} variant="primary">
                            Raise New Request
                        </Button>
                    </Flex>
                    {userData && (
                        <LeaveTable
                            user={user?.userDetails.data}
                            members={userData}
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
                                                name="approverName"
                                                key="approverName"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="approverName">
                                                        <FormLabel>
                                                            Leave Approver Name
                                                        </FormLabel>
                                                        <Input {...field} />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field
                                                name="leaveStartDate"
                                                key="leaveStartDate"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="leaveStartDate">
                                                        <FormLabel>
                                                            From
                                                        </FormLabel>
                                                        <Input
                                                            {...field}
                                                            type="date"
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
                                                            To
                                                        </FormLabel>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field
                                                name="leaveType"
                                                key="leaveType"
                                            >
                                                {({ field }) => (
                                                    <FormControl id="leaveType">
                                                        <FormLabel>
                                                            Leave Type
                                                        </FormLabel>
                                                        <Select
                                                            placeholder="Select leave type"
                                                            {...field}
                                                        >
                                                            {LEAVE_TYPES.map(
                                                                (item) => (
                                                                    <option
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
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

export default LeaveWidget;
