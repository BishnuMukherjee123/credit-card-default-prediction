import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { CreditCard, Sparkles, Menu, X } from "lucide-react";
import type { JSX } from "react";

// Memoized NavLink for performance
const NavLink = memo(({ path, label, isActive, onClick }: { path: string; label: string; isActive: boolean; onClick?: () => void }) => (
  <Link to={path} onClick={onClick}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}>
      <Button 
        variant="ghost"
        className="relative px-4 py-2 font-semibold transition-all duration-200 w-full md:w-auto"
        style={{
          color: isActive ? '#ffffff' : '#94a3b8',
          background: isActive 
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))' 
            : 'transparent',
          border: isActive 
            ? '1px solid rgba(139, 92, 246, 0.4)' 
            : '1px solid transparent',
          boxShadow: isActive ? '0 4px 16px rgba(139, 92, 246, 0.3)' : 'none',
          willChange: 'transform'
        }}>
        {label}
        
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ 
              background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
              willChange: 'transform'
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }} />
        )}
      </Button>
    </motion.div>
  </Link>
));

NavLink.displayName = 'NavLink';

export const Navbar = (): JSX.Element => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Memoize navigation links
  const navLinks = useMemo(() => [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/predict', label: 'Predict' },
    { path: '/history', label: 'History' }
  ], []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        background: 'linear-gradient(135deg, rgba(10, 10, 13, 0.85), rgba(10, 10, 13, 0.75))',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(139, 92, 246, 0.1)',
        willChange: 'transform'
      }}>
      
      {/* Animated background (only if motion not reduced) */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -1 }}>
          <motion.div
            className="absolute w-[500px] h-[100px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)',
              top: '-50%',
              left: '20%',
              willChange: 'transform, opacity'
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
        </div>
      )}

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to={isSignedIn ? "/dashboard" : "/"} className="relative group">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: 'transform' }}>
              
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    willChange: 'opacity'
                  }}
                  transition={{ duration: 0.3 }} />
                
                <div 
                  className="relative p-2 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}>
                  <CreditCard className="h-6 w-6" style={{ color: '#a78bfa' }} />
                </div>
              </div>

              <span 
                className="text-2xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                CreditAI
              </span>

              <motion.span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#a78bfa',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  willChange: 'opacity'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                AI
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {isSignedIn ? (
              <>
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    path={link.path} 
                    label={link.label} 
                    isActive={isActive(link.path)} 
                  />
                ))}

                <div 
                  className="h-8 w-px mx-2"
                  style={{ background: 'rgba(139, 92, 246, 0.2)' }} />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ willChange: 'transform' }}>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-violet-500/30",
                        userButtonPopoverCard: "bg-[#0f0f12] border border-violet-500/30 shadow-xl shadow-violet-500/10",
                        userButtonPopoverActionButton: "hover:bg-violet-500/10 text-slate-200",
                        userButtonPopoverActionButtonText: "text-slate-200",
                        userButtonPopoverActionButtonIcon: "text-violet-400",
                        userButtonPopoverFooter: "hidden",
                      }
                    }}
                  />
                </motion.div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{ willChange: 'transform' }}>
                    <Button 
                      variant="ghost"
                      className="font-semibold"
                      style={{
                        color: '#94a3b8',
                        border: '1px solid transparent'
                      }}>
                      Sign In
                    </Button>
                  </motion.div>
                </Link>

                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(139, 92, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{ willChange: 'transform' }}>
                    <Button 
                      className="font-semibold relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        color: '#ffffff',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                      }}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Started
                      
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            backgroundSize: '200% 100%',
                            willChange: 'background-position'
                          }}
                          animate={{
                            backgroundPosition: ['-200% 0', '200% 0']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }} />
                      )}
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#a78bfa'
            }}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden mt-4"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.85))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)'
              }}>
              <div className="p-4 space-y-2">
                {isSignedIn ? (
                  <>
                    {navLinks.map((link) => (
                      <NavLink 
                        key={link.path} 
                        path={link.path} 
                        label={link.label} 
                        isActive={isActive(link.path)}
                        onClick={closeMenu}
                      />
                    ))}
                    
                    <div className="pt-4 border-t border-violet-500/20">
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 border-2 border-violet-500/30",
                            userButtonPopoverCard: "bg-[#0f0f12] border border-violet-500/30 shadow-xl shadow-violet-500/10",
                            userButtonPopoverActionButton: "hover:bg-violet-500/10 text-slate-200",
                            userButtonPopoverActionButtonText: "text-slate-200",
                            userButtonPopoverActionButtonIcon: "text-violet-400",
                            userButtonPopoverFooter: "hidden",
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMenu}>
                      <Button 
                        variant="ghost"
                        className="w-full font-semibold"
                        style={{
                          color: '#94a3b8',
                          border: '1px solid transparent'
                        }}>
                        Sign In
                      </Button>
                    </Link>

                    <Link to="/login" onClick={closeMenu}>
                      <Button 
                        className="w-full font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                          color: '#ffffff',
                          border: 'none',
                          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                        }}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
