// PostContainer.js
import { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { BiImageAdd } from "react-icons/bi";
import { Button, InputFile } from "../index"; // Assuming you import your AddPostModal component
import AddPostModal from "../PostCard/AddPostModal";
import { MyContext } from "../../context/MyContext";
import PostFilterGrid from "./PostGrid";
const PostContainer = () => {
  const { loggedUser, fetchPostAgain, setFetchPostAgain } = useContext(MyContext);
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = ({ caption, file }) => {
    // Add your logic to handle the creation of the post
    console.log("Caption:", caption);
    console.log("File:", file);
    closeModal();
  };

  const imgUpload = (pic) => {
    setLoading(true);
    // Your image upload logic here...
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/post/create-post`,
        { caption, img },
        { withCredentials: true }
      );
      console.log(response);
      setCaption("");
      toast({
        title: `Posted`,
        status: "success",
        duration: 1800,
        position: "top",
        isClosable: true,
      });
      setFetchPostAgain(!fetchPostAgain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
       <PostFilterGrid/>
       <div className="bg-main-shade py-4 w-full my-5 rounded-md flex flex-col divide-y divide-white space-y-5 drop-shadow-lg">
   
      <div className="flex flex-row items-center px-2">
        <img className="inline-block w-9 rounded-full object-cover h-9" src={loggedUser?.pic} alt="" />
        <div className="flex flex-1 items-center justify-center px-2 w-full">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <GiWorld className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md font-bold border border-transparent bg-seconday-shade text-text-color py-2 pl-10 pr-3 text-sm sm:text-sm"
                placeholder={`What's on your mind ${loggedUser?.username.toUpperCase()}?`}
                type="search"
                autoComplete="off"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {loading ? (
                  ""
                ) : (
                  <Button
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-primary-shade text-white shadow-sm focus:outline-none focus:ring-2 border-white p-1"
                    clickHandler={createPost}
                  >
                    <AiOutlineSend className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
              <div className="absolute inset-y-0 right-6 flex items-center mr-6 ">
                <Button
                  type="button"
                  className="inline-flex items-center rounded-full border border-transparent bg-primary-shade text-white shadow-sm focus:outline-none focus:ring-2 border-white p-1"
                >
                  <BiImageAdd className="h-4 w-4" aria-hidden="true" />
                </Button>
                <InputFile
                  id="userPhoto"
                  name="userPhoto"
                  onChange={(e) => imgUpload(e.target.files[0])}
                />
              </div>
              <div className="absolute inset-y-0 right-6 flex items-center pr-6">
                <Button
                  type="button"
                  className="inline-flex items-center rounded-full border border-transparent bg-primary-shade text-white shadow-sm focus:outline-none focus:ring-2 border-white p-1"
                >
                  <BiImageAdd className="h-4 w-4" aria-hidden="true" />
                </Button>
                <InputFile
                  id="userPhoto"
                  name="userPhoto"
                  onChange={(e) => console.log("image uploaded")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddPostModal onSubmit={handleCreatePost} onClose={closeModal} />
      )}
    </div>
    </>
    
  );
};

export default PostContainer;
