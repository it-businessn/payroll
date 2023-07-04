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
import { Logo, NavButton, UserProfile } from "../../components";
import { MENU_LIST, USER_ROLE } from "../../constants/constant";
import "./Sidebar.css";

const Sidebar = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const toggle = () => setIsOpen(!isOpen);
    const getSideMenu = (role) =>
        role === USER_ROLE.EMPLOYEE
            ? MENU_LIST.filter((item) => item.name !== "Users")
            : MENU_LIST;

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
                        {getSideMenu(user?.role).map((item, index) => (
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
                                    navigate("/sign-in");
                                }}
                                icon={FiLogOut}
                            />
                        </Stack>
                        <UserProfile user={user} />
                    </Stack>
                </Stack>
            </Flex>
            <main>{children}</main>
        </Flex>
    );
};

export default Sidebar;
