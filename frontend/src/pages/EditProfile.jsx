import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  MdClose,
  MdEdit,
  MdMoreHoriz,
  MdPerson,
  MdPublic,
  MdShare,
} from "react-icons/md";

const EditProfile = () => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4">
            {/* Profile Sidebar */}
          </div>
          <div className="col-xl-9 col-lg-8 cus-mar setting-row">
            <div className="head-area mb-6 text-start">
              <Heading as="h5">Settings</Heading>
            </div>
            <div className="single-box p-sm-5 p-3">
              <div className="row gap-6">
                <div className="col-xxl-2 col-md-3 col-sm-5 col-6 pe-0">
                  <div className="upload-single">
                    {/* Profile Image Section */}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="upload-single cover-img">
                    {/* Cover Image Section */}
                  </div>
                </div>
              </div>
            </div>
            <div className="single-box text-start p-sm-5 p-3">
              <div className="head-area mb-6">
                <Heading as="h6">General Information</Heading>
              </div>
              <form action="#" className="text-center d-grid gap-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="single-input text-start">
                      <label htmlFor="name">Name</label>
                      {/* Name Input */}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="single-input text-start">
                      <label htmlFor="number">Number</label>
                      {/* Number Input */}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="single-input text-start">
                      <label htmlFor="email">Email</label>
                      {/* Email Input */}
                    </div>
                  </div>
                  <div className="col-sm-7 col-9 mt-4">
                    <div className="single-input text-start">
                      <Heading as="h6">Bio</Heading>
                      {/* Bio Input */}
                    </div>
                  </div>
                  <div className="col-sm-5 col-3 mt-4 d-center justify-content-end">
                    <div className="single-input d-center text-start">
                      {/* Privacy and More Options */}
                    </div>
                  </div>
                  <div className="col-sm-12 mt-4">
                    <div className="btn-area text-end">
                      {/* Save Changes Button */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
