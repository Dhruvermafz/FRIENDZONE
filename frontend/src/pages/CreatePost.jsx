import React, { useState, useContext } from "react";
import { useNavigate as useHistory } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { MyContext } from "../context/MyContext";
const CreatePost = () => {
  const { loggedUser, fetchPostAgain, setFetchPostAgain } =
    useContext(MyContext);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const history = useHistory();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Caption:", caption);
    console.log("File:", file);

    // You can make a POST request to your API here
    // fetch("/api/post/add", {
    //   method: "POST",
    //   body: formData,
    // });

    // Redirect to home or another route after successful submission
    // history.push("/");
  };

  const user = {
    username: "JohnDoe", // Example username
    avatar: "https://example.com/avatar.png", // Example avatar URL
    signedIn: true, // Assume user is signed in
  };

  if (!user.signedIn) {
    history.push("/signin"); // Redirect if user is not signed in
    return null;
  }

  return (
    <Box p="4">
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
  );
};

export default CreatePost;
