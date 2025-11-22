import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePrediction } from "@/hooks/usePrediction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  TrendingDown,
  Shield,
  Loader2,
  CreditCard,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Brain,
  Zap,
} from "lucide-react";

// -----------------------------
// Static constants & sample data
// -----------------------------
const PAGE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const HEADER_VARIANTS = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } },
} as const;

const CARD_VARIANTS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const PCA_LABELS = [
  { label: "Pattern A", tooltip: "AI Feature 1 (V1)" },
  { label: "Pattern B", tooltip: "AI Feature 2 (V2)" },
  { label: "Pattern C", tooltip: "AI Feature 3 (V3)" },
  { label: "Pattern D", tooltip: "AI Feature 4 (V4)" },
  { label: "Pattern E", tooltip: "AI Feature 5 (V5)" },
  { label: "Pattern F", tooltip: "AI Feature 6 (V6)" },
  { label: "Pattern G", tooltip: "AI Feature 7 (V7)" },
  { label: "Pattern H", tooltip: "AI Feature 8 (V8)" },
  { label: "Pattern I", tooltip: "AI Feature 9 (V9)" },
  { label: "Pattern J", tooltip: "AI Feature 10 (V10)" },
  { label: "Pattern K", tooltip: "AI Feature 11 (V11)" },
  { label: "Pattern L", tooltip: "AI Feature 12 (V12)" },
  { label: "Pattern M", tooltip: "AI Feature 13 (V13)" },
  { label: "Pattern N", tooltip: "AI Feature 14 (V14)" },
  { label: "Pattern O", tooltip: "AI Feature 15 (V15)" },
  { label: "Pattern P", tooltip: "AI Feature 16 (V16)" },
  { label: "Pattern Q", tooltip: "AI Feature 17 (V17)" },
  { label: "Pattern R", tooltip: "AI Feature 18 (V18)" },
  { label: "Pattern S", tooltip: "AI Feature 19 (V19)" },
  { label: "Pattern T", tooltip: "AI Feature 20 (V20)" },
  { label: "Pattern U", tooltip: "AI Feature 21 (V21)" },
  { label: "Pattern V", tooltip: "AI Feature 22 (V22)" },
  { label: "Pattern W", tooltip: "AI Feature 23 (V23)" },
  { label: "Pattern X", tooltip: "AI Feature 24 (V24)" },
  { label: "Pattern Y", tooltip: "AI Feature 25 (V25)" },
  { label: "Pattern Z", tooltip: "AI Feature 26 (V26)" },
  { label: "Pattern AA", tooltip: "AI Feature 27 (V27)" },
  { label: "Pattern AB", tooltip: "AI Feature 28 (V28)" },
];

const SAMPLE_FEATURES = Object.freeze([
  "10000", "-1.2", "0.5", "1.1", "-0.4", "0.6", "0.9", "-0.1", "0.3", "-0.8",
  "1.2", "-0.3", "0.7", "0.2", "-0.5", "1.4", "-1.1", "0.9", "0.1", "-0.7",
  "0.5", "1.0", "-0.9", "0.8", "-0.2", "0.4", "-1.4", "1.6", "250.0", "123.45"
]);

const ICON_PILLS = [
  { icon: <Shield />, text: "94% Accuracy", color: "#4ade80" },
  { icon: <Zap />, text: "<200ms Speed", color: "#60a5fa" },
  { icon: <Brain />, text: "AI-Powered", color: "#a78bfa" },
] as const;

// -----------------------------
// Mobile detection hook
// -----------------------------
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// -----------------------------
// Styles helper (device aware)
// -----------------------------
const getStyles = (isMobile: boolean) => ({
  input: {
    background: "rgba(25, 25, 30, 0.9)",
    border: "1px solid rgba(139, 92, 246, 0.35)",
    color: "#ffffff",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: 500,
  } as React.CSSProperties,
  cardBg: {
    background: isMobile
      ? "#0F0F12"
      : "linear-gradient(135deg, rgba(15, 15, 18, 0.97), rgba(15, 15, 18, 0.92))",
    border: "1px solid rgba(139, 92, 246, 0.4)",
    backdropFilter: isMobile ? "none" : "blur(12px)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.7), 0 0 80px rgba(139, 92, 246, 0.15)",
    transform: "translateZ(0)",
  } as React.CSSProperties,
});

// -----------------------------
// Feature label helper
// -----------------------------
const getFeatureLabel = (index: number) => {
  if (index === 0) return { label: "Time", tooltip: "Seconds since first transaction" };
  if (index === 29) return { label: "Amount", tooltip: "Transaction amount ($)" };
  return PCA_LABELS[index - 1] || { label: `V${index}`, tooltip: `Feature V${index}` };
};

