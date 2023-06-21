import {
    Box,
    Button,
    Progress,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

export const UserStat = (props) => {
    const { label, value, icon, period, range, delta, ...boxProps } = props;
    return (
        <Box
            px={{
                base: "4",
                md: "6",
            }}
            py={{
                base: "5",
                md: "6",
            }}
            bg="bg.surface"
            borderRadius="lg"
            boxShadow="sm"
            {...boxProps}
        >
            <Stack>
                <Stat>
                    <StatLabel>{label}</StatLabel>
                    <StatNumber>{value}</StatNumber>
                    <StatHelpText>{period}</StatHelpText>
                    {range && (
                        <Progress value={range} size="xs" colorScheme="blue" />
                    )}
                    {delta && delta.link ? (
                        <Button rightIcon={<FiArrowRight />} variant="link">
                            {delta.link}
                        </Button>
                    ) : (
                        delta &&
                        delta.text1 && (
                            <>
                                <StatHelpText>{delta.text1}</StatHelpText>
                                <StatHelpText>{delta.text2}</StatHelpText>
                            </>
                        )
                    )}
                </Stat>
            </Stack>
        </Box>
    );
};
