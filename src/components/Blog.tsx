import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

const articles = [
  {
    title: 'The Art of Minimalist Brand Design',
    excerpt: 'Exploring how less can truly be more in creating memorable brand identities that stand the test of time.',
    category: 'Branding',
    date: 'Dec 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'UI/UX Trends to Watch in 2025',
    excerpt: 'From glassmorphism to AI-driven interfaces, discover the design trends shaping the future of digital experiences.',
    category: 'UI/UX',
    date: 'Nov 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'Color Psychology in Digital Design',
    excerpt: 'Understanding how colors influence user emotions and behavior to create more impactful designs.',
    category: 'Design Theory',
    date: 'Oct 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=400&fit=crop',
    link: '#',
  },
];

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="py-16 sm:py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-display">
            Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight font-display mt-3 sm:mt-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Thoughts on design, development, and creative processes.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <a 
                href={article.link} 
                className="block glass-card card-glow rounded-xl overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <motion.img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-display uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                    {article.category}
                  </span>
                  
                  {/* Arrow Icon */}
                  <motion.div 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 45, scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  {/* Read More */}
                  <motion.span 
                    className="inline-flex items-center gap-1 mt-4 text-sm font-display text-primary"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
