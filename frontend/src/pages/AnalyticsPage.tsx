// Optimized version of AnalyticsPage with identical visuals, animations, and design.
// All optimizations focus on preventing unnecessary re-renders, stabilizing values,
// memoizing heavy computations, and minimizing rerender triggers.

import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Loader2, BarChart3, Calendar } from 'lucide-react';
import { usePrediction } from '@/hooks/usePrediction';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsData {
  totalPredictions: number;
  fraudDetected: number;
  accuracyRate: number;
  monthlyStats: { month: string; fraud: number; legitimate: number }[];
  availableYears: number[];
}

// Memoized animation variants (prevents recreation each render)
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AnalyticsPage() {
  const { getAnalytics } = usePrediction();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear()]);
  const prefersReducedMotion = useReducedMotion();

  // Fetch data when year changes
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const analyticsData = await getAnalytics(selectedYear);
        if (mounted) {
          setData(analyticsData);
          if (analyticsData?.availableYears) {
            setAvailableYears(analyticsData.availableYears);
          }
        }
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false }; 
  }, [selectedYear]);

  const monthlyStats = useMemo(() => data?.monthlyStats || [], [data]);

  // Heavy computations memoized
  const pieData = useMemo(() => {
    const total = data?.totalPredictions || 0;
    const fraud = data?.fraudDetected || 0;
    return [
      { name: 'Legitimate', value: total - fraud, color: '#8b5cf6' },
      { name: 'Fraudulent', value: fraud, color: '#f43f5e' },
    ];
  }, [data]);

  const statsConfig = useMemo(() => ([
    { title: "Total Scanned", value: data?.totalPredictions?.toLocaleString(), change: "+12.5%", icon: Activity, color: "#8b5cf6" },
    { title: "Fraud Detected", value: data?.fraudDetected?.toLocaleString(), change: "-4.2%", icon: TrendingUp, color: "#f43f5e" },
    { title: "Accuracy Rate", value: `${data?.accuracyRate}%`, change: "+0.4%", icon: PieChartIcon, color: "#10b981" }
  ]), [data]);

  if (loading && !data) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center bg-[#0a0a0d] text-white">
        <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: '#0a0a0d' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background effects separated and memoized visually */}
      <BackgroundEffects prefersReducedMotion={prefersReducedMotion} />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header with Year Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <BarChart3 className="h-8 w-8 text-violet-400" />
              </div>
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-slate-400">
                Analytics Overview
              </h1>
            </div>
            <p className="text-slate-400 text-xl max-w-2xl">Deep dive into your fraud detection metrics, performance trends, and risk distribution.</p>
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="px-3 py-2 text-slate-400">
              <Calendar className="h-5 w-5" />
            </div>
            <Select value={selectedYear.toString()} onValueChange={(val: string) => setSelectedYear(parseInt(val))}>
              <SelectTrigger className="w-[120px] bg-transparent border-none text-white font-medium focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a20] border-violet-500/20 text-white">
                {availableYears.map((year: number) => (
                  <SelectItem key={year} value={year.toString()} className="focus:bg-violet-500/20 focus:text-white cursor-pointer">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsConfig.map((stat, index) => (
            <motion.div key={stat.title} variants={cardVariants} initial="initial" animate="animate" transition={{ delay: index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }}>
              <MetricCard stat={stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Bar Chart */}
          <motion.div variants={cardVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }}>
            <MonthlyBarChart monthlyStats={monthlyStats} year={selectedYear} />
          </motion.div>

          {/* Pie Chart */}
          <motion.div variants={cardVariants} initial="initial" animate="animate" transition={{ delay: 0.5 }}>
            <RiskPieChart pieData={pieData} total={data?.totalPredictions} />
          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </motion.div>
  );
}

/* -------------------------- SUBCOMPONENTS -------------------------- */

const BackgroundEffects = ({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
      style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent)', top: '-10%', left: '-10%' }}
      animate={prefersReducedMotion ? {} : { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
      style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)', top: '30%', right: '-10%' }}
      animate={prefersReducedMotion ? {} : { x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px', animation: 'grid-move 20s linear infinite' }} />
  </div>
);

const MetricCard = ({ stat }: { stat: any }) => (
  <Card className="relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.9), rgba(15, 15, 18, 0.7))', border: '1px solid rgba(139, 92, 246, 0.3)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' }}>
    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <CardContent className="p-6 relative z-10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
          <h3 className="text-4xl font-bold mt-2 text-white tracking-tight">{stat.value}</h3>
        </div>
        <div className="p-3 rounded-xl shadow-lg" style={{ background: `${stat.color}20`, color: stat.color, boxShadow: `0 0 20px ${stat.color}20` }}>
          <stat.icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="flex items-center font-bold px-2 py-0.5 rounded-full" style={{ color: stat.change.startsWith('+') ? '#4ade80' : '#f43f5e', background: stat.change.startsWith('+') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(244, 63, 94, 0.1)' }}>
          {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />} {stat.change}
        </span>
        <span className="text-slate-500">vs last month</span>
      </div>
    </CardContent>
  </Card>
);

const MonthlyBarChart = ({ monthlyStats, year }: { monthlyStats: any[], year: number }) => (
  <Card className="h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))', border: '1px solid rgba(139, 92, 246, 0.3)', backdropFilter: 'blur(16px)' }}>
    <CardHeader>
      <CardTitle className="text-white text-xl flex items-center gap-2">
        <Activity className="h-5 w-5 text-violet-400" />
        Monthly Transaction Volume ({year})
      </CardTitle>
    </CardHeader>
    <CardContent>
      <GradientDefs />
      <div className="h-[380px] w-full mt-4 min-w-[1px] min-h-[1px]">
        {monthlyStats.length ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={monthlyStats} margin={{ top: 20, right: 40, left: 20, bottom: 30 }} barSize={monthlyStats.length === 1 ? 120 : undefined} barGap={8} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="5 5" stroke="rgba(139, 92, 246, 0.15)" vertical={false} strokeWidth={1} />
              <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 500 }} axisLine={{ stroke: 'rgba(139, 92, 246, 0.3)', strokeWidth: 2 }} tickLine={false} height={50} />
              <YAxis tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }} axisLine={{ stroke: 'rgba(139, 92, 246, 0.3)', strokeWidth: 2 }} tickLine={false} width={60} label={{ value: 'Transactions', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 13, fontWeight: 600, letterSpacing: '0.5px' } }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 18, 0.98)', border: '1.5px solid rgba(139, 92, 246, 0.4)', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 12px 40px rgba(139, 92, 246, 0.25)' }} labelStyle={{ color: '#e2e8f0', fontWeight: 700, fontSize: '14px' }} itemStyle={{ color: '#fff', fontWeight: 600, fontSize: '13px' }} cursor={{ fill: 'rgba(139, 92, 246, 0.08)', stroke: 'rgba(139, 92, 246, 0.3)', strokeWidth: 2, radius: 8 }} formatter={(v) => [v.toLocaleString(), '']} />
              <Legend wrapperStyle={{ paddingTop: '24px', paddingBottom: '8px' }} iconType="circle" iconSize={10} formatter={(value) => <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 500, marginLeft: '6px' }}>{value}</span>} />
              <Bar dataKey="legitimate" stackId="a" fill="url(#legitimateGradient)" radius={[0, 0, 6, 6]} name="Legitimate" animationDuration={1500} animationBegin={0} />
              <Bar dataKey="fraud" stackId="a" fill="url(#fraudGradient)" radius={[10, 10, 0, 0]} name="Fraudulent" animationDuration={1500} animationBegin={200} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-slate-500 text-lg font-medium">No transaction data available</div>
              <div className="text-slate-600 text-sm mt-2">Start making predictions to see analytics</div>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const RiskPieChart = ({ pieData, total }) => (
  <Card className="h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))', border: '1px solid rgba(139, 92, 246, 0.3)', backdropFilter: 'blur(16px)' }}>
    <CardHeader>
      <CardTitle className="text-white text-xl flex items-center gap-2"><PieChartIcon className="h-5 w-5 text-violet-400" />Risk Distribution</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-between p-8">

      <div className="flex flex-col gap-6">
        {pieData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group:hover:scale-110" style={{ background: `${entry.color}15`, border: `1px solid ${entry.color}30` }}>
              <div className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor]" style={{ background: entry.color }} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{entry.name}</p>
              <p className="text-2xl font-bold text-white">{((entry.value / (total || 1)) * 100).toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[260px] w-[260px] relative min-w-[1px] min-h-[1px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
              {pieData.map((entry, index) => (<Cell key={index} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}60)` }} />))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }} itemStyle={{ color: '#fff', fontWeight: 600 }} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-white tracking-tight">{total}</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Total</span>
        </div>
      </div>

    </CardContent>
  </Card>
);

const GradientDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="legitimateGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
      </linearGradient>
    </defs>
  </svg>
);
