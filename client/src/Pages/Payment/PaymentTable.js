import {
    Box,
    HStack,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { IoArrowDown } from "react-icons/io5";

export const PaymentTable = ({ user, members }) => {
    return (
        <Table>
            <Thead bg="#f0f2f4">
                <Tr>
                    <Th>
                        <HStack spacing="3">
                            {/* <Checkbox /> */}
                            <HStack spacing="1">
                                <Text>Last Pay Date</Text>
                                <Icon
                                    as={IoArrowDown}
                                    color="muted"
                                    boxSize="4"
                                />
                            </HStack>
                        </HStack>
                    </Th>
                    <Th>Next Pay Date</Th>
                    <Th>Annual Salary</Th>
                    <Th>Deduction</Th>
                    <Th>Gross</Th>
                    <Th>Net Pay</Th>
                </Tr>
            </Thead>
            <Tbody>
                {members.map((member) => (
                    <Tr key={member._id}>
                        <Td>
                            <HStack spacing="3">
                                <Box>
                                    <Text fontWeight="medium">
                                        {moment(member.lastPayDate).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td>
                            {moment(member.nextPayDate).format("YYYY-MM-DD")}
                        </Td>
                        <Td>
                            <Text>{user.annualSalary}</Text>
                        </Td>
                        <Td>
                            <Text>{member.deduction}</Text>
                        </Td>
                        <Td>
                            <Text color="muted">
                                {Number(member.gross).toFixed(2)}
                            </Text>
                        </Td>
                        <Td>
                            <Text color="muted">
                                {Number(member.netPay).toFixed(2)}
                            </Text>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
