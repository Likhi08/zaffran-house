import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
