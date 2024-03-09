import axios from "axios";
import { API_BASE_URL } from "../utils/config";

const postService = {
  likePost: async (postId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/like/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  },

  dislikePost: async (postId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/dislike/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error disliking post:", error);
      throw error;
    }
  },

  addComment: async (postId, comment) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/add-comment/${postId}`,
        { comment }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  sharePost: async (postId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/share/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error sharing post:", error);
      throw error;
    }
  },

  reportPost: async (postId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/report/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error reporting post:", error);
      throw error;
    }
  },

  // Add more functions as needed for other operations
};

export default postService;
