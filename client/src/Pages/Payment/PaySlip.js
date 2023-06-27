import { Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
function PaySlip() {
    const user = JSON.parse(localStorage.getItem("profile")).userDetails.data;
    return (
        <Stack spacing={10}>
            <Table marginTop="1.5em" variant="simple" size="sm">
                <Tbody>
                    <Tr>
                        <Td>Employee Name</Td>
                        <Td>
                            {user.firstName} {user.middleName}
                            {user.lastName}
                        </Td>
                        <Td>Pay date</Td>
                        <Td>12 June 2023</Td>
                    </Tr>
                    <Tr>
                        <Td>Date of Joining</Td>
                        <Td>
                            {moment(user.dateOfJoining).format("YYYY-MM-DD")}
                        </Td>
                        <Td>Pay period</Td>
                        <Td>2023/06/28 - 2023/07/27</Td>
                    </Tr>
                    <Tr>
                        <Td>Worked Days</Td>
                        <Td>24</Td>
                        <Td>Designation</Td>
                        <Td>Employee</Td>
                    </Tr>
                </Tbody>
            </Table>
            <Table variant="striped" size="sm">
                <Thead>
                    <Tr>
                        <Th fontSize="md" fontWeight="bold">
                            Earnings
                        </Th>
                        <Th></Th>
                        <Th fontSize="md" fontWeight="bold">
                            Amount
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Basic</Td>
                        <Td></Td>
                        <Td>2000</Td>
                    </Tr>
                    <Tr>
                        <Td>Incentive Pay</Td>
                        <Td></Td>
                        <Td>300</Td>
                    </Tr>
                    <Tr>
                        <Td>Allowance</Td>
                        <Td></Td>
                        <Td>400</Td>
                    </Tr>

                    <Tr>
                        <Td></Td>
                        <Td textAlign="right">Total Earnings</Td>
                        <Td>{2000 + 300 + 400}</Td>
                    </Tr>
                </Tbody>
            </Table>
            <Table variant="striped" size="sm">
                <Thead>
                    <Tr>
                        <Th>
                            <Text fontSize="md" fontWeight="bold">
                                Deductions
                            </Text>
                        </Th>
                        <Th></Th>
                        <Th fontSize="md" fontWeight="bold">
                            Amount
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>EPF</Td>
                        <Td></Td>
                        <Td>200</Td>
                    </Tr>
                    <Tr>
                        <Td>Federal Tax</Td>
                        <Td></Td>
                        <Td>200</Td>
                    </Tr>
                    <Tr>
                        <Td>Professional Tax</Td>
                        <Td></Td>
                        <Td>80</Td>
                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td textAlign="right">Total Deductions</Td>
                        <Td>{200 + 200 + 80}</Td>
                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td textAlign="right">Net Pay</Td>
                        <Td>{2700 - 480}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Stack>
    );
}

export default PaySlip;
