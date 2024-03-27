import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";
import { Container, Heading } from "@chakra-ui/react";
import CreateGroup from "../components/MyZone/Zone/CreateGroup";
import { API_BASE_URL } from "../utils/config";
import TabsComponent from "../components/MyZone/TabsComponent";
import Group from "../components/MyZone/Group";
const GroupComponent = () => {
  const { setZone, socket } = useContext(MyContext);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/groups`, {
        withCredentials: true,
      });
      setGroups(data.groups);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on("new groups", () => {
      fetchGroups();
    });
  }, [socket]);

  return (
    <Container maxW="container.xl">
      <Heading as="h1" mb="5">
        Group
      </Heading>
      <CreateGroup />
      <TabsComponent />
      <div className="row">
        {groups.map((group) => (
          <div className="col-xl-4 col-sm-6 col-8" key={group._id}>
            <Group
              groupName={group.name}
              groupType={group.type}
              memberCount={group.members.length}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GroupComponent;
