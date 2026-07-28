import { Link } from "react-router-dom";
import { 
  FiFacebook, 
  FiTwitter, 
  FiYoutube, 
  FiBriefcase, 
  FiHelpCircle, 
  FiInfo 
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#172337] text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
        
        {/* TOP LAYOUT GRID */}
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 pb-12 border-b border-gray-700/50">

          {/* ABOUT COLUMN */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
              About
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white hover:underline underline-offset-4 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline underline-offset-4 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white hover:underline underline-offset-4 transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          {/* HELP COLUMN */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Help
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/payments" className="hover:text-white hover:underline underline-offset-4 transition-colors">Payments</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white hover:underline underline-offset-4 transition-colors">Shipping</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white hover:underline underline-offset-4 transition-colors">Returns</Link>
              </li>
            </ul>
          </div>

          {/* POLICY COLUMN */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Policy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="hover:text-white hover:underline underline-offset-4 transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white hover:underline underline-offset-4 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA CONNECTIONS */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Social Connect
            </h3>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-sky-500 text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="YouTube"
              >
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA & UTILITIES FOOTER */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          
          {/* Copyright block */}
          <div>
            © {currentYear} <span className="text-white font-semibold">Flipkart Clone</span>. All rights reserved.
          </div>

          {/* Icon badges across bottom anchor links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <FiBriefcase size={14} className="text-yellow-500" />
              <span>Become a Seller</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <FiHelpCircle size={14} className="text-blue-400" />
              <span>Help Center</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <FiInfo size={14} className="text-green-400" />
              <span>Consumer Policy</span>
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;