import React, { useContext, useState } from "react";
import { AuthService } from "../api/apiClient"; // Update path based on your project structure
import Register from "./AuthRegister";
import Login from "./AuthLogin";
import { GlobalContext } from "../api/Context";

const Auth = () => {
    const { isAuthenticated,setIsAuthenticated} = useContext(GlobalContext);
    
    const [registerOpen, setRegisterOpen] = useState(false);
  

    const handleRegisterSuccess = (response) => {
        setRegisterOpen(false);
    }

    const handleLoginSuccess = (response) => {
        setIsAuthenticated(true);
    }

    return (
        registerOpen ?
            <Register onSwitchToLogin={() => setRegisterOpen(false)} onRegisterSuccess={handleRegisterSuccess} />
            :
            <Login onSwitchToRegister={() => setRegisterOpen(true)} onLoginSuccess={handleLoginSuccess} />

    )
};

export default Auth;
