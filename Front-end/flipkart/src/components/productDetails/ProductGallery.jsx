import { useState, useEffect } from "react";
import { FiHeart, FiShare2 } from "react-icons/fi";

const ProductGallery = ({ product }) => {
  if (!product) return null;

  const images = product.images || [];
  const defaultImage =
    images.length > 0 ? images[0].url : "https://placehold.co/500x500?text=No+Image";

  const [selected, setSelected] = useState(defaultImage);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sync state cleanly when the target product reference changes
  useEffect(() => {
    setSelected(defaultImage);
  }, [product, defaultImage]);

  return (
    <div className="p-2 sm:p-4 w-full select-none font-sans">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        
        {/* 1. LAYERED INTERACTIVE THUMBNAILS CONTAINER */}
        {images.length > 0 && (
          <div className="flex flex-row md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-none shrink-0 snap-x justify-start">
            {images.map((img, index) => {
              const imageUrl = img.url;
              const isCurrent = selected === imageUrl;

              return (
                <button
                  key={img.public_id || index}
                  onClick={() => setSelected(imageUrl)}
                  onMouseEnter={() => setSelected(imageUrl)} // Smooth desktop engagement
                  className={`
                    relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer border-2 transition-all duration-200 snap-center focus:outline-none
                    ${isCurrent 
                      ? "border-blue-600 ring-4 ring-blue-50 bg-gray-50" 
                      : "border-gray-100 hover:border-gray-300 hover:scale-[1.03]"
                    }
                  `}
                >
                  <img
                    src={imageUrl}
                    className="h-full w-full object-contain p-1"
                    alt={`Product thumbnail step segment view ${index + 1}`}
                    loading="lazy"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. CORE HIGH-RESOLUTION HERO DATA VIEWER */}
        <div className="flex-1 relative bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs group">
          
          {/* FLOATING ACTION UTILITIES LAYOUT */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            
            {/* WISHLIST BUTTON */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2.5 rounded-full border bg-white shadow-xs transition-all active:scale-90 ${
                isWishlisted 
                  ? "text-red-500 border-red-100 bg-red-50/50" 
                  : "text-gray-400 border-gray-200 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title="Add item to wishlist bucket"
            >
              <FiHeart size={18} fill={isWishlisted ? "currentColor" : "none"} className="transition-transform duration-200" />
            </button>

            {/* SHARE UTILITY BUTTON */}
            {/* <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 shadow-xs transition-all active:scale-90"
              title="Copy link reference"
            >
              <FiShare2 size={17} />
            </button> */}

          </div>

          {/* CENTRAL SCALEABLE HERO IMAGE FRAME */}
          <div className="w-full h-[320px] sm:h-[480px] overflow-hidden flex items-center justify-center rounded-xl bg-white">
            <img
              src={selected}
              alt={product.name || "Main active view display portal"}
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* ASSURED COMPLIANCE FLOATING BADGE */}
          {product.originalPrice > product.price && (
            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs pointer-events-none">
              Special Discount
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductGallery;