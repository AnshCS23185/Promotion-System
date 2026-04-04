import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Prediction from "./pages/Prediction";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-cream text-brand-black font-sans antialiased selection:bg-brand-taupe/30 selection:text-brand-maroon relative overflow-hidden">

        {/* ── Subtle Dynamic Background Animation ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Base soft gradient */}
          <div className="absolute inset-0 bg-brand-cream opacity-90" />
          
          {/* Dynamic Framer Motion Blobs (Subtle Palette) */}
          <div 
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-brand-taupe/30 rounded-full mix-blend-multiply filter blur-[100px]"
          />
          <div 
            className="absolute top-[20%] -right-[10%] w-[40vw] h-[60vw] bg-brand-crimson/10 rounded-full mix-blend-multiply filter blur-[120px]"
          />
          <div 
            className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[50vw] bg-white/40 rounded-full mix-blend-overlay filter blur-[120px]"
          />
          
          {/* Noise texture for premium glass feel */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        </div>

        {/* ── Main layout ── */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
            <Routes>
              <Route path="/"        element={<Home />}       />
              <Route path="/predict" element={<Prediction />} />
              <Route path="/about"   element={<About />}      />
            </Routes>
          </main>

          {/* ── Footer ── */}
          <footer className="relative z-10 text-center py-8 text-sm font-medium text-brand-taupe border-t border-brand-taupe/20 bg-white/30 backdrop-blur-md">
             © {new Date().getFullYear()} AI Promotion Predictor &mdash; Crafted with precision.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;