import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Friends, Home, Notifications, SignIn, SignUp } from "../pages";
import Photos from "../pages/Photos";
import { ProfileCard, CreatePost } from "../components";
import CreatePin from "../pages/CreatePost";
import Bookmark from "../pages/Bookmark/Bookmark";
import About from "../pages/About";
import UserProfile from "../pages/UserProfile";

import Profile from "../components/ProfileCard/Profile";
import Settings from "../components/Settings/Settings";
import MyZone from "../pages/MyZone";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Photos />,
      },
      {
        path: "/myzone",
        element: <MyZone />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile/:username",
        element: <Profile/>,
      
      },
      {
        path: "/bookmark",
        element: <Bookmark/>,
      },
      {
        path: "/create-post",
        element: <CreatePin/>
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/settings",
        element: <Settings/>
      }
    
    ],
  },
  {
    path: "/signup/",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
