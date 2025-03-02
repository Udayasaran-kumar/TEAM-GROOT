import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // ✅ Allow access if user exists OR token is present
  return user || token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
