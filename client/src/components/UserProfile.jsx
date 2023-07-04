import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

const UserProfile = (props) => {
    const { user } = props;
    const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
    return (
        <HStack spacing="3">
            <Avatar name={userName} src="" boxSize="12" />
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
export default UserProfile;
