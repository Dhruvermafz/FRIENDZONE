import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { setFollowers, setFollowing } from "../../utils";
import { MyContext } from "../../context/MyContext";
import {
  DisplayUsersModal,
  EditProfileModal,
  PostCard,
} from "../../components";
import { useState } from "react";

const Profile = () => {
  const { userName } = useParams();
  const { loggedUser } = useContext(MyContext);

  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.users);
  const { allPosts } = useSelector((state) => state.posts);

  const [viewUsersModal, setViewUsersModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", users: [] });
  const [viewEditModal, setViewEditModal] = useState(false);

  const profile = allUsers && allUsers[userName];

  //handle signout
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint to clear the session
      const { data } = await axios.post(`${API_BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });

      // Remove user data from local storage
      localStorage.removeItem("userInfo");

      // Show a success toast message to the user
      toast({
        title: `${data.message}`,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });

      // Navigate the user to the signin page after successful logout
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  //handle following
  const followHandler = () => {
    //Increase follower in the followed user a/c
    setFollowers(profile, loggedUser.userName, "inc");

    //increase following in the active user a/c
    const activeUserProfile = allUsers[loggedUser.userName];
    setFollowing(activeUserProfile, userName, "inc");
  };

  // handle unfollowing
  const unfollowHandler = () => {
    //Decrease follower in the followed user a/c
    setFollowers(profile, loggedUser.userName, "dec");

    //Decrease following in the active user a/c
    const activeUserProfile = allUsers[loggedUser.userName];
    setFollowing(activeUserProfile, userName, "dec");
  };

  //display specific users through modal
  const displayUsers = (type) => {
    setViewUsersModal(true);

    const standardTitle =
      type.slice(0, 1).toUpperCase() + type.slice(1, type.length).toLowerCase();

    if (profile[type]) {
      setModalInfo((prev) => ({
        ...prev,
        title: standardTitle,
        users: profile[type],
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

  const closeEditModal = () => {
    setViewEditModal(false);
  };

  if (!profile) {
    return;
  }

  //posts created by user
  const profilePosts = allPosts.filter(
    (post) => post?.creator.userName === profile.userName
  );

  return (
    <>
      {viewUsersModal && (
        <DisplayUsersModal info={modalInfo} modalClose={closeUsersModal} />
      )}
      {viewEditModal && (
        <EditProfileModal profile={profile} modalClose={closeEditModal} />
      )}

      <div className="profile">
        <div className="profile-details">
          <div className="profile-avatar">
            {loggedUser && loggedUser.pic ? (
              <img src={loggedUser.pic} alt="avatar_img" />
            ) : (
              <div className="avatar-text">
                {loggedUser?.username?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <h3 className="profile-name m-xs m-x-0">{profile?.userName}</h3>

          <div className="profile-userName fw-500 secondary-text-color">
            @{userName}
          </div>

          {/* Follow   or unfollow button */}
          {loggedUser?.uid !== profile?.uid &&
            (profile?.followers?.find(
              (user) => user === loggedUser?.userName
            ) ? (
              <button
                className="btn btn-primary btn-outline m-s m-x-0"
                onClick={unfollowHandler}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="btn btn-primary m-s m-x-0"
                onClick={followHandler}
              >
                Follow
              </button>
            ))}

          {/* Active user profile buttons */}
          {loggedUser?.uid === profile?.uid && (
            <div className="m-s m-x-0">
              <button
                className="btn btn-primary mr-s"
                onClick={() => setViewEditModal(true)}
              >
                Edit Profile
              </button>
              <div className="mt-5 flex">
                {/* Back Button for logout */}
                <Button
                  type="button"
                  // Styling for the logout button
                  className="inline-flex items-center rounded-full border border-transparent bg-transparent text-text-color shadow-sm hover:bg-primary-shade focus:outline-none focus:ring-2 border-white p-2"
                >
                  {/* Render the logout icon */}
                  <BiLogOut
                    className="h-5 w-5"
                    aria-hidden="true"
                    handleLogout={handleLogout}
                  />
                </Button>
              </div>
            </div>
          )}

          {profile?.bio && <div className="profile-bio">{profile?.bio}</div>}
          {profile?.website && (
            <a
              href={profile?.website}
              target="_blank"
              rel="noreferrer"
              className="profile-website"
            >
              {profile?.website}
            </a>
          )}
          <div className="profile-stats">
            <div className="stats-box">
              <span>{profile?.followers ? profile?.followers?.length : 0}</span>
              <span
                className="primary-text-color cursor stats-link"
                onClick={() => displayUsers("followers")}
              >
                Followers
              </span>
            </div>
            <div className="stats-box">
              <span>{profile?.posts ? profile?.posts?.length : 0}</span>
              <span>Posts</span>
            </div>
            <div className="stats-box">
              <span>{profile?.following ? profile?.following?.length : 0}</span>
              <span
                className="primary-text-color cursor stats-link"
                onClick={() => displayUsers("following")}
              >
                Following
              </span>
            </div>
          </div>
        </div>

        <h4 className="profile-posts-title">All Posts</h4>
        <div className="profile-posts">
          {profilePosts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
