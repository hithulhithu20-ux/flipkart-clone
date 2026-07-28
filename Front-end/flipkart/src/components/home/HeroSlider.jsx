import { useEffect, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { bannerData } from "../../assets/bannerData";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setCurrent((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5 seconds feels a bit more natural
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Reset animation state after slide transition
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm max-w-[1400px] mx-auto group">
      
      {/* MAIN SLIDE CONTAINER */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[360px] lg:h-[400px] w-full transition-all duration-500 ease-out">
        
        {/* BACKGROUND IMAGE WITH SMOOTH CROSSFADE */}
        <img
          src={bannerData[current].image}
          alt={bannerData[current].title}
          className={`h-full w-full object-cover transition-all duration-700 ease-in-out scale-100 ${
            isAnimating ? "opacity-90 scale-[1.01]" : "opacity-100"
          }`}
        />

        {/* GRADIENT OVERLAY (More professional than a solid black mask) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* FLOATING TEXT CONTENT BOX */}
        <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-center px-6 text-white sm:px-12 md:px-20 max-w-2xl select-none">
          
          <h2 className={`text-2xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 transition-all duration-500 transform drop-shadow-md ${
            isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}>
            {bannerData[current].title}
          </h2>

          <p className={`text-xs sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-6 max-w-md line-clamp-2 drop-shadow-xs transition-all duration-500 delay-75 transform ${
            isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}>
            {bannerData[current].subtitle}
          </p>

          <div className={`transition-all duration-500 delay-150 transform ${
            isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}>
            <button className="inline-flex items-center justify-center rounded-xl bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-xs sm:text-sm font-bold text-gray-900 px-6 py-2.5 sm:py-3 shadow-md shadow-yellow-500/20 hover:shadow-lg transition-all tracking-wide uppercase">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* LEFT ARROW (Hidden by default, fades in smoothly on desktop hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-gray-800 hover:text-blue-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 md:translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 focus:outline-none focus:opacity-100"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* RIGHT ARROW (Hidden by default, fades in smoothly on desktop hover) */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-gray-800 hover:text-blue-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 md:translate-x-[10px] group-hover:translate-x-0 transition-all duration-300 focus:outline-none focus:opacity-100"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} strokeWidth={2.5} />
      </button>
      
      {/* MODERN EXPANDING SLIDE DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10 bg-black/10 backdrop-blur-xs px-3 py-1.5 rounded-full">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (current !== index) {
                setIsAnimating(true);
                setCurrent(index);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 outline-none ${
              current === index
                ? "w-6 bg-white shadow-xs"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;