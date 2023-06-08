import {
    Box,
    Button,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    TableContainer,
    chakra,
    useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
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
            const userData = await api.getUserById(id);
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
    const StatsCard = ({ title, stats }) => {
        return (
            <Stat
                px={{ base: 4, md: 8 }}
                py={"5"}
                shadow={"xl"}
                border={"1px solid"}
                borderColor={useColorModeValue("gray.800", "gray.500")}
                rounded={"lg"}
            >
                <StatLabel fontWeight={"medium"} isTruncated>
                    {title}
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                    {stats}
                </StatNumber>
            </Stat>
        );
    };
    return (
        <div style={{ display: "flex" }}>
            <TableContainer>
                {loading && <div>Fetching Data...</div>}
                {data && data.paymentInfo.length ? (
                    <Box
                        maxW="7xl"
                        mx={"auto"}
                        pt={5}
                        px={{ base: 2, sm: 12, md: 17 }}
                    >
                        <chakra.h1
                            textAlign={"center"}
                            fontSize={"4xl"}
                            py={10}
                            fontWeight={"bold"}
                        >
                            Payment detail
                        </chakra.h1>
                        <SimpleGrid
                            columns={{ base: 1, md: 5 }}
                            spacing={{ base: 5, lg: 8 }}
                        >
                            <StatsCard
                                title={"Name"}
                                stats={
                                    data.firstName +
                                    "" +
                                    data.middleName +
                                    "" +
                                    data.lastName
                                }
                            />
                            <StatsCard
                                title={"Gross Payment"}
                                stats={Number(
                                    data.paymentInfo[0].gross.toFixed(2)
                                )}
                            />
                            <StatsCard
                                title={"Net Payment"}
                                stats={Number(
                                    data.paymentInfo[0].netPay.toFixed(2)
                                )}
                            />
                            <StatsCard
                                title={"Last PayDate"}
                                stats={moment(
                                    data.paymentInfo[0].lastPayDate
                                ).format("YYYY-MM-DD")}
                            />
                            <StatsCard
                                title={"Next PayDate"}
                                stats={moment(
                                    data.paymentInfo[0].nextPayDate
                                ).format("YYYY-MM-DD")}
                            />
                        </SimpleGrid>
                        <Stack direction="row" spacing={4} align="center">
                            <Link to="/">
                                <Button color="#383ab6" variant="link">
                                    Go Back
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                ) : (
                    <Link to="/">
                        <Button color="#383ab6" variant="link">
                            Go Back
                        </Button>
                    </Link>
                )}
            </TableContainer>
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
        </div>
    );
}

export default ViewPayment;
