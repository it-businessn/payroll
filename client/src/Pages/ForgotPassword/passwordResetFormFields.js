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
        label: "Continue",
        style: { mt: 1, mb: "2em" },
    },
];
export const otpPasswordFormFields = [
    {
        field: "textField",
        margin: "dense",
        fullWidth: true,
        id: "otp",
        size: "medium",
        name: "otp",
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
