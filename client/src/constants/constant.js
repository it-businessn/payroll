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
        path: "/payroll-detail",
        name: "Payroll",
        icon: FiDollarSign,
    },
    {
        path: "/leave-detail",
        name: "Leave ",
        icon: FiCalendar,
    },
    {
        path: "/attendance-detail",
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
        path: "/payroll-detail",
        name: "Payroll",
        icon: FiDollarSign,
    },
    {
        path: "/leave-detail",
        name: "Leave ",
        icon: FiCalendar,
    },
    {
        path: "/attendance-detail",
        name: "Attendance ",
        icon: FiCalendar,
    },
];

export const USER_ROLE = {
    EMPLOYEE: "Employee",
    MANAGER: "Super Manager",
    ADMIN: "Administrator",
};
export const loginInitialValues = {
    email: "",
    password: "",
};
export const LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
export const loginFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "email",
        label: "Email",
        name: "email",
        type: "email",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "password",
        label: "Password",
        name: "password",
        type: "password",
        variant: "solid",
        color: "primary",
    },
    {
        field: "link",
        id: "link",
        variant: "text",
        path: "/forgot-password",
        label: "Forgot password",
    },
    {
        field: "button",
        variant: "primary",
        id: "login",
        type: "submit",
        label: "Sign in",
        size: "sm",
    },
];
export const userInitialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    dateOfJoining: "",
    phoneNumber: "",
    streetNumber: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
};
export const userFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "firstName",
        isRequired: true,
        label: "First Name",
        size: "medium",
        name: "firstName",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "middleName",
        label: "Middle Name",
        size: "medium",
        name: "middleName",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        isRequired: true,
        id: "lastName",
        label: "Last Name",
        size: "medium",
        name: "lastName",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        isRequired: true,
        id: "email",
        label: "Email Address",
        size: "medium",
        name: "email",
        type: "email",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "password",
        label: "Password",
        size: "medium",
        isRequired: true,
        name: "password",
        type: "password",
        variant: "solid",
        color: "primary",
    },
    {
        field: "select",
        margin: "dense",
        fullWidth: true,
        id: "role",
        label: "Role",
        size: "medium",
        name: "role",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "date",
        margin: "dense",
        fullWidth: true,
        id: "dateOfJoining",
        label: "Date of Joining",
        size: "medium",
        name: "dateOfJoining",
        type: "date",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "phoneNumber",
        label: "Phone Number",
        size: "medium",
        name: "phoneNumber",
        type: "tel",
        variant: "solid",
        color: "primary",
    },
    {
        field: "country",
        margin: "dense",
        fullWidth: true,
        id: "country",
        label: "Country",
        size: "medium",
        name: "country",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "state",
        margin: "dense",
        fullWidth: true,
        id: "state",
        label: "State",
        size: "medium",
        name: "state",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "city",
        margin: "dense",
        fullWidth: true,
        id: "city",
        label: "City",
        size: "medium",
        name: "city",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "streetNumber",
        label: "Street Number",
        size: "medium",
        name: "streetNumber",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "postalCode",
        label: "Postal Code",
        size: "medium",
        name: "postalCode",
        type: "text",
        variant: "solid",
        color: "primary",
    },
    {
        field: "button",
        variant: "primary",
        id: "register",
        fullWidth: "100%",
        type: "submit",
        label: "Create account",
    },
];
export const userPaymentInitialValues = {
    annualSalary: "",
};
export const userPaymentFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "annualSalary",
        label: "Annual Salary  ",
        size: "medium",
        name: "annualSalary",
        type: "number",
        variant: "solid",
        color: "primary",
    },
    {
        field: "button",
        variant: "solid",
        color: "#383ab6",
        id: "login",
        type: "submit",
        size: "lg",
        label: "Add",
    },
];
export const resetPasswordInitialValues = {
    email: "",
};
export const resetPasswordFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "email",
        size: "medium",
        label: "",
        name: "email",
        type: "email",
        variant: "outlined",
        color: "primary",
        placeholder: "Enter your email",
    },
    {
        field: "button",
        variant: "primary",
        id: "login",
        fullWidth: "100%",
        type: "submit",
        size: "md",
        label: "Continue with email",
    },
];
export const otpPasswordFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "firstChar",
        size: "medium",
        name: "firstChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "secondChar",
        size: "medium",
        name: "secondChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "thirdChar",
        size: "medium",
        name: "thirdChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "fourthChar",
        size: "medium",
        name: "fourthChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "fifthChar",
        size: "medium",
        name: "fifthChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "sixthChar",
        size: "medium",
        name: "sixthChar",
        type: "text",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "button",
        variant: "contained",
        color: "primary",
        id: "verify",
        fullWidth: true,
        type: "submit",
        size: "large",
        label: "Verify Email",
        style: { mt: 1, mb: "2em" },
    },
];
