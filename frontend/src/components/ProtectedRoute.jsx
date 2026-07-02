import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { authLoading, isAuthenticated, user } = useAuth();
  if (authLoading) {
    return (
      <main className="grid min-h-screen place-items-center p-4 text-center">
        <div className="royal-panel p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Admin</p>
          <h1 className="mt-2 font-display text-3xl text-white">Loading dashboard...</h1>
        </div>
      </main>
    );
  }
  return isAuthenticated && user?.isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
