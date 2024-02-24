import React from 'react';
import { Box, Flex, Heading, Text, Input, Button, Select, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { HiDotsHorizontal, HiOutlineUserCircle } from 'react-icons/hi';

const Settings = () => {
    return (
        <Box className="col-xl-9 col-lg-8 cus-mar setting-row">
            <Box className="head-area mb-6 text-start">
                <Heading as="h5">Settings</Heading>
            </Box>
            <Box className="single-box p-sm-5 p-3">
                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    <Box flex="1">
                        <Box className="upload-single">
                            <Box className="head-area mb-2 text-start">
                                <Heading as="h6">Profile Image</Heading>
                            </Box>
                            <Box className="profile-picture text-start">
                                <img className="preview-image w-100" src="assets/images/profile-picture.png" alt="Preview Image" />
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
                                <img className="preview-image w-100" src="assets/images/profile-cover.png" alt="Preview Image" />
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
                <form action="#" className="text-center d-grid gap-4">
                    <Flex direction="column">
                        <Flex direction={{ base: 'column', md: 'row' }} flexWrap="wrap" gap={6}>
                            <Box flex="1">
                                <Box className="single-input text-start">
                                    <label htmlFor="name">Name</label>
                                    <Box className="input-area second">
                                        <Input type="text" defaultValue="Java World Group" placeholder="Type name" autoComplete="off" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex="1">
                                <Box className="single-input text-start">
                                    <label htmlFor="number">Number</label>
                                    <Box className="input-area second">
                                        <Input type="text" defaultValue="(316) 555-0116" placeholder="Number" autoComplete="off" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex="1">
                                <Box className="single-input text-start">
                                    <label htmlFor="email">Email</label>
                                    <Box className="input-area second">
                                        <Input type="text" defaultValue="test@mail.com" placeholder="Email" autoComplete="off" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex="1">
                                <Box className="single-input text-start">
                                    <Heading as="h6">Bio</Heading>
                                    <Text className="mdtxt mt-6">“Lorem ipsum dolor sit amet consectetur. Nec donec vestibulum eleifend lectus ipsum ultrices et dictum”.</Text>
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
                                <Button className="cmn-btn">Save Changes</Button>
                            </Box>
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
};

export default Settings;
