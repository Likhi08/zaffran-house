import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BrandMark from "../components/BrandMark.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CustomerLogin = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const isRegister = mode === "register";

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        await register(name, phone, password);
        navigate("/orders");
      } else {
        const signedInUser = await login(phone, password);
        navigate(signedInUser.isAdmin ? "/admin/dashboard" : "/orders");
      }
    } catch (error) {
      const firstError = error.response?.data?.errors?.[0]?.msg;
      toast.error(firstError || error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <main className="lux-section">
      <form onSubmit={submit} className="royal-panel mx-auto w-full max-w-md p-8">
        <div className="text-center">
          <BrandMark />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Account Login</p>
        <h1 className="mt-3 font-display text-4xl text-white">{isRegister ? "Create Customer Account" : "Customer / Admin Login"}</h1>
        <div className="mt-8 grid gap-4">
          {isRegister && <input className="field" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />}
          <input className="field" type={isRegister ? "tel" : "text"} required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={isRegister ? "Mobile number" : "Mobile number or admin username"} />
          <input className="field" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="btn-gold">{isRegister ? "Create Account" : "Login"}</button>
        </div>
        <button type="button" className="mt-5 text-sm font-bold text-gold" onClick={() => setMode(isRegister ? "login" : "register")}>
          {isRegister ? "Already have an account? Login" : "New customer? Create an account"}
        </button>
        <p className="mt-5 text-sm leading-6 text-white/60">
          Customers can login with mobile number. Admin can login with admin username and will go directly to the dashboard.
        </p>
        <Link to="/menu" className="mt-5 inline-block text-sm font-bold text-white/70 hover:text-gold">Continue browsing menu</Link>
      </form>
    </main>
  );
};

export default CustomerLogin;
