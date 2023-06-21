import {
    Avatar,
    Box,
    HStack,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import * as api from "../../api/index.js";
import { UserSchema, userCurrency } from "../../config/userSchema";
import { userFormFields } from "../../constants/constant.js";
import PersonalInfoCard from "./EditUser/PersonalInfoCard";
export const MemberTable = ({ members }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setMembers] = useState(members);
    const [record, setRecord] = useState(null);
    const [userFormInitialValues, setUserFormInitialValues] = useState(null);
    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserById(record._id, values);
            onClose();
            setMembers(members);
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    const openModal = (member) => {
        setRecord(member);
        setUserFormInitialValues({
            firstName: member.firstName,
            middleName: member.middleName,
            lastName: member.lastName,
            email: member.email,
            password: member.password,
            role: member.role,
            annualSalary: member.annualSalary,
            dateOfJoining: member.dateOfJoining,
            phoneNumber: member.phoneNumber,
            streetNumber: member.streetNumber,
            city: member.city,
            state: member.state,
            postalCode: member.postalCode,
            country: member.country,
        });
        onOpen();
    };
    return (
        <>
            <Table variant="simple" size="sm">
                <Thead bg="#f0f2f4">
                    <Tr>
                        <Th>
                            <HStack spacing="3">
                                {/* <Checkbox /> */}
                                <HStack spacing="1">
                                    <Text>Name</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>Phone Number</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Annual Salary</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {members.map((member) => (
                        <Tr key={member._id}>
                            <Td>
                                <HStack spacing="3">
                                    <Avatar name={member.name} src="" />
                                    <Box>
                                        <Text textTransform="capitalize">
                                            {member.firstName}
                                            {member.middleName}
                                            {member.lastName}
                                        </Text>
                                    </Box>
                                </HStack>
                            </Td>
                            <Td>
                                <Text>{member.phoneNumber}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">{member.email}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">{member.role}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">
                                    {userCurrency(member.currency).format(
                                        member.annualSalary
                                    )}
                                </Text>
                            </Td>

                            <Td>
                                <HStack spacing="3">
                                    <IconButton
                                        onClick={() => openModal(member)}
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
            {record && (
                <Modal size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Records</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <PersonalInfoCard
                                formSubmit={handleSubmit}
                                schema={UserSchema}
                                initialValues={userFormInitialValues}
                                formFields={userFormFields}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
