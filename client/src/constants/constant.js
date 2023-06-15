import { FiCalendar, FiDollarSign, FiHome, FiUsers } from "react-icons/fi";
export const ADMIN_MENULIST = [
    {
        path: "/",
        name: "Home",
        icon: FiHome,
    },
    {
        path: "/users",
        name: "Users",
        icon: FiUsers,
    },
    {
        path: "/bank-detail",
        name: "Bank",
        icon: FiDollarSign,
    },
    {
        path: "/invoice-detail",
        name: "Payroll",
        icon: FiDollarSign,
    },
    {
        path: "/leave-detail",
        name: "Attendance ",
        icon: FiCalendar,
    },
];
export const EMPLOYEE_MENULIST = [
    {
        path: "/",
        name: "Home",
        icon: FiHome,
    },
    {
        path: "/profile",
        name: "Profile",
        icon: FiUsers,
    },
    {
        path: "/bank-detail",
        name: "Bank",
        icon: FiDollarSign,
    },
    {
        path: "/invoice-detail",
        name: "Payroll",
        icon: FiDollarSign,
    },
    {
        path: "/leave-detail",
        name: "Attendance ",
        icon: FiCalendar,
    },
];

export const USER_ROLE = {
    EMPLOYEE: "Employee",
    MANAGER: "Super Manager",
    ADMIN: "Administrator",
};
