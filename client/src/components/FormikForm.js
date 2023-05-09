import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
function FormikForm({ schema, initialValues, formFields, submit }) {
    const [hasError, setError] = React.useState("");

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (event) => {
            try {
                console.log(event);
                formikHelpers.resetForm();
                submit(values);
            } catch (error) {
                setError(error.response.data.error);
            }
        },
    });
    const {
        errors,
        isValid,
        touched,
        dirty,
        values,
        isSubmitting,
        getFieldProps,
        formikHelpers,
    } = formik;
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={submit} sx={{ mt: 2 }}>
                {formFields.map((item) =>
                    item.field === "TextField" ? (
                        <TextField
                            margin={item.margin}
                            fullWidth={item.fullWidth}
                            id={item.id}
                            label={item.label}
                            size={item.size}
                            name={item.name}
                            type={item.type}
                            variant={item.variant}
                            color={item.color}
                            {...getFieldProps(item.type)}
                            error={
                                Boolean(errors[item.type]) &&
                                Boolean(touched[item.type])
                            }
                            helperText={
                                Boolean(touched[item.type]) && errors[item.type]
                            }
                        />
                    ) : item.field === "link" ? (
                        <Link to={item.path}>
                            <Typography
                                variant="subtitle2"
                                sx={{ textAlign: "right" }}
                            >
                                {item.label}
                            </Typography>
                        </Link>
                    ) : (
                        item.field === "submitButton" && (
                            <LoadingButton
                                loading={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                size="large"
                                disabled={!isValid || !dirty}
                                sx={{ mt: 1, mb: "2em" }}
                            >
                                Login
                            </LoadingButton>
                        )
                    )
                )}
                {hasError && (
                    <Typography variant="subtitle2" color="red">
                        {hasError}
                    </Typography>
                )}
            </Form>
        </FormikProvider>
    );
}

export default FormikForm;
