import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import * as api from "../../api/index.js";
import "../../components/Sidebar.css";
import { UserSchema, userCurrency } from "../../config/userSchema.jsx";
import { userFormFields } from "../../constants/constant.jsx";
import PersonalInfoCard from "./EditUser/PersonalInfoCard.jsx";
export const MemberTable = ({ members }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setMembers] = useState(members);
    const [record, setRecord] = useState(null);
    const [userFormInitialValues, setUserFormInitialValues] = useState(null);
    const handleSubmit = async (values) => {
        try {
            const updateData = await api.updateUserById(record._id, values);
            onClose();
            setMembers(members);
        } catch (error) {
            // setError(error.response.data.error);
            console.log(error);
        }
    };
    const openModal = (member) => {
        setRecord(member);
        setUserFormInitialValues({
            firstName: member.firstName,
            middleName: member.middleName,
            lastName: member.lastName,
            email: member.email,
            password: member.password,
            role: member.role,
            annualSalary: member.annualSalary,
            dateOfJoining: member.dateOfJoining,
            phoneNumber: member.phoneNumber,
            streetNumber: member.streetNumber,
            city: member.city,
            state: member.state,
            postalCode: member.postalCode,
            country: member.country,
        });
        onOpen();
    };
    useEffect(() => {
        initFilters();
    }, []);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const setRowDatay = (e) => setRowData(e.rowData);
    const [rowData, setRowData] = useState(null);
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },

            annualSalary: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.EQUALS },
                ],
            },
        });
        setGlobalFilterValue("");
    };
    const balanceFilterTemplate = (options) => {
        return (
            <InputNumber
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                mode="currency"
                currency="USD"
                locale="en-US"
            />
        );
    };
    const [selectedProducts, setSelectedProducts] = useState(null);
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const clearFilter = () => {
        initFilters();
    };
    return (
        <>
            <Flex justify="space-between" gap={2}>
                <Heading size="xs">Members</Heading>
                <Spacer />
                <Button variant="primary">Process Payroll</Button>
                <Button variant="outline" onClick={clearFilter}>
                    Clear
                </Button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <Input
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
            </Flex>
            <div className="card">
                <DataTable
                    selectionMode="checkbox"
                    selection={selectedProducts}
                    onSelectionChange={(e) => {
                        setSelectedProducts(e.value);
                        console.log(e.value);
                    }}
                    dataKey="_id"
                    value={members}
                    removableSort
                    size="small"
                    resizableColumns
                    paginator
                    filters={filters}
                    globalFilterFields={["annualSalary"]}
                    rows={8}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ whiteSpace: "pre-line" }}
                    onCellClick={(e) => openModal(e.rowData)}
                    cellSelection="true"
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                    ></Column>
                    <Column
                        field="name"
                        body={(value) => (
                            <HStack spacing="3">
                                <Avatar
                                    name={value.name}
                                    src=""
                                    w="2.5rem"
                                    h="2.5rem"
                                    fontSize="1rem"
                                />
                                <Box>
                                    <Text textTransform="capitalize">
                                        {value.name}
                                    </Text>
                                </Box>
                            </HStack>
                        )}
                        sortable
                        header="Name"
                    ></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column field="email" sortable header="Email"></Column>
                    <Column field="role" sortable header="Role"></Column>
                    <Column
                        field="annualSalary"
                        sortable
                        filterField="annualSalary"
                        dataType="numeric"
                        style={{ minWidth: "10rem" }}
                        filter
                        filterElement={balanceFilterTemplate}
                        body={(value) => (
                            <>
                                {userCurrency(value.currency).format(
                                    value.annualSalary
                                )}
                            </>
                        )}
                        header="Annual Salary"
                    ></Column>
                    <Column body={<FiEdit2 />} header="Status"></Column>
                </DataTable>
            </div>
            {record && (
                <Modal size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Records</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <PersonalInfoCard
                                formSubmit={handleSubmit}
                                schema={UserSchema}
                                initialValues={userFormInitialValues}
                                formFields={userFormFields}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
