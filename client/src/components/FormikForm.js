import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
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
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => (
                                <FormControl
                                    key={item.name}
                                    // isInvalid={
                                    //     form.errors.name && form.touched.name
                                    // }
                                >
                                    <FormLabel>{item.label}</FormLabel>
                                    <Input {...field} type={item.type} />
                                    {/* <FormErrorMessage>
                                        {form.errors.name}
                                    </FormErrorMessage> */}
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "link" ? (
                        <Link to={item.path} key={item.id}>
                            <span style={item.style}>{item.label}</span>
                        </Link>
                    ) : (
                        item.field === "button" && (
                            <Button
                                mt={4}
                                colorScheme={item.color}
                                variant={item.variant}
                                type={item.type}
                                size={item.size}
                                key={item.label}
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
