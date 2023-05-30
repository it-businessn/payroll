import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
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
                                    isRequired
                                    // isInvalid={
                                    //     form.errors.name && form.touched.name
                                    // }
                                >
                                    <FormLabel>{item.label}</FormLabel>
                                    <Input
                                        {...field}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        _placeholder={{ color: "gray.500" }}
                                    />
                                    {/* <FormErrorMessage>
                                        {form.errors.name}
                                    </FormErrorMessage> */}
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "select" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => (
                                <FormControl>
                                    <FormLabel>{item.label}</FormLabel>
                                    <Select
                                        placeholder="Select role"
                                        {...field}
                                    >
                                        <option>Employee</option>
                                        <option>HR/Manager</option>
                                        <option>Administrator</option>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "link" ? (
                        <Text align={"right"} style={item.style}>
                            <Link to={item.path} key={item.id}>
                                <Button colorScheme="blue" variant="link">
                                    {item.label}
                                </Button>
                            </Link>
                        </Text>
                    ) : (
                        item.field === "button" && (
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                mt={3}
                                width={item.fullWidth}
                                colorScheme={item.color}
                                variant={item.variant}
                                type={item.type}
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
