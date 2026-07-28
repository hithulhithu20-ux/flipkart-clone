import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiMail, FiLock, FiKey, FiArrowLeft, FiCheckCircle, FiLoader } from "react-icons/fi";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email Request, Step 2: Code & New Password reset
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handles requesting the reset verification pipeline token
  const handleRequestToken = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your exact backend forgot password endpoint
      await api.post("/auth/forgot-password", { email });
      setSuccessMessage("Verification link/code dispatched to your mailbox.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue validation request token.");
    } finally {
      setLoading(false);
    }
  };

  // Handles processing password update execution
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your exact backend reset password endpoint
      await api.put("/auth/reset-password", {
        email,
        token,
        password: newPassword,
      });

      setSuccessMessage("Password altered successfully! Redirecting to credentials gateway...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none font-sans">
      <div className="sm:mx-auto w-full max-w-md">
        
        {/* BRAND LOGO BADGE */}
        <div className="flex justify-center">
          <Link to="/" className="text-3xl font-black tracking-tight italic flex items-center gap-1 group">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-serif not-italic font-bold text-2xl mr-0.5 shadow-md shadow-blue-500/10">F</span>
            <span className="text-blue-600">Flipkart</span>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-black text-gray-900 tracking-tight">
          {step === 1 ? "Reset your password" : "Setup a new password"}
        </h2>
        <p className="mt-1.5 text-center text-xs text-gray-400 font-semibold">
          {step === 1 
            ? "Enter your linked email credentials to authorize credential recovery." 
            : "Input the temporary security token alongside your updated password parameters."
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          
          {/* FEEDBACK LABELS */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-700 text-xs font-bold rounded-xl flex items-center gap-2">
              <FiCheckCircle size={14} className="text-green-600 shrink-0" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* STEP 1: REQUEST TOKEN PIPELINE */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={handleRequestToken}>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <FiMail className="absolute left-4 text-gray-400" size={16} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-xs font-bold text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-xs font-extrabold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? <FiLoader className="animate-spin" size={14} /> : "Send Reset Code"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: FINALIZE PASSWORD RE-REGISTRATION */}
          {step === 2 && (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              
              {/* VERIFICATION SECURITY TOKEN CODE */}
              <div>
                <label htmlFor="token" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Security Token Code
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <FiKey className="absolute left-4 text-gray-400" size={16} />
                  <input
                    id="token"
                    name="token"
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter validation token"
                    className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-xs font-mono font-bold tracking-widest text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* NEW PASSWORD BLOCK */}
              <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  New Password
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <FiLock className="absolute left-4 text-gray-400" size={16} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-xs font-bold text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* CONFIRM NEW PASSWORD BLOCK */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <FiLock className="absolute left-4 text-gray-400" size={16} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-xs font-bold text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-xs font-extrabold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? <FiLoader className="animate-spin" size={14} /> : "Update Password"}
                </button>
              </div>
            </form>
          )}

          {/* BACK TO PORTAL ACTIONS LINK FOOTER */}
          <div className="mt-6 border-t border-gray-50 pt-4 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiArrowLeft size={13} />
              <span>Return to Gate Login</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;