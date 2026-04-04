import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { path: "/",        label: "Home"       },
  { path: "/predict", label: "Prediction" },
  { path: "/about",   label: "About"      },
];

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className="w-full max-w-5xl backdrop-blur-2xl bg-white/60 border border-white/60
                   shadow-[0_8px_32px_rgba(154,24,21,0.05)] rounded-2xl
                   px-5 py-3 flex justify-between items-center relative z-20"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="AI Promotion Predictor home"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-maroon via-brand-crimson to-brand-taupe
                       flex items-center justify-center text-brand-cream text-xs font-black shadow-md
                       group-hover:shadow-brand-crimson/50 transition-shadow"
          >
            AI
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-brand-black tracking-tight flex items-center gap-1.5">
              Promotion
            </span>
            <span className="text-[10px] font-bold text-brand-crimson tracking-[0.2em] uppercase">Predictor</span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path;
            return (
              <li key={path} className="relative">
                <Link
                  to={path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 select-none block
                    ${active ? "text-brand-black" : "text-brand-taupe hover:text-brand-black hover:bg-brand-cream/50"}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="relative z-10">{label}</span>
                  {active && (
                    <motion.div 
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white shadow-sm border border-brand-cream/50 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {active && (
                    <motion.span 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4 h-[3px] bg-brand-crimson rounded-full z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}

          {/* CTA button */}
          <li className="ml-2">
            <Link to="/predict">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-sm font-bold
                           bg-brand-black text-brand-cream border border-brand-maroon
                           shadow-md hover:shadow-xl hover:bg-brand-maroon
                           transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Now
              </motion.button>
            </Link>
          </li>
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-xl text-brand-taupe hover:text-brand-black hover:bg-brand-cream/50 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="absolute top-full mt-2 inset-x-4 md:hidden
                       bg-white/95 backdrop-blur-2xl border border-brand-cream/50
                       rounded-2xl shadow-xl py-3 px-4 flex flex-col gap-1 z-10"
          >
            {NAV_LINKS.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200
                    ${active
                      ? "bg-brand-crimson/10 text-brand-crimson border border-brand-crimson/20"
                      : "text-brand-taupe hover:bg-brand-cream/30 hover:text-brand-black"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;