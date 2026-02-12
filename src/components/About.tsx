import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from './TextReveal';
import StaggeredContainer from './StaggeredContainer';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Parallax transforms for various elements
  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
  const decorY1 = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ['0px', '-120px']);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Parallax background decorations */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-64 h-64 border border-border/10 rounded-full"
        style={{ y: decorY1 }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[3%] w-48 h-48 border border-border/15"
        style={{ y: decorY2, rotate: decorRotate }}
      />
      <motion.div
        className="absolute top-[40%] left-[8%] w-2 h-2 bg-silver/30 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0px', '-60px']) }}
      />
      <motion.div
        className="absolute top-[60%] right-[12%] w-3 h-3 bg-titanium/20 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0px', '-100px']) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left side - Image/Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
          >
            <div className="aspect-square relative">
              {/* Abstract geometric composition */}
              <div className="absolute inset-0 bg-gradient-to-br from-card to-background rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="150"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2 }}
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 0.3 }}
                    />
                    <motion.rect
                      x="100"
                      y="100"
                      width="200"
                      height="200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      transform="rotate(45 200 200)"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 0.6 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/30" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/30" />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: contentY }}
          >
            <motion.span
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-display"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About Me
            </motion.span>

            <motion.h2
              className="section-title mt-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TextReveal delay={0.1}>Creative</TextReveal>
              <br />
              <span className="text-gradient">
                <TextReveal delay={0.4}>Vision</TextReveal>
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I'm a passionate designer–developer who blends visual creativity with 
              technical development to create meaningful digital experiences. I enjoy 
              designing clean, modern graphics and building interactive interfaces that 
              are both aesthetic and user-friendly.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              With hands-on experience in Adobe tools, UI/UX, and programming 
              fundamentals, I bring a unique mix of artistry and logic to every 
              project I work on.
            </motion.p>

            {/* Stats with Staggered Animation */}
            <StaggeredContainer 
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12"
              staggerDelay={0.15}
              direction="up"
            >
              {[
                { number: '12+', label: 'Projects' },
                { number: '2', label: 'Internships' },
                { number: '1.5', label: 'Years Exp' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
