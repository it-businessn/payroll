import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

export const UserProfile = (props) => {
    const { user, image } = props;
    const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
    return (
        <HStack spacing="3" ps="2">
            <Avatar name={userName} src={image} boxSize="10" />
            <Box>
                <Text
                    fontWeight="medium"
                    fontSize="sm"
                    textTransform="capitalize"
                >
                    {userName}
                </Text>
                <Text color="muted" fontSize="sm">
                    {user.email}
                </Text>
            </Box>
        </HStack>
    );
};
