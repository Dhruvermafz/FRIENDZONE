import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineSend,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { HiDotsHorizontal, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MyContext } from "../../context/MyContext";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Image,
  Flex,
  Text,
  Avatar,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";

const Feed = ({ feed }) => {
  const [showModal, setShowModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const { loggedUser } = useContext(MyContext);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const sharingHandler = (s) => {
    navigator.clipboard.writeText(`https://friendzone-social.vercel.app${s}`);
    toast.success(`Your link has been copied to your Clipboard. Enjoy!`);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Flex className="bg-main-shade w-full h-auto rounded-md flex flex-col text-text-color py-5 my-2 border border-cyan-400">
      <Flex justifyContent="space-between" alignItems="center" px={2} mb={4}>
        <Flex>
          <Avatar src={feed.owner.pic} />
          <Text ml={3} fontWeight="bold" textTransform="uppercase">
            <Link to={`/profile/${feed.owner.username}`}>
              {feed.owner.username}
            </Link>
          </Text>
        </Flex>
        <Flex>
          <IconButton
            aria-label="Options"
            icon={<HiDotsHorizontal />}
            onClick={() => setShowModal(true)}
            variant="ghost"
            colorScheme="gray"
            size="sm"
            mr={1}
          />
          <Menu isOpen={showModal} onClose={() => setShowModal(false)}>
            <MenuButton
              as={Button}
              rightIcon={<HiDotsHorizontal />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
            >
              Public
            </MenuButton>
            <MenuList>
              <MenuItem>Public</MenuItem>
              <MenuItem>Only me</MenuItem>
              <MenuItem>Share</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Text px={4} mb={2}>
        {feed.content.caption}
      </Text>
      <Image
        src={feed.content.pic}
        alt=""
        w="full"
        objectFit="cover"
        roundedBottom="md"
      />
      <Flex justifyContent="space-between" alignItems="center" px={2} pt={4}>
        <IconButton
          icon={isLiked ? <AiOutlineLike /> : <AiOutlineLike />}
          onClick={handleLike}
          size="lg"
          variant="ghost"
          colorScheme={isLiked ? "primary" : "gray"}
        />
        <IconButton
          icon={<AiOutlineShareAlt />}
          onClick={() =>
            sharingHandler(
              `/user/${feed.owner.usernamereplaceAll(" ", "-")}/${post.id}`
            )
          }
          size="lg"
          variant="ghost"
          colorScheme="gray"
        />
        <IconButton
          icon={isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          onClick={toggleBookmark}
          size="lg"
          variant="ghost"
          colorScheme={isBookmarked ? "primary" : "gray"}
        />
      </Flex>
      <Flex px={2} pt={5}>
        <Avatar src={loggedUser?.pic} />
        <Flex flex={1} alignItems="center" justify="center" px={2}>
          <Input
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            size="sm"
            variant="outline"
            focusBorderColor="primary"
          />
          <Spacer />
          <IconButton
            icon={<AiOutlineSend />}
            onClick={addComments}
            variant="outline"
            colorScheme="primary"
            size="sm"
          />
        </Flex>
      </Flex>
      <Flex px={4} my={5} justifyContent="space-between" alignItems="center">
        <Flex
          onClick={() => setOpenComments(!openComments)}
          cursor="pointer"
          fontWeight="bold"
          alignItems="center"
          transition="color 0.3s"
        >
          View Comments{" "}
          {openComments ? <IoIosArrowUp ml={1} /> : <IoIosArrowDown ml={1} />}
        </Flex>
        <Text fontWeight="bold">
          {postComments.length === 0
            ? "No Comments Yet"
            : postComments.length + " comments"}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        w="full"
        px={3}
        my={5}
        display={openComments ? "flex" : "none"}
      >
        {postComments?.map((comment) => (
          <Flex
            key={comment._id}
            bg="seconday-shade"
            rounded="md"
            px={2}
            py={2}
            my={5}
          >
            <Avatar src={comment?.postedBy?.pic} />
            <Flex flexDirection="column" ml={2} textTransform="uppercase">
              <Text fontWeight="bold">{comment?.postedBy?.username}</Text>
              <Text bg="main-shade" rounded="md" py={2} pl={5} w="full">
                {comment?.text}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

Feed.propTypes = {
  feed: PropTypes.object.isRequired,
};

export default Feed;
