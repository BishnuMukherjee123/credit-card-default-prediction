import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { CreditCard, Sparkles, Menu, X } from "lucide-react";
import type { JSX } from "react";

// Memoized NavLink for DESKTOP (normal size)
const NavLink = memo(({ path, label, isActive, onClick }: { path: string; label: string; isActive: boolean; onClick?: () => void }) => (
  <Link to={path} onClick={onClick}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}>
      <Button 
        variant="ghost"
        className="relative px-3 py-1.5 font-semibold transition-all duration-200"
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

// Memoized NavLink for MOBILE (large size)
const MobileNavLink = memo(({ path, label, isActive, onClick }: { path: string; label: string; isActive: boolean; onClick?: () => void }) => (
  <Link to={path} onClick={onClick}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}>
      <Button 
        variant="ghost"
        className="relative px-4 py-2 font-semibold transition-all duration-200 w-full text-lg"
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
            layoutId="activeTabMobile"
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

MobileNavLink.displayName = 'MobileNavLink';

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

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
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

        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-2.5">
          <div className="flex items-center justify-between w-full relative">
            
            <Link to={isSignedIn ? "/dashboard" : "/"} className="relative group z-50 flex-shrink-0 flex items-center">
              <motion.div 
                className="flex items-center gap-2 sm:gap-3"
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
                    className="relative p-1.5 sm:p-2 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                      border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                    <CreditCard className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#a78bfa' }} />
                  </div>
                </div>

                <span 
                  className="text-xl sm:text-2xl font-black tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                  CreditAI
                </span>

                <motion.span
                  className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold"
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

            {/* Desktop Navigation - NORMAL SIZE */}
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
                        className="font-semibold relative overflow-hidden h-9 px-4"
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

            {/* Spacer to force hamburger to right */}
            <div className="flex-1 md:hidden" />

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              className="md:hidden relative z-50 p-2 flex-shrink justify-items-end"
              style={{
                color: '#ffffff',
                background: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important'
              }}>
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* FULLSCREEN MOBILE MENU OVERLAY - LARGE SIZE */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="fullscreen-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed inset-0 z-40 md:hidden overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 13, 0.98), rgba(15, 15, 18, 0.98))',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              maxHeight: '100dvh' // Dynamic viewport height for mobile
            }}>
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute w-full h-full"
                style={{
                  background: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1), transparent 50%)'
                }}
              />
            </div>

            {/* Menu Content */}
            <div className="relative min-h-full flex flex-col justify-center items-center px-6 py-20">
              
              {/* Navigation Links - LARGE SIZE */}
              <motion.div 
                className="w-full max-w-md space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}>
                
                {isSignedIn ? (
                  <>
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ 
                          delay: 0.1 + index * 0.08,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}>
                        <MobileNavLink 
                          path={link.path} 
                          label={link.label} 
                          isActive={isActive(link.path)}
                          onClick={closeMenu}
                        />
                      </motion.div>
                    ))}
                    
                    {/* User Profile */}
                    <motion.div 
                      className="pt-8 mt-8 border-t border-violet-500/20 flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.4, duration: 0.3 }}>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-16 h-16 border-2 border-violet-500/30",
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
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.1, duration: 0.4 }}>
                      <Link to="/login" onClick={closeMenu} className="block">
                        <Button 
                          variant="ghost"
                          className="w-full font-semibold text-lg py-6"
                          style={{
                            color: '#94a3b8',
                            border: '1px solid rgba(139, 92, 246, 0.3)'
                          }}>
                          Sign In
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.18, duration: 0.4 }}>
                      <Link to="/login" onClick={closeMenu} className="block">
                        <Button 
                          className="w-full font-semibold text-lg py-6"
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            color: '#ffffff',
                            border: 'none',
                            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)'
                          }}>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Get Started
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* Decorative Footer Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute bottom-8 text-center">
                <p className="text-sm text-slate-500">
                  AI-Powered Credit Intelligence
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
