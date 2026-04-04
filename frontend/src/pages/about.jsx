import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const CARDS = [
  {
    id: "data-driven",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: "bg-brand-cream/50 text-brand-maroon border-brand-taupe/50",
    shadow: "hover:shadow-[0_15px_40px_rgba(154,24,21,0.1)]",
    title: "Data-Driven Insights",
    body: (
      <>
        The platform analyses key performance metrics including{" "}
        <strong className="text-brand-black">satisfaction level</strong>,{" "}
        <strong className="text-brand-black">evaluation scores</strong>,{" "}
        <strong className="text-brand-black">project count</strong>, and{" "}
        <strong className="text-brand-black">tenure</strong> to assess promotion
        readiness with high accuracy.
      </>
    ),
  },
  {
    id: "tech-stack",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    accent: "bg-white/50 text-brand-crimson border-brand-taupe/50",
    shadow: "hover:shadow-[0_15px_40px_rgba(154,24,21,0.1)]",
    title: "Modern Tech Stack",
    body: (
      <>
        Built with{" "}
        <strong className="text-brand-maroon">React</strong>,{" "}
        <strong className="text-brand-crimson">FastAPI</strong>, and{" "}
        <strong className="text-brand-maroon">Scikit-learn</strong>{" "}
        — a production-grade pipeline from model to UI.
      </>
    ),
  },
];

const TECH_BADGES = [
  { label: "React",        color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-maroon hover:text-brand-maroon hover:bg-brand-cream/10"       },
  { label: "FastAPI",      color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-crimson hover:text-brand-crimson hover:bg-brand-cream/10" },
  { label: "Scikit-learn", color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-maroon hover:text-brand-maroon hover:bg-brand-cream/10"  },
  { label: "Decision Tree",color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-crimson hover:text-brand-crimson hover:bg-brand-cream/10"  },
  { label: "Python",       color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-maroon hover:text-brand-maroon hover:bg-brand-cream/10"  },
  { label: "Tailwind CSS", color: "bg-white text-brand-taupe border-brand-taupe/30 hover:border-brand-crimson hover:text-brand-crimson hover:bg-brand-cream/10"           },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

/* Magnetic Interactive Container Wrapper */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function About() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto flex flex-col gap-16 relative z-10 w-full mb-10 mt-6"
    >

      {/* ── Header ── */}
      <motion.div variants={itemVariants} className="text-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md border border-brand-taupe/50
                          rounded-full text-brand-maroon text-xs font-bold tracking-wide shadow-sm mb-6 cursor-default"
        >
          <svg className="w-3.5 h-3.5 text-brand-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About The Platform
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-6 tracking-tight drop-shadow-sm">
          Built for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon to-brand-crimson">
            Smarter HR
          </span>
        </h1>
        <p className="text-lg text-brand-taupe max-w-xl mx-auto leading-relaxed font-bold">
          Discover the technology and methodology behind our predictive workforce models.
        </p>
      </motion.div>

      {/* ── Cards ── */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
        {CARDS.map(({ id, icon, accent, shadow, title, body }) => (
          <motion.div key={id} variants={itemVariants}>
            <TiltCard>
              <article
                id={`about-card-${id}`}
                className={`group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                            border border-brand-cream/50 hover:border-brand-taupe/50 ${shadow} transition-all duration-300 h-full`}
              >
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${accent} shadow-sm`}
                >
                  {icon}
                </motion.div>
                <h2 className="text-xl font-bold text-brand-black mb-4">{title}</h2>
                <p className="text-brand-taupe leading-relaxed font-medium">{body}</p>
              </article>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Tech badges ── */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-2xl border border-white rounded-3xl p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
      >
        <h2 className="text-xs font-bold text-brand-taupe tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
          <span className="h-px bg-brand-taupe/20 flex-1"></span>
          Technology Stack
          <span className="h-px bg-brand-taupe/20 flex-1"></span>
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {TECH_BADGES.map(({ label, color }) => (
            <motion.span
              key={label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-4 py-2 rounded-full text-xs font-bold border ${color} shadow-sm cursor-default transition-colors duration-200`}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Report CTA ── */}
      <motion.div variants={itemVariants} className="flex justify-center pb-8">
        <TiltCard>
          <motion.a
            href="/report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-brand-black text-brand-cream border border-brand-maroon
                       px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-brand-black/10"
          >
            <span className="text-lg">📄</span>
            View Project Report
            <motion.svg className="w-4 h-4 text-brand-crimson" 
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </motion.a>
        </TiltCard>
      </motion.div>

    </motion.div>
  );
}

export default About;