import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "95%",  label: "Prediction Accuracy" },
  { value: "8",    label: "Key HR Metrics"       },
  { value: "Real-time", label: "AI Analysis"     },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bg:    "bg-brand-cream/50",
    text:  "text-brand-maroon",
    border:"border-brand-taupe/30",
    title: "Data-Driven",
    desc:  "Trained on real HR datasets covering performance, tenure & satisfaction.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bg:    "bg-white/50",
    text:  "text-brand-crimson",
    border:"border-brand-taupe/30",
    title: "Instant Results",
    desc:  "Get promotion probability scores and feature importance in seconds.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg:    "bg-brand-taupe/20",
    text:  "text-brand-black",
    border:"border-brand-taupe/50",
    title: "Explainable AI",
    desc:  "Decision tree visualisation lets you understand every prediction.",
  },
];

/* Animation Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

/* Magnetic Interactive Card Component */
function MagneticCard({ children, className, initialRotate = 0, yOffset = 0, delay = 0 }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 50, opacity: 0, rotate: initialRotate }}
      animate={{ y: 0, opacity: 1, rotate: initialRotate }}
      transition={{ 
        y: { type: "spring", stiffness: 100, damping: 20, delay },
        opacity: { duration: 0.8, delay } 
      }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className={`absolute z-10 ${className}`}
    >
      <div className="w-full h-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function Home() {
  return (
    <motion.div 
      className="flex flex-col gap-24 relative z-10 w-full max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      {/* ── Split Hero Layout ── */}
      <section className="w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10">

        {/* Left: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
          
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-taupe/10 backdrop-blur-md border border-brand-taupe/30
                            rounded-full text-brand-maroon text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-crimson shadow-[0_0_8px_rgba(154,24,21,0.6)] animate-pulse" />
              Next-Gen HR Intelligence
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-brand-black drop-shadow-sm"
          >
            Drive Smarter<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon to-brand-crimson">
              Promotions
            </span>{" "}
            with AI
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-brand-taupe max-w-xl leading-relaxed font-medium"
          >
            Leverage advanced Machine Learning to accurately predict employee
            promotion eligibility and retain top talent.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
            <Link to="/predict">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-brand-black text-brand-cream px-8 py-4 rounded-full text-base font-medium shadow-lg hover:shadow-xl hover:bg-brand-maroon transition-colors border border-brand-black"
              >
                Start Prediction
                <motion.svg className="w-4 h-4" 
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-brand-taupe/30 text-brand-black px-8 py-4 rounded-full text-base font-medium shadow-sm transition-colors"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right: Structural Visual (Glass Floating Cards mapping Mouse movements) */}
        <motion.div 
          variants={itemVariants}
          className="relative h-[400px] hidden lg:block perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream to-white rounded-[3rem] shadow-inner opacity-50 border border-white" />
          
          {/* Floating Card 1 */}
          <MagneticCard className="top-10 -left-6 w-64" initialRotate={-6} yOffset={-15} delay={0}>
             <div className="bg-white/90 backdrop-blur-xl border border-brand-taupe/20 p-6 rounded-3xl shadow-xl w-full h-full transition-shadow hover:shadow-2xl hover:border-brand-taupe/50">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-maroon font-bold border border-brand-taupe/30">92%</div>
                 <div>
                    <div className="font-bold text-brand-black text-sm">John Doe</div>
                    <div className="text-xs text-brand-taupe font-bold tracking-wide uppercase">ENGINEER</div>
                 </div>
              </div>
              <div className="w-full bg-brand-taupe/20 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
                 <motion.div 
                    initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full bg-brand-maroon" 
                 />
              </div>
              <div className="text-[10px] text-brand-taupe font-bold uppercase tracking-wider text-right">Highly Likely</div>
            </div>
          </MagneticCard>

          {/* Floating Card 2 */}
          <MagneticCard className="bottom-10 right-0 w-64" initialRotate={3} yOffset={15} delay={1}>
            <div className="bg-white/90 backdrop-blur-xl border border-brand-taupe/20 p-6 rounded-3xl shadow-xl w-full h-full transition-shadow hover:shadow-2xl hover:border-brand-taupe/50">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-brand-taupe/20 flex items-center justify-center text-brand-black font-bold border border-brand-taupe/30">45%</div>
                 <div>
                    <div className="font-bold text-brand-black text-sm">Jane Smith</div>
                    <div className="text-xs text-brand-taupe font-bold tracking-wide uppercase">MARKETING</div>
                 </div>
              </div>
              <div className="w-full bg-brand-taupe/20 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
                 <motion.div 
                    initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full rounded-full bg-brand-crimson" 
                 />
              </div>
              <div className="text-[10px] text-brand-taupe font-bold uppercase tracking-wider text-right">Needs Growth</div>
            </div>
          </MagneticCard>
          
        </motion.div>
      </section>

      <section className="w-full grid lg:grid-cols-12 gap-12">
        {/* ── Stats bar ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col justify-center divide-y divide-brand-taupe/20 bg-white/70 backdrop-blur-xl border border-brand-taupe/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden relative"
        >
          {STATS.map(({ value, label }) => (
            <motion.div 
              key={label}
              whileHover={{ backgroundColor: "rgba(230, 215, 190, 0.4)" }} /* brand-cream with opacity */
              className="flex flex-col items-center justify-center py-6 px-4 transition-colors z-10"
            >
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon to-brand-crimson mb-1">{value}</span>
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase text-center">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Feature cards ── */}
        <motion.div 
          className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {FEATURES.map(({ icon, bg, text, border, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-full flex flex-col group`}
            >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-14 h-14 border ${bg} ${text} ${border} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}
              >
                {icon}
              </motion.div>
              <h3 className="text-lg font-bold text-brand-black mb-3">{title}</h3>
              <p className="text-sm text-brand-taupe leading-relaxed font-medium">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </motion.div>
  );
}

export default Home;