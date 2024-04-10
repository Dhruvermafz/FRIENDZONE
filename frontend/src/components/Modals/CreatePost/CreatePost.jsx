import { useState } from "react";
import { Textarea, Button, Box, Input, IconButton } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../features";
import { uploadImage } from "../../../utils";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.users);

  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    dispatch(setLoading(false));
    uploadImage(
      file,
      "postImages",
      () => dispatch(setLoading(true)),
      () => dispatch(setLoading(false)),
      (url) => setImageUrl(url)
    );
  };

  const createPost = async () => {
    // Perform API call to create a new post
    try {
      // API call to create a new post
      console.log("Creating post:", { text, imageUrl });
      // Reset form state after successful creation
      setText("");
      setImageUrl(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p="4" borderRadius="md" borderWidth="1px" boxShadow="md">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        resize="none"
      />
      <Input
        type="file"
        id="img"
        accept="image/*"
        display="none"
        onChange={(e) => uploadImageHandler(e)}
      />
      <label htmlFor="img">
        <IconButton
          as="span"
          aria-label="Upload Image"
          icon={<BsFillImageFill />}
          size="lg"
          colorScheme="blue"
          variant="outline"
          mr="2"
        />
      </label>
      {imageUrl && (
        <Box display="flex" alignItems="center" mt="2">
          <Box flex="1" fontSize="sm">
            Image
          </Box>
          <IconButton
            aria-label="Remove Image"
            icon={<HiX />}
            size="sm"
            colorScheme="red"
            onClick={() => setImageUrl(null)}
          />
        </Box>
      )}
      <Button mt="4" colorScheme="blue" onClick={createPost} isDisabled={!text}>
        Create Post
      </Button>
    </Box>
  );
};

export default CreatePost;
