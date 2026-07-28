import { FiTrendingUp } from "react-icons/fi";

const StatCard = ({ title, value, color = "text-blue-600", icon, bgColor }) => {
  
  /**
   * Automatically derives a matching background tint if an explicit 'bgColor' prop isn't passed.
   * This keeps your component safely backward-compatible with basic color definitions.
   */
  const getBgColor = () => {
    if (bgColor) return bgColor;
    if (color.includes("blue")) return "bg-blue-50/70";
    if (color.includes("green") || color.includes("emerald")) return "bg-emerald-50/70";
    if (color.includes("orange")) return "bg-orange-50/70";
    if (color.includes("purple")) return "bg-purple-50/70";
    return "bg-gray-50";
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex items-center justify-between">
      
      {/* CARD CONTENT LAYER */}
      <div className="space-y-1.5 z-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h2 className={`text-3xl font-black tracking-tight ${color}`}>
          {value}
        </h2>
        
        {/* Subtle trend footprint tracking */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 pt-1">
          <FiTrendingUp className="text-emerald-500" />
          <span>Live platform index</span>
        </div>
      </div>

      {/* ICON BADGE CONTAINER */}
      <div className={`p-3.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${getBgColor()} ${color}`}>
        {icon ? icon : <FiTrendingUp size={20} />}
      </div>

      {/* Decorative inner ambient background ring */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full pointer-events-none opacity-40 z-0 group-hover:scale-110 transition-transform duration-300" />

    </div>
  );
};

export default StatCard;