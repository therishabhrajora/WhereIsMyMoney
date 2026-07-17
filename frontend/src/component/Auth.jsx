import React, { useContext, useState } from "react";
import { AuthService, RecordService } from "../api/apiClient"; // Update path based on your project structure
import Register from "./AuthRegister";
import Login from "./AuthLogin";
import { GlobalContext } from "../api/Context";

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, handleMessages, setLoading } =
    useContext(GlobalContext);

  const [registerOpen, setRegisterOpen] = useState(false);

  const handleRegisterSuccess = (response) => {
    setRegisterOpen(false);
  };

  const handleLoginSuccess = (response) => {
    const fetchRecords = async () => {
      try {
        // 1. Await your API call to resolve the promise safely
        const records = await RecordService.getRecords();
        if (records && records.length > 0) {
            for(let r of records){
                console.log(r);
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
    console.log(token);

    if (token) {
      setIsAuthenticated(true);
      fetchRecords();
    } 
    setIsAuthenticated(true);
  };

  return registerOpen ? (
    <Register
      onSwitchToLogin={() => setRegisterOpen(false)}
      onRegisterSuccess={handleRegisterSuccess}
    />
  ) : (
    <Login
      onSwitchToRegister={() => setRegisterOpen(true)}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};

export default Auth;
