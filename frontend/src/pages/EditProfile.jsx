import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Divider,
} from "@chakra-ui/react";
import { MyContext } from "../context/MyContext";
import Loading from "../components/Loading";
const EditProfile = () => {
  const { username } = useParams();
  const { loggedUser } = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });

  useEffect(() => {
    // Simulating loading data
    setTimeout(() => {
      setProfile({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        contactNumber: "1234567890",
        about: "Lorem ipsum dolor sit amet.",
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit profile changes
    console.log("Profile updated:", profile);
    history(`/settings/${loggedUser?.username}`);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md">
      <Text fontSize="3xl" mb={2} color="blue.800">
        Edit Profile
      </Text>
      <Divider mb={4} />
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Gender</FormLabel>
            <Input
              type="text"
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="tel"
              name="contactNumber"
              value={profile.contactNumber}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>About</FormLabel>
            <Input
              type="text"
              name="about"
              value={profile.about}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
          <Link to={`/settings/${loggedUser?.username}`}>
            <Button ml={4}>Cancel</Button>
          </Link>
        </form>
      )}
    </Box>
  );
};

export default EditProfile;
