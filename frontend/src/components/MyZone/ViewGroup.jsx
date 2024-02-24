import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Join from "./Join";

const ViewGroup = ({ group, closeLargeView }) => {
  const { _id, name, description, members, course, max_members } = group;
  const host = members[0];

  const [hostProfile, setHostProfile] = useState({
    loading: true,
    success: false,
    profile: null,
  });

  const { loading, success, profile } = hostProfile;

  const getHostProfile = async (id) => {
    try {
      const res = await axios.get(`api/profile/user/${id}`);

      setHostProfile({
        loading: false,
        success: true,
        profile: res.data,
      });
    } catch (err) {
      setHostProfile({
        loading: false,
        success: false,
        profile: null,
      });
    }
  };

  useEffect(() => {
    getHostProfile(host.user);
  }, []);

  return (

    <main class="main-content">
        <div class="container">
            <div class="row">
            
              </div>
              </div>
              </main>
   
  );
};

export default ViewGroup;
