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
