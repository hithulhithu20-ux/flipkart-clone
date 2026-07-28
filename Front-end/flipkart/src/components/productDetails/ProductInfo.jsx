import { FiShoppingCart, FiZap, FiCheckCircle, FiTag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const highlights = product.highlights || [];

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  // Safe discount evaluation check
  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto select-none font-sans bg-white">
      
      {/* BRAND ARCHITECTURE BREADCRUMB INDICATOR */}
      <p className="text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1.5">
        {product.category?.name || "Premium Catalog item"}
      </p>

      {/* PRODUCT TITLE HEADER */}
      <h1 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug tracking-tight">
        {product.name}
      </h1>

      {/* METRICS & FEEDBACK RATING ROW */}
      <div className="mt-2.5 flex items-center gap-2.5 text-xs">
        <span className="inline-flex items-center gap-0.5 rounded bg-green-600 px-1.5 py-0.5 text-white font-bold text-[11px] shadow-xs">
          {product.rating ? Number(product.rating).toFixed(1) : "4.0"} <span className="text-[9px]">★</span>
        </span>
        <span className="text-gray-400 font-semibold tracking-wide">
          {product.numReviews || 0} Ratings & Reviews
        </span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="text-green-600 font-bold flex items-center gap-1">
          <FiCheckCircle size={12} /> Assured Quality
        </span>
      </div>

      {/* RETAIL EXCHANGE PRICING SECTION */}
      <div className="mt-4 flex items-baseline gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
        <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          ₹{product.price?.toLocaleString("en-IN")}
        </span>

        {discountPercentage > 0 && (
          <>
            <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
              ₹{product.originalPrice?.toLocaleString("en-IN")}
            </span>
            <span className="text-sm sm:text-base text-green-600 font-extrabold tracking-tight animate-pulse">
              {discountPercentage}% Off
            </span>
          </>
        )}
      </div>

      {/* SYSTEM PROMOTIONAL OFFERS (Authentic E-commerce detail) */}
      <div className="mt-5 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Offers</h4>
        <div className="grid gap-2 text-xs font-medium text-gray-700">
          <div className="flex items-start gap-2">
            <FiTag className="text-green-600 mt-0.5 shrink-0" size={14} />
            <p><span>Bank Offer:</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.</p>
          </div>
          <div className="flex items-start gap-2">
            <FiTag className="text-green-600 mt-0.5 shrink-0" size={14} />
            <p><span>Partner Offer:</span> Sign up for Flipkart Pay Later & get free gift vouchers.</p>
          </div>
        </div>
      </div>

      {/* TECHNICAL HIGHLIGHTS LIST */}
      {highlights.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Product Highlights
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-semibold text-gray-600 list-none">
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* HIGH VISIBILITY ACTION CTAs */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
        
        {/* ADD TO CART ACTION */}
        <button
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 bg-[#ff9f00] hover:bg-[#f39700] text-white py-3.5 sm:py-4 text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/10 active:scale-[0.98] transition-all"
        >
          <FiShoppingCart size={16} strokeWidth={2.5} />
          <span>Add To Cart</span>
        </button>

        {/* BUY NOW TRIGGER */}
        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 bg-[#fb641b] hover:bg-[#ee5e17] text-white py-3.5 sm:py-4 text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-md shadow-deep-orange-500/10 active:scale-[0.98] transition-all"
        >
          <FiZap size={16} strokeWidth={2.5} />
          <span>Buy Now</span>
        </button>

      </div>
    </div>
  );
};

export default ProductInfo;