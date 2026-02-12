import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import ProjectTransition from './ProjectTransition';
import TiltCard from './TiltCard';

const codingProjects = [
  {
    title: 'DesignVerse',
    description: 'A creative design platform',
    link: 'https://github.com/dakshgulati777/DesignVerse',
    tech: ['React', 'Design'],
    category: 'coding',
  },
  {
    title: 'DBIT-SIMS',
    description: 'Student Information Management System',
    link: 'https://github.com/dakshgulati777/DBIT-SIMS',
    tech: ['Java', 'Database'],
    category: 'coding',
  },
  {
    title: 'Shinchi',
    description: 'Interactive application',
    link: 'https://github.com/dakshgulati777/Shinchi',
    tech: ['Python', 'AI'],
    category: 'coding',
  },
  {
    title: 'Monster Hunt Game',
    description: 'Action-packed gaming experience',
    link: 'https://github.com/dakshgulati777/Monster-Hunt--Game',
    tech: ['Game Dev', 'Graphics'],
    category: 'coding',
  },
  {
    title: 'Puzzle Game',
    description: 'Mind-bending puzzle challenges',
    link: 'https://github.com/dakshgulati777/Puzzle-Game',
    tech: ['Logic', 'Game'],
    category: 'coding',
  },
];

const designProjects = [
  {
    title: 'Bloom Vine Brand Kit',
    description: 'Complete brand identity system',
    link: 'https://www.behance.net/gallery/234192275/Bloom-Vine-Brand-Kit',
    tech: ['Branding', 'Identity'],
    category: 'design',
  },
  {
    title: 'NIKE Posters',
    description: 'Dynamic sports poster series',
    link: 'https://www.behance.net/gallery/236976897/NIKE-POSTERS',
    tech: ['Poster', 'Sports'],
    category: 'design',
  },
  {
    title: 'VOLTROX Brand Kit',
    description: 'Tech brand visual identity',
    link: 'https://www.behance.net/gallery/232685537/VOLTROX-BRAND-KIT',
    tech: ['Branding', 'Tech'],
    category: 'design',
  },
  {
    title: 'ELEGANCE UI/UX',
    description: 'Luxury interface design',
    link: 'https://www.behance.net/gallery/239622631/ELEGENCE-UIUX',
    tech: ['UI/UX', 'Web'],
    category: 'design',
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coding' | 'design'>('all');
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<{ title: string; url: string } | null>(null);
  
  const allProjects = [...codingProjects, ...designProjects];
  
  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter((project) => project.category === selectedCategory);

  const handleProjectClick = (project: typeof allProjects[0], e: React.MouseEvent) => {
    e.preventDefault();
    setTransitionTarget({ title: project.title, url: project.link });
    setTransitioning(true);
  };

  return (
    <>
      <section id="projects" className="py-16 sm:py-24 md:py-32 relative bg-card/30" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-display">
              Featured
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
              All <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground self-center mr-1 sm:mr-2 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">Category:</span>
              {['all', 'coding', 'design'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-display transition-all ${
                    selectedCategory === category
                      ? 'bg-foreground text-background shadow-[0_0_30px_hsl(0_0%_100%/0.3)]'
                      : 'bg-card text-muted-foreground hover:bg-card/80 hover:shadow-[0_0_20px_hsl(220_10%_85%/0.2)]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Filtered Projects */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <TiltCard
                    className="glass-card card-glow rounded-lg overflow-hidden group hover:bg-card/80 p-6 cursor-pointer h-full"
                    maxTilt={10}
                    scale={1.03}
                  >
                    <div 
                      className="h-full"
                      onClick={(e) => handleProjectClick(project, e)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        {project.category === 'coding' ? (
                          <Github className="w-10 h-10 text-muted-foreground group-hover:text-foreground transition-colors" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 flex items-center justify-center">
                            <span className="text-lg font-display font-bold">B</span>
                          </div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </div>
                      <h4 className="font-display font-bold text-lg mb-2 group-hover:text-gradient">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectTransition
        isActive={transitioning}
        projectTitle={transitionTarget?.title || ''}
        targetUrl={transitionTarget?.url || ''}
        onComplete={() => setTransitioning(false)}
      />
    </>
  );
};

export default Projects;