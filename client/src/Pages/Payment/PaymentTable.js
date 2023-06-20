import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useRef } from "react";
import { IoArrowDown } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { userCurrency } from "../../config/userSchema";
import PaySlip from "./PaySlip";
export const PaymentTable = ({ user, members }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Table variant="simple">
                <Thead bg="#f0f2f4">
                    <Tr>
                        <Th>
                            <HStack spacing="3">
                                <HStack spacing="1">
                                    <Text>Start Pay Period</Text>
                                    <Icon
                                        as={IoArrowDown}
                                        color="muted"
                                        boxSize="4"
                                    />
                                </HStack>
                            </HStack>
                        </Th>
                        <Th>End Pay Period</Th>
                        <Th>Gross</Th>
                        <Th>Net Pay</Th>
                        <Th></Th>
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
                                {moment(member.nextPayDate).format(
                                    "YYYY-MM-DD"
                                )}
                            </Td>
                            <Td>
                                <Text color="muted">
                                    {userCurrency(
                                        user?.bankDetails.currency
                                    ).format(member.gross)}
                                </Text>
                            </Td>
                            <Td>
                                <Text color="muted">
                                    {userCurrency(
                                        user?.bankDetails.currency
                                    ).format(member.netPay)}
                                </Text>
                            </Td>
                            <Td>
                                <Button onClick={onOpen} variant="link">
                                    View
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Drawer isOpen={isOpen} onClose={onClose} size="lg">
                <DrawerOverlay />
                <DrawerContent ref={componentRef}>
                    <DrawerCloseButton />
                    <DrawerHeader textAlign="center" spacing={3}>
                        <Heading size="sm">Payslip</Heading>
                        <Text fontSize="md" color="fg.muted">
                            View a summary of all your paystub details
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <PaySlip />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="ghost" onClick={handlePrint}>
                            Print
                        </Button>
                        <Button type="submit" form="my-form">
                            Download
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
