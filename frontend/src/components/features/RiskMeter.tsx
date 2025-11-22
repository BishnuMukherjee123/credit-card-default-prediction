import './features.css'
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskMeterProps {
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
  className?: string;
}

export const RiskMeter = ({ probability, riskLevel, className }: RiskMeterProps) => {
  const percentage = Math.round(probability * 100);
  
  const getRiskColor = () => {
    if (riskLevel === 'low') return 'from-green-500 to-emerald-500';
    if (riskLevel === 'medium') return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-neutral-800"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={552}
            initial={{ strokeDashoffset: 552 }}
            animate={{ strokeDashoffset: 552 - (552 * percentage) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-violet-500" stopColor="currentColor" />
              <stop offset="100%" className="text-blue-500" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
          >
            {percentage}%
          </motion.div>
          <div className="text-sm text-neutral-400 mt-1">Default Risk</div>
        </div>
      </div>

      {/* Risk Level Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={cn(
          "px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider",
          riskLevel === 'low' && "bg-green-500/20 text-green-400",
          riskLevel === 'medium' && "bg-yellow-500/20 text-yellow-400",
          riskLevel === 'high' && "bg-red-500/20 text-red-400"
        )}
      >
        {riskLevel} Risk
      </motion.div>
    </div>
  );
};
