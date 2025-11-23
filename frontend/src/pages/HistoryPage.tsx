// ✨ MOBILE-OPTIMIZED: Responsive for all screen sizes
// ✨ All visual, color, animation remain EXACTLY THE SAME.
// ✨ Only mobile breakpoints and spacing adjustments added.

import { useEffect, useState, useMemo, } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { usePrediction } from "@/hooks/usePrediction";
import type { PredictionResult } from "@/types";
import {
  Calendar,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp
} from "lucide-react";

// ---------- CONSTANT MEMOIZED ANIMATIONS ----------
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
} as const;

const headerVariants = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: "easeOut" as const } }
} as const;

const cardVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
} as const;

// ---------- MEMOIZED RISK UTILS ----------
const riskIconMap: Record<string, React.JSX.Element> = {
  low: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#4ade80" }} />,
  medium: <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#fbbf24" }} />,
  high: <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#f87171" }} />
};

const riskColorMap = {
  low: {
    text: "#4ade80",
    bg: "rgba(74, 222, 128, 0.15)",
    border: "rgba(74, 222, 128, 0.3)"
  },
  medium: {
    text: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.15)",
    border: "rgba(251, 191, 36, 0.3)"
  },
  high: {
    text: "#f87171",
    bg: "rgba(248, 113, 113, 0.15)",
    border: "rgba(248, 113, 113, 0.3)"
  }
};

