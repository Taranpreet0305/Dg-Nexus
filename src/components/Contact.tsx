import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import MagneticButton from './MagneticButton';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().max(20, "Phone too long").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message too long"),
});

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dakshgulati77/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/dakshgulati777' },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
      </svg>
    ),
    label: 'Behance',
    href: 'https://www.behance.net/dakshgulati2',
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate submission since Supabase isn't connected
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-display">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">Ready to create something amazing together?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to say hello — I'd love to hear from you.
            </p>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-10">
              <a href="mailto:dakshgulati77@gmail.com" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base break-all">dakshgulati77@gmail.com</span>
              </a>
              <a href="tel:+919210448874" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base">+91 9210448874</span>
              </a>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <MagneticButton key={social.label} as="a" href={social.href}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  strength={0.5} radius={80}>
                  <social.icon />
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative"
            initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-display uppercase tracking-wider mb-2">Name</label>
                <input type="text" id="name" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 text-base ${
                    errors.name ? 'border-destructive' : 'border-border focus:border-silver'
                  }`} placeholder="Your name" />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-display uppercase tracking-wider mb-2">Email</label>
                <input type="email" id="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 text-base ${
                    errors.email ? 'border-destructive' : 'border-border focus:border-silver'
                  }`} placeholder="your@email.com" />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-display uppercase tracking-wider mb-2">Phone</label>
              <input type="tel" id="phone" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-silver transition-all duration-300 text-base"
                placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-display uppercase tracking-wider mb-2">Message</label>
              <textarea id="message" required rows={4} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 resize-none text-base ${
                  errors.message ? 'border-destructive' : 'border-border focus:border-silver'
                }`} placeholder="Tell me about your project..." />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <MagneticButton as="button" className="btn-outline w-full" strength={0.25} radius={150}
              onClick={(e) => { if (!isSubmitting) handleSubmit(e as any); }}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full inline-block" />
                  Sending...
                </span>
              ) : 'Send Message'}
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
