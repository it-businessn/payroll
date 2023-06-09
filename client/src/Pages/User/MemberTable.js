import {
    Avatar,
    Badge,
    Box,
    Button,
    HStack,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
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
import { UserSchema } from "../../config/userSchema";
import { userFormFields } from "../Login/loginFormFields";
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
            streetNumber: member.address.streetNumber,
            city: member.address.city,
            state: member.address.state,
            postalCode: member.address.postalCode,
            country: member.address.country,
        });
        onOpen();
    };
    const generateInvoice = async (member) => {
        try {
            let value = {
                annualSalary: member.annualSalary,
            };
            const updateData = await api.addUserPaymentDetailsById(
                member._id,
                value
            );
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
                                    <Text>Name</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>Status</Th>
                        <Th>Phone Number</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {members.map((member) => (
                        <Tr key={member._id}>
                            <Td>
                                <HStack spacing="3">
                                    {/* <Checkbox /> */}
                                    <Avatar
                                        name={member.name}
                                        src={member.avatarUrl}
                                        boxSize="10"
                                    />
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
                                <Badge
                                    size="sm"
                                    colorScheme={
                                        member.active ? "green" : "red"
                                    }
                                >
                                    {member.activeStatus}
                                </Badge>
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
                                <HStack spacing="3">
                                    <IconButton
                                        onClick={() => openModal(member)}
                                        icon={<FiEdit2 fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label="Edit member"
                                    />
                                    <Button
                                        onClick={() => generateInvoice(member)}
                                        variant="solid"
                                        color="#383ab6"
                                    >
                                        Generate Invoice
                                    </Button>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {record && (
                <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Record</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack divider={<StackDivider />}>
                                <Stack
                                    direction={{
                                        base: "column",
                                        lg: "row",
                                    }}
                                    spacing={{
                                        base: "5",
                                        lg: "8",
                                    }}
                                    justify="space-between"
                                >
                                    <PersonalInfoCard
                                        formSubmit={handleSubmit}
                                        schema={UserSchema}
                                        initialValues={userFormInitialValues}
                                        formFields={userFormFields}
                                        maxW={{
                                            lg: "3xl",
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
