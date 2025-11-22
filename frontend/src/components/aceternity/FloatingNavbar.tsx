import './aceternity.css'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { type JSX } from "react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center space-x-4 px-8 py-3 rounded-full border border-border/40 backdrop-blur-xl bg-background/60 shadow-lg",
            className
          )}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`nav-${idx}`}
              to={item.link}
              className={cn(
                "relative text-neutral-400 hover:text-neutral-100 transition-colors px-4 py-2 text-sm font-medium",
                location.pathname === item.link && "text-neutral-100"
              )}
            >
              {location.pathname === item.link && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-neutral-800 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
