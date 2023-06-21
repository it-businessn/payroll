import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Stack,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

function FormikForm({ schema, initialValues, formFields, formSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (formValues) => {
            try {
                setIsLoading(true);
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
                                <FormControl
                                    id={item.id}
                                    isRequired={item.isRequired}
                                >
                                    <FormLabel marginTop=".5em">
                                        {item.label}
                                    </FormLabel>
                                    {item.id === "password" ? (
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                            />
                                            <InputRightElement h={"full"}>
                                                <Button
                                                    variant={"ghost"}
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (showPassword) =>
                                                                !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <ViewIcon />
                                                    ) : (
                                                        <ViewOffIcon />
                                                    )}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    ) : item.id === "email" ? (
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <EmailIcon color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeholder}
                                                {...field}
                                            />
                                        </InputGroup>
                                    ) : item.id === "phoneNumber" ? (
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <PhoneIcon color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeholder}
                                                {...field}
                                            />
                                        </InputGroup>
                                    ) : (
                                        <Input
                                            {...field}
                                            type={item.type}
                                            placeholder={item.placeholder}
                                        />
                                    )}
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
                                    isLoading={isLoading}
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
