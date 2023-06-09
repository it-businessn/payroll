import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
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
import { Field, Form, FormikProvider, useFormik } from "formik";
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
            {members.length ? (
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
                                    <Text color="muted">
                                        {member.usedLeaves}
                                    </Text>
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
                                            icon={
                                                <FiEdit2 fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Edit member"
                                        />
                                        <Button
                                            onClick={onOpen}
                                            variant="solid"
                                            color="#383ab6"
                                        >
                                            Raise Request
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Button onClick={onOpen} variant="solid" color="#383ab6">
                    Raise Request
                </Button>
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
                                                    Number of days requested
                                                </FormLabel>
                                                <Input {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="leaveReason" key="leaveReason">
                                        {({ field }) => (
                                            <FormControl id="leaveReason">
                                                <FormLabel>Reason</FormLabel>
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
        </>
    );
};
