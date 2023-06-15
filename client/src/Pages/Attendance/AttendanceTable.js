import {
    Box,
    HStack,
    Icon,
    IconButton,
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
import { FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import * as api from "../../api/index.js";
export const AttendanceTable = ({ members }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userData = user.userDetails.data;
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
        <>
            <Table>
                <Thead bg="#f0f2f4">
                    <Tr>
                        <Th>
                            <HStack spacing="3">
                                {/* <Checkbox /> */}
                                <HStack spacing="1">
                                    <Text>leaveBalance</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>totalLeaves</Th>
                        <Th>requestedLeaves</Th>
                        <Th>usedLeaves</Th>
                        <Th>leaveApproved</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {members.map((member) => (
                        <Tr key={member._id}>
                            <Td>
                                <HStack spacing="3">
                                    <Box>
                                        <Text fontWeight="medium">
                                            {member.leaveBalance}
                                        </Text>
                                    </Box>
                                </HStack>
                            </Td>
                            <Td>{member.totalLeaves}</Td>
                            <Td>
                                <Text>{member.requestedLeaves}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">{member.usedLeaves}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">
                                    {member.leaveApproved}
                                </Text>
                            </Td>
                            <Td>
                                <HStack spacing="1">
                                    <IconButton
                                        // onClick={() => openModal(member)}
                                        icon={<FiEdit2 fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label="Edit member"
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};
