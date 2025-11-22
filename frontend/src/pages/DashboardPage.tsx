import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePrediction } from "@/hooks/usePrediction";
import { Activity, TrendingUp, Users, AlertCircle, ArrowRight, BarChart3, Shield } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  // Icons scale: smaller on mobile (h-5), larger on desktop (h-6)
  const quickStats = [
    { icon: <Activity className="h-5 w-5 md:h-6 md:w-6" />, label: "Total Predictions", value: "124", change: "+12%", positive: true },
    { icon: <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />, label: "Accuracy Rate", value: "94%", change: "+2%", positive: true },
    { icon: <Users className="h-5 w-5 md:h-6 md:w-6" />, label: "High Risk", value: "28", change: "-5%", positive: true },
    { icon: <AlertCircle className="h-5 w-5 md:h-6 md:w-6" />, label: "Pending Review", value: "7", change: "+3", positive: false },
  ];

  const { getDashboardStats } = usePrediction();
  const [stats, setStats] = useState({ totalPredictions: 0, activeUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div 
      className="flex-1 pt-20 pb-20 px-4 md:pt-24 md:pb-24 relative overflow-hidden min-h-screen"
      style={{ background: '#0a0a0d' }}
    >
      {/* ============================================
          MOBILE BACKGROUND (Static / Optimized)
          Visible only on mobile (md:hidden) to prevent lag
      ============================================ */}
      <div className="absolute inset-0 block md:hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-violet-900/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      {/* ============================================
          DESKTOP BACKGROUND (Original / Animated)
          Visible only on desktop (hidden md:block)
      ============================================ */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {/* Purple Orb */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent)',
            top: '-10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Blue Orb */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)',
            top: '30%',
            right: '-10%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Pink Orb */}
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
            bottom: '10%',
            left: '40%',
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated Grid Pattern (Opacity reduced slightly for mobile) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 md:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}
      />

      {/* Floating Particles - Desktop Only (hidden md:block) */}
      <div className="hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(139, 92, 246, 0.6)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Scanline Effect - Desktop Only (hidden md:block) */}
      <motion.div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(139, 92, 246, 0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* ============================================
          CONTENT
      ============================================ */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-2 md:mb-3"
              style={{ color: '#ffffff' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, <span style={{ 
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{user?.name || 'User'}</span>!
            </motion.h1>
            <p className="text-sm md:text-lg" style={{ color: '#cbd5e1' }}>
              Here's your credit risk assessment overview
            </p>
          </div>

          {/* Quick Stats Grid */}
          {/* Mobile: Grid 2 (compact). Desktop: Grid 4 (spacious) */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-10">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                // Original desktop hover preserved
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ willChange: 'transform' }}
              >
                <Card 
                  className="relative overflow-hidden h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.8))',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    transform: 'translateZ(0)',
                  }}
                >
                  <CardContent className="p-4 md:p-6 relative z-10 flex flex-col justify-between h-full">
                    {/* Icon and Change Badge */}
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <motion.div 
                        className="p-2 md:p-3 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                          color: '#a78bfa'
                        }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <span 
                        className="text-xs md:text-sm font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full"
                        style={{
                          background: stat.positive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: stat.positive ? '#4ade80' : '#f87171'
                        }}
                      >
                        {stat.change}
                      </span>
                    </div>

                    {/* Value */}
                    <div 
                      className="text-2xl md:text-4xl font-bold mb-1 md:mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div 
                      className="text-xs md:text-sm font-medium truncate"
                      style={{ color: '#94a3b8' }}
                    >
                      {stat.label}
                    </div>
                  </CardContent>

                  {/* Shimmer Effect - Desktop Only (hidden md:block) */}
                  <div 
                    className="hidden md:block absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s infinite'
                    }}
                  />

                  {/* Glow on Hover - Desktop Only */}
                  <div 
                    className="hidden md:block absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"
                    style={{ zIndex: -1 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card 
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.9), rgba(15, 15, 18, 0.7))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                  height: '100%'
                }}
              >
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                  <CardTitle style={{ color: '#ffffff', fontSize: '20px' }}>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                  <Link to="/predict">
                    <motion.button
                      className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-xl text-left"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        color: '#ffffff',
                        border: 'none'
                      }}
                      // Original Desktop Hover Effect
                      whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(139, 92, 246, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-semibold text-sm md:text-base">New Prediction</span>
                      </div>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.button>
                  </Link>

                  <Link to="/history">
                    <motion.button
                      className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-xl text-left"
                      style={{
                        background: 'rgba(30, 30, 35, 0.6)',
                        color: '#ffffff',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                      }}
                      // Original Desktop Hover Effect
                      whileHover={{ 
                        scale: 1.02, 
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.5)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5" />
                        <span className="font-semibold text-sm md:text-base">View History</span>
                      </div>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.button>
                  </Link>

                  <Link to="/analytics">
                    <motion.button
                      className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-xl text-left"
                      style={{
                        background: 'rgba(30, 30, 35, 0.6)',
                        color: '#ffffff',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                      }}
                      // Original Desktop Hover Effect
                      whileHover={{ 
                        scale: 1.02, 
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderColor: 'rgba(139, 92, 246, 0.5)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-semibold text-sm md:text-base">Analytics</span>
                      </div>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card 
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.9), rgba(15, 15, 18, 0.7))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                }}
              >
                <CardHeader className="p-4 md:p-6">
                  <CardTitle style={{ color: '#ffffff', fontSize: '20px' }}>
                    Platform Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 rounded-xl gap-4 sm:gap-0"
                    style={{
                      background: 'rgba(30, 30, 35, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
                          color: '#a78bfa'
                        }}
                      >
                        <Users className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                          Active Users
                        </div>
                        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '20px' }} className="md:text-2xl">
                          {stats.activeUsers}
                        </div>
                      </div>
                    </div>
                    
                    {/* Divider for Mobile */}
                    <div className="w-full h-px bg-white/10 sm:hidden"></div>

                    <div className="text-left sm:text-right w-full sm:w-auto">
                        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                          Total Predictions
                        </div>
                        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '20px' }} className="md:text-2xl">
                          {stats.totalPredictions}
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}