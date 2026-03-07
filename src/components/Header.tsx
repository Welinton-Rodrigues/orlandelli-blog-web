import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "QUADRINHOS", path: "/quadrinhos" },
  { label: "PORTFÓLIO", path: "/portfolio" },
  { label: "LOJA", path: "/loja" },
  { label: "BLOG", path: "/blog" },
  { label: "SOBRE", path: "/sobre" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/orlandeli", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/orlandeli", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/orlandeli", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/orlandeli", label: "YouTube" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full" style={{ fontFamily: "'Arial', sans-serif" }}>
      {/* Main navbar - dark purple like the original */}
      <nav style={{ backgroundColor: "#3D2D38" }}>
        <div className="container mx-auto px-4">
          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Orlandeli"
                className="h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-1 text-xs font-bold tracking-wider transition-colors"
                  style={{
                    color: isActive(link.path) ? "#93c748" : "#cccccc",
                    borderBottom: isActive(link.path) ? "2px solid #93c748" : "2px solid transparent",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#93c748")}
                  onMouseLeave={e => {
                    if (!isActive(link.path)) e.currentTarget.style.color = "#cccccc";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social icons - desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded transition-colors"
                  style={{ color: "#cccccc" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#93c748")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#cccccc")}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded"
              style={{ color: "#cccccc" }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sub-bar - lime green like the original */}
      <div
        className="hidden lg:flex items-center"
        style={{ backgroundColor: "#93c748", height: "6px" }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-72 z-50 lg:hidden flex flex-col"
              style={{ backgroundColor: "#3D2D38" }}
            >
              {/* Mobile header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#93c748" }}
              >
                <span className="text-base font-black tracking-wider" style={{ color: "#93c748" }}>
                  MENU
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#cccccc" }}
                  aria-label="Fechar menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 py-4 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-6 py-3 text-sm font-bold tracking-wider transition-colors"
                    style={{
                      color: isActive(link.path) ? "#93c748" : "#cccccc",
                      borderLeft: isActive(link.path) ? "3px solid #93c748" : "3px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile social links */}
              <div className="px-4 py-4 border-t" style={{ borderColor: "#555" }}>
                <p className="text-xs font-bold tracking-wider mb-3" style={{ color: "#93c748" }}>
                  REDES SOCIAIS
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2 rounded transition-colors"
                      style={{ color: "#cccccc", backgroundColor: "#4a3a4a" }}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