// -----------------------------
// Memoized FeatureInput (device-aware)
// -----------------------------
type FeatureInputProps = {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  isMobile: boolean;
};

const FeatureInput = memo(function FeatureInput({ index, value, onChange, isMobile }: FeatureInputProps) {
  const { label, tooltip } = getFeatureLabel(index);
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  const handleLocalChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(index, e.target.value), [index, onChange]);

  return (
    <div>
      <Label
        style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600 }}
        className="mb-1.5 block truncate"
        title={tooltip}
      >
        {label}
      </Label>
      <Input
        type="number"
        step="any"
        placeholder="0.0"
        value={value}
        onChange={handleLocalChange}
        className="h-10 input-enhanced"
        style={styles.input}
      />
    </div>
  );
});
FeatureInput.displayName = "FeatureInput";

// -----------------------------
// Types for prediction result
// -----------------------------
type MLPredictionResult = {
  prediction: 0 | 1;
  probability: number;
  timestamp?: string;
};

// -----------------------------
// Main component
// -----------------------------
export default function PredictionPage(): JSX.Element {
  const { predict, savePrediction, isLoading } = usePrediction();
  const [features, setFeatures] = useState<string[]>(() => Array(30).fill(""));
  const [result, setResult] = useState<MLPredictionResult | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  // stable handler
  const handleFeatureChange = useCallback((index: number, value: string) => {
    setFeatures((prev) => {
      if (prev[index] === value) return prev;
      const next = prev.slice();
      next[index] = value;
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const numericFeatures = features.map((f) => Number.parseFloat(f as string) || 0);
        const nowIso = new Date().toISOString();
        const predictionResult = await predict(numericFeatures);

        const withTimestamp: MLPredictionResult = { ...predictionResult, timestamp: nowIso };
        setResult(withTimestamp);

        // scroll on mobile to show results
        if (isMobile) {
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }, 100);
        }

        // save asynchronously (do not block UI)
        savePrediction({
          features: numericFeatures,
          prediction: predictionResult.prediction,
          probability: predictionResult.probability,
          timestamp: nowIso,
        }).catch((err) => console.error("savePrediction failed", err));

        toast.success("🎉 Prediction completed!");
      } catch (error) {
        console.error(error);
        toast.error("❌ Prediction failed.");
      }
    },
    [features, predict, savePrediction, isMobile]
  );

  const loadSampleData = useCallback(() => {
    setFeatures(SAMPLE_FEATURES.slice());
    toast.success("✅ Sample data loaded");
  }, []);

  const handleReset = useCallback(() => {
    setFeatures(Array(30).fill(""));
    setResult(null);
    toast.info("🔄 Form reset");
  }, []);

  const riskMetrics = useMemo(() => {
    if (!result) return null;
    const isHighRisk = result.prediction === 1 && result.probability > 0.7;
    const isMediumRisk = result.prediction === 1 && result.probability <= 0.7;
    const isLowRisk = result.prediction === 0;

    return {
      isHighRisk,
      isMediumRisk,
      isLowRisk,
      riskColor: isHighRisk ? "#f87171" : isMediumRisk ? "#fbbf24" : "#4ade80",
      riskBg: isHighRisk ? "rgba(239, 68, 68, 0.15)" : isMediumRisk ? "rgba(251, 191, 36, 0.15)" : "rgba(34, 197, 94, 0.15)",
      riskLevel: isHighRisk ? "HIGH" : isMediumRisk ? "MEDIUM" : "LOW",
    } as const;
  }, [result]);

  const particles = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      left: `${10 + i * 15}%`,
      top: `${20 + i * 12}%`,
      color: i % 3 === 0 ? "rgba(139, 92, 246, 0.6)" : i % 3 === 1 ? "rgba(59, 130, 246, 0.5)" : "rgba(236, 72, 153, 0.4)",
      i,
    }));
  }, []);

  const pillNodes = useMemo(() => ICON_PILLS, []);

  return (
    <motion.div
      className="flex-1 pt-20 md:pt-28 pb-10 md:pb-28 px-3 md:px-4 relative overflow-hidden text-slate-100"
      style={{ background: "#0a0a0d" }}
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
    >
      {/* Background visuals - Desktop heavy, mobile static */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {!isMobile ? (
          <>
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)",
                top: "-20%",
                left: "-15%",
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              animate={prefersReducedMotion ? undefined : { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.7), transparent)",
                top: "20%",
                right: "-15%",
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              animate={prefersReducedMotion ? undefined : { x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent)",
                bottom: "-10%",
                left: "35%",
                filter: "blur(80px)",
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              animate={prefersReducedMotion ? undefined : { x: [0, -30, 0], y: [0, -35, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            {!prefersReducedMotion && particles.map((p) => (
              <motion.div
                key={p.i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: p.color,
                  left: p.left,
                  top: p.top,
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, p.i % 2 === 0 ? 20 : -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 8 + p.i * 1.5, repeat: Infinity, delay: p.i * 0.8, ease: "easeInOut" }}
              />
            ))}
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.15), rgba(0,0,0,0) 60%)" }}
          />
        )}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            willChange: isMobile ? "auto" : "transform",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04), transparent 70%)" }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div className="mb-8 md:mb-12 text-center" variants={HEADER_VARIANTS}>
          <motion.div className="flex justify-center mb-4 md:mb-6">
            <div
              className="p-4 md:p-5 rounded-3xl inline-block"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))",
                backdropFilter: isMobile ? "none" : "blur(16px)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
              }}
            >
              <Sparkles className="h-10 w-10 md:h-14 md:w-14" style={{ color: "#c4b5fd" }} />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-5"
            style={{
              background: "linear-gradient(135deg, #ffffff, #f0f0ff, #e0d7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            AI Fraud Detection
          </motion.h1>

          <motion.p className="text-lg md:text-2xl max-w-3xl mx-auto px-2" style={{ color: "#cbd5e1" }}>
            Advanced machine learning prediction with{" "}
            <span style={{ color: "#a78bfa", fontWeight: 700 }} className="block md:inline">
              94% accuracy
            </span>
            <span className="hidden md:inline"> and </span>
            <span style={{ color: "#60a5fa", fontWeight: 700 }} className="block md:inline">
              &lt;200ms response time
            </span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* PREDICTION FORM */}
          <motion.div variants={CARD_VARIANTS} initial="initial" animate="animate" transition={{ delay: 0.5 }}>
            <Card className="glass-card relative overflow-hidden border-0 md:border" style={styles.cardBg}>
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(139, 92, 246, 0.25), transparent 65%)" }} />

              <CardHeader className="relative z-10 pb-4 md:pb-6">
                <div className="flex items-center gap-3 md:gap-4 mb-1">
                  <div className="p-2 md:p-3 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))" }}>
                    <CreditCard className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#c4b5fd" }} />
                  </div>
                  <CardTitle style={{ color: "#ffffff", fontSize: isMobile ? "22px" : "28px", fontWeight: 800 }}>
                    Transaction Features
                  </CardTitle>
                </div>
                <p style={{ color: "#94a3b8", fontSize: isMobile ? "13px" : "15px" }}>
                  Enter transaction data (Time, AI Patterns, Amount)
                </p>
              </CardHeader>

              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-h-[450px] md:max-h-[500px] overflow-y-auto pr-1 md:pr-2 pb-2" style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}>
                    {features.map((value, index) => (
                      <FeatureInput key={index} index={index} value={value} onChange={handleFeatureChange} isMobile={isMobile} />
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 pt-2">
                    <motion.div className="flex-1 order-1 md:order-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 md:h-12 text-base font-bold shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                          color: "#ffffff",
                          border: "none",
                          boxShadow: isMobile ? "none" : "0 10px 40px rgba(139, 92, 246, 0.5)",
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-5 w-5" />
                            Predict Fraud
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <div className="grid grid-cols-2 md:flex md:w-auto gap-3 order-2 md:order-2">
                      <Button type="button" onClick={loadSampleData} className="h-12 md:h-12" variant="outline" style={{ background: "rgba(30, 30, 35, 0.6)", color: "#94a3b8", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                        Sample
                      </Button>
                      <Button type="button" onClick={handleReset} className="h-12 md:h-12" variant="outline" style={{ background: "rgba(30, 30, 35, 0.6)", color: "#94a3b8", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RESULTS DISPLAY */}
          <motion.div variants={CARD_VARIANTS} initial="initial" animate="animate" transition={{ delay: 0.6 }}>
            <AnimatePresence mode="wait">
              {result && riskMetrics ? (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                  <Card className="stat-card relative overflow-hidden" style={{ ...styles.cardBg, border: `1px solid ${riskMetrics.riskColor}50`, boxShadow: isMobile ? "none" : `0 16px 48px rgba(0,0,0,0.7), 0 0 80px ${riskMetrics.riskColor}30` }}>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${riskMetrics.riskColor}40, transparent 65%)` }} />

                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <CardTitle style={{ color: "#ffffff", fontSize: isMobile ? "22px" : "28px", fontWeight: 800 }}>Prediction Results</CardTitle>
                        {riskMetrics.isLowRisk ? (
                          <CheckCircle className="h-7 w-7" style={{ color: riskMetrics.riskColor }} />
                        ) : (
                          <AlertCircle className="h-7 w-7" style={{ color: riskMetrics.riskColor }} />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-5 md:space-y-6">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="flex justify-center">
                        <div className="px-8 md:px-10 py-4 md:py-5 rounded-2xl text-center w-full md:w-auto" style={{ background: riskMetrics.riskBg, border: `2px solid ${riskMetrics.riskColor}`, boxShadow: `0 8px 32px ${riskMetrics.riskColor}40` }}>
                          <div className="text-xs md:text-sm font-semibold" style={{ color: "#94a3b8" }}>Risk Level</div>
                          <div className="text-4xl md:text-5xl font-black mt-2" style={{ color: riskMetrics.riskColor }}>{riskMetrics.riskLevel}</div>
                        </div>
                      </motion.div>

                      <div className="rounded-2xl p-4 md:p-6" style={{ background: "rgba(25, 25, 30, 0.7)", border: "1px solid rgba(139, 92, 246, 0.35)" }}>
                        <div className="flex items-center justify-between mb-4">
                          <span style={{ color: "#e2e8f0", fontSize: isMobile ? "15px" : "17px", fontWeight: 700 }}>Fraud Probability</span>
                          <TrendingUp className="h-5 w-5" style={{ color: "#a78bfa" }} />
                        </div>
                        <div className="w-full h-4 rounded-full overflow-hidden relative" style={{ background: "rgba(20, 20, 25, 0.9)" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${result.probability * 100}%` }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: "100%", background: `linear-gradient(90deg, ${riskMetrics.riskColor}, ${riskMetrics.riskColor}dd)` }} />
                        </div>
                        <div className="text-right mt-3">
                          <span className="text-3xl font-black" style={{ color: riskMetrics.riskColor }}>{(result.probability * 100).toFixed(1)}%</span>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-xl" style={{ background: "rgba(25, 25, 30, 0.6)", border: "1px solid rgba(139, 92, 246, 0.25)" }}>
                          <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 600 }}>Prediction</span>
                          <span className="font-bold text-base md:text-lg" style={{ color: "#ffffff" }}>{result.prediction === 1 ? "⚠️ FRAUD DETECTED" : "✅ LEGITIMATE"}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 md:p-5 rounded-xl" style={{ background: "rgba(25, 25, 30, 0.6)", border: "1px solid rgba(139, 92, 246, 0.25)" }}>
                          <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 600 }}><Calendar className="h-4 w-4 inline mr-2" />Timestamp</span>
                          <span className="font-semibold" style={{ color: "#cbd5e1", fontSize: isMobile ? "12px" : "14px" }}>{result.timestamp ? new Date(result.timestamp).toLocaleString() : new Date().toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="rounded-2xl p-4 md:p-6" style={{ background: riskMetrics.riskBg, border: `1px solid ${riskMetrics.riskColor}50` }}>
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <Zap className="h-5 w-5" style={{ color: riskMetrics.riskColor }} />
                          <div className="font-bold text-base md:text-lg" style={{ color: "#ffffff" }}>Recommendation</div>
                        </div>
                        <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
                          {riskMetrics.isLowRisk && "✅ Transaction appears legitimate. Approve with standard verification."}
                          {riskMetrics.isMediumRisk && "⚠️ Moderate fraud risk detected. Recommend additional verification."}
                          {riskMetrics.isHighRisk && "🚫 High fraud probability. Strongly recommend blocking transaction."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="h-full rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center min-h-[400px] md:min-h-[600px]" style={{ background: isMobile ? "#0F0F12" : "linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))", border: "1px solid rgba(139, 92, 246, 0.35)", backdropFilter: isMobile ? "none" : "blur(20px)", boxShadow: isMobile ? "none" : "0 12px 40px rgba(0, 0, 0, 0.6)" }}>
                    {!isMobile && (
                      <motion.div className="mb-8" animate={prefersReducedMotion ? undefined : { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <div className="p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))", border: "1px solid rgba(139, 92, 246, 0.4)", boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)" }}>
                          <TrendingDown className="h-20 w-20" style={{ color: "#c4b5fd" }} />
                        </div>
                      </motion.div>
                    )}

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: "#ffffff" }}>Awaiting Analysis</h3>
                    <p className="text-base md:text-lg max-w-md mb-6 md:mb-8" style={{ color: "#94a3b8" }}>
                      Enter 30 transaction features and click <span style={{ color: "#a78bfa", fontWeight: 700 }}>Predict Fraud</span>
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                      {pillNodes.map((pill, i) => (
                        <div key={i} className="px-3 md:px-5 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold flex items-center gap-2" style={{ background: `${pill.color}20`, color: pill.color, border: `1px solid ${pill.color}40` }}>
                          {pill.icon}
                          {pill.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* GPU acceleration CSS - Mobile Optimizations included */}
      <style>{`
        .input-enhanced { will-change: auto; transform: translateZ(0); }
        /* Optimize touch handling */
        button, input { touch-action: manipulation; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </motion.div>
  );
}
