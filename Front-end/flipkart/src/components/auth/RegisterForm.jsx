import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // Handles 'success' or 'error' views

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status.message) setStatus({ type: "", message: "" }); // Clean out message warnings while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/auth/register", formData);
      
      setStatus({ type: "success", message: "Account registered successfully! Redirecting..." });
      
      // Short delay so users see the nice success state before moving panels
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Registration failed. Please check details.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
      
      {/* BRAND HEADER BANNER */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
        {/* Abstract structural aesthetics */}
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-blue-500 rounded-full opacity-20" />
        
        <h2 className="text-3xl font-extrabold tracking-tight">Create Account</h2>
        <p className="mt-2 text-sm text-blue-100/90 font-medium">
          Sign up to track purchases, build a wishlist, and secure deals.
        </p>
      </div>

      {/* FORM ACTIONS */}
      <form onSubmit={handleSubmit} className="p-8 space-y-5">
        
        {/* LIVE INLINE FEEDBACK CONTAINER */}
        {status.message && (
          <div className={`p-3.5 border rounded-xl text-xs font-semibold text-center animate-in fade-in duration-200 ${
            status.type === "success" 
              ? "bg-green-50 border-green-100 text-green-700" 
              : "bg-red-50 border-red-100 text-red-600"
          }`}>
            {status.message}
          </div>
        )}

        {/* FULL NAME INPUT */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiUser size={18} />
            </div>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* EMAIL INPUT */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiMail size={18} />
            </div>
            <input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* PASSWORD INPUT */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Password
          </label>
          <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiLock size={18} />
            </div>
            <input
              name="password"
              type="password"
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
          className="w-full bg-[#fb641b] hover:bg-[#e15613] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl mt-2 shadow-md shadow-orange-100 hover:shadow-lg transition-all flex items-center justify-center text-sm tracking-wide uppercase disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Account...
            </span>
          ) : (
            <span>Sign Up</span>
          )}
        </button>

        {/* ANCHOR FOOTER LINK */}
        <div className="pt-2 text-center">
          <Link
            to="/login"
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Already have an account? <span className="hover:underline">Log in here</span>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default RegisterForm;