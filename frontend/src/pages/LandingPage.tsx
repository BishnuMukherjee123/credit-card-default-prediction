import './landing.css'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spotlight } from "@/components/aceternity/spotlight";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";

export default function LandingPage() {
  const stats = [
    { value: "94%", label: "Accuracy" },
    { value: "0.97", label: "AUC-ROC" },
    { value: "30K+", label: "Data Points" },
    { value: "<200ms", label: "Response Time" },
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "ML-Powered Predictions",
      description:
        "Advanced ensemble models with 94% accuracy for reliable risk assessment",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Analysis",
      description:
        "Sub-200ms prediction latency for instant credit risk evaluation",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with JWT authentication and data encryption",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Actionable Insights",
      description:
        "Clear risk levels with detailed recommendations for decision making",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundBeams className="opacity-40" />

      {/* Hero Section */}
      <section className="hero-section relative pt-20 md:pt-32 pb-12 md:pb-20 px-4">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="violet"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="animate-fade-in"
          >
            {/* Badge */}
            <div className="inline-block px-6 py-2 mb-8 rounded-full bg-violet-500/20 border border-violet-500/40 backdrop-blur-sm animate-float">
              <span className="text-violet-300 text-sm font-medium flex items-center gap-2">
                🚀 Powered by Machine Learning
              </span>
            </div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6 leading-[1.1] px-4"
            >
              <span className="block text-white mb-2">
                Predict Credit Card
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Default Risk with AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Leverage cutting-edge machine learning to assess credit default
              risk in real-time. Built with MERN stack and trained on 30,000+
              credit profiles.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="btn-gradient px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-semibold"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="glass-card px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-semibold text-white border-violet-500/50 hover:border-violet-500 hover:bg-violet-500/10"
              >
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="stat-card bg-white/5 border-violet-500/30 hover:border-violet-500/60">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose CreditAI?
            </h2>
            <p className="text-gray-300 text-lg">
              Built for financial institutions that demand accuracy and speed
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full feature-card border-violet-500/30 hover:border-violet-500/60">
                  <CardContent className="p-6">
                    <div className="mb-4 text-violet-400 feature-icon p-3 rounded-lg bg-violet-500/10 w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10 mb-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card border-violet-500/50 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-blue-600/10 -z-10"></div>

              <Award className="h-16 w-16 text-violet-400 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join financial institutions using AI-powered credit risk
                assessment
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-base font-semibold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300"
                >
                  Start Predicting Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
