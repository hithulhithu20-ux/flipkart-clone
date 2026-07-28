import { useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiCheckCircle } from "react-icons/fi";

const ReviewsSection = () => {
  // Mock data representing a dynamic payload
  const distributionBreakdown = [
    { stars: 5, count: 85432, percent: "68%" },
    { stars: 4, count: 24120, percent: "19%" },
    { stars: 3, count: 9810, percent: "8%" },
    { stars: 2, count: 3200, percent: "3%" },
    { stars: 1, count: 2000, percent: "2%" },
  ];

  const reviewCollection = [
    {
      id: 1,
      rating: 5,
      title: "Terrific Purchase",
      comment: "Excellent product. The build quality feels incredibly solid and premium. Display crispness exceeded my target expectations. Highly recommended.",
      author: "Rahul S.",
      date: "2 weeks ago",
      verified: true,
      likes: 342,
    },
    {
      id: 2,
      rating: 5,
      title: "Brilliant",
      comment: "Worth every single rupee. Performance tuning handles extreme heavy multi-tasking operations flawlessly without any thermal throttling issues.",
      author: "Ananya M.",
      date: "1 month ago",
      verified: true,
      likes: 128,
    }
  ];

  return (
    <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 max-w-full mx-auto font-sans select-none shadow-xs">
      
      {/* SECTION ANCHOR BLOCK SECTION TITLE */}
      <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-wider mb-6 pb-3 border-b border-gray-50">
        Ratings & Reviews Overview
      </h2>

      {/* GRAPHIC HIGHLIGHT SCOREBOARD COMPONENT BREAKOUT */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-gray-50/50 p-5 rounded-2xl border border-gray-100 mb-8">
        
        {/* TOTAL VALUE COMPACT CONTAINER */}
        <div className="text-center sm:text-left shrink-0">
          <div className="flex items-baseline justify-center sm:justify-start gap-1">
            <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">4.8</span>
            <span className="text-xl sm:text-2xl text-green-600 font-bold">★</span>
          </div>
          <p className="text-xs font-bold text-gray-400 mt-1.5 tracking-wide">
            1,24,562 Ratings &<br className="hidden sm:block" /> 8,432 Public Reviews
          </p>
        </div>

        {/* LINEAR STAR RATIO RATINGS SCALE BAR ELEMENT MATRIX */}
        <div className="w-full flex-1 space-y-1.5 text-xs font-bold text-gray-500">
          {distributionBreakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-3 text-right">{row.stars}</span>
              <span className="text-[10px] text-gray-300">★</span>
              <div className="flex-1 h-2 bg-gray-200/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full transition-all duration-500" 
                  style={{ width: row.percent }} 
                />
              </div>
              <span className="w-12 text-right font-semibold text-gray-400 text-[11px]">
                {row.count.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* FEEDBACK FEED CARDS ROW STACKED ARRAYS */}
      <div className="space-y-5 divide-y divide-gray-50">
        {reviewCollection.map((review, i) => (
          <div key={review.id} className={`w-full text-xs ${i > 0 ? "pt-5" : ""}`}>
            
            {/* ROW HEADER BAR METRICS */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-0.5 rounded bg-green-600 px-1.5 py-0.5 text-white font-black text-[10px]">
                {review.rating} <span className="text-[8px]">★</span>
              </span>
              <h4 className="font-bold text-gray-800 text-sm tracking-tight">
                {review.title}
              </h4>
            </div>

            {/* MESSAGE CONTENT CONTAINER COMPONENT */}
            <p className="mt-2 text-gray-600 font-medium leading-relaxed text-xs">
              {review.comment}
            </p>

            {/* METADATA SYSTEM ATTRIBUTIONS AND LOGS */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-gray-400">
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-bold">{review.author}</span>
                <div className="w-1 h-1 bg-gray-200 rounded-full" />
                <span>{review.date}</span>
                
                {review.verified && (
                  <>
                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="text-green-600 flex items-center gap-0.5 font-bold text-[10px] uppercase tracking-wider">
                      <FiCheckCircle size={11} strokeWidth={2.5} /> Certified Buyer
                    </span>
                  </>
                )}
              </div>

              {/* ACTION REACTION COUNTERS (HELPFUL TOGGLES) */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-wide text-gray-400 font-bold uppercase">Helpful?</span>
                <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none">
                  <FiThumbsUp size={12} />
                  <span>{review.likes}</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ReviewsSection;