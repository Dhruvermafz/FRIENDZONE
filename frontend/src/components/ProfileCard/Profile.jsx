import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { MyContext } from "../../context/MyContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { API_BASE_URL } from "../../utils/config";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { loggedUser } = useContext(MyContext);
  const params = useParams();
  const toast = useToast();
  const [viewUsersModal, setViewUsersModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", users: [] });
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/${params.username}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [params.username]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      localStorage.removeItem("userInfo");
      toast({
        title: `${data.message}`,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const clickfollow = () => {
    // Handle follow/unfollow logic here
  };

  const displayUsers = (type) => {
    setViewUsersModal(true);
    const standardTitle =
      type.slice(0, 1).toUpperCase() + type.slice(1, type.length).toLowerCase();

    if (userProfile[type]) {
      setModalInfo((prev) => ({
        ...prev,
        title: standardTitle,
        users: userProfile[type],
      }));
    } else {
      setModalInfo((prev) => ({
        ...prev,
        title: standardTitle,
        users: [],
      }));
    }
  };

  const closeUsersModal = () => {
    setViewUsersModal(false);
  };

  return (
    <div
      style={{
        background: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%230098e3" fill-opacity="1" d="M0,224L120,208C240,192,480,160,720,170.7C960,181,1200,235,1320,261.3L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z%22%3E%3C/path%3E%3C/svg%3E')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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
              <div className="relative w-25 h-25 object-cover">
                <img
                  src={userProfile?.pic || loggedUser?.pic}
                  className="w-25 h-25 -mt-10 shadow-lg object-cover rounded-full"
                  alt="user pic"
                  loading="lazy"
                />
              </div>
            </Box>
            <Stack spacing={3} w="50%">
              <Heading mt={3} mb={4} style={{ colorScheme: "dark" }}>
                {userProfile?.username || loggedUser?.username}
              </Heading>
              <Flex mb={3} mt={2}>
                <Flex me={4}>
                  <Text me={1}>
                    {userProfile?.followers
                      ? userProfile?.followers?.length
                      : 0}
                  </Text>
                  <Text>followers</Text>
                </Flex>
                <Flex me={4}>
                  <Text me={1}>
                    {userProfile?.following
                      ? userProfile?.following?.length
                      : 0}
                  </Text>
                  <Text>following</Text>
                </Flex>
              </Flex>
              {loggedUser?.id === params.id && (
                <Button
                  onClick={() =>
                    navigate(`/settings/edit_profile/${loggedUser?.username}`)
                  }
                  style={{ colorScheme: "dark" }}
                >
                  Edit profile
                </Button>
              )}
              {loggedUser?.id !== params.id && (
                <Button onClick={clickfollow} colorScheme="success">
                  <AiOutlineUserAdd />
                  {userProfile?.followers?.includes(loggedUser?.username)
                    ? "Unfollow"
                    : "Follow"}
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
