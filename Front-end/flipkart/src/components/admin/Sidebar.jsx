import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
  FiLayers,
  FiX 
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout, user } = useAuth(); // Destructured user to display profile info cleanly

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FiHome size={18} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FiGrid size={18} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingCart size={18} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers size={18} />,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#1e5cc2] to-[#124294] text-white border-r border-blue-900/30 shadow-2xl select-none">
      
      {/* BRANDING HEADER */}
     <div className="p-6 border-b border-white/10 flex items-center justify-between">

  <div className="flex items-center gap-3">
    <div className="bg-white text-[#2874f0] p-2 rounded-xl shadow-md">
      <FiLayers size={22} />
    </div>

    <div>
      <h2 className="text-lg font-black">
        Flipkart
      </h2>

      <span className="text-[10px] uppercase tracking-widest text-blue-200">
        Admin Portal
      </span>
    </div>
  </div>

  {/* Mobile Close */}
  <button
    onClick={() => setIsSidebarOpen(false)}
    className="lg:hidden text-white"
  >
    <FiX size={24} />
  </button>

</div>

      {/* DYNAMIC NAVIGATION LINKS */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
             onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 group relative ${
                isActive
                  ? "bg-white text-[#1e5cc2] shadow-lg shadow-blue-950/20 font-bold"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Visual anchor bar for active routes */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#fb641b] rounded-r-md" />
                )}
                
                {/* Icon component wrapper with sizing scales */}
                <span className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-[#1e5cc2]" : "text-blue-200/80 group-hover:text-white"
                }`}>
                  {item.icon}
                </span>
                
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* PROFILE INFO & LOGOUT FOOTER */}
      <div className="p-4 border-t border-white/10 bg-blue-950/20 space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center uppercase shadow-inner border border-white/10">
              {user.name ? user.name[0] : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-white">{user.name || "Administrator"}</p>
              <p className="text-[10px] text-blue-200 truncate opacity-70 font-medium">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500 hover:border-red-600 font-bold text-xs uppercase tracking-wider text-red-200 hover:text-white transition-all duration-200 shadow-sm group active:scale-[0.98]"
        >
          <FiLogOut size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Logout Session</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;