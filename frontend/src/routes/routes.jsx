import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Friends, Home, Notifications, SignIn, SignUp } from "../pages";
import Photos from "../pages/Photos";
import { ProfileCard } from "../components";

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
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile/:userName",
        element: <ProfileCard/>,
      
      }
    
    ],
  },
  {
    path: "/signUp/",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
]);

export default router;
