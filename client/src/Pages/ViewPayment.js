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
import { Link, useParams } from "react-router-dom";
import * as api from "../api/index.js";
function ViewPayment() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const userData = await api.getEmployeeById(id);
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
                            <Th>Gross Payment </Th>
                            <Th>Net Payment </Th>
                            <Th>Last PayDate</Th>
                            <Th>Next PayDate</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.paymentInfo.length ? (
                            <Tr key={data._id}>
                                <Td>
                                    {data.firstName} {data.middleName}{" "}
                                    {data.lastName}
                                </Td>
                                <Td>{data.paymentInfo[0].gross} </Td>
                                <Td>{data.paymentInfo[0].netPay} </Td>
                                <Td>{data.paymentInfo[0].lastPayDate} </Td>
                                <Td>{data.paymentInfo[0].nextPayDate} </Td>

                                <Td>
                                    <Stack
                                        direction="row"
                                        spacing={4}
                                        align="center"
                                    >
                                        <Link to="/">
                                            <Button
                                                colorScheme="blue"
                                                variant="link"
                                            >
                                                Go Back
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Td>
                            </Tr>
                        ) : (
                            <Link to="/">
                                <Button colorScheme="blue" variant="link">
                                    Go Back
                                </Button>
                            </Link>
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

export default ViewPayment;
