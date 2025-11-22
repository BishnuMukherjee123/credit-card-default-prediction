import { motion } from "framer-motion";
import { SignIn, SignUp } from "@clerk/clerk-react";  // ✅ ONLY CHANGE: Remove useAuth
// REMOVED: import { Navigate } from "react-router-dom";  // ✅ Remove this
import { useState } from "react";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { CreditCard } from "lucide-react";

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  // ✅ ONLY CHANGE: Remove these 4 lines
  // const { isSignedIn } = useAuth();
  // if (isSignedIn) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    // 👇 EVERYTHING BELOW THIS STAYS EXACTLY THE SAME - ALL YOUR DESIGN/ANIMATIONS
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0a0d 0%, #0f0f12 50%, #0a0a0d 100%)'
      }}>
      {/* ... rest of your code stays EXACTLY the same ... */}
