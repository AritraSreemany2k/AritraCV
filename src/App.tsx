import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'education', 'achievements', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gray-950/80 backdrop-blur-xl border-b border-emerald-500/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#home" 
          className="text-xl font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-emerald-400">A</span>ritra<span className="text-emerald-400">.</span>
        </motion.a>
        
        <div className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.id 
                  ? 'text-emerald-400 bg-emerald-400/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-xl">
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-emerald-500/10 px-6 py-6 flex flex-col gap-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-emerald-400 py-2 font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          PGDM-IB '26 @ MDI Gurgaon
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6"
        >
          Aritra{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Sreemany
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Engineer turned Manager. Building systems, leading teams, and driving ₹1400+ Cr projects from vision to reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-6 mb-10"
        >
          {['Project Management', 'Team Leadership', 'Process Engineering', 'Strategic Planning'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-400 text-sm">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#experience" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
            View Experience
          </a>
          <a href="#contact" className="px-8 py-4 border border-gray-700 text-gray-300 rounded-full font-semibold hover:border-emerald-500/50 hover:text-emerald-400 transition-all">
            Get in Touch
          </a>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { number: '35+', label: 'Months Experience' },
            { number: '₹1400Cr', label: 'Project Value' },
            { number: '18', label: 'Team Members Led' },
            { number: 'Global 9th', label: 'ASME HPVC Rank' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-emerald-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}

// ============ SECTION WRAPPER ============
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-16">
      <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">{eyebrow}</span>
      <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">{title}</h2>
      {description && <p className="text-gray-400 text-lg mt-4 max-w-2xl">{description}</p>}
    </div>
  );
}

// ============ ABOUT ============
function About() {
  return (
    <Section id="about" className="bg-gray-950">
      <SectionTitle eyebrow="About Me" title="Engineer. Leader. Strategist." />
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a Mechanical Engineering graduate from <span className="text-emerald-400 font-medium">IIEST Shibpur</span> (CGPA 8.93/10) currently pursuing my <span className="text-emerald-400 font-medium">PGDM-IB at MDI Gurgaon</span>, bridging the gap between technical expertise and business strategy.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            With <span className="text-emerald-400 font-medium">35 months of experience</span> at Jindal Stainless Limited, I've led critical packages in a ₹1400+ Crore BOF Expansion Project — from planning through commissioning. I thrive in high-stakes environments where coordination, leadership, and problem-solving converge.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            My journey spans from designing Human Powered Vehicles for global competitions to managing 18-member teams and coordinating with 13+ vendors. I bring the same rigor and creativity to everything I do — whether it's engineering, strategy, or even experimenting with new recipes in the kitchen.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
                AS
              </div>
              <div>
                <div className="text-white font-bold text-lg">Aritra Sreemany</div>
                <div className="text-gray-400 text-sm">PGDM-IB '26 @ MDI</div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: 'fa-graduation-cap', label: 'B.Tech Mechanical', sub: 'IIEST Shibpur — 8.93 CGPA' },
                { icon: 'fa-briefcase', label: 'Associate Manager', sub: 'Jindal Stainless Ltd — 35 months' },
                { icon: 'fa-location-dot', label: 'Based in', sub: 'Jajpur, Odisha → Gurgaon' },
                { icon: 'fa-trophy', label: 'L&T TECHgium', sub: 'National Finalist' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`fas ${item.icon} text-emerald-400 text-xs`}></i>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============ EXPERIENCE ============
function Experience() {
  const responsibilities = [
    'Spearheaded RMHS package, from planning through commissioning, in a ₹1400+ Crore BOF Project',
    'Coordinated with 13+ vendors & contractors for procurement, supply, & timely equipment delivery',
    'Led a team of 18 technicians & junior engineers for equipment installation & timely commissioning',
    'Managed end-to-end billing & procurement of INR 1-2 Cr monthly, ensuring accuracy & compliance',
    'Spearheaded milestone planning & progress tracking within a ₹1400+ Crore BOF Expansion Project',
    'Collaborated with EPC contractors & cross-functional teams to resolve project bottlenecks & delays',
  ];

  const achievements = [
    'Created a robust material-tracking system spanning spec mapping, code generation & inventory checks',
    'Revived an RMHS package delayed by close to a year, propelling it ahead of other cross-functional teams',
    'Strengthened stakeholder management by close coordination with vendors & multiple internal teams',
    'Cultivated leadership & delegation skills, leading an 18-member technician & junior engineer team',
    'Enhanced proficiency in SAP & Excel for end-to-end procurement, billing & documentation',
    'Recognised by Sr management for notable contribution to efficient project planning & execution',
  ];

  return (
    <Section id="experience" className="bg-gray-900">
      <SectionTitle eyebrow="Work Experience" title="35 Months at Jindal Stainless" description="Driving a ₹1400+ Crore BOF Expansion Project from concept to commissioning." />
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent hidden md:block"></div>

        <div className="space-y-8">
          {/* Company Header */}
          <div className="relative md:pl-20">
            <div className="absolute left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-gray-900 hidden md:block"></div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Jindal Stainless Limited</h3>
                  <p className="text-emerald-400 font-medium">Associate Manager, SMS Carbon Steel</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <i className="fas fa-calendar"></i>
                  <span>Jul '23 — Jun '26</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                <i className="fas fa-location-dot mr-2"></i>Jajpur, Odisha
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-clipboard-list text-emerald-400 text-sm"></i>
                    Roles & Responsibilities
                  </h4>
                  <ul className="space-y-3">
                    {responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-trophy text-amber-400 text-sm"></i>
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============ EDUCATION ============
function Education() {
  const educationData = [
    {
      degree: 'PGDM — International Business',
      institute: 'Management Development Institute (MDI), Gurgaon',
      score: "Pursuing '26",
      year: '2024 — 2026',
      icon: 'fa-building-columns',
      highlight: true,
    },
    {
      degree: 'B.Tech — Mechanical Engineering',
      institute: 'IIEST, Shibpur (Indian Institute of Engineering Science & Technology)',
      score: '8.93 / 10 CGPA',
      year: '2019 — 2023',
      icon: 'fa-graduation-cap',
      highlight: false,
    },
    {
      degree: 'XII — CBSE',
      institute: 'South Point High School, Kolkata',
      score: '90.40%',
      year: '2018',
      icon: 'fa-school',
      highlight: false,
    },
    {
      degree: 'X — WBBSE',
      institute: 'South Point High School, Kolkata',
      score: '89.14%',
      year: '2016',
      icon: 'fa-school',
      highlight: false,
    },
  ];

  return (
    <Section id="education" className="bg-gray-950">
      <SectionTitle eyebrow="Education" title="Academic Journey" />
      <div className="space-y-4">
        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-6 rounded-2xl border transition-all hover:-translate-y-0.5 ${
              edu.highlight 
                ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-500/30' 
                : 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  edu.highlight ? 'bg-emerald-500/20' : 'bg-gray-800'
                }`}>
                  <i className={`fas ${edu.icon} ${edu.highlight ? 'text-emerald-400' : 'text-gray-400'}`}></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm mt-1">{edu.institute}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:text-right">
                <div>
                  <div className={`font-bold ${edu.highlight ? 'text-emerald-400' : 'text-white'}`}>{edu.score}</div>
                  <div className="text-gray-500 text-sm">{edu.year}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ============ ACHIEVEMENTS ============
function Achievements() {
  const achievements = [
    {
      title: 'L&T TECHgium — National Finalist',
      description: 'Served as Team Lead, reaching the national finals of L&T TECHgium contest (5th Edition). Led the design of an EGR-integrated Catalysed DPF for modern vehicles.',
      year: '2022',
      icon: 'fa-medal',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'ASME HPVC — Global Rank 9th',
      description: 'Achieved Global Rank 9th and National Rank 3rd in ASME HPVC 2020 (E-FEST). Designed a Human Powered Vehicle from scratch and coordinated design reviews.',
      year: '2020',
      icon: 'fa-globe',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Research Publication — ISHRAE Journal',
      description: "Published research titled 'Thermo-Economic Analysis of Cascade Refrigeration System' in ISHRAE Journal (2023) & presented at INCOM 2024 conference.",
      year: '2023',
      icon: 'fa-file-lines',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Springer Nature Publication',
      description: 'Works published as a Springer Nature chapter in "Advances in Energy & Sustainability" — evaluating optimal low-GWP refrigerant combinations.',
      year: '2019',
      icon: 'fa-book',
      color: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Sr. Management Recognition',
      description: 'Recognised by senior management at Jindal Stainless for notable contribution to efficient project planning & execution of the BOF Expansion.',
      year: '2025',
      icon: 'fa-star',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <Section id="achievements" className="bg-gray-900">
      <SectionTitle eyebrow="Achievements" title="Milestones & Recognition" description="Competitive achievements, publications, and professional recognition." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <i className={`fas ${item.icon} text-white`}></i>
            </div>
            <div className="text-gray-500 text-xs font-medium mb-2">{item.year}</div>
            <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ============ PROJECTS ============
function Projects() {
  const projects = [
    {
      title: 'Hydraulic Ladle Tilter Design',
      type: 'Design Internship (8 Weeks)',
      description: 'Designed complete Hydraulic Ladle Tilter assembly from scratch using SolidWorks. Performed design validation ensuring structural integrity and operational feasibility.',
      tags: ['SolidWorks', 'Design Validation', 'Mechanical Design'],
      icon: 'fa-gears',
    },
    {
      title: 'Respiratory Droplet Dispersion Study',
      type: 'Research Project (10 Weeks)',
      description: 'Researched evaporation & transport of respiratory droplets in varying ambient conditions. Analysed effects of temperature, humidity, airflow, & viral load on droplet dispersion.',
      tags: ['Research', 'Data Analysis', 'Fluid Dynamics'],
      icon: 'fa-microscope',
    },
    {
      title: 'Cascade Refrigeration System',
      type: 'Academic Project (17 Weeks)',
      description: 'Developed a thermodynamic model for a Cascade Refrigeration System with low GWP refrigerants. Analysed system performance utilizing thermodynamic & thermo-economic parameters.',
      tags: ['Thermodynamics', 'Sustainability', 'Modelling'],
      icon: 'fa-temperature-low',
    },
    {
      title: 'Material Tracking System',
      type: 'Live Project @ JSL',
      description: 'Created a robust material-tracking system spanning spec mapping, code generation & inventory checks for the ₹1400+ Cr BOF project.',
      tags: ['SAP', 'Process Design', 'Inventory Management'],
      icon: 'fa-database',
    },
  ];

  return (
    <Section id="projects" className="bg-gray-950">
      <SectionTitle eyebrow="Projects" title="Work That Matters" description="From academic research to live industrial projects — building solutions that impact." />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <i className={`fas ${project.icon} text-emerald-400 text-lg`}></i>
              </div>
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">{project.type}</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span key={j} className="px-2.5 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ============ SKILLS & INTERESTS ============
function SkillsAndInterests() {
  const skills = [
    { name: 'Project Management', level: 95 },
    { name: 'Team Leadership', level: 90 },
    { name: 'SAP & ERP Systems', level: 85 },
    { name: 'Procurement & Billing', level: 90 },
    { name: 'Stakeholder Management', level: 88 },
    { name: 'SolidWorks / CAD', level: 80 },
    { name: 'Python & Data Structures', level: 70 },
    { name: 'Excel & Data Analysis', level: 85 },
  ];

  const interests = [
    { icon: 'fa-utensils', name: 'Cooking', desc: 'Experimenting with diverse recipes & cuisines' },
    { icon: 'fa-table-tennis-paddle-ball', name: 'Badminton', desc: 'Enjoying fast-paced rallies & competitive matches' },
    { icon: 'fa-gamepad', name: 'Gaming', desc: 'Strategy & story-driven PC game enthusiast' },
  ];

  return (
    <Section id="skills" className="bg-gray-900">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-10">What I bring to the table</h2>
          <div className="space-y-5">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                  <span className="text-emerald-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Beyond Work</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-10">Interests & Hobbies</h2>
          <div className="space-y-4">
            {interests.map((interest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 p-5 bg-gray-800/50 border border-gray-700/50 rounded-2xl hover:border-emerald-500/30 transition-all"
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${interest.icon} text-emerald-400 text-xl`}></i>
                </div>
                <div>
                  <div className="text-white font-bold">{interest.name}</div>
                  <div className="text-gray-400 text-sm">{interest.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-10">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Certifications</span>
            <div className="mt-4 p-5 bg-gray-800/50 border border-gray-700/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <i className="fab fa-python text-blue-400"></i>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Python: Basics to Data Structures</div>
                  <div className="text-gray-500 text-xs">Python fundamentals, OOP, & data structures — 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============ CONTACT ============
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Section id="contact" className="bg-gray-950">
      <SectionTitle eyebrow="Contact" title="Let's Connect" description="Have an opportunity or just want to say hello? I'd love to hear from you." />
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            {[
              { icon: 'fa-envelope', label: 'Email', value: 'aritrasreemany@gmail.com', link: 'mailto:aritrasreemany@gmail.com' },
              { icon: 'fa-phone', label: 'Phone', value: '+91-XXXXXXXXXX', link: 'tel:+91XXXXXXXXXX' },
              { icon: 'fa-location-dot', label: 'Location', value: 'Gurgaon, India', link: '#' },
              { icon: 'fa-building-columns', label: 'Institute', value: 'MDI Gurgaon — PGDM-IB \'26', link: '#' },
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                  <i className={`fas ${item.icon} text-emerald-400`}></i>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</div>
                  <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm mb-4">Find me on</p>
            <div className="flex gap-3">
              {[
                { icon: 'fa-linkedin-in', label: 'LinkedIn' },
                { icon: 'fa-github', label: 'GitHub' },
                { icon: 'fa-twitter', label: 'Twitter' },
              ].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8">
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-3 text-sm"
              >
                <i className="fas fa-check-circle"></i>
                <span>Message sent! I'll get back to you soon.</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all resize-none"
                placeholder="What's on your mind?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-500 text-sm">
          © 2026 Aritra Sreemany. Crafted with passion.
        </div>
        <div className="text-gray-600 text-sm">
          PGDM-IB '26 @ MDI Gurgaon
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Achievements />
      <Projects />
      <SkillsAndInterests />
      <Contact />
      <Footer />
    </div>
  );
}
