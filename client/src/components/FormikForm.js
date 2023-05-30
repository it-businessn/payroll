import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
                    ) : item.field === "date" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form: { setFieldValue } }) => (
                                <FormControl key={item.name}>
                                    <FormLabel>{item.label}</FormLabel>
                                    <DatePicker
                                        {...field}
                                        selected={
                                            new Date(
                                                moment(field.value).format(
                                                    "YYYY-MM-DD"
                                                )
                                            )
                                        }
                                        onChange={(val) => {
                                            setFieldValue(field.name, val);
                                        }}
                                    />
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
                        <Text align={"right"} style={item.style} key={item.id}>
                            <Link to={item.path}>
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
