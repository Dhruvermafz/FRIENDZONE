import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  Tbody as TableBody,
  Td as TableCell,
  Tr as TableRow,
  Text,
  Divider,
} from "@chakra-ui/react";
import CustomModal from "../CustomModal";
import Loading from "../Loading";
import { MyContext } from "../../context/MyContext";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const { loggedUser } = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    // Add logic to logout
    localStorage.clear();
    history.push("/");
  };

  const handleDeleteAccount = () => {
    // Add logic to delete the account
    setOpen(false);
    console.log("Deleting user account...");
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md">
      <Text fontSize="3xl" mb={2} color="blue.800">
        Settings
      </Text>
      <Divider mb={4} />
      {isLoading ? (
        <Loading />
      ) : (
        <Table variant="simple" size="md">
          <TableBody>
            {/* Profile Details */}
            <TableRow>
              <TableCell>
                <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.800">
                  Profile
                </Text>
                <Text mb={4} color="gray.600">
                  Display and edit your profile details.
                </Text>
              </TableCell>
              <TableCell>
                <Link to={`/settings/edit_profile/${loggedUser?.username}`}>
                  <Button colorScheme="blue">Edit Profile</Button>
                </Link>
              </TableCell>
            </TableRow>
            {/* Logout */}
            <TableRow>
              <TableCell>
                <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.800">
                  Logout
                </Text>
                <Text mb={4} color="gray.600">
                  You will be logged out of your account. All your posts will be
                  safe.
                </Text>
              </TableCell>
              <TableCell>
                <Button onClick={() => setOpen(true)} colorScheme="blue">
                  Logout
                </Button>
              </TableCell>
            </TableRow>
            {/* Delete Account */}
            <TableRow>
              <TableCell>
                <Text fontSize="xl" fontWeight="bold" mb={2} color="blue.800">
                  Delete Account
                </Text>
                <Text mb={4} color="gray.600">
                  Your account will be deleted. You cannot retrieve your account
                  whatsoever. All your details will be deleted forever.
                </Text>
              </TableCell>
              <TableCell>
                <Button onClick={() => setOpen(true)} colorScheme="red">
                  Delete Account
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirmation"
        description="Are you sure you want to logout?"
        onConfirm={handleLogout}
      />
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirmation"
        description="Do you really want to delete your account?"
        onConfirm={handleDeleteAccount}
      />
    </Box>
  );
};

export default Settings;
