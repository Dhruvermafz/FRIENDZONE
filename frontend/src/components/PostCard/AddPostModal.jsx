import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { InputFile } from '../index'; // Assuming you have an InputFile component

const AddPostModal = ({ onSubmit, onClose }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Call the onSubmit function with caption and file
    onSubmit({ caption, file });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Caption</FormLabel>
            <Textarea
              placeholder="Enter your caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Upload File</FormLabel>
            <InputFile onChange={handleFileChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            <AiOutlineSend /> Post
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
