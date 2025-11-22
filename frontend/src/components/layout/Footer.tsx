import { Github, Linkedin, Twitter, Mail, MapPin, Shield, FileText, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { JSX } from "react";

export const Footer = (): JSX.Element => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Security", href: "#security" },
        { label: "Enterprise", href: "#enterprise" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Blog", href: "#blog" },
        { label: "Press Kit", href: "#press" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "API Reference", href: "#api" },
        { label: "Support", href: "#support" },
        { label: "Status", href: "#status" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "GDPR", href: "#gdpr" },
      ]
    }
  ];

  return (
    <footer className="relative mt-20 overflow-hidden" style={{ background: '#121212' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 100%)'
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}>
                  <Shield className="h-5 w-5" style={{ color: '#a78bfa' }} />
                </div>
                <span className="text-xl font-bold" style={{ color: '#ffffff' }}>
                  CreditAI
                </span>
              </Link>
              <p className="text-sm mb-4" style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                AI-powered fraud detection system with 94% accuracy. Protecting transactions worldwide.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                  <Mail className="h-4 w-4" />
                  <span>support@creditai.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-bold mb-4" style={{ color: '#ffffff' }}>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: '#9ca3af' }}
                        whileHover={{ color: '#a78bfa', x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-8" style={{
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)'
          }} />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm" style={{ color: '#6b7280' }}>
              <span>© 2025 CreditAI. All rights reserved.</span>
              <div className="hidden md:block w-1 h-1 rounded-full" style={{ background: '#6b7280' }} />
              <span>Made with ❤️ by the CreditAI Team</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Github, href: 'https://github.com', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: '#9ca3af' }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Extra Info Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 pt-8" style={{
            borderTop: '1px solid rgba(139, 92, 246, 0.1)'
          }}>
            {[
              { icon: <Shield className="h-3 w-3" />, text: "SOC 2 Certified" },
              { icon: <FileText className="h-3 w-3" />, text: "GDPR Compliant" },
              { icon: <HelpCircle className="h-3 w-3" />, text: "24/7 Support" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  color: '#a78bfa',
                }}
              >
                {badge.icon}
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
