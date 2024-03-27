import { Box, Text, Button } from "@chakra-ui/react";

const Group = ({ groupName, groupType, memberCount }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      mb="4"
      boxShadow="md"
      maxW="sm"
    >
      <img
        src="assets/images/group-avatar-1.png"
        alt="Group Avatar"
        className="avatar-img max-un"
      />
      <Text mt="2" fontWeight="semibold" fontSize="xl">
        {groupName}
      </Text>
      <Text mt="2">{groupType}</Text>
      <Box d="flex" mt="2" alignItems="center" justifyContent="center">
        <Text>{memberCount} Members</Text>
      </Box>
      <Box mt="4" d="flex" justifyContent="space-between">
        <Button colorScheme="blue">Joined</Button>
        <Button colorScheme="green">Invite</Button>
      </Box>
    </Box>
  );
};

export default Group;
