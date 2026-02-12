import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import StaggeredContainer from './StaggeredContainer';
const workExperience = [
  {
    title: 'Graphic Designer',
    company: 'Merox',
    type: 'Work',
  },
  {
    title: 'Graphic Designer',
    company: 'Social Media Club',
    type: 'Work',
  },
];

const virtualInternships = [
  {
    title: 'Software Engineering',
    company: 'Accenture',
  },
  {
    title: 'Strategic & Experience Design',
    company: 'BCG X',
  },
  {
    title: 'Software Engineering',
    company: 'EA',
  },
  {
    title: 'UX Design',
    company: 'Lloyds Banking Group',
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-display">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 sm:mb-8 md:mb-10">Work Experience</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-foreground/30 via-foreground/10 to-transparent" />
              
              <StaggeredContainer className="space-y-6 sm:space-y-8 md:space-y-10" staggerDelay={0.1} direction="left">
                {workExperience.map((exp) => (
                  <div
                    key={exp.title + exp.company}
                    className="relative pl-8 sm:pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 timeline-dot" />
                    
                    <motion.div 
                      className="glass-card card-glow rounded-lg p-4 sm:p-5 md:p-6 hover:bg-card/80 transition-colors"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {exp.type}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg mt-1">
                        {exp.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">{exp.company}</p>
                    </motion.div>
                  </div>
                ))}
              </StaggeredContainer>
            </div>
          </motion.div>

          {/* Virtual Internships */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 sm:mb-8 md:mb-10">Virtual Internships</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-foreground/30 via-foreground/10 to-transparent" />
              
              <StaggeredContainer className="space-y-6 sm:space-y-8 md:space-y-10" staggerDelay={0.1} direction="right">
                {virtualInternships.map((exp) => (
                  <div
                    key={exp.title + exp.company}
                    className="relative pl-8 sm:pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 timeline-dot" />
                    
                    <motion.div 
                      className="glass-card card-glow rounded-lg p-4 sm:p-5 md:p-6 hover:bg-card/80 transition-colors"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        Virtual Internship
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg mt-1">
                        {exp.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1">{exp.company}</p>
                    </motion.div>
                  </div>
                ))}
              </StaggeredContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
