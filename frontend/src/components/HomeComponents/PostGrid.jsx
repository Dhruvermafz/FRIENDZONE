import React, { useState } from "react";
import { Button, Flex, Select } from "@chakra-ui/react";
import {
  AiOutlineClockCircle,
  AiOutlineLike,
  AiOutlineComment,
} from "react-icons/ai";

const PostGrid = ({ onCreatePost }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortBy = (option) => {
    setSortOption(option);
    // Handle sorting logic here based on the selected option
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={4}
      my={5}
      bg="main-shade"
      rounded="md"
      boxShadow="lg"
    >
      {/* Column for Create Post Button */}
      <Button colorScheme="teal" onClick={onCreatePost}>
        Create Post
      </Button>

      {/* Column for Sorting Options */}
      <Select
        value={sortOption}
        onChange={(e) => handleSortBy(e.target.value)}
        bg="white"
        color="text-color"
        borderColor="transparent"
        fontWeight="bold"
        focusBorderColor="primary-shade"
      >
        <option value="latest">
          <AiOutlineClockCircle style={{ marginRight: "5px" }} />
          Sort by Latest
        </option>
        <option value="earliest">
          <AiOutlineClockCircle style={{ marginRight: "5px" }} />
          Sort by Earliest
        </option>
        <option value="likes">
          <AiOutlineLike style={{ marginRight: "5px" }} />
          Sort by Likes
        </option>
        <option value="comments">
          <AiOutlineComment style={{ marginRight: "5px" }} />
          Sort by Comments
        </option>
      </Select>
    </Flex>
  );
};

export default PostGrid;
