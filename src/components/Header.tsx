import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Quadrinhos", path: "/quadrinhos" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Loja", path: "/loja" },
  { label: "Blog", path: "/blog" },
  { label: "Sobre", path: "/sobre" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/orlandeli", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/orlandeli", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/orlandeli", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/orlandeli", label: "Twitter" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-foreground">
              Orlandeli
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side - Yang + Socials */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/yang">
              <Button 
                variant="default" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                O Mundo de Yang
              </Button>
            </Link>

            {/* Social Toggle */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSocialOpen(!socialOpen)}
                className="border-wood hover:bg-wood/10"
              >
                <motion.div
                  animate={{ rotate: socialOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {socialOpen ? <X className="h-4 w-4" /> : <Instagram className="h-4 w-4" />}
                </motion.div>
              </Button>

              <AnimatePresence>
                {socialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-12 bg-card border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1"
                  >
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        <social.icon className="h-4 w-4 text-primary" />
                        <span>{social.label}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-serif text-xl font-bold">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex-1 p-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <Link
                    to="/yang"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block mt-4"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                      O Mundo de Yang
                    </Button>
                  </Link>
                </div>

                <div className="p-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Redes Sociais</p>
                  <div className="flex gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
