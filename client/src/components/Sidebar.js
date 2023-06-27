import { Icon } from "@chakra-ui/icons";
import {
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Pages/Home/Logo";
import { NavButton } from "../Pages/Home/NavButton";
import { UserProfile } from "../Pages/User/UserProfile";
import {
    ADMIN_MENULIST,
    EMPLOYEE_MENULIST,
    USER_ROLE,
} from "../constants/constant";
import "./Sidebar.css";
const getSideMenu = (role) =>
    role === USER_ROLE.EMPLOYEE ? EMPLOYEE_MENULIST : ADMIN_MENULIST;

const Sidebar = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = getSideMenu(user.role);
    return (
        <Flex as="section" minH="100vh" bg="bg.canvas">
            <Flex
                flex="1"
                bg="bg.surface"
                boxShadow="md"
                maxW={{
                    base: "full",
                    sm: "xs",
                }}
                py={{
                    base: "6",
                    sm: "8",
                }}
                px={{
                    base: "4",
                    sm: "6",
                }}
            >
                <Stack justify="space-between" spacing="1" width="full">
                    <Stack shouldWrapChildren>
                        <Logo />
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FiSearch} color="muted" boxSize="5" />
                            </InputLeftElement>
                            <Input placeholder="Search" />
                        </InputGroup>
                        {menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index}>
                                <Stack>
                                    <NavButton
                                        color="primary"
                                        label={item.name}
                                        icon={item.icon}
                                    />
                                </Stack>
                            </NavLink>
                        ))}
                    </Stack>
                    <Divider />
                    <Stack
                        spacing={{
                            base: "5",
                            sm: "6",
                        }}
                    >
                        <Stack spacing="1">
                            <NavButton
                                color="primary"
                                label="Logout"
                                onClick={() => {
                                    localStorage.removeItem("profile");
                                    navigate("/");
                                }}
                                icon={FiLogOut}
                            />
                        </Stack>
                        {/* <Box bg="bg.subtle" px="4" py="5" borderRadius="lg">
                           <Stack spacing="4">
                                <Stack spacing="1">
                                    <Text fontSize="sm" fontWeight="medium">
                                        Almost there
                                    </Text>
                                    <Text fontSize="sm" color="fg.muted">
                                        Fill in some more information about you
                                        and your person.
                                    </Text>
                                </Stack>
                                <Progress
                                    colorScheme="brand"
                                    hasStripe
                                    value={80}
                                    size="sm"
                                    aria-label="Profile Update Progress"
                                />
                                <HStack spacing="3">
                                    <Button
                                        variant="text"
                                        size="sm"
                                        colorScheme="gray"
                                    >
                                        Dismiss
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        size="sm"
                                    >
                                        Update profile
                                    </Button>
                                </HStack>
                            </Stack> 
                        </Box> */}
                        <UserProfile
                            user={user}
                            image="https://tinyurl.com/yhkm2ek8"
                        />
                    </Stack>
                </Stack>
            </Flex>
            <main>{children}</main>
        </Flex>
    );
};

export default Sidebar;
