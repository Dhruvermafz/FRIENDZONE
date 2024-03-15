import "../Pages.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../components";
import axios from "axios"; // Import axios for making HTTP requests
import { API_URL } from "../../utils/config";

const Bookmark = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(MyContext);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    // Fetch bookmarked posts when the component mounts
    if (loggedUser) {
      fetchBookmarkedPosts();
    }
  }, [loggedUser]); // Fetch only when loggedUser changes

  // Function to fetch bookmarked posts
  const fetchBookmarkedPosts = async () => {
    try {
      const response = await axios.get("/bookmark");
      setBookmarkedPosts(response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarked posts:", error);
    }
  };

  // Function to handle bookmark toggle
  const handleBookmarkToggle = async (postId) => {
    try {
      const response = await axios.post(`/${API_URL}/bookmark`, { postId });
      // Update bookmarked posts state based on response
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
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Add Some
        </button>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
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
