import React, { useState } from 'react';
import {
  Button,
  Flex,
  Select,
} from '@chakra-ui/react';
import { AiOutlineClockCircle, AiOutlineLike, AiOutlineComment } from 'react-icons/ai';

const PostGrid = ({ onCreatePost }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortBy = (option) => {
    setSortOption(option);
    // Handle sorting logic here based on the selected option
  };

  return (
   
     <div className="bg-main-shade py-4 w-full my-5 rounded-md flex flex-col divide-y divide-white space-y-5 drop-shadow-lg">
    <Flex alignItems="center">
      {/* Column for Create Post Button */}
      <Button colorScheme="teal" onClick={onCreatePost} mr={5}>
        Create Post
      </Button>

      {/* Column for Sorting Options */}
      <Select value={sortOption} onChange={(e) => handleSortBy(e.target.value)}>
       
        <option value="latest">
          <AiOutlineClockCircle style={{ marginRight: '5px' }} />
          Sort by Latest
        </option>
        <option value="earliest">
          <AiOutlineClockCircle style={{ marginRight: '5px' }} />
          Sort by Earliest
        </option>
        <option value="likes">
          <AiOutlineLike style={{ marginRight: '5px' }} />
          Sort by Likes
        </option>
        <option value="comments">
          <AiOutlineComment style={{ marginRight: '5px' }} />
          Sort by Comments
        </option>
      </Select>
    </Flex>
    
  
   </div>
  );
};

export default PostGrid;
