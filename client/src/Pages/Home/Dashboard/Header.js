import { SimpleGrid } from "@chakra-ui/react";
import { FiMail, FiSend, FiUsers } from "react-icons/fi";
import { Stat } from "./Stat";
const stats = [
    {
        icon: FiUsers,
        label: "Total Members",
        value: "100",
        delta: {
            value: "320",
            isUpwardsTrend: true,
        },
    },
    {
        icon: FiMail,
        label: "Avg. Salary",
        value: "56.87%",
        delta: {
            value: "2.3%",
            isUpwardsTrend: true,
        },
    },
    {
        icon: FiSend,
        label: "Payrolls Processed",
        value: "12.87%",
        delta: {
            value: "0.1%",
            isUpwardsTrend: false,
        },
    },
];
const empStats = [
    {
        icon: FiMail,
        label: "Emails Sent",
        value: "56.87%",
        delta: {
            value: "2.3%",
            isUpwardsTrend: true,
        },
    },
    {
        icon: FiMail,
        label: "Tasks in Progress",
        value: "56.87%",
        delta: {
            value: "2.3%",
            isUpwardsTrend: true,
        },
    },
    {
        icon: FiSend,
        label: "Payrolls Processed",
        value: "12",
        delta: {
            value: "0.1%",
            isUpwardsTrend: false,
        },
    },
];
export const Header = () => (
    <SimpleGrid
        columns={{
            base: 1,
            md: 3,
        }}
        gap={{
            base: "5",
            md: "6",
        }}
    >
        {stats.map((stat, id) => (
            <Stat key={id} {...stat} />
        ))}
    </SimpleGrid>
);
export const HeaderEmp = () => (
    <SimpleGrid
        columns={{
            base: 1,
            md: 3,
        }}
        gap={{
            base: "5",
            md: "6",
        }}
    >
        {empStats.map((stat, id) => (
            <Stat key={id} {...stat} />
        ))}
    </SimpleGrid>
);
