import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { FiMail, FiLock } from "react-icons/fi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(""); // Clear errors on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
      
      {/* BRAND BANNER HEADER */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-blue-500 rounded-full opacity-20" />
        
        <h2 className="text-3xl font-extrabold tracking-tight">Login</h2>
        <p className="mt-2.5 text-sm text-blue-100/90 font-medium leading-relaxed">
          Get access to your Orders, Wishlist and personalized Recommendations.
        </p>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-8 space-y-5">
        
        {/* ERROR STATUS WINDOW */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-semibold animate-in fade-in duration-200">
            {errorMsg}
          </div>
        )}

        {/* EMAIL INPUT BLOCK */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiMail size={18} />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* PASSWORD INPUT BLOCK */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiLock size={18} />
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full w-full bg-[#fb641b] hover:bg-[#e15613] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl mt-2 shadow-md shadow-orange-100 hover:shadow-lg transition-all flex items-center justify-center text-sm tracking-wide uppercase disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : (
            <span>Login to Account</span>
          )}
        </button>

        {/* ANCHOR FOOTER */}
        <div className="pt-2 text-center">
          <Link
            to="/register"
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            New to Flipkart? <span className="hover:underline">Create an account</span>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;