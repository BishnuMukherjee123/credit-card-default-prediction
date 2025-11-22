import { memo } from "react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const FeatureCard = memo(({ icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="flex items-start gap-4"
  >
    <div
      className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
      style={{
        background: "rgba(139, 92, 246, 0.1)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
      }}
    >
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </motion.div>
));

FeatureCard.displayName = "FeatureCard";

export default function LoginPage() {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-violet-400" />,
      title: "94% Accuracy",
      desc: "Industry-leading ML predictions",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "Ultra Fast",
      desc: "Sub-200ms response time",
    },
    {
      icon: <Shield className="h-6 w-6 text-cyan-400" />,
      title: "Bank-Grade Security",
      desc: "Enterprise encryption",
    },
  ];

  return (
    // ✅ PERFECT FIX: Gradient applied to main container
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: "#000000",
      }}
    >
      {/* ✅ BACKGROUND LAYER: Gradient effects on entire page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top gradient overlay - covers entire width */}
        <div
          className="absolute top-0 left-0 w-full h-64"
          style={{
            background:
              "linear-gradient(to bottom, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 100%)",
          }}
        />

        {/* Left purple orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)",
            top: "-20%",
            left: "-10%",
          }}
        />

        {/* Middle purple orb */}
        <motion.div
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)",
            top: "-15%",
            left: "20%",
          }}
        />

        {/* Bottom-right blue orb */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)",
            bottom: "5%",
            left: "10%",
          }}
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="h-full flex relative z-10">
        {/* LEFT SIDE - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 relative"
        >
          {/* Content - Scrollable */}
          <div className="flex flex-col justify-center px-12 lg:px-20 w-full py-8 overflow-y-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div
                className="p-3 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
                }}
              >
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h1
                className="text-3xl font-black"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CreditAI
              </h1>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
            >
              AI-Powered
              <br />
              Credit Intelligence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-slate-400 mb-12 leading-relaxed"
            >
              Enterprise-grade risk analysis with sub-200ms predictions
            </motion.p>

            {/* Features */}
            <div className="space-y-5 mb-8">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={0.5 + i * 0.1} />
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-4"
            >
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                />
                <span>Trusted by 10,000+ financial institutions</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Auth Options */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 overflow-y-auto"
        >
          <div className="w-full max-w-md my-auto">
            {/* Mobile Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden text-center mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                    boxShadow: "0 12px 40px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h1
                  className="text-3xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CreditAI
                </h1>
              </div>
            </motion.div>

            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl p-8 lg:p-12 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(40px)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <Shield className="h-10 w-10 text-violet-400" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl lg:text-4xl font-bold text-white mb-3"
              >
                Welcome to CreditAI
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-slate-400 text-base lg:text-lg mb-8"
              >
                Sign in to access your AI-powered credit risk dashboard
              </motion.p>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-3"
              >
                {/* Sign In Button */}
                <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                      boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                    Sign In
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </SignInButton>

                {/* Sign Up Button */}
                <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </SignUpButton>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-4 my-6"
              >
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <span className="text-xs text-slate-500">
                  Secure Authentication
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              </motion.div>

              {/* Security Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center gap-2 text-xs text-slate-500"
              >
                <Shield className="h-4 w-4" />
                <span>256-bit SSL encryption • SOC 2 Type II compliant</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
