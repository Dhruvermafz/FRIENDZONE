import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { API_BASE_URL } from "../utils/config";
import CreateGroup from "../components/MyZone/Zone/CreateGroup";

// Notifications component displays a list of notifications
const MyZone = () => {
  const { zone, setZone, socket } = useContext(MyContext);

  const fetchZones = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/zones`, {
        withCredentials: true,
      });
      console.log("zone--> ", data.zone);
      setZone(data.zone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  useEffect(() => {
    socket.on("new zones", () => {
      fetchZones();
    });
  }, [socket]);

  return (
    <>
      
    {/* <!-- Main Content start --> */}
    <main class="main-content">
        <div class="container">
            <div class="row">
               
                <div class="col-xl-9 col-lg-8">
                    <div class="head-area mb-5">
                        <h6>Pages</h6>
                    </div>
                   <CreateGroup/>
                </div>
            </div>
        </div>
    </main>
    {/* <!-- Main Content end --> */}
    </>
  );
};

export default MyZone;
