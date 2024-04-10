import React, { useState, useEffect } from "react";
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
  Select,
  Image,
} from "@chakra-ui/react";
import CustomModal from "../CustomModal";
import { avatarLabels } from "../../context/data/Labels";
import Loading from "../Loading";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const { userName } = useParams();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
    pronouns: "",
    location: "",
    website: "",
    bio: "",
    avatar: {
      avatarStyle: "",
      top: "",
      accessories: "",
      hairColor: "",
      facialHair: "",
      clothes: "",
      eyes: "",
      eyebrow: "",
      mouth: "",
      skin: "",
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    // Add logic to logout
    setIsLogoutModalOpen(false);
  };
  const handleDeleteConfirm = () => {
    // Add logic to delete the account
    setIsDeleteModalOpen(false);
  };

  // CSS for Profile Image
  const profileImageStyles = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
  };

  // CSS for Logout and Delete Account Buttons
  const buttonStyles = {
    width: "120px",
  };

  // CSS for Table cells containing text
  const cellTextStyles = {
    fontSize: "xl",
    mb: 3,
  };

  // CSS for Table cells containing description text
  const cellDescriptionStyles = {
    fontSize: "md",
    mb: 6,
  };

  // CSS for table rows
  const tableRowStyles = {
    _hover: {
      bg: "gray.100",
    },
  };

  // CSS for Delete Modal
  const modalStyles = {
    fontSize: "xl",
    mb: 3,
  };

  const handleInput = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleAvatarInput = (event) => {
    setProfile({
      ...profile,
      avatar: {
        ...profile.avatar,
        [event.target.name]: event.target.value,
      },
    });
  };

  const fetchProfile = () => {
    const userid = localStorage.getItem("SocialGramUserId");
    // apiUser.getSingle(userid).then((res) => {
    //   if (res.status === "200") {
    //     setProfile(res.message);
    //     setImageUrl(avatarGen(res?.message?.avatar));
    //     setIsLoading(false);
    //   } else {
    //     toast.error("Error");
    //     setIsLoading(false);
    //   }
    // });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const editUser = () => {
    const userid = localStorage.getItem("SocialGramUserId");

    const response = {
      fname: profile.fname,
      lname: profile.lname,
      pronouns: profile.pronouns,
      location: profile.location,
      website: profile.website,
      avatar: profile.avatar,
      bio: profile.bio,
    };

    // apiUser.put(response, userid).then((res) => {
    //   toast.success("Successfully Edited your profile");
    //   fetchProfile();
    // });
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  const DeleteModal = ({ open, setOpen }) => {
    const deleteUser = () => {
      setOpen(false);
      console.log("Deleting user account...");
    };

    return (
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
        {...modalStyles}
      >
        <Text {...modalStyles}>Important !!</Text>
        <Text {...modalStyles} mb={6}>
          Do you really want to delete your account ?
        </Text>
        <Button onClick={deleteUser} colorScheme="red" mr={3} {...buttonStyles}>
          Yes
        </Button>
        <Button
          onClick={() => setOpen(false)}
          colorScheme="blue"
          {...buttonStyles}
        >
          No
        </Button>
      </CustomModal>
    );
  };

  return (
    <Box>
      <Text fontSize="3xl" mb={2}>
        Settings
      </Text>
      <Divider mb={1} />
      <Table variant="simple">
        <TableBody>
          {/* Profile Details */}
          <TableRow {...tableRowStyles}>
            <TableCell>
              <Text {...cellTextStyles}>Profile</Text>
              <Text {...cellDescriptionStyles}>
                Display and edit your profile details.
              </Text>
            </TableCell>
            <TableCell>
              <Link to={`/settings/edit_profile/${userName}`}>
                <Button colorScheme="blue" {...buttonStyles}>
                  Edit Profile
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          {/* Logout */}
          <TableRow {...tableRowStyles}>
            <TableCell>
              <Text {...cellTextStyles}>Logout</Text>
              <Text {...cellDescriptionStyles}>
                You will be logged out of your account. All your posts will be
                safe.
              </Text>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => setIsLogoutModalOpen(true)}
                colorScheme="blue"
                {...buttonStyles}
              >
                Logout
              </Button>
            </TableCell>
          </TableRow>
          {/* Delete Account */}
          <TableRow>
            <TableCell>
              <Text fontSize="xl" mb={3}>
                Delete Account
              </Text>
              <Text fontSize="md" mb={6}>
                Your account will be deleted. You cannot retrieve your account
                whatsoever. All your details will be deleted forever.
              </Text>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                colorScheme="red"
              >
                Delete Account
              </Button>
            </TableCell>
          </TableRow>
          {/* Logout Modal */}
          <CustomModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            title="Logout"
            description="Are you sure you want to logout? You need to login to access FRIENDZONE."
            onConfirm={handleLogoutConfirm}
          />

          {/* Delete Account Modal */}
          <CustomModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Account"
            description="Are you sure you want to delete your account? This action cannot be undone."
            onConfirm={handleDeleteConfirm}
          />
        </TableBody>
      </Table>
      <DeleteModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Settings;
