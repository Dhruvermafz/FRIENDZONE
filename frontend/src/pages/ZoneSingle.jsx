import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Text, Divider, Button, Flex, Avatar } from "@chakra-ui/react";
import Loading from "../components/Loading";
import groupsData from "../constants/group.json";
import { PostCard } from "../components";
const GroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching group data from JSON file
    fetchGroupData();
  }, []);

  const fetchGroupData = () => {
    // Simulate fetching group data
    setTimeout(() => {
      const selectedGroup = groupsData.find((group) => group.id === groupId);
      setGroup(selectedGroup);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Text fontSize="3xl" mb={2} color="blue.800">
            {group.name}
          </Text>
          <Divider mb={4} />
          <Flex alignItems="center" mb={4}>
            <Avatar size="md" src={group.photo} />
            <Text ml="2" mr="4">
              {group.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {group.members.length} Members
            </Text>
          </Flex>
          <Button as={Link} to="/create-post" colorScheme="green" mb={4}>
            Create New Post
          </Button>
          {group.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </Box>
  );
};

export default GroupPage;
