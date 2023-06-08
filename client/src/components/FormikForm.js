import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
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
                    ) : item.field === "radio" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form: { setFieldValue } }) => (
                                <FormControl
                                    key={item.name}
                                    // isInvalid={
                                    //     form.errors.name && form.touched.name
                                    // }
                                >
                                    <FormLabel>{item.label}</FormLabel>
                                    <Stack direction="row">
                                        <label className="text-gray-500 font-bold">
                                            <Field
                                                {...field}
                                                name={item.name}
                                                value="true"
                                                className="mr-2 leading-tight"
                                                type={item.type}
                                            />
                                            <span class="text-sm">Yes</span>
                                        </label>
                                        <label className="text-gray-500 font-bold">
                                            <Field
                                                {...field}
                                                name={item.name}
                                                value="false"
                                                className="mr-2 leading-tight"
                                                type={item.type}
                                            />
                                            <span class="text-sm">No</span>
                                        </label>
                                    </Stack>
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "date" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form: { setFieldValue } }) => (
                                <FormControl key={item.name}>
                                    <FormLabel>{item.label}</FormLabel>
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        {...field}
                                        type="date"
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
                                        <option>Super Manager</option>
                                        <option>HR/Manager</option>
                                        <option>Administrator</option>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "link" ? (
                        <Text align={"right"} style={item.style} key={item.id}>
                            <Link to={item.path}>
                                <Button color="#383ab6" variant="link">
                                    {item.label}
                                </Button>
                            </Link>
                        </Text>
                    ) : (
                        item.field === "button" && (
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                color={"white"}
                                _hover={{
                                    bg: "#494bc7",
                                }}
                                mt={3}
                                width={item.fullWidth}
                                colorScheme={item.color}
                                variant={item.variant}
                                type={item.type}
                                bg={"#383ab6"}
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
