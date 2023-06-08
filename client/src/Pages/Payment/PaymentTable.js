import {
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
    ModalFooter,
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
import { FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import { UserSchema } from "../../config/userSchema";
import { userFormFields, userInitialValues } from "../Login/loginFormFields";
import PersonalInfoCard from "../UserList/EditUser/AddressCard";

export const PaymentTable = ({ members }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSubmit = async (values) => {
        try {
            // const updateData = await api.updateUserById(id, values);
            // navigate("/");
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
                                    {/* <Avatar
                                name={member.name}
                                src={member.avatarUrl}
                                boxSize="10"
                            /> */}
                                    <Box>
                                        <Text fontWeight="medium">
                                            {member.firstName}{" "}
                                            {member.middleName}{" "}
                                            {member.lastName}
                                        </Text>
                                        {/* <Text color="muted">{member.handle}</Text> */}
                                    </Box>
                                </HStack>
                            </Td>
                            <Td>
                                {" "}
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
                                {/* <Badge
                            size="sm"
                            colorScheme={
                                member.status === "active" ? "green" : "red"
                            }
                        >
                            {member.active}
                        </Badge> */}
                                <Text>{member.phoneNumber}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">{member.email}</Text>
                            </Td>
                            <Td>
                                <Text color="muted">{member.role}</Text>
                            </Td>
                            <Td>
                                {/* <HStack spacing="1">
                            <IconButton
                                icon={<FiTrash2 fontSize="1.25rem" />}
                                variant="ghost"
                                aria-label="Delete member"
                            /> 
                           
                        </HStack> */}
                                {/* <Link to={`/edit-user/${member._id}`}> */}
                                <IconButton
                                    onClick={onOpen}
                                    icon={<FiEdit2 fontSize="1.25rem" />}
                                    variant="ghost"
                                    aria-label="Edit member"
                                />
                                {/* </Link> */}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>{" "}
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack divider={<StackDivider />}>
                            {/* <Stack
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
                    <Box flexShrink={0}>
                        <Text fontSize="lg" fontWeight="medium">
                            Your Profile
                        </Text>
                        <Text color="muted" fontSize="sm">
                            Tell others who you are
                        </Text>
                    </Box>
                    {!userFormInitialValues ? (
                        "Loading"
                    ) : (
                        <ProfileCard
                            maxW={{
                                lg: "3xl",
                            }}
                        />
                    )}
                </Stack> */}
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
                                    initialValues={userInitialValues}
                                    formFields={userFormFields}
                                    maxW={{
                                        lg: "3xl",
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="#383ab6" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
