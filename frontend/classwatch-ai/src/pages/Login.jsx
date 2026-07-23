import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuShieldCheck, LuLock, LuMail, LuEye, LuEyeOff, LuLoaderCircle } from "react-icons/lu";
import { loginRequest } from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#05070c] flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#e5e9f0 1px, transparent 1px), linear-gradient(90deg, #e5e9f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow mb-4">
            <LuShieldCheck size={22} className="text-white" />
          </div>
          <h1 className="text-[15px] font-semibold tracking-wide text-gray-100">
            Class<span className="text-accent-glow">Watch</span>
            <span className="text-gray-500 font-normal"> AI</span>
          </h1>
          <p className="text-[11px] text-gray-500 mt-1 tracking-widest uppercase">
            Enterprise Monitoring Console
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="glass rounded-2xl p-7 shadow-glass border border-white/[0.06]"
        >
          <div className="mb-6">
            <h2 className="text-[17px] font-semibold text-gray-100">Administrator Sign-In</h2>
            <p className="text-xs text-gray-500 mt-1">Authenticate to access the monitoring dashboard</p>
          </div>

          {error && (
            <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-status-red/10 border border-status-red/25 text-[12px] text-status-red">
              {error}
            </div>
          )}

          <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wide">
            EMAIL ADDRESS
          </label>
          <div className="relative mb-4">
            <LuMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@institution.edu"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]"
            />
          </div>

          <label className="block text-[11px] font-medium text-gray-400 mb-1.5 tracking-wide">
            PASSWORD
          </label>
          <div className="relative mb-4">
            <LuLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <LuEyeOff size={15} /> : <LuEye size={15} />}
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className={`w-4 h-4 rounded-[5px] border flex items-center justify-center transition-colors ${
                  remember ? "bg-accent border-accent" : "border-white/20 bg-transparent"
                }`}
              >
                {remember && <span className="w-1.5 h-1.5 rounded-[2px] bg-white" />}
              </button>
              Remember this device
            </label>
            <a href="#" className="text-xs text-accent-glow hover:text-accent transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-glow font-semibold text-sm text-white shadow-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {loading ? (
              <>
                <LuLoaderCircle size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to Console"
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-gray-500">
            <LuShieldCheck size={13} className="text-emerald-500/80" />
            256-bit encrypted • SOC 2 aligned infrastructure
          </div>
        </motion.form>

        <p className="text-center text-[11px] text-gray-600 mt-6">
          © 2026 ClassWatch AI — Institutional Access Only
        </p>
      </div>
    </div>
  );
}