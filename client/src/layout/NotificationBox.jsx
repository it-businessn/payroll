import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Card } from "../components/Card";

const NotificationBox = (props) => {
    const [dateState, setDateState] = useState(new Date());
    const changeDate = (e) => {
        setDateState(e);
    };
    const members = [
        {
            id: "1",
            name: "Christian Nwamba",
            handle: "@christian",
            avatarUrl: "https://bit.ly/code-beast",
            status: "active",
            message: "Some message",
            lastSeen: "just now",
        },
        {
            id: "2",
            name: "Kent C. Dodds",
            handle: "@kent",
            avatarUrl: "https://bit.ly/kent-c-dodds",
            status: "active",
            message: "Some message",
            lastSeen: "2hr ago",
        },
        {
            id: "3",
            name: "Prosper Otemuyiwa",
            handle: "@prosper",
            avatarUrl: "https://bit.ly/prosper-baba",
            status: "active",
            message: "Some message",
            lastSeen: "3hr ago",
        },
        {
            id: "4",
            name: "Ryan Florence",
            handle: "@ryan",
            avatarUrl: "https://bit.ly/ryan-florence",
            status: "active",
            message: "Some message",
            lastSeen: "4hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
    ];
    return (
        <Flex width="25%" flexDir="column">
            <Card pb={3} mb={5}>
                <Calendar value={dateState} onChange={changeDate} />
            </Card>
            <Card
                p={5}
                style={{ height: props.height && "23em", overflowY: "auto" }}
            >
                <Text textAlign="center" fontWeight="medium">
                    Notifications
                </Text>
                {members.map((member, index) => (
                    <Stack
                        key={index}
                        justify="space-between"
                        fontSize="sm"
                        align="baseline"
                        flexDir="row"
                    >
                        <HStack>
                            <Text color="muted">
                                Check payment page Check payment page Check
                                payment page
                            </Text>
                        </HStack>
                        <IconButton
                            // onClick={() =>
                            //     navigate(
                            //         `/add-bank-detail/${userData._id}`
                            //     )
                            // }
                            minW="auto"
                            icon={<SmallCloseIcon minW="auto" />}
                            variant="ghost"
                        />
                    </Stack>
                ))}
            </Card>
        </Flex>
    );
};

export default NotificationBox;
