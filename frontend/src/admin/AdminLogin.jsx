import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import BrandMark from "../components/BrandMark.jsx";

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await adminLogin(identifier, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="grid min-h-[80vh] place-items-center px-4 py-16">
      <form onSubmit={submit} className="royal-panel w-full max-w-md p-8">
        <div className="text-center">
          <BrandMark />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Admin Login</p>
        <h1 className="mt-3 font-display text-4xl text-white">Zaffran Control Room</h1>
        <div className="mt-8 grid gap-4">
          <input className="field" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Username" />
          <input className="field" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="btn-gold">Login</button>
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
