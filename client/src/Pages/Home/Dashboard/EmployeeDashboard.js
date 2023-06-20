import React from "react";

import {
    Button,
    ButtonGroup,
    Center,
    CloseButton,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { HeaderEmp } from "./Header";
function EmployeeDashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Container py="8" flex="1" maxW="100%">
            <Stack>
                <Flex justifyContent="space-between">
                    <Heading size="xs">Welcome back!</Heading>
                    <Flex>
                        <Center
                            display={{
                                base: "none",
                                sm: "flex",
                            }}
                            bg="bg.accent.default"
                            px="5"
                        >
                            <Icon
                                as={FiInfo}
                                boxSize="10"
                                color="fg.accent.default"
                            />
                        </Center>
                        <Stack direction="row" p="4" spacing="3" flex="1">
                            <Stack spacing="2.5" flex="1">
                                <Stack spacing="1">
                                    <Text textStyle="sm" fontWeight="medium">
                                        Your Notification
                                    </Text>
                                    <Text textStyle="sm" color="fg.muted">
                                        You have new messages.
                                    </Text>
                                </Stack>
                                <ButtonGroup
                                    variant="text"
                                    size="sm"
                                    spacing="3"
                                >
                                    <Button colorScheme="gray">Skip</Button>
                                    <Button>View</Button>
                                </ButtonGroup>
                            </Stack>
                            <CloseButton transform="translateY(-6px)" />
                        </Stack>
                    </Flex>
                </Flex>
                <HeaderEmp />
            </Stack>
        </Container>
    );
}

export default EmployeeDashboard;
