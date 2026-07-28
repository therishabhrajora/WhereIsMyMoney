import React, { useContext, useState } from "react";
import { AuthService, RecordService } from "../../api/apiClient"; // Update path based on your project structure
import Register from "./AuthRegister";
import Login from "./AuthLogin";
import { GlobalContext } from "../../api/Context";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, handleMessages, setLoading } =
    useContext(GlobalContext);

  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleRegisterSuccess = (response) => {
    setRegisterOpen(false);
    toast.success("Account registered successfully! Please log in. 🎉");
  };


  const handleForgotPasswordSuccess = (response) => {
    setForgotPasswordOpen(false);
    toast.info("Password reset instructions sent to your email. 📬");
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
        toast.success("Welcome back! Your dashboard has been synchronized. 📈");
        // 2. Process your records cleanly
      } catch (error) {
        console.error(
          "Failed to load records on initial mount:",
          error.message,
        );
        toast.warning("Logged in, but failed to load your historical records. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token") || response?.data?.token;

    if (!token) {
      toast.error("Authentication failed: No secure session token returned.");
      return;
    }
    setIsAuthenticated(true);
    setLoading(true);
    fetchRecords()

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
