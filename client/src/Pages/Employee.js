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
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api/index.js";
function Employee() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const userData = await api.getAllEmployee();
            setData(userData.data.data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };
    const navigate = useNavigate();
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
                                                <Link to="/add-employee">
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Add
                                                    </Button>
                                                </Link>
                                                <Button
                                                    colorScheme="blue"
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit-employee/${_id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Link to="/add-payment">
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Add Payment
                                                    </Button>
                                                </Link>
                                                <Link to="/view-payment">
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        View Payment
                                                    </Button>
                                                </Link>
                                                <Link to="/leave-request">
                                                    <Button
                                                        colorScheme="blue"
                                                        variant="link"
                                                    >
                                                        Raise Leave Details
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

export default Employee;