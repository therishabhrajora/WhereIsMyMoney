import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../api/Context";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;