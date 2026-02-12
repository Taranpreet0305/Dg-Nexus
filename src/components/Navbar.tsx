import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DGLogo from './DGLogo';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.a href="#" className="text-foreground" whileHover={{ scale: 1.05 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <DGLogo size={36} className="sm:hidden" />
              <DGLogo size={48} className="hidden sm:block" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item, index) => (
                <motion.button key={item.label} className="nav-link" onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }} whileHover={{ y: -2 }}>
                  {item.label}
                </motion.button>
              ))}
              <motion.button onClick={toggleTheme}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border-2 border-primary/50 hover:border-primary hover:bg-primary/20 transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 180, scale: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-primary" />
                      <span className="text-xs font-display uppercase tracking-wider text-primary">Light</span>
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 180, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -180, scale: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-display uppercase tracking-wider text-primary">Dark</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button onClick={toggleTheme}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-primary/10 border border-primary/50"
                whileTap={{ scale: 0.9 }}>
                {theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
              </motion.button>
              <motion.button className="text-foreground p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} whileTap={{ scale: 0.95 }}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
              {navItems.map((item, index) => (
                <motion.button key={item.label}
                  className="text-xl sm:text-2xl font-display font-bold tracking-wider text-foreground hover:text-muted-foreground transition-colors"
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