// ---------- HISTORY ITEM (MEMOIZED FOR SMOOTHNESS) ----------
const HistoryItem = React.memo(({ item, index }: { item: PredictionResult; index: number }) => {
  const risk = !item.riskLevel
    ? item.probability < 0.3
      ? "low"
      : item.probability < 0.7
      ? "medium"
      : "high"
    : item.riskLevel;

  const colors = riskColorMap[risk];
  const dateStr = item.createdAt || item.timestamp || new Date().toISOString();

  return (
    <motion.div
      key={item._id || index}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{
        x: 10,
        scale: 1.02,
        boxShadow: `0 16px 48px ${colors.bg}`,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.99 }}
      style={{ cursor: "pointer" }}
    >
      <Card
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))",
          border: `1px solid ${colors.border}`,
          backdropFilter: "blur(20px)",
          boxShadow: `0 8px 24px ${colors.bg}`,
          transition: "all 0.15s ease"
        }}
      >
        {/* Accent Bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: colors.text }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.bg}, transparent)`,
            backgroundSize: "200% 100%"
          }}
          whileHover={{
            backgroundPosition: ["200% 0", "-200% 0"],
            transition: { duration: 1.5, ease: "linear" }
          }}
        />

        <CardContent className="p-4 pl-6 sm:p-6 sm:pl-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            {/* LEFT */}
            <div className="flex items-center gap-3 sm:gap-5 flex-1 w-full sm:w-auto">
              <div
                className="p-2 sm:p-3 rounded-xl flex-shrink-0"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`
                }}
              >
                {riskIconMap[risk]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1 sm:mb-2">
                  <span
                    className="text-lg sm:text-xl font-bold"
                    style={{ color: colors.text }}
                  >
                    {risk.toUpperCase()}
                  </span>

                  <span
                    className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold inline-block w-fit"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    {Math.round(item.probability * 100)}% Probability
                  </span>
                </div>

                {/* DATE */}
                <div
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  style={{ color: "#94a3b8" }}
                >
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">{new Date(dateStr).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-left sm:text-right w-full sm:w-auto">
              <div
                className="text-xs sm:text-sm font-medium mb-1"
                style={{ color: "#94a3b8" }}
              >
                Prediction
              </div>

              <div className="text-base sm:text-lg font-bold" style={{ color: "#ffffff" }}>
                {item.prediction === 1 ? (
                  <span style={{ color: "#f87171" }}>⚠️ Default</span>
                ) : (
                  <span style={{ color: "#4ade80" }}>✅ No Default</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// ---------- MAIN PAGE ----------
export default function HistoryPage() {
  const { getHistory } = usePrediction();
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Once
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data: any = await getHistory();
        const historyData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setHistory(historyData);
      } catch {
        console.error("Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [getHistory]);

  // STATS (Memoized)
  const stats = useMemo(() => {
    if (!history.length) return { total: 0, low: 0, medium: 0, high: 0 };

    let low = 0,
      medium = 0,
      high = 0;

    history.forEach((h) => {
      const risk =
        h.riskLevel ??
        (h.probability < 0.3
          ? "low"
          : h.probability < 0.7
          ? "medium"
          : "high");

      if (risk === "low") low++;
      else if (risk === "medium") medium++;
      else high++;
    });

    return { total: history.length, low, medium, high };
  }, [history]);

  // Memoized particles (prevent rerenders)
  const particles = useMemo(
    () =>
      [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background:
              i % 3 === 0
                ? "rgba(139, 92, 246, 0.7)"
                : i % 3 === 1
                ? "rgba(59, 130, 246, 0.6)"
                : "rgba(236, 72, 153, 0.5)",
            left: `${8 + i * 9}%`,
            top: `${15 + i * 7}%`
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, i % 2 === 0 ? 30 : -30, 0],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{
            duration: 7 + i * 1.2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      )),
    []
  );

  return (
    <motion.div
      className="flex-1 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28 px-3 sm:px-4 relative overflow-hidden"
      style={{ background: "#0a0a0d" }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particles Memoized */}
        {particles}
      </div>

      {/* CONTENT */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* HEADER */}
        <motion.div className="mb-6 sm:mb-8 md:mb-10 text-center" variants={headerVariants}>
          <motion.div
            className="flex justify-center mb-3 sm:mb-4 md:mb-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 250 }}
          >
            <div
              className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl inline-block"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)"
              }}
            >
              <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" style={{ color: "#a78bfa" }} />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 px-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            style={{
              background: "linear-gradient(135deg, #ffffff, #e0d7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Prediction History
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-xl max-w-2xl mx-auto px-4"
            style={{ color: "#cbd5e1" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Review all past credit risk assessments
          </motion.p>
        </motion.div>

        {/* STATS */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {[
            {
              label: "Total",
              value: stats.total,
              color: "#a78bfa",
              icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            },
            {
              label: "Low Risk",
              value: stats.low,
              color: "#4ade80",
              icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            },
            {
              label: "Medium Risk",
              value: stats.medium,
              color: "#fbbf24",
              icon: <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
            },
            {
              label: "High Risk",
              value: stats.high,
              color: "#f87171",
              icon: <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.06, duration: 0.3 }}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: `0 12px 40px ${stat.color}40`,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              style={{ cursor: "pointer" }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))",
                  border: `1px solid ${stat.color}40`,
                  backdropFilter: "blur(20px)",
                  boxShadow: `0 8px 24px ${stat.color}20`,
                  transition: "all 0.15s ease"
                }}
              >
                <CardContent className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div
                      className="p-1.5 sm:p-2 rounded-lg"
                      style={{ background: `${stat.color}20` }}
                    >
                      <span style={{ color: stat.color }}>{stat.icon}</span>
                    </div>
                  </div>
                  <div
                    className="text-2xl sm:text-3xl font-black"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: "#94a3b8" }}
                  >
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* HISTORY LIST */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <motion.div
                className="inline-block p-3 sm:p-4 rounded-full mb-3 sm:mb-4"
                style={{ background: "rgba(139, 92, 246, 0.15)" }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: "#a78bfa" }} />
              </motion.div>

              <p style={{ color: "#94a3b8", fontSize: "16px" }} className="sm:text-lg">
                Loading history...
              </p>
            </motion.div>
          ) : history.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <div
                className="inline-block p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl mb-3 sm:mb-4"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)"
                }}
              >
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" style={{ color: "#a78bfa" }} />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold mb-2 px-4"
                style={{ color: "#ffffff" }}
              >
                No Predictions Yet
              </h3>
              <p style={{ color: "#94a3b8" }} className="text-sm sm:text-base px-4">
                Start by creating your first credit risk prediction
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {history.map((item, index) => (
                <HistoryItem item={item} index={index} key={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
