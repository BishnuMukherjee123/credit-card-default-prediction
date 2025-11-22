import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Shield, Zap, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Simple Gradient Background - No animation for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-32 pb-20 max-w-6xl">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="text-purple-400 font-semibold text-sm">🚀 Powered by Machine Learning</span>
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-2">Predict Credit Card</span>
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Default Risk with AI
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Leverage cutting-edge machine learning to assess credit default risk in real-time.
            Built with MERN stack and trained on{" "}
            <span className="text-purple-400 font-semibold">30,000+</span> credit profiles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex gap-4 justify-center mb-20"
          >
            <Link to="/login">
              <button
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            
            <button
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "94%", label: "Accuracy" },
              { value: "0.97", label: "AUC-ROC" },
              { value: "30K+", label: "Data Points" },
              { value: "<200ms", label: "Response" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20 max-w-6xl">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Why Choose CreditAI?
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Built for financial institutions that demand accuracy and speed
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "ML-Powered",
                description: "Advanced ensemble models with 94% accuracy",
                color: "purple"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-Time",
                description: "Sub-200ms prediction latency",
                color: "blue"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure",
                description: "Enterprise-grade JWT authentication",
                color: "green"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Insights",
                description: "Clear risk levels and recommendations",
                color: "orange"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`inline-flex p-3 rounded-xl bg-${feature.color}-500/20 text-${feature.color}-400 mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-12 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 text-center"
          >
            <div className="mb-6">
              <div className="inline-flex p-4 rounded-2xl bg-purple-500/20">
                <TrendingUp className="w-12 h-12 text-purple-400" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join financial institutions using AI-powered credit risk assessment
            </p>
            
            <Link to="/login">
              <button
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 hover:shadow-2xl hover:shadow-white/20"
              >
                <span className="flex items-center gap-2">
                  Start Predicting Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
