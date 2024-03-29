import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import "../../utils/";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsThreeDots, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiOutlineSend,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineShareAlt,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { Button } from "../index";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";

const Feed = ({ feed }) => {
  // Define states and context
  const [showModal, setShowModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const { loggedUser } = useContext(MyContext);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Function to add comments
  const addComments = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/add-comment`,
        {
          comment,
          post: feed,
        },
        { withCredentials: true }
      );
      setPostComments(response.data.thisPost.comments);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPostComments(feed.comments);
    setIsBookmarked(feed.isBookmarked);
    setIsOwner(feed.owner._id === loggedUser?._id);
  }, []);

  const toggleBookmark = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/toggle-bookmark/${feed._id}`
      );
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle edit action
  const handleEdit = () => {
    console.log("Edit");
  };

  // Function to handle delete action
  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReport = () => {
    // Implement report logic here
    console.log("Report");
  };
  const sharingHandler = (s) => {
    // console.log(`https://blogweet.vercel.app${s}`);
    navigator.clipboard.writeText(`https://friendzone-social.vercel.app${s}`);
    toast.success(`Your link has been pasted to your Clipboard. Enjoy!`);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // JSX rendering
  return (
    <div className="bg-main-shade w-full h-auto rounded-md flex flex-col text-text-color py-5 my-2 border border-cyan-400">
      <div>
        <div className="flex items-center justify-between px-2 mb-4 duration-500">
          <div className="flex flex-row">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full object-cover"
                src={feed.owner.pic}
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="flex flex-row justify-between w-full">
                <Link to={`/profile/${feed.owner.username}`}>
                  <p className="text-sm font-bold uppercase">
                    {feed.owner.username}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-bold items-end">
            {/* Three dots menu */}
            <div className="relative">
              <BsThreeDots
                className="cursor-pointer"
                onClick={() => setShowModal(true)}
              />
              {showModal && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {isOwner && (
                      <>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<HiDotsHorizontal />}
                          >
                            <HiOutlineUserCircle /> Public
                          </MenuButton>
                          <MenuList>
                            <MenuItem>
                              <HiOutlineUserCircle /> Public
                            </MenuItem>
                            <MenuItem>
                              <HiOutlineUserCircle /> Only me
                            </MenuItem>
                            <MenuItem>
                              <HiOutlineUserCircle /> Share
                            </MenuItem>
                          </MenuList>
                        </Menu>
                        {/* <button
                          onClick={handleEdit}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Delete
                        </button> */}
                      </>
                    )}
                    <button
                      onClick={handleReport}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Report Post
                    </button>
                    <button
                      onClick={toggleBookmark}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                    </button>
                  </div>
                </div>
              )}
              <Menu>
                <MenuButton as={Button} rightIcon={<HiDotsHorizontal />}>
                  <HiOutlineUserCircle /> Public
                </MenuButton>
                <MenuList>
                  {isOwner && (
                    <>
                      <MenuItem onClick={handleEdit}>
                        <HiOutlineUserCircle /> Public
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <HiOutlineUserCircle /> Only me
                      </MenuItem>
                      <MenuItem onClick={handleReport}>
                        <HiOutlineUserCircle /> Share
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={handleReport}>Report Post</MenuItem>
                  <MenuItem onClick={toggleBookmark}>
                    {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mb-2">{feed.content.caption}</div>
        <img
          className="w-full object-cover rounded-br-md rounded-bl-md"
          src={feed.content.pic}
        />
        <div className="flex flex-row w-full items-center justify-between px-2 pt-4">
          <span
            onClick={handleLike}
            className="flex flex-row items-center justify-center"
          >
            {isLiked ? (
              <AiOutlineLike className="w-7 h-7 text-primary-shade" />
            ) : (
              <AiOutlineLike className="w-7 h-7" />
            )}
          </span>
          <span className="flex flex-row items-center justify-center">
            <button
              className="expandElement"
              onClick={() =>
                sharingHandler(
                  `/user/${feed.owner.usernamereplaceAll(" ", "-")}/${post.id}`
                )
              }
            >
              <AiOutlineShareAlt className="w-5 h-5" />
            </button>
          </span>
          <span
            onClick={toggleBookmark}
            className="flex flex-row items-center justify-center"
          >
            {isBookmarked ? (
              <BsBookmarkFill className="w-7 h-7 text-primary-shade" />
            ) : (
              <BsBookmark className="w-7 h-7" />
            )}
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center px-2 w-full pt-5">
          <img
            className="inline-block w-9 rounded-full object-cover h-9"
            src={loggedUser?.pic}
            alt=""
          />
          <div className="flex flex-1 items-center justify-center px-2 w-full">
            <div className="w-full">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineComment
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md font-bold border border-transparent bg-seconday-shade text-text-color py-2 pl-10 pr-3 text-sm sm:text-sm"
                  placeholder={`Comment...`}
                  type="search"
                  autoComplete="off"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-primary-shade text-white shadow-sm focus:outline-none focus:ring-2 border-white p-1"
                    clickHandler={addComments}
                  >
                    <AiOutlineSend className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between px-4 my-5">
          <div
            onClick={() => setOpenComments(!openComments)}
            className={`flex flex-row items-center font-bold  duration-500 cursor-pointer ${
              postComments.length > 0 ? "" : "hidden"
            } `}
          >
            View Comments
            {openComments ? (
              <IoIosArrowUp className="ml-1" />
            ) : (
              <IoIosArrowDown className="ml-1" />
            )}
          </div>
          <div className="font-bold">
            {postComments.length === 0
              ? "No Comments Yet"
              : postComments.length + " comments"}
          </div>
        </div>
        <div
          className={`${
            openComments ? "flex" : "hidden"
          }  flex-col w-full px-3 my-5`}
        >
          {postComments?.map((comment) => (
            <div
              key={comment._id}
              className="my-5 bg-seconday-shade rounded-md px-2 py-2"
            >
              <div className="flex flex-row items-center justify-start my-2">
                <img
                  className="inline-block w-9 rounded-full object-cover h-9"
                  src={comment?.postedBy?.pic}
                  alt=""
                />
                <div className="flex flex-col items-start justify-start ml-2 uppercase">
                  <div className="font-bold text-sm">
                    {comment?.postedBy?.username}
                  </div>
                </div>
              </div>
              <div className="w-full py-2 pl-5 rounded-md bg-main-shade">
                {comment?.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define prop types for the Feed component
Feed.propTypes = {
  feed: PropTypes.object.isRequired,
};

export default Feed;
