import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Icon,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { CheckIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useState } from "react";
import { FaBan } from "react-icons/fa";
import { IoArrowDown } from "react-icons/io5";
import * as api from "../../api/index.js";
import { USER_ROLE } from "../../constants/constant.js";
export const LeaveTable = ({ user, members }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [recordId, setRecordId] = useState(null);
    let initialValues = {
        leaveRequestDecisionComment: "",
        leaveApproved: "",
    };
    let records = [];
    if (user.role === USER_ROLE.EMPLOYEE) {
        records = members.filter((data) => data.raisedBy === user.email);
    } else {
        records = members.filter((data) => data.approverName === user.email);
    }
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
        values.leaveApproved = "Yes" ? true : false;
        try {
            const updateData = await api.updateLeaveRequestDetailsById(
                recordId,
                values
            );
            onClose();
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    const openApproveModal = (member) => {
        setRecordId(member._id);
        initialValues = {
            leaveRequestDecisionComment: "",
            leaveApproved: "",
        };
        onOpen();
    };
    return (
        <>
            <Table variant="simple">
                <Thead bg="#f0f2f4">
                    <Tr>
                        <Th>
                            <HStack spacing="3">
                                <HStack spacing="1">
                                    <Text>Requested By</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>Duration</Th>
                        <Th>Balance</Th>
                        <Th>Created On</Th>
                        <Th>Request Type</Th>
                        <Th>Leave Reason</Th>
                        <Th>Status</Th>
                        <Th> Comment</Th>
                        {user.role !== USER_ROLE.EMPLOYEE && <Th> Action</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {records.length &&
                        records.map((member) => (
                            <Tr key={member._id}>
                                <Td>
                                    <HStack spacing="3">
                                        <Box>
                                            <Text fontWeight="medium">
                                                {member.raisedBy}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Td>
                                <Td>{member.durationOfLeave}</Td>
                                <Td>{member.leaveBalance}</Td>
                                <Td>
                                    <Text>
                                        {moment(member.created).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="muted">
                                        {member.leaveType}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="muted">
                                        {member.leaveReason}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="muted">
                                        {member.leaveRequestStatus}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="muted">
                                        {member.leaveRequestDecisionComment}
                                    </Text>
                                </Td>
                                <Td>
                                    {user.role !== USER_ROLE.EMPLOYEE && (
                                        <HStack spacing="1">
                                            <IconButton
                                                onClick={() =>
                                                    openApproveModal(member)
                                                }
                                                icon={
                                                    <CheckIcon color="brand.500" />
                                                }
                                                variant="ghost"
                                                borderRadius="50%"
                                                size="xs"
                                                aria-label="Edit member"
                                            />
                                            <IconButton
                                                icon={
                                                    <FaBan
                                                        color="red"
                                                        fontSize=".5rem"
                                                    />
                                                }
                                                onClick={() =>
                                                    openApproveModal(member)
                                                }
                                                variant="ghost"
                                                borderRadius="50%"
                                                size="xs"
                                                aria-label="Edit member"
                                            />
                                        </HStack>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <Drawer isOpen={isOpen} onClose={onClose} size="lg">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader textAlign="center" spacing={3}>
                        <Heading size="sm">Approve Leave</Heading>
                        <Text fontSize="md" color="fg.muted">
                            View details of leave request
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <Table variant="simple" size="sm">
                            <Tbody>
                                <Tr>
                                    <Td>Employee Name</Td>
                                    <Td>Test user 1</Td>
                                    <Td>Requested On</Td>
                                    <Td>12 June 2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Duration of Leave(in days) </Td>
                                    <Td>8</Td>
                                    <Td>Duration period</Td>
                                    <Td>2023/06/28 - 2023/07/27</Td>
                                </Tr>
                                <Tr>
                                    <Td>Leave Reason</Td>
                                    <Td>24</Td>
                                    <Td>Leave Type</Td>
                                    <Td>24</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <FormikProvider value={formik}>
                            <Form>
                                <Table variant="simple">
                                    <Tbody>
                                        <Tr>
                                            <Td padding="2em 1em">
                                                <Field
                                                    name="leaveApproved"
                                                    key="leaveApproved"
                                                >
                                                    {({ field }) => (
                                                        <FormControl
                                                            id="leaveApproved"
                                                            display="flex"
                                                            justifyContent="flex-start"
                                                        >
                                                            <FormLabel>
                                                                Approve Request
                                                            </FormLabel>
                                                            <RadioGroup defaultValue="No">
                                                                <Stack
                                                                    spacing={5}
                                                                    direction="row"
                                                                >
                                                                    <Radio
                                                                        {...field}
                                                                        colorScheme="red"
                                                                        value="No"
                                                                    >
                                                                        No
                                                                    </Radio>
                                                                    <Radio
                                                                        {...field}
                                                                        colorScheme="green"
                                                                        value="Yes"
                                                                    >
                                                                        Yes
                                                                    </Radio>
                                                                </Stack>
                                                            </RadioGroup>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td padding="1em">
                                                <Field
                                                    name="leaveRequestDecisionComment"
                                                    key="leaveRequestDecisionComment"
                                                >
                                                    {({ field }) => (
                                                        <FormControl id="leaveRequestDecisionComment">
                                                            <FormLabel>
                                                                Comment
                                                            </FormLabel>
                                                            <Textarea
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>{" "}
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                                <Flex direction="row" justify="flex-end" py="4">
                                    <Button
                                        variant="outline"
                                        mr={3}
                                        onClick={onClose}
                                        // color="brand.200"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        // bg="brand.200"
                                        type="submit"
                                        variant="primary"
                                    >
                                        Submit
                                    </Button>
                                </Flex>
                            </Form>
                        </FormikProvider>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
