import { useState, useRef } from "react";
import { predictPromotion } from "../api/api";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Reusable Framer Sub-components ─────────────────────────────────────── */

function TiltCardWrapper({ children, className }) {
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
      layout
      className={`relative z-10 w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-bold text-brand-taupe uppercase tracking-widest mb-2"
    >
      {children}
    </label>
  );
}

function InputField({ id, type = "number", step, name, placeholder, onChange, required }) {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      id={id}
      type={type}
      step={step}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="w-full bg-white border border-brand-taupe/30 text-brand-black text-sm font-bold
                 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-crimson/10 focus:border-brand-crimson
                 outline-none block px-5 py-3.5 shadow-sm placeholder-brand-taupe/60 text-brand-black
                 hover:border-brand-taupe transition-all duration-200"
    />
  );
}

function SelectField({ id, name, onChange, required, children }) {
  return (
    <motion.select
      whileFocus={{ scale: 1.02 }}
      id={id}
      name={name}
      onChange={onChange}
      required={required}
      className="w-full bg-white border border-brand-taupe/30 text-brand-black text-sm font-bold
                 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-crimson/10 focus:border-brand-crimson
                 outline-none block px-5 py-3.5 shadow-sm text-brand-black
                 hover:border-brand-taupe transition-all duration-200 appearance-none
                 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23BBA38E%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M2%205l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
                 bg-no-repeat bg-[right_16px_center] bg-[length:16px_16px] pr-12 cursor-pointer"
    >
      {children}
    </motion.select>
  );
}

function SectionCard({ icon, iconBg, iconText, iconBorder, title, children }) {
  return (
    <motion.div 
      layout
      className="bg-white/80 backdrop-blur-md border border-brand-taupe/20 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                    hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300"
    >
      <h3 className="text-sm font-black text-brand-black mb-6 flex items-center gap-3">
        <span className={`w-10 h-10 ${iconBg} ${iconText} ${iconBorder} border rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

/* ─── Probability meter ───────────────────────────────────────────────────── */

function ProbabilityBar({ probability }) {
  const color =
    probability < 30 ? "from-brand-maroon to-brand-crimson shadow-brand-crimson/30"
    : probability < 60 ? "from-orange-500 to-amber-400 shadow-orange-200"
    : probability < 80 ? "from-lime-500 to-green-400 shadow-lime-200"
    : "from-emerald-500 to-teal-400 shadow-emerald-200";

  const label =
    probability < 30 ? "Low chance"
    : probability < 60 ? "Moderate chance"
    : probability < 80 ? "Good chance"
    : "High chance";

  return (
    <TiltCardWrapper>
      <motion.div 
        layout
        className="h-full bg-white/90 backdrop-blur-xl border border-brand-taupe/30 rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                        flex flex-col justify-between relative overflow-hidden group"
      >
        
        {/* Decorative background visual */}
        <div className={`absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700`} />

        <p className="text-xs font-black text-brand-taupe tracking-[0.1em] uppercase mb-4 relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-current opacity-50" />
          Probability
        </p>

        <div className="flex items-baseline gap-2 mb-2 relative z-10">
          <span className="text-6xl font-black text-brand-black tracking-tighter">{probability}</span>
          <span className="text-3xl font-bold text-brand-taupe">%</span>
        </div>
        <p className="text-sm font-bold text-brand-black opacity-80 mb-8 relative z-10">{label}</p>

        {/* Track */}
        <div className="w-full bg-brand-cream rounded-full h-3.5 overflow-hidden relative z-10 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${probability}%` }}
            transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
            className={`h-full rounded-full bg-gradient-to-r ${color} shadow-lg`}
            role="progressbar"
            aria-valuenow={probability}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Tick labels */}
        <div className="flex justify-between mt-3 text-[11px] font-bold text-brand-taupe relative z-10">
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </motion.div>
    </TiltCardWrapper>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

function PromotionForm() {
  const [formData, setFormData] = useState({
    satisfaction_level: "",
    last_evaluation: "",
    number_project: "",
    average_montly_hours: "",
    time_spend_company: "",
    Work_accident: "",
    sales: "",
    salary: ""
  });

  const [result, setResult] = useState("");
  const [probability, setProbability] = useState(null);
  const [treeImage, setTreeImage] = useState("");
  const [importanceImage, setImportanceImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); 
    setResult("");
    setProbability(null);
    setTreeImage("");
    setImportanceImage("");

    try {
      const response = await predictPromotion(formData);
      setResult(response.prediction);
      setProbability(response.promotion_probability);
      setTreeImage(response.decision_tree_image);
      setImportanceImage(response.feature_importance_image);
    } catch (error) {
      setResult("Error connecting to API");
    }
    setLoading(false);
  };

  /* Derived UI helpers */
  const isError    = result.includes("Error");
  const isPromoted = !isError && !result.includes("NOT");

  const verdictConfig = isError
    ? { emoji: "❌", bg: "bg-brand-crimson/10",     border: "border-brand-crimson/20",     text: "text-brand-crimson",     badge: "bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30"     }
    : isPromoted
    ? { emoji: "🎉", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700 border border-emerald-300" }
    : { emoji: "⚠️", bg: "bg-brand-cream/50",   border: "border-brand-taupe/40",   text: "text-brand-black",   badge: "bg-brand-cream border border-brand-taupe/50 text-brand-black"   };

  return (
    <motion.div layout className="w-full relative z-10 pb-16 w-full max-w-7xl mx-auto mt-4 px-2">

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight mb-4">
          Data-Driven
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon to-brand-crimson ml-3">
            Analysis
          </span>
        </h1>
        <p className="text-brand-taupe max-w-lg mx-auto font-bold tracking-wide">
          Input your key metrics to instantly forecast promotion trajectories with explainable AI models.
        </p>
      </motion.div>

      {/* ── Split Form/Dashboard UI ── */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: THE FORM */}
        <motion.div 
          layout
          className="lg:col-span-7 bg-white/70 backdrop-blur-2xl border border-white
                        shadow-[0_15px_60px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-6 sm:p-10 relative"
        >
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-cream to-transparent rounded-full mix-blend-multiply opacity-50 pointer-events-none" />

          <form id="promotion-form" onSubmit={handleSubmit} className="space-y-8 relative z-10" noValidate>

            {/* ── Performance Metrics ── */}
            <SectionCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              iconBg="bg-brand-cream/50" iconText="text-brand-maroon" iconBorder="border-brand-taupe/40"
              title="Performance Profile"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-8 sm:gap-y-6">
                <div>
                  <FieldLabel htmlFor="field-satisfaction">Satisfaction (0–1)</FieldLabel>
                  <InputField id="field-satisfaction" step="0.01" name="satisfaction_level" placeholder="e.g. 0.85" onChange={handleChange} required />
                </div>
                <div>
                  <FieldLabel htmlFor="field-evaluation">Evaluation (0–1)</FieldLabel>
                  <InputField id="field-evaluation" step="0.01" name="last_evaluation" placeholder="e.g. 0.90" onChange={handleChange} required />
                </div>
                <div>
                  <FieldLabel htmlFor="field-projects">Projects Completed</FieldLabel>
                  <InputField id="field-projects" name="number_project" placeholder="e.g. 5" onChange={handleChange} required />
                </div>
                <div>
                  <FieldLabel htmlFor="field-hours">Monthly Hours</FieldLabel>
                  <InputField id="field-hours" name="average_montly_hours" placeholder="e.g. 200" onChange={handleChange} required />
                </div>
              </div>
            </SectionCard>

            {/* ── Corporate Details ── */}
            <SectionCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              iconBg="bg-brand-cream/50" iconText="text-brand-maroon" iconBorder="border-brand-taupe/40"
              title="Corporate Footprint"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-8 sm:gap-y-6">
                <div>
                  <FieldLabel htmlFor="field-tenure">Tenure (Years)</FieldLabel>
                  <InputField id="field-tenure" name="time_spend_company" placeholder="e.g. 4" onChange={handleChange} required />
                </div>
                <div>
                  <FieldLabel htmlFor="field-accident">Work Accident</FieldLabel>
                  <SelectField id="field-accident" name="Work_accident" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="0">No Occurrences</option>
                    <option value="1">Has Occurred</option>
                  </SelectField>
                </div>
                <div>
                  <FieldLabel htmlFor="field-dept">Department Code (0–9)</FieldLabel>
                  <InputField id="field-dept" name="sales" placeholder="e.g. 5" onChange={handleChange} required />
                </div>
                <div>
                  <FieldLabel htmlFor="field-salary">Compensation Group</FieldLabel>
                  <SelectField id="field-salary" name="salary" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                  </SelectField>
                </div>
              </div>
            </SectionCard>

            {/* ── Submit button ── */}
            <motion.button
              layout
              id="promotion-submit-btn"
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full flex items-center justify-center gap-3 font-bold text-lg
                          rounded-2xl px-8 py-5 text-brand-cream shadow-xl
                          bg-brand-black border border-brand-maroon
                          transition-all duration-300 relative overflow-hidden group
                          ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[0_15px_30px_rgba(7,7,5,0.25)] hover:bg-brand-maroon"}`}
            >
              {!loading && <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-brand-cream/10 to-transparent" />}
              {loading ? (
                <>
                  <motion.svg 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-6 w-6 text-brand-cream" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </motion.svg>
                  Processing Matrices…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Prediction
                </>
              )}
            </motion.button>
          </form>
        </motion.div>


        {/* RIGHT COLUMN: STICKY RESULTS DASHBOARD */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white/50 backdrop-blur-md border-[3px] border-dashed border-brand-taupe/40 rounded-[2.5rem] p-10 h-full min-h-[400px] flex flex-col items-center justify-center text-center shadow-inner"
              >
                <motion.div 
                  className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-brand-taupe/20 flex items-center justify-center mb-6 rotate-3 hover:-translate-y-2 transition-transform duration-500"
                >
                    <span className="text-4xl filter grayscale opacity-40">✨</span>
                </motion.div>
                <h3 className="text-xl font-bold text-brand-black mb-3">Ready for Data</h3>
                <p className="text-brand-taupe font-bold leading-relaxed max-w-xs">
                  Fill in the metrics on the left to reveal predictive insights and visual pathways.
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="space-y-6"
              >
                {/* Verdict card */}
                <TiltCardWrapper>
                  <motion.div 
                    layout
                    className={`${verdictConfig.bg} ${verdictConfig.border} border rounded-[2.5rem]
                                  p-10 flex flex-col items-center justify-center text-center gap-5
                                  shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl relative overflow-hidden h-full`}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="text-6xl drop-shadow-sm filter" role="img" aria-hidden="true"
                    >
                      {verdictConfig.emoji}
                    </motion.span>
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black
                                      ${verdictConfig.badge} uppercase tracking-[0.1em] shadow-sm`}>
                      {isError ? "Connection Error" : isPromoted ? "Action: Promote" : "Action: Standby"}
                    </span>
                    <p className={`text-4xl font-black ${verdictConfig.text} leading-none tracking-tight`}>
                      {result}
                    </p>
                  </motion.div>
                </TiltCardWrapper>

                {/* Probability card */}
                {probability !== null && (
                  <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <ProbabilityBar probability={probability} />
                  </motion.div>
                )}

                {/* Collapsible Visualisations */}
                {probability !== null && (
                  <motion.div layout className="space-y-4">
                    {/* Feature Importance */}
                    <motion.details layout className="group bg-white/90 backdrop-blur-xl border border-brand-taupe/30 rounded-[1.5rem] shadow-sm open:shadow-md transition-all duration-300">
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-brand-black select-none list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-brand-cream/50 text-brand-maroon flex items-center justify-center border border-brand-taupe/40">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                          </span>
                          View Feature Importance
                        </div>
                        <svg className="w-5 h-5 text-brand-taupe group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <div className="bg-brand-cream/30 rounded-2xl p-2 border border-brand-taupe/20 shadow-inner">
                          <img src={importanceImage} alt="Feature Importance" className="w-full h-auto rounded-xl" loading="lazy" />
                        </div>
                      </div>
                    </motion.details>

                    {/* Decision Tree */}
                    <motion.details layout className="group bg-white/90 backdrop-blur-xl border border-brand-taupe/30 rounded-[1.5rem] shadow-sm open:shadow-md transition-all duration-300">
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-brand-black select-none list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-brand-cream/50 text-brand-maroon flex items-center justify-center border border-brand-taupe/40">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                          </span>
                          View Decision Logic
                        </div>
                        <svg className="w-5 h-5 text-brand-taupe group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <div className="bg-brand-cream/30 rounded-2xl p-2 border border-brand-taupe/20 shadow-inner overflow-x-auto">
                          <img src={treeImage} alt="Decision Tree" className="h-auto rounded-xl min-w-[500px]" loading="lazy" />
                        </div>
                      </div>
                    </motion.details>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

export default PromotionForm;