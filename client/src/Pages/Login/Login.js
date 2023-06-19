import {
    Avatar,
    AvatarGroup,
    Box,
    Center,
    DarkMode,
    Flex,
    HStack,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
    useBreakpointValue,
} from "@chakra-ui/react";
import Logo from "../Home/Logo";
import { SignInForm } from "./SignInForm";
export const Login = () => (
    <Flex
        minH={{
            base: "auto",
            md: "100vh",
        }}
        bgGradient={{
            md: mode(
                "linear(to-r, purple.600 50%, white 50%)",
                "linear(to-r, purple.600 50%, gray.900 50%)"
            ),
        }}
    >
        <Flex maxW="8xl" mx="auto" width="full">
            <Box
                flex="1"
                display={{
                    base: "none",
                    md: "block",
                }}
            >
                <DarkMode>
                    <Flex
                        direction="column"
                        px={{
                            base: "4",
                            md: "8",
                        }}
                        height="full"
                        color="fg.accent.default"
                    >
                        <Flex align="center" h="24">
                            <Logo />
                        </Flex>
                        <Flex flex="1" align="center">
                            <Stack spacing="8">
                                <Stack spacing="6">
                                    <Heading
                                        size={{
                                            md: "lg",
                                            xl: "xl",
                                        }}
                                    >
                                        Simplify your payroll process
                                    </Heading>
                                    <Text
                                        textStyle="lg"
                                        maxW="md"
                                        fontWeight="medium"
                                    >
                                        Create/Login an account and discover the
                                        best Payroll accounting software.
                                    </Text>
                                </Stack>
                                <HStack spacing="4">
                                    <AvatarGroup
                                        size="md"
                                        max={useBreakpointValue({
                                            base: 2,
                                            lg: 5,
                                        })}
                                        borderColor="fg.accent.default"
                                    >
                                        <Avatar
                                            name="Ryan Florence"
                                            src="https://bit.ly/ryan-florence"
                                        />
                                        <Avatar
                                            name="Segun Adebayo"
                                            src="https://bit.ly/sage-adebayo"
                                        />
                                        <Avatar
                                            name="Kent Dodds"
                                            src="https://bit.ly/kent-c-dodds"
                                        />
                                        <Avatar
                                            name="Prosper Otemuyiwa"
                                            src="https://bit.ly/prosper-baba"
                                        />
                                        <Avatar
                                            name="Christian Nwamba"
                                            src="https://bit.ly/code-beast"
                                        />
                                    </AvatarGroup>
                                    <Text fontWeight="medium">
                                        Join 10.000+ users
                                    </Text>
                                </HStack>
                            </Stack>
                        </Flex>
                        <Flex align="center" h="24">
                            <Text color="fg.accent.subtle" textStyle="sm">
                                © 2023 BusinessN. All rights reserved.
                            </Text>
                        </Flex>
                    </Flex>
                </DarkMode>
            </Box>
            <Center flex="1">
                <SignInForm
                    px={{
                        base: "4",
                        md: "8",
                    }}
                    py={{
                        base: "12",
                        md: "48",
                    }}
                    width="full"
                    maxW="md"
                />
            </Center>
        </Flex>
    </Flex>
);
