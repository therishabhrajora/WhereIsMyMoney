import React, { useContext, useState } from "react";
import { AuthService, RecordService } from "../../api/apiClient"; // Update path based on your project structure
import Register from "./AuthRegister";
import Login from "./AuthLogin";
import { GlobalContext } from "../../api/Context";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, handleMessages, setLoading } =
    useContext(GlobalContext);

  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleRegisterSuccess = (response) => {
    setRegisterOpen(false);
  };


  const handleForgotPasswordSuccess = (response) => {
    setForgotPasswordOpen(false);
  }

  const handleLoginSuccess = (response) => {
    const fetchRecords = async () => {
      try {
        // 1. Await your API call to resolve the promise safely
        const records = await RecordService.getRecords();
        const data = records.data;
        if (data && data.length > 0) {
          for (let r of data) {

            handleMessages(r);
          }

        }
        // 2. Process your records cleanly
      } catch (error) {
        console.error(
          "Failed to load records on initial mount:",
          error.message,
        );
      }
    };
    const token = localStorage.getItem("token");


    if (token) {
      setIsAuthenticated(true);
      fetchRecords();
    }
    setIsAuthenticated(true);
  };

  if (registerOpen) {
    return <Register
      onSwitchToLogin={() => setRegisterOpen(false)}
      onRegisterSuccess={handleRegisterSuccess}
    />
  } else if (forgotPasswordOpen) {
    return <ForgotPassword
      onSwitchToLogin={() => setForgotPasswordOpen(false)}
      onForgotpasswordSuccess={handleForgotPasswordSuccess}
    />
  } else {
    return <Login
      onSwitchToRegister={() => setRegisterOpen(true)}
      onLoginSuccess={handleLoginSuccess}
      onSwitchToForgotPassword={() => setForgotPasswordOpen(true)}
    />
  }
};

export default Auth;
