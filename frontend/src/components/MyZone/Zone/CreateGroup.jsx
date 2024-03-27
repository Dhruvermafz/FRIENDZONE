import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { REACT_APP_API_URL } from "../../../utils/config";
const CreateGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [privacy, setPrivacy] = useState("public"); // Default privacy is public
  const [banner, setBanner] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateZone = async () => {
    try {
      const formData = new FormData();
      formData.append("banner", banner); // Append the banner file to form data
      formData.append("privacy", privacy); // Append other zone details to form data

      const response = await axios.post(
        `${REACT_APP_API_URL}/zone/:name`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart form-data
          },
        }
      );

      console.log("Zone created:", response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating zone:", error);
    }
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]); // Set the selected file as the banner
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Button colorScheme="teal" onClick={handleOpen}>
        + Create Zone
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Zone Name</FormLabel>
              <input type="text" placeholder="Enter zone name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <textarea rows="4" placeholder="Enter zone description" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Banner</FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Privacy</FormLabel>
              <Select value={privacy} onChange={handlePrivacyChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateZone}>
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateGroup;
