import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Divider, Button, Flex } from "@chakra-ui/react";
import Loading from "../components/Loading";
import groupsData from "../constants/group.json";

const GroupComponent = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching groups data from JSON file
    fetchAllGroups();
  }, []);

  const fetchAllGroups = () => {
    // Simulate fetching groups data
    setTimeout(() => {
      setGroups(groupsData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md">
      <Text fontSize="3xl" mb={2} color="blue.800">
        All Groups
      </Text>
      <Divider mb={4} />
      <Button as={Link} to="/zone/create" colorScheme="green" mb={4}>
        Create New Group
      </Button>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex flexWrap="wrap" justifyContent="space-between">
          {groups.map((group) => (
            <Box
              key={group.id}
              width={{
                base: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.33% - 12px)",
              }}
              mb={4}
            >
              <Box p={4} bg="white" boxShadow="md" borderRadius="md">
                <img src={group.photo} alt={group.name} />
                <Text fontWeight="bold" fontSize="lg" mt={2}>
                  {group.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {group.description}
                </Text>
                <Link to={`/groups/${group.id}`}>
                  <Button mt={2} colorScheme="blue">
                    View Group
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default GroupComponent;
