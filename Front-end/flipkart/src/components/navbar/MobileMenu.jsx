import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FiHome, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiLogIn, 
  FiLogOut, 
  FiX, 
  FiUser 
} from "react-icons/fi";

const MobileMenu = ({ open, setOpen }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* OVERLAY (Fades in out smoothly) */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR DRAWER (Slides in out seamlessly) */}
      <div
        className={`fixed left-0 top-0 z-55 h-full w-[290px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        {/* HEADER BRAND / PROFILE HERO SECTION */}
        <div className="bg-blue-600 text-white p-5 pt-6 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500 rounded-full opacity-30" />
          
          <div className="flex justify-between items-start mb-4">
            {user ? (
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-extrabold text-lg shadow-sm border border-blue-400/20 uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-blue-200 font-medium">Welcome back,</p>
                  <h3 className="font-bold text-base truncate pr-2">{user.name}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-12 bg-blue-700 text-blue-200 rounded-full flex items-center justify-center shadow-inner">
                  <FiUser size={22} />
                </div>
                <div>
                  <p className="text-xs text-blue-200 font-medium">Welcome Guest</p>
                  <h3 className="font-bold text-base">Explore Products</h3>
                </div>
              </div>
            )}

            {/* Close Cross Trigger Button */}
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* NAVIGATION LINKS CONTAINER */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 active:bg-blue-50/50 font-medium transition-all"
          >
            <FiHome size={18} className="text-gray-400 group-hover:text-blue-600" />
            <span>Home</span>
          </Link>

          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 active:bg-blue-50/50 font-medium transition-all"
          >
            <FiShoppingBag size={18} className="text-gray-400" />
            <span>My Orders</span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 active:bg-blue-50/50 font-medium transition-all"
          >
            <FiShoppingCart size={18} className="text-gray-400" />
            <span>Cart</span>
          </Link>

          <div className="border-t border-gray-100 my-4 pt-4" />

          {/* AUTHENTICATION ACTION LINK */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 active:bg-red-100 font-medium transition-all text-left"
            >
              <FiLogOut size={18} />
              <span>Logout Account</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 active:bg-blue-100 font-semibold transition-all"
            >
              <FiLogIn size={18} />
              <span>Login / Sign Up</span>
            </Link>
          )}

        </nav>

        {/* COMPACT FOOTER BRANDING */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/50 text-center">
          <p className="text-xs text-gray-400 font-medium">Flipkart Clone UI v2.0</p>
        </div>

      </div>
    </>
  );
};

export default MobileMenu;