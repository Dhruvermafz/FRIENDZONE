import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { HiDotsHorizontal, HiOutlineUserCircle } from "react-icons/hi";
import "./Settings.css";
const Settings = () => {
  const [name, setName] = useState("Java World Group");
  const [number, setNumber] = useState("(316) 555-0116");
  const [email, setEmail] = useState("test@mail.com");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet consectetur. Nec donec vestibulum eleifend lectus ipsum ultrices et dictum"
  );

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save changes goes here
    console.log("Form submitted!");
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen h-[100%] sm:h-[100%] md:h-[100%]">
      <div className="relative w-full h-full">
        <Box className="col-xl-9 col-lg-8 cus-mar setting-row">
          <Box className="head-area mb-6 text-start">
            <Heading as="h5">Settings</Heading>
          </Box>

          <Box className="single-box p-sm-5 p-3">
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              <Box flex="1">
                <Box className="upload-single">
                  <Box className="head-area mb-2 text-start">
                    <Heading as="h6">Profile Image</Heading>
                  </Box>
                  <Box className="profile-picture text-start">
                    {/* Render profile picture here */}
                  </Box>
                  <Box className="file-upload">
                    <label className="file text-start mt-2">
                      <input type="file" />
                      <Button className="cmn-btn">Change Profile</Button>
                    </label>
                  </Box>
                </Box>
              </Box>
              <Box flex="1">
                <Box className="upload-single cover-img">
                  <Box className="head-area mb-2 text-start">
                    <Heading as="h6">Cover Image</Heading>
                  </Box>
                  <Box className="profile-picture text-start">
                    {/* Render cover image here */}
                  </Box>
                  <Box className="file-upload">
                    <label className="file text-start mt-2">
                      <input type="file" />
                      <Button className="cmn-btn">Change Cover photo</Button>
                    </label>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box className="single-box text-start p-sm-5 p-3">
            <Box className="head-area mb-6">
              <Heading as="h6">General Information</Heading>
            </Box>
            <form onSubmit={handleSubmit} className="text-center d-grid gap-4">
              <Flex direction="column">
                <Flex
                  direction={{ base: "column", md: "row" }}
                  flexWrap="wrap"
                  gap={6}
                >
                  <Box flex="1">
                    <Box className="single-input text-start">
                      <label htmlFor="name">Name</label>
                      <Box className="input-area second">
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Type name"
                          autoComplete="off"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box flex="1">
                    <Box className="single-input text-start">
                      <label htmlFor="number">Number</label>
                      <Box className="input-area second">
                        <Input
                          type="text"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          placeholder="Number"
                          autoComplete="off"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box flex="1">
                    <Box className="single-input text-start">
                      <label htmlFor="email">Email</label>
                      <Box className="input-area second">
                        <Input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          autoComplete="off"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box flex="1">
                    <Box className="single-input text-start">
                      <Heading as="h6">Bio</Heading>
                      <Text className="mdtxt mt-6">{bio}</Text>
                    </Box>
                  </Box>
                </Flex>
                <Flex alignItems="center" justifyContent="flex-end" mt={4}>
                  <Box className="group-btn cus-dropdown dropend">
                    <Menu>
                      <MenuButton as={Button} rightIcon={<HiDotsHorizontal />}>
                        <HiOutlineUserCircle /> Public
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <HiOutlineUserCircle /> Public
                        </MenuItem>
                        <MenuItem>
                          <HiOutlineUserCircle /> Only me
                        </MenuItem>
                        <MenuItem>
                          <HiOutlineUserCircle /> Share
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<HiDotsHorizontal />}>
                        <BsPencilSquare /> more_horiz
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <BsPencilSquare /> Edit
                        </MenuItem>
                        <MenuItem>
                          <BsTrash /> Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                  <Box ml={4}>
                    <Button type="submit" className="cmn-btn">
                      Save Changes
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Settings;
