import React, { useState, useContext } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// assuming you have a context named MyContext
import { MyContext } from "../../context/MyContext";
const Profile = ({ type, handler }) => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(MyContext); // Accessing user data from context
  const [open, setOpen] = useState(false);

  const getRandomRng = () => {
    return Math.floor(Math.random() * 1000) + 0;
  };

  const navigateHandler = (userName) => {
    navigate(`/profile/${userName}`);
  };

  const randomImage = `https://picsum.photos/seed/${getRandomRng()}/1920/1080`;

  return (
    <div className="flex justify-start items-center flex-col h-screen h-[100%] sm:h-[100%] md:h-[100%]">
      <div className="relative w-full h-full">
        <img
          src={randomImage}
          className="w-full h-full object-cover blur-sm"
          loading="lazy"
          alt="random bg"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay/50">
          <div className="p-5">
            <div className="max-w-xs border-t-4 border-sky-600 rounded w-full">
              <div className="bg-white shadow-xl py-3 rounded-b-lg dark:bg-gray-800">
                <div className="photo-wrapper p-2">
                  <div
                    className="rounded-full shadow-sm w-28 h-28 mx-auto mt-2"
                    loading="lazy"
                    onClick={() => navigateHandler(loggedUser?.username)}
                  >
                    {loggedUser?.pic ? (
                      <img src={loggedUser?.pic} alt="avatar-img" />
                    ) : (
                      <h5 className="profile-card-text-avatar">
                        {loggedUser?.name?.slice(0, 1).toUpperCase()}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center p-2 text-center">
                  <div
                    className="profile-card-details cursor"
                    onClick={() => navigateHandler(loggedUser?.username)}
                  >
                    <div className="fw-500">{loggedUser?.name}</div>
                    <div className="profile-card-userName">@{loggedUser?.username}</div>
                  </div>
                  <div className="w-[90%] bg-sky-600/50 h-[1px] m-2"></div>
                  <div className="flex flex-row w-full cursor-pointer text-3xl items-center justify-center dark:text-gray-50/50">
                    {type === "suggest" && (
                      <div
                        className="profile-card-follow-btn"
                        data-info="Follow"
                        onClick={() => handler(loggedUser)}
                      >
                        <AiOutlineUserAdd />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
