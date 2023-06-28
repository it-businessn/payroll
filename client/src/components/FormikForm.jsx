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
    Select as SelectChakra,
    Stack,
} from "@chakra-ui/react";
import { City, State } from "country-state-city";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Select from "react-select";

function FormikForm({
    schema,
    initialValues,
    formFields,
    formSubmit,
    isLoading,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (formValues) => {
            try {
                if (props.id === "sign-up") {
                    formValues.city = selectedCity.name;
                    formValues.state = selectedState.name;
                    formValues.country = selectedCountry.name;
                    formValues.currency = selectedCountry.currency;
                }
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
                                        onChange={(i) => console.log(i)}
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
                                    <SelectChakra
                                        placeholder="Select role"
                                        {...field}
                                    >
                                        <option>Employee</option>
                                        <option>Super Manager</option>
                                        <option>HR/Manager</option>
                                        <option>Administrator</option>
                                    </SelectChakra>
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
                    ) : item.field === "country" && props.countryList ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => {
                                return (
                                    <FormControl>
                                        <FormLabel>{item.label}</FormLabel>
                                        <Select
                                            {...field}
                                            options={props.countryList}
                                            getOptionLabel={(options) => {
                                                return options["name"];
                                            }}
                                            getOptionValue={(options) => {
                                                return options["name"];
                                            }}
                                            value={selectedCountry}
                                            onChange={(item) => {
                                                setSelectedCountry(item);
                                            }}
                                        />
                                    </FormControl>
                                );
                            }}
                        </Field>
                    ) : item.field === "state" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => (
                                <FormControl>
                                    <FormLabel>{item.label}</FormLabel>
                                    <Select
                                        {...field}
                                        options={State?.getStatesOfCountry(
                                            selectedCountry?.isoCode
                                        )}
                                        getOptionLabel={(options) => {
                                            return options["name"];
                                        }}
                                        getOptionValue={(options) => {
                                            return options["name"];
                                        }}
                                        value={selectedState}
                                        onChange={(item) => {
                                            setSelectedState(item);
                                        }}
                                    />
                                </FormControl>
                            )}
                        </Field>
                    ) : item.field === "city" ? (
                        <Field name={item.name} key={item.name}>
                            {({ field, form }) => (
                                <FormControl>
                                    <FormLabel>{item.label}</FormLabel>
                                    <Select
                                        {...field}
                                        options={City.getCitiesOfState(
                                            selectedState?.countryCode,
                                            selectedState?.isoCode
                                        )}
                                        getOptionLabel={(options) => {
                                            return options["name"];
                                        }}
                                        getOptionValue={(options) => {
                                            return options["name"];
                                        }}
                                        value={selectedCity}
                                        onChange={(item) => {
                                            setSelectedCity(item);
                                        }}
                                    />
                                </FormControl>
                            )}
                        </Field>
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
