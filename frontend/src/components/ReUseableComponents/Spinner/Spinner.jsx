import { Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#0445fc"
      size="xl"
    />
  );
};

export default Spinner;
