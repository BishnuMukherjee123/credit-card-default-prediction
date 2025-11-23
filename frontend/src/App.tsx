import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { JSX } from "react";

// ✅ LAZY LOAD ALL PAGES - Dramatically improves initial load time
// Each page is now in a separate chunk, loaded only when needed
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PredictionPage = lazy(() => import('./pages/PredictionPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

// ✅ BEAUTIFUL LOADING COMPONENT
const LoadingScreen = () => (
  <div 
    className="flex-1 flex items-center justify-center relative overflow-hidden min-h-[50vh]" 
    style={{ background: '#000000' }}>
    
    {/* Animated Background Orbs */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
          top: '20%',
          left: '10%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)',
          bottom: '20%',
          right: '10%'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>

    {/* Loading Content */}
    <div className="relative z-10 flex flex-col items-center gap-6">
      {/* Spinning Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 
          className="h-16 w-16"
          style={{ color: '#8b5cf6' }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Loading...
        </h2>
        <p className="text-slate-400 text-sm">Please wait a moment</p>
      </motion.div>

      {/* Animated Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: '#8b5cf6' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Protected Route
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return isSignedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

// Auth Route
const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return isSignedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// Root Redirect
const RootRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return isSignedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

// Routes Component
function AppRoutes(): JSX.Element {
  const location = useLocation();
  
  // ✅ CHECK IF CURRENT PAGE IS LOGIN
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ✅ CONDITIONALLY RENDER NAVBAR */}
      {!isLoginPage && <Navbar />}
      
      <main className="flex-1 w-full flex flex-col bg-[#0a0a0d]">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
              
              <Route path="/" element={<RootRedirect />} />
              
              <Route path="/login" element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/predict" element={
                <ProtectedRoute>
                  <PredictionPage />
                </ProtectedRoute>
              } />
              
              <Route path="/history" element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } />

              <Route path="/analytics" element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {/* ✅ CONDITIONALLY RENDER FOOTER */}
      {!isLoginPage && <Footer />}
      
      <Toaster />
    </div>
  );
}

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="credit-ai-theme">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
