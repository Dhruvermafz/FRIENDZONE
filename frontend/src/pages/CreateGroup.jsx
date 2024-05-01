import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const CreateZonePage = () => {
  const [zoneName, setZoneName] = useState("");
  const [zoneDescription, setZoneDescription] = useState("");
  const [zoneBanner, setZoneBanner] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleZoneNameChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleZoneDescriptionChange = (event) => {
    setZoneDescription(event.target.value);
  };

  const handleZoneBannerChange = (event) => {
    setZoneBanner(event.target.value);
  };

  const handleInviteEmailsChange = (event) => {
    setInviteEmails(event.target.value);
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!zoneName || !zoneDescription) {
      toast({
        title: "Error",
        description: "Please provide a zone name and description.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Submit logic
    // You can make an API call here to create the zone

    // Display success message
    toast({
      title: "Success",
      description: "Zone created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Clear form fields
    setZoneName("");
    setZoneDescription("");
    setZoneBanner("");
    setInviteEmails("");

    // Open the link modal
    onOpen();
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md">
      <Text fontSize="3xl" mb={2} color="blue.800">
        Create a New Zone
      </Text>
      <Divider mb={4} />
      <FormControl mb={4}>
        <FormLabel>Zone Name</FormLabel>
        <Input
          value={zoneName}
          onChange={handleZoneNameChange}
          placeholder="Enter zone name"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Zone Description</FormLabel>
        <Textarea
          value={zoneDescription}
          onChange={handleZoneDescriptionChange}
          placeholder="Enter zone description"
          size="sm"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Zone Banner</FormLabel>
        <Input
          value={zoneBanner}
          onChange={handleZoneBannerChange}
          placeholder="Enter URL for zone banner"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            // Perform file upload logic here
          }}
          mb={2}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invite Friends (Separate emails with commas)</FormLabel>
        <Textarea
          value={inviteEmails}
          onChange={handleInviteEmailsChange}
          placeholder="Enter email addresses of friends to invite"
          size="sm"
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Create Zone
      </Button>
      <Button as={Link} to="/zone" colorScheme="gray" ml={2}>
        Cancel
      </Button>

      {/* Link Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Share this link with your friends to invite them to the zone:
            <br />
            {/* Generate the shareable link here */}
            {/* Example: <Input value="https://example.com/zone/12345" isReadOnly /> */}
            <Input value="https://example.com/zone/12345" isReadOnly />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateZonePage;
