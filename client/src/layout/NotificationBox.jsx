import { Flex, Stack, Text } from "@chakra-ui/react";
import { Calendar } from "primereact/calendar";
import { Messages } from "primereact/messages";
import React, { useRef, useState } from "react";
import { Card } from "../components";
import "./Sidebar/Sidebar.css";

import { useMountEffect } from "primereact/hooks";
import { notifications } from "../constants/constant";
const NotificationBox = (props) => {
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
    const msgs = useRef(null);

    useMountEffect(() => {
        msgs.current.show(notifications);
    });
    const [date, setDate] = useState(null);

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong
                    style={{
                        textDecoration: "line-through",
                        color: "brand.500",
                    }}
                >
                    {date.day}
                </strong>
            );
        }

        return date.day;
    };
    return (
        <Flex width="25%" flexDir="column">
            <Card pb={3} mb={5}>
                <Calendar
                    inline
                    selectionMode="range"
                    readOnlyInput
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    dateTemplate={dateTemplate}
                />
            </Card>
            <Card
                p={3}
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
                        <Messages ref={msgs} />
                    </Stack>
                ))}
            </Card>
        </Flex>
    );
};

export default NotificationBox;
