import { BrowserRouter, Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnimatePresence } from 'framer-motion';
import { type ReactNode, lazy, Suspense } from 'react';
import type { JSX } from "react";

// ✅ LAZY LOAD ALL PAGES - Dramatically improves initial load t  ime
// Each page is now in a separate chunk, loaded only when needed
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PredictionPage = lazy(() => import('./pages/PredictionPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

// ✅ ULTRA-LIGHTWEIGHT LOADING COMPONENT - Renders instantly
const LoadingScreen = () => (
  <div 
    className="flex-1 flex items-center justify-center min-h-[50vh]" 
    style={{ background: '#0a0a0d' }}>
    
    <div className="flex flex-col items-center gap-4">
      {/* Simple Spinning Loader - No heavy animations */}
      <div
        className="h-12 w-12 border-4 border-violet-500 border-t-transparent rounded-full"
        style={{
          animation: 'spin 0.8s linear infinite',
        }}
      />
      
      {/* Simple Text - No gradients */}
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
    
    {/* Inject keyframes once */}
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
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
  
  // ✅ CHECK IF CURRENT PAGE IS LOGIN (Robust check using matchPath)
  const isLoginPage = !!matchPath("/login", location.pathname);

  return (
    <div className={`min-h-screen ${isLoginPage ? 'bg-black' : 'bg-background'} text-foreground flex flex-col`}>
      {/* ✅ CONDITIONALLY RENDER NAVBAR */}
      {!isLoginPage && <Navbar />}
      
      <main className={`flex-1 w-full flex flex-col ${isLoginPage ? 'bg-black pt-0' : 'bg-[#0a0a0d] pt-14'}`}>
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
      {!isLoginPage && <Toaster />}
      
      
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
