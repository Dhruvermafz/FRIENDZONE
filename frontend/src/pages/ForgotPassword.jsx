import { useContext, useState } from "react";
import {
  FormInput,
  PrimaryButton,
  Form,
  FormHeader,
  AuthContainer,
  Logo,
  DeveloperSlogan,
} from "../components";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { REACT_APP_API_URL } from "../utils/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(MyContext);

  const handleSendOtp = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL}/auth/forgot-password`,
        { email }
      );

      // Display success message
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      // Display error message
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL}/auth/reset-password`,
        { email, otp, newPassword }
      );

      // Display success message
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      // Display error message
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-auth-bg-image  bg-cover bg-top group flex flex-col items-center justify-center">
      <AuthContainer>
        <Logo />
        <FormHeader
          headline="Forgot Password?"
          text="Back to Sign In"
          to="/signin"
        />

        <Form submitHandler={handleSendOtp}>
          <FormInput
            labelName="Email Address"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PrimaryButton type="submit">Send OTP</PrimaryButton>
        </Form>

        <Form submitHandler={handleResetPassword}>
          <FormInput
            labelName="OTP"
            id="otp"
            name="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <FormInput
            labelName="New Password"
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PrimaryButton type="submit">Reset Password</PrimaryButton>
        </Form>

        <DeveloperSlogan />
      </AuthContainer>
    </div>
  );
};

export default ForgotPassword;
