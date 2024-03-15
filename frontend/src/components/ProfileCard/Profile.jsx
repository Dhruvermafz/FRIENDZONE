import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useToast } from "@chakra-ui/react";

const Profile = ({ profile, type, handler }) => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(MyContext);
  const [isUser, setIsUser] = useState(false);
  const [value, setValue] = useState({
    user: { following: [], followers: [] },
    following: false,
  });
  const params = useParams();
  const toast = useToast();

  useEffect(() => {
    // Load user profile data and posts here
  }, []);

  const navigateHandler = (userName) => {
    navigate(`/profile/${userName}`);
  };
  function getRandomRng() {
    return Math.floor(Math.random() * 1000) + 0;
  }
  let randomImage = `https://picsum.photos/seed/${getRandomRng()}/1920/1080`;

  return (
    <div className="flex justify-start items-center flex-col h-screen h-[100%] sm:h-[100%] md:h-[100%]">
      <Flex
        justify="start"
        align="center"
        direction="column"
        h="100%"
        className="h-screen h-[100%] sm:h-[100%] md:h-[100%]"
      >
        <Box w="100%" p={5} rounded="md" bg="white" shadow="md">
          <Flex mb={5} mt={4} ms={[0, 5]} me={[0, 3]}>
            <Box me={[3, 5]}>
              <Image
                src={profile?.userName}
                alt=""
                rounded="full"
                className="profile_img"
              />
            </Box>
            <Stack spacing={3} w="50%">
              <Heading mt={3} mb={4}>
                {profile?.name}
              </Heading>
              <Flex mb={3} mt={2}>
                <Flex me={4}>
                  <Text me={1}>{value.user.followers.length}</Text>
                  <Text>followers</Text>
                </Flex>
                <Flex me={4}>
                  <Text me={1}>{value.user.following.length}</Text>
                  <Text>following</Text>
                </Flex>
              </Flex>
              {loggedUser.id === params.id && (
                <Button
                  onClick={() => navigate("/user/edit/" + loggedUser.id)}
                  colorScheme="dark"
                >
                  Edit profile
                </Button>
              )}
              {loggedUser.id !== params.id && (
                <Button
                  onClick={clickfollow}
                  colorScheme={value.following ? "danger" : "success"}
                >
                  <AiOutlineUserAdd />
                  {value.following ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Stack>
          </Flex>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Posts</Tab>
              <Tab>Followers</Tab>
              <Tab>Following</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={4} mt={4}>
                  {/* Render posts here */}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={4} mt={4}>
                  {/* Render followers here */}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={4} mt={4}>
                  {/* Render following here */}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
};

export default Profile;
