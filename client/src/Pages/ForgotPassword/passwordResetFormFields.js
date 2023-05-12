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
        label: "Email Address",
        name: "email",
        type: "email",
        variant: "outlined",
        color: "primary",
    },
    {
        field: "button",
        variant: "contained",
        color: "primary",
        id: "login",
        fullWidth: true,
        type: "submit",
        size: "large",
        label: "Send Link",
        style: { mt: 1, mb: "2em" },
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
