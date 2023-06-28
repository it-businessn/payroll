import {
    Button,
    HStack,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import moment from "moment";
import { useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import * as api from "../../api/index.js";
import { USER_ROLE } from "../../constants/constant.jsx";
export const AttendanceTable = ({ user, members }) => {
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
                                    <Text>Date</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>Time In</Th>
                        <Th>Time out</Th>
                        <Th>Total Hours</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {records.length ? (
                        <>
                            {records.map((member) => (
                                <Tr key={member._id}>
                                    <Td>
                                        <Text fontWeight="medium">
                                            {moment(member.created).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text>
                                            {moment(member.created).format(
                                                "h:mm A"
                                            )}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text color="muted">
                                            {moment(member.created).format(
                                                "h:mm A"
                                            )}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text color="muted">5.6</Text>
                                    </Td>
                                    <Td>
                                        <Button onClick={onOpen} variant="link">
                                            Edit Log
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </>
                    ) : (
                        <Tr>
                            <Td>No record to show</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    );
};
