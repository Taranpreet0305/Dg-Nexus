import { motion } from 'framer-motion';
import DGLogo from './DGLogo';

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 md:py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <DGLogo size={32} className="text-foreground sm:hidden" />
            <DGLogo size={40} className="text-foreground hidden sm:block" />
          </motion.div>
          <motion.p className="text-xs sm:text-sm text-muted-foreground font-body text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            © {new Date().getFullYear()} Daksh Gulati. All rights reserved.
          </motion.p>
          <motion.button
            className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors font-display"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -2 }}>
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
