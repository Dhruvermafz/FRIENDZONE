import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Error from "../assets/error.svg";

const Error404 = () => {
  const history = useNavigate();

  const navigateToHome = () => {
    history("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      height="100vh"
    >
      <img src={Error} alt="" style={{ height: "40vh" }} />
      <Heading as="h1" size="xl" mt={3} textAlign="center">
        Oops! Something went wrong
      </Heading>
      <Button onClick={navigateToHome} mt={4} colorScheme="blue">
        Go home
      </Button>
    </Box>
  );
};

export default Error404;
