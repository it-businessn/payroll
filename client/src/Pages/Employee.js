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
import { useNavigate } from "react-router-dom";
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
                                                <Button
                                                    colorScheme="blue"
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(
                                                            `/add-payment/${_id}`
                                                        )
                                                    }
                                                >
                                                    Add Payment
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(
                                                            `/add-bank-detail/${_id}`
                                                        )
                                                    }
                                                >
                                                    Add Bank Details
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(
                                                            `/view-payment/${_id}`
                                                        )
                                                    }
                                                >
                                                    View Payment
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(
                                                            `/leave-request/${_id}`
                                                        )
                                                    }
                                                >
                                                    Raise/View Leave Request
                                                </Button>
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
