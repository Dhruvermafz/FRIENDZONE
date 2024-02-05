import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logoutUser as googleLogout } from "../actions/authAction";
import { AiOutlineLogout } from "react-icons/ai";
import { MyContext } from "../context/MyContext";
import { userCreatedDoubtsQuery, userQuery, userSavedDoubtsQuery } from "../constants/Constants";
import { Loader as Spinner } from "../components";

function getRandomRng() {
  return Math.floor(Math.random() * 1000) + 0;
}

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();
  const { loggedUser } = useContext(MyContext);
  const User = JSON.parse(localStorage.getItem("user")) || {};

  // useEffect(() => {
  //   const query = userQuery(userId);
  //   loggedUser.fetch(query)
  //     .then((data) => {
  //       setUser(data[0]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, [userId, loggedUser]);

  // useEffect(() => {
  //   const fetchData = () => {
  //     const query = (text === "Created") ? userCreatedDoubtsQuery(userId) : userSavedDoubtsQuery(userId);
  //     loggedUser.fetch(query)
  //       .then((data) => {
  //         setDoubts(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching doubts:", error);
  //       });
  //   };
  //   fetchData();
  // }, [text, userId, loggedUser]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    googleLogout();
  };

  if (!user) {
    return <Spinner message="loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-370 2xl:h-420 bg-gradient-to-b from-sky-800 to-black">
              <img
                src={`https://picsum.photos/seed/${getRandomRng()}/1920/1080`}
                className="w-full h-370 2xl:h-420 object-cover opacity-30"
                alt="profile banner"
                loading="lazy"
              />
            </div>
            <div className="relative w-25 h-25 object-cover">
              <img
                src={user.image}
                className="w-25 h-25 -mt-10 shadow-lg object-cover rounded-full"
                alt="user pic"
                loading="lazy"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3 mb-5 dark:text-gray-50 dark:font-normal">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0">
              {userId === User.sub && (
                <button
                  type="button"
                  className="flex flex-row bg-gray-100/90 hover:bg-gray-50 p-2 rounded-lg cursor-pointer outline-none shadow-md m-2 dark:bg-gray-800 dark:text-white"
                  onClick={logout}
                >
                  <AiOutlineLogout fontSize={21} className="mr-1 dark:text-white" /> log out
                </button>
              )}
            </div>
          </div>
          {/* <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => {
                setText("Created");
                setActiveBtn("created");
              }}
              className={`${activeBtn === "created" ? activeBtnStyles : nonActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => {
                setText("Saved");
                setActiveBtn("saved");
              }}
              className={`${activeBtn === "saved" ? activeBtnStyles : nonActiveBtnStyles}`}
            >
              Saved
            </button>
          </div> */}

          {doubts?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              no doubts by this user!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
