import React from "react";

import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
const LandingPageLayout = ({ headerTitle, content }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Container
            maxW="100%"
            py={{
                base: "4",
                md: "6",
            }}
            px={{
                base: "0",
                md: 6,
            }}
        >
            <Stack spacing="3">
                <Heading size="xs">
                    {headerTitle}
                    <IconButton
                        onClick={onOpen}
                        icon={<FiFilter fontSize="1.5rem" />}
                        variant="ghost"
                        aria-label="Edit member"
                    />
                </Heading>
                <Flex justifyContent="space-between">{content}</Flex>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Apply Filter </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select placeholder="Select type of data to filter">
                                <option>Payroll</option>
                                <option>Net Salary Paid</option>
                                <option>Gross Salary Paid</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>From Date</FormLabel>
                            <Input type="date" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>To Date</FormLabel>
                            <Input type="date" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        &nbsp;
                        <Button type="submit" variant="primary">
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default LandingPageLayout;
