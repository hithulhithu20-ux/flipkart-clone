import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiChevronDown,
  FiMonitor,
  FiTv,
  FiUser,
  FiHome,
  FiGrid,
  FiLogOut,
  FiShoppingBag,
  FiTag
} from "react-icons/fi";

import MobileMenu from "./MobileMenu";
import { useCategories } from "../../context/CategoryContext";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { fetchProducts } = useProducts();
  const { categories } = useCategories();

  // Sync mobile input with main search state
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts({ search });
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const categoryIcons = {
    electronics: FiMonitor,
    "tvs-appliances": FiTv,
    men: FiUser,
    women: FiUser,
    "home-furniture": FiHome,
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        
        {/* TOP NAVBAR */}
        <div className="bg-blue-600 text-white shadow-inner">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
            
            {/* Left: Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-1.5 hover:bg-blue-700/50 rounded-lg transition-colors focus:outline-none"
                onClick={() => setMenuOpen(true)}
              >
                <FiMenu size={24} />
              </button>

              <Link
                to="/"
                className="text-2xl font-black tracking-tight italic flex items-center gap-1 group select-none"
              >
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded font-serif not-italic font-bold text-xl mr-0.5 shadow-sm">F</span>
                Flipkart
              </Link>
            </div>

            {/* Middle: Persistent Search Bar (Desktop Only) */}
            <div className="hidden flex-1 max-w-2xl px-4 md:block">
              <div className="relative flex items-center bg-gray-50 text-gray-900 rounded-xl overflow-hidden border border-transparent focus-within:border-white focus-within:bg-white focus-within:shadow-md transition-all duration-200">
                <div className="pl-4 text-gray-400 pointer-events-none">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full pl-3 pr-4 py-2.5 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Right: Actions Menu (Desktop Only) */}
            <div className="hidden items-center gap-6 md:flex text-sm font-medium">
              
              <Link
                to="/orders"
                className="flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors py-2"
              >
                <FiShoppingBag size={16} />
                <span>My Orders</span>
              </Link>

              {/* Cart link with high-visibility numeric indicator badge */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                <FiShoppingCart size={18} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-blue-600 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Identity & Dropdown Block */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 bg-blue-500/30 hover:bg-blue-500/50 px-3 py-2 rounded-xl transition-colors border border-blue-400/20"
                  >
                    <div className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="max-w-[100px] truncate">Hi, {user.name.split(' ')[0]}</span>
                    <FiChevronDown size={14} className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Card Modal overlay */}
                  {userDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-4 py-2 border-b border-gray-50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Account Settings
                        </div>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                        >
                          <FiLogOut size={16} />
                          <span>Logout Account</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-xl transition-all font-semibold shadow-sm text-center"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile-only Cart Widget container */}
            <Link
              to="/cart"
              className="relative md:hidden p-2 hover:bg-blue-700/50 rounded-lg transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-blue-600">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          {/* MOBILE ONLY SEARCH BAR ROW */}
          <div className="px-4 pb-3.5 md:hidden">
            <div className="relative flex items-center bg-white text-gray-900 rounded-xl overflow-hidden shadow-sm">
              <div className="absolute left-3 text-gray-400 pointer-events-none">
                <FiSearch size={16} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2.5 text-sm outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: CATEGORIES STRIP */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto flex max-w-[1400px] items-center justify-start md:justify-center gap-2 overflow-x-auto px-4 py-2.5 scrollbar-none custom-scrollbar">
            
            {/* 'All' category capsule button */}
            <button
              onClick={() => {
                navigate("/");
                fetchProducts();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap"
            >
              <div className="bg-gray-100 text-gray-500 p-1.5 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <FiGrid size={16} />
              </div>
              <span>All Products</span>
            </button>

            {/* Dynamic category loops */}
            {categories.map((item) => {
              const Icon = categoryIcons[item.slug] || FiTag;

              return (
                <button
                  key={item._id}
                  onClick={() => {
                    navigate("/");
                    fetchProducts({ category: item._id });
                  }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap group"
                >
                  <div className="bg-gray-50 text-gray-400 p-1.5 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <Icon size={16} />
                  </div>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </header>

      <MobileMenu
        open={menuOpen}
        setOpen={setMenuOpen}
      />
    </>
  );
};

export default Navbar;