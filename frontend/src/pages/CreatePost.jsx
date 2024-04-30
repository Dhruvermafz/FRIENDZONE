import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MyContext } from "../context/MyContext";

const CreatePost = () => {
  const { loggedUser } = useContext(MyContext);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const history = useNavigate();
  const toast = useToast();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!caption || !file) {
      toast({
        title: "Error",
        description: "Please provide a caption and upload a file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle submission logic
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Display success message
      toast({
        title: "Success",
        description: "Post created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear form fields
      setCaption("");
      setFile(null);
    } catch (error) {
      // Handle error
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!loggedUser) {
    history.push("/signin"); // Redirect if user is not signed in
    return null;
  }

  return (
    <Box>
      {/* Post creation form */}
      <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md">
        <Box display="flex" alignItems="center" mb="4">
          <Avatar size="md" src={loggedUser?.pic} />
          <Text ml="2">{loggedUser.username}</Text>
        </Box>

        <FormControl mb="4">
          <FormLabel>Caption</FormLabel>
          <Textarea
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write a caption..."
            size="sm"
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Upload Image/File</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePost;
