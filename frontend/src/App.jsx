import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingButtons from "./components/FloatingButtons.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Reservations from "./pages/Reservations.jsx";
import Rewards from "./pages/Rewards.jsx";
import Gallery from "./pages/Gallery.jsx";
import Feedback from "./pages/Feedback.jsx";
import Contact from "./pages/Contact.jsx";
import CustomerLogin from "./pages/CustomerLogin.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

const AccountRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return children;
  return <Navigate to={user?.isAdmin ? "/admin/dashboard" : "/orders"} replace />;
};

const CustomerPortalRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user?.isAdmin) return <Navigate to="/admin/dashboard" replace />;
  return children;
};

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin/dashboard");

  return (
    <div className="page-shell">
      {!isAdmin && <Navbar />}
      <div className={isAdmin ? "" : "site-stage"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CustomerPortalRoute><Home /></CustomerPortalRoute>} />
            <Route path="/about" element={<CustomerPortalRoute><About /></CustomerPortalRoute>} />
            <Route path="/menu" element={<CustomerPortalRoute><Menu /></CustomerPortalRoute>} />
            <Route path="/cart" element={<CustomerPortalRoute><Cart /></CustomerPortalRoute>} />
            <Route path="/reservations" element={<CustomerPortalRoute><Reservations /></CustomerPortalRoute>} />
            <Route path="/rewards" element={<CustomerPortalRoute><Rewards /></CustomerPortalRoute>} />
            <Route path="/gallery" element={<CustomerPortalRoute><Gallery /></CustomerPortalRoute>} />
            <Route path="/feedback" element={<CustomerPortalRoute><Feedback /></CustomerPortalRoute>} />
            <Route path="/contact" element={<CustomerPortalRoute><Contact /></CustomerPortalRoute>} />
            <Route path="/login" element={<AccountRoute><CustomerLogin /></AccountRoute>} />
            <Route path="/orders" element={<CustomerPortalRoute><OrderHistory /></CustomerPortalRoute>} />
            <Route path="/admin/login" element={<AccountRoute><CustomerLogin /></AccountRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingButtons />}
    </div>
  );
};

export default App;
