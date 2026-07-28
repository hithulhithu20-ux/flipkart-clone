import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiUser, FiBell, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

// Destructured isSidebarOpen and setIsSidebarOpen props to hook into parent layout boundaries
const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Keep a live minute-by-minute system timestamp updating on the layout
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamically derive the breadcrumb view title based on current browser pathing
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "admin") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200/80 bg-white px-4 sm:px-8 shadow-xs select-none relative z-40">
      
      {/* LEFT SECTION: SIDEBAR TRIGGER & DYNAMIC PATH TITLE */}
      <div className="flex items-center gap-4">
        
        {/* MOBILE MENU TOGGLE BUTTON (Hidden on Desktop) */}
        {setIsSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-100 active:scale-95 transition-all"
            aria-label="Toggle navigation structural drawer"
          >
            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        )}

        {/* DYNAMIC PATH TITLE & DATE SUBTEXT */}
        <div className="flex flex-col">
          <h1 className="text-base sm:text-xl font-black text-gray-900 tracking-tight capitalize">
            {getPageTitle()}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-semibold mt-0.5">
            <FiCalendar size={12} className="text-gray-400" />
            <span>
              {currentTime.toLocaleDateString("en-IN", { 
                weekday: "short", 
                month: "short", 
                day: "numeric" 
              })}
            </span>
            <span className="text-gray-300">•</span>
            <span>
              {currentTime.toLocaleTimeString("en-IN", { 
                hour: "2-digit", 
                minute: "2-digit",
                hour12: true 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: INTERACTIVE UTILITIES & SESSION PROFILE */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* ACTION UTILITIES: NOTIFICATION SYSTEM BELL */}
        <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group active:scale-95">
          <FiBell size={19} className="transition-transform duration-200 group-hover:rotate-12" />
          {/* Active notification indicator badge dot */}
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white animate-pulse" />
        </button>

        {/* PROFILE DIVIDER PANEL */}
        <div className="h-8 w-px bg-gray-200" />

        {/* SYSTEM USER IDENTITY PANEL */}
        <div className="flex items-center gap-3.5 group cursor-pointer pl-1 py-1 rounded-xl hover:bg-gray-50/80 transition-colors">
          
          {/* IDENTITY AVATAR ICON COMPONENT */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-100 font-bold text-sm tracking-wide border border-blue-100 uppercase shrink-0">
            {user?.name ? (
              <span>{user.name.trim().charAt(0)}</span>
            ) : (
              <FiUser size={18} />
            )}
            {/* Live profile status indicator ping */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* CREDENTIAL META CARD WRAPPER */}
          <div className="text-left hidden md:block">
            <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
              {user?.name || "Administrator"}
            </p>
            <p className="text-[10px] font-extrabold text-blue-600 tracking-widest uppercase bg-blue-50 px-1.5 py-0.5 rounded-md mt-1 inline-block leading-none border border-blue-100/40">
              {user?.role || "Staff"}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;