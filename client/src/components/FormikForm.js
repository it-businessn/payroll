import { Button, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
function FormikForm({ schema, initialValues, formFields, formSubmit }) {
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (formValues) => {
            try {
                formSubmit(formValues);
            } catch (error) {
                console.log(error);
            }
        },
    });
    const { errors, isValid, touched, dirty, getFieldProps } = formik;
    return (
        <FormikProvider value={formik}>
            <Form sx={{ mt: 2 }}>
                {formFields.map((item) =>
                    item.field === "textField" ? (
                        <TextField
                            key={item.id}
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
                        <Link to={item.path} key={item.id}>
                            <span style={item.style}>{item.label}</span>
                        </Link>
                    ) : (
                        item.field === "button" && (
                            <Button
                                key={item.id}
                                variant={item.variant}
                                color={item.color}
                                type={item.type}
                                fullWidth={item.fullWidth}
                                size={item.size}
                                disabled={!isValid || !dirty}
                                sx={item.style}
                            >
                                {item.label}
                            </Button>
                        )
                    )
                )}
            </Form>
        </FormikProvider>
    );
}

export default FormikForm;
