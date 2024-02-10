// Import necessary dependencies and components
import { notifications } from "../constants/Constants";
import { Notification } from "../components/index";
import Groups from "../components/MyZone/Groups";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { API_BASE_URL } from "../utils/config";

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
      {/* Main content area */}
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none custom-scrollbar">
        {/* Absolute positioning for padding on the sides */}
        <div className="absolute inset-0 md:py-5 px-1 sm:px-6 lg:px-8 ">
          {/* Container with rounded corners */}
          <div className="h-full rounded-lg sm:mt-0 mt-4">
            {/* Overflow and background styling */}
            <div className="overflow-hidden bg-main-shade shadow sm:rounded-md">
              {/* Unordered list to display notifications */}
              <ul role="list" className="divide-y divide-gray-200 ">
                {/* Map through the notifications and render Notification component for each */}
                {zone.length > 0 ? (
                  zone.map((zones) => (
                    <Groups
                      key={zones._id} // Unique key for React rendering
                      zone={zones} // Pass the notification object to Notification component
                    />
                  ))
                ) : (
                  <div className="text-white text-center">
                    No new Zones for you, add some.
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* End main area */}
      </main>
    </>
  );
};

export default MyZone;
