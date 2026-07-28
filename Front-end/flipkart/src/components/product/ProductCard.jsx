import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Safe calculation for discount percentage
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = product.images?.[0]?.url || "https://placehold.co/300x300?text=No+Image";

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* IMAGE CONTAINER WITH BADGE */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Discount Tag over Image */}
        {hasDiscount && discountPercentage > 0 && (
          <span className="absolute bottom-3 right-3  bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Brand */}
          {product.brand && (
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>
        </div>

        {/* PRICING ROW */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-extrabold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;