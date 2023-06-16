import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    Stack,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
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
    return (
        <FormikProvider value={formik}>
            <Form>
                {formFields.map((item) =>
                    item.field === "textField" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => (
                                <FormControl>
                                    <FormLabel marginTop=".5em">
                                        {item.label}
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                    />
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "radio" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form: { setFieldValue } }) => (
                                <FormControl>
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
                                <FormControl>
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
                        <HStack justify="end" marginTop=".5em" key={item.label}>
                            <Link to={item.path}>
                                <Button variant={item.variant} size="sm">
                                    {item.label}
                                </Button>
                            </Link>
                        </HStack>
                    ) : (
                        item.field === "button" && (
                            <Stack marginTop=".5em" key={item.label}>
                                <Button
                                    loadingText="Submitting"
                                    variant={item.variant}
                                    type={item.type}
                                    size={item.size}
                                >
                                    {item.label}
                                </Button>
                            </Stack>
                        )
                    )
                )}
            </Form>
        </FormikProvider>
    );
}

export default FormikForm;
