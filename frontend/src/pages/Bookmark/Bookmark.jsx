import { useEffect, useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../components";
import axios from "axios";
import { Button } from "@chakra-ui/react"; // Import Chakra UI components
import { AiOutlineBook } from "react-icons/ai"; // Import Chakra Icons
import { API_URL } from "../../utils/config";

const Bookmark = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(MyContext);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      fetchBookmarkedPosts();
    }
  }, [loggedUser]);

  const fetchBookmarkedPosts = async () => {
    try {
      const response = await axios.get("/bookmark");
      setBookmarkedPosts(response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarked posts:", error);
    }
  };

  const handleBookmarkToggle = async (postId) => {
    try {
      const response = await axios.post(`/${API_URL}/bookmark`, { postId });
      setBookmarkedPosts(response.data.bookmarks);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  if (!loggedUser) {
    navigate("/login");
    return null;
  }

  if (!bookmarkedPosts.length) {
    return (
      <div className="main-wrapper">
        <div className="text-white text-center">No posts added to bookmark</div>
        <Button
          onClick={() => navigate("/")}
          style={{ colorScheme: "primary" }}
        >
          Add Some
        </Button>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div class="filter-head mb-6 d-center justify-content-between">
        <h5>All</h5>
        <Button leftIcon={<AiOutlineBook />} variant="link">
          Filter
        </Button>
      </div>
      {bookmarkedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onBookmarkToggle={() => handleBookmarkToggle(post.id)}
          isBookmarked={true}
        />
      ))}
    </div>
  );
};

export default Bookmark;
