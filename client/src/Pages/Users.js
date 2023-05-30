import {
    Button,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api/index.js";

export default function User() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const userData = await api.getAllUsers();
            setData(userData.data.data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div style={{ display: "flex" }}>
            <TableContainer>
                {loading && <div>Fetching Data...</div>}
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Address</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map(
                                ({
                                    _id,
                                    firstName,
                                    middleName,
                                    lastName,
                                    email,
                                    role,
                                    address,
                                }) => (
                                    <Tr key={_id}>
                                        <Td>
                                            {firstName} {middleName} {lastName}
                                        </Td>
                                        <Td>{email} </Td>
                                        <Td>{role} </Td>
                                        <Td>
                                            {address.streetNumber}
                                            {address.city} {address.postalCode}
                                            {address.state} {address.country}
                                        </Td>
                                        <Td>
                                            <Stack
                                                direction="row"
                                                spacing={4}
                                                align="center"
                                            >
                                                <Link to={`/edit-user/${_id}`}>
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to={`/add-payment/${_id}`}
                                                >
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Add Payment
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to={`/add-bank-detail/${_id}`}
                                                >
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Add Bank Details
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to={`/view-payment/${_id}`}
                                                >
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        View Payment
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to={`/leave-request/${_id}`}
                                                >
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Raise/View Leave Request
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                )
                            )}
                    </Tbody>
                </Table>
            </TableContainer>
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
        </div>
    );
}
