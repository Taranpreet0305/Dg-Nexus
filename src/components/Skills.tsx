import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import TextReveal from './TextReveal';
import StaggeredContainer from './StaggeredContainer';

const skillCategories = [
  {
    title: 'Design Tools',
    skills: [
      { name: 'Adobe Illustrator', proficiency: 95 },
      { name: 'Photoshop', proficiency: 90 },
      { name: 'Lightroom', proficiency: 85 },
      { name: 'InDesign', proficiency: 80 },
      { name: 'Affinity', proficiency: 75 },
      { name: 'Figma', proficiency: 90 },
      { name: 'Canva', proficiency: 95 },
    ],
  },
  {
    title: 'Programming',
    skills: [
      { name: 'C', proficiency: 85 },
      { name: 'C++', proficiency: 80 },
      { name: 'Python', proficiency: 75 },
      { name: 'Java', proficiency: 70 },
      { name: 'Android Dev', proficiency: 65 },
      { name: 'Software Engineering', proficiency: 80 },
    ],
  },
  {
    title: 'Creative & Content',
    skills: [
      { name: 'Video Editing', proficiency: 85 },
      { name: 'Brand Designing', proficiency: 95 },
      { name: 'Branding', proficiency: 90 },
      { name: 'Social Media Design', proficiency: 95 },
      { name: 'Typography', proficiency: 90 },
      { name: 'Blogging', proficiency: 80 },
      { name: 'Content Writing', proficiency: 85 },
      { name: 'UI/UX Design', proficiency: 88 },
    ],
  },
];

// All skills for marquee
const allSkillsRow1 = [
  'Adobe Illustrator', 'Photoshop', 'Lightroom', 'InDesign', 'Affinity', 
  'Figma', 'Canva', 'After Effects', 'Premiere Pro', 'C', 'C++', 'Python', 
  'Java', 'Android Dev', 'Software Engineering', 'Video Editing'
];

const allSkillsRow2 = [
  'Brand Designing', 'Branding', 'Social Media Design', 'Typography', 
  'Blogging', 'Content Writing', 'UI/UX Design', 'React', 'TypeScript', 
  'HTML/CSS', 'Git', 'VS Code', 'Notion', 'Blender', 'Motion Graphics', 'DaVinci Resolve'
];

const MarqueeRow = memo(({ direction = 'left', skills }: { direction?: 'left' | 'right'; skills: string[] }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];
  
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 'left' ? [0, -33.33 * skills.length * 3] : [-33.33 * skills.length * 3, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.span
            key={`${skill}-${index}`}
            className="flex-shrink-0 px-4 py-2 text-sm font-medium border border-border/60 bg-card/40 backdrop-blur-sm rounded-full text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-default whitespace-nowrap"
            whileHover={{ scale: 1.08, boxShadow: '0 0 25px hsl(0 0% 100% / 0.25)' }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
});

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 relative bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-display">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
            <TextReveal delay={0.1}>Skills & </TextReveal>
            <span className="text-gradient"><TextReveal delay={0.35}>Tools</TextReveal></span>
          </h2>
        </motion.div>

        {/* Skills Grid with Staggered Animation */}
        <StaggeredContainer 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          staggerDelay={0.12}
          direction="up"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="glass-card card-glow rounded-lg p-4 sm:p-5 md:p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-display font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-foreground">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-silver via-platinum to-titanium rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: skillIndex * 0.1,
                          ease: 'easeOut',
                        }}
                        style={{
                          boxShadow: '0 0 10px hsl(var(--glow-silver))',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggeredContainer>

        {/* Marquee Animation */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 -mx-4 sm:-mx-6 md:-mx-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative">
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-card/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-card/30 to-transparent z-10 pointer-events-none" />
            
            {/* Row 1 - Left to Right */}
            <MarqueeRow direction="right" skills={allSkillsRow1} />
            
            {/* Row 2 - Right to Left */}
            <MarqueeRow direction="left" skills={allSkillsRow2} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;