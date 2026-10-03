import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { cvContent } from './cvData';

// ============ CV DOWNLOAD FUNCTION ============
const downloadCV = async () => {
  try {
    // Fetch the PDF CV file from the public folder
    const response = await fetch('/cv.pdf');
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aritra_Sreemany_CV.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
  } catch (e) {
    // If fetch fails, fall back to embedded text CV
  }
  // Fallback: use the embedded text CV content
  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Aritra_Sreemany_CV.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'education', 'achievements', 'projects', 'skills', 'contact'];
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
    { id: 'skills', label: 'Skills' },
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.id
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
          MiM '28 @ Emlyon · PGDM-IB '28 @ MDI Gurgaon
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
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Mechanical engineer turned business strategist. Untangling operational bottlenecks, leading cross-functional teams, and pushing things from paper to ground reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-6 mb-10"
        >
          {['Operations', 'Strategy', 'Analytics', 'Marketing', 'Project Management'].map((tag) => (
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

        {/* Quick Connect Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href="https://www.linkedin.com/in/aritra-sreemany-9171351ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
          >
            <i className="fab fa-linkedin-in"></i>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
          >
            <i className="fas fa-globe"></i>
            <span className="text-sm font-medium">Website</span>
          </a>
          <a
            href="tel:+919073549642"
            className="flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
          >
            <i className="fas fa-phone"></i>
            <span className="text-sm font-medium">Call</span>
          </a>
          <a
            href="mailto:asreemany2000@gmail.com"
            className="flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
          >
            <i className="fas fa-envelope"></i>
            <span className="text-sm font-medium">Email</span>
          </a>
          <button
            onClick={downloadCV}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
          >
            <i className="fas fa-download"></i>
            <span className="text-sm font-medium">Download CV</span>
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { number: '3 yrs', label: 'Industry Experience' },
            { number: '₹1,400Cr', label: 'Project Value' },
            { number: 'Global 9th', label: 'ASME HPVC Rank' },
            { number: '3', label: 'Languages (Native)' },
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
            Mechanical engineer from <span className="text-emerald-400 font-medium">IIEST Shibpur</span> (B.Tech, 8.93 CGPA), heading to <span className="text-emerald-400 font-medium">Emlyon Business School (France)</span> for my Master in Management as part of a dual degree program with <span className="text-emerald-400 font-medium">MDI Gurgaon</span>.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Before this, I spent close to three years at <span className="text-emerald-400 font-medium">Jindal Stainless Limited</span>, working on planning, coordination, and overall site execution for large-scale industrial projects. Mostly involved untangling operational bottlenecks, working across teams, and pushing things from paper to ground reality.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm genuinely interested in <span className="text-emerald-400 font-medium">operations, marketing, analytics, and strategy</span> — and the systems that keep businesses running. Always open to connecting with people and conversations around business, tech, and anything worth learning about.
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
                <div className="text-gray-400 text-sm">MiM '28 · PGDM-IB '28</div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: 'fa-graduation-cap', label: 'B.Tech Mechanical', sub: 'IIEST Shibpur — 8.93 CGPA' },
                { icon: 'fa-building-columns', label: 'MiM @ Emlyon (France)', sub: 'Dual degree with MDI Gurgaon' },
                { icon: 'fa-briefcase', label: 'Ex-Associate Manager', sub: 'Jindal Stainless — 3 years' },
                { icon: 'fa-location-dot', label: 'Based in', sub: 'Kolkata → Odisha → Gurgaon → France' },
                { icon: 'fa-language', label: 'Languages', sub: 'English · Hindi · Bengali · French' },
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
  const experiences = [
    {
      company: 'Jindal Stainless',
      role: 'Associate Manager',
      location: 'Jajpur, Odisha',
      period: 'July 2024 — June 2026',
      duration: '2 years',
      points: [
        'Coordinated with 15+ vendors and contractors for procurement, supply, and timely equipment delivery on a ₹1,400+ crore BOF expansion project',
        'Supervised a team of 15 technicians and junior engineers during equipment installation, erection, and commissioning activities',
        'Planned and monitored project schedules while coordinating with engineering, procurement, and site teams to ensure timely execution of critical project milestones',
        'Managed monthly billing and procurement worth ₹0.5–0.8 crore, ensuring accuracy and audit compliance',
        'Revived a Raw Material Handling System (RMHS) package delayed by over a year through close coordination with EPC contractors and cross-functional teams',
      ],
      highlight: true,
    },
    {
      company: 'Jindal Stainless',
      role: 'Graduate Engineering Trainee',
      location: 'Jajpur, Odisha',
      period: 'July 2023 — July 2024',
      duration: '1 year 1 month',
      points: [
        'Worked on planning, coordination, and site execution for large-scale industrial projects',
        'Gained hands-on experience in procurement, vendor management, and project billing',
        'Built foundational skills in stakeholder management and cross-functional coordination',
      ],
      highlight: false,
    },
    {
      company: 'Primetals Technologies',
      role: 'Summer Intern',
      location: 'India',
      period: 'June 2022 — July 2022',
      duration: '2 months',
      points: [
        'Design and analysis of a Hydraulic Ladle Tilter',
        'Performed design validation ensuring structural integrity and operational feasibility',
      ],
      highlight: false,
    },
    {
      company: 'Jadavpur University, Kolkata',
      role: 'Undergraduate Research Intern',
      location: 'Kolkata, West Bengal',
      period: 'June 2021 — December 2021',
      duration: '7 months',
      points: [
        'Research internship on the influence of ambient conditions on droplet transport and evaporation in a closed indoor environment',
        'Analysed effects of temperature, humidity, airflow, and viral load on droplet dispersion',
      ],
      highlight: false,
    },
  ];

  const memberships = [
    {
      org: 'ASME (American Society of Mechanical Engineers)',
      role: 'Student Member',
      period: 'August 2019 — August 2023',
      points: [
        'Team member of Steering and Suspension department for ASME HPVC Competition (Team RAGNAR)',
        'Core team member for the HPVC Innovation competition',
      ],
    },
    {
      org: 'ISHRAE',
      role: 'Student Member',
      period: 'May 2021 — June 2023',
      points: [
        'Led the revival of ISHRAE student chapter and increased member participation by 30%',
        'Served as Co-Secretary; led the weekly newsletter initiative of the ASME college society',
      ],
    },
  ];

  return (
    <Section id="experience" className="bg-gray-900">
      <SectionTitle eyebrow="Experience" title="Where I've Worked" description="From shop floor execution to strategic project management — three years of building things that matter." />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent hidden md:block"></div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:pl-20"
            >
              <div className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 hidden md:block ${exp.highlight ? 'bg-emerald-500 border-gray-900' : 'bg-gray-600 border-gray-900'}`}></div>
              <div className={`border rounded-2xl p-8 transition-all ${exp.highlight ? 'bg-gradient-to-r from-emerald-500/5 to-transparent border-emerald-500/20' : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                    <p className={`font-medium ${exp.highlight ? 'text-emerald-400' : 'text-gray-300'}`}>{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-calendar text-xs"></i>
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-800 rounded-full text-xs">{exp.duration}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  <i className="fas fa-location-dot mr-2"></i>{exp.location}
                </p>
                <ul className="space-y-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${exp.highlight ? 'bg-emerald-400' : 'bg-gray-500'}`}></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memberships */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-white mb-8">Memberships & Leadership</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {memberships.map((mem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6"
            >
              <h4 className="text-white font-bold text-lg">{mem.org}</h4>
              <p className="text-emerald-400 text-sm font-medium">{mem.role}</p>
              <p className="text-gray-500 text-xs mt-1">{mem.period}</p>
              <ul className="mt-4 space-y-2">
                {mem.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============ EDUCATION ============
function Education() {
  const educationData = [
    {
      degree: 'Master in Management (MiM)',
      institute: 'emlyon business school, France',
      score: "June 2026 — June 2028",
      icon: 'fa-earth-europe',
      highlight: true,
      badge: 'Dual Degree',
    },
    {
      degree: 'PGDM — International Business',
      institute: 'Management Development Institute (MDI), Gurgaon',
      score: "June 2026 — 2028",
      icon: 'fa-building-columns',
      highlight: true,
      badge: 'Dual Degree',
    },
    {
      degree: 'B.Tech — Mechanical Engineering',
      institute: 'IIEST, Shibpur',
      score: '8.93 / 10 CGPA · 2019 — 2023',
      icon: 'fa-graduation-cap',
      highlight: false,
    },
    {
      degree: 'XII — CBSE',
      institute: 'South Point High School, Kolkata',
      score: '90.40% · 2012 — 2018',
      icon: 'fa-school',
      highlight: false,
    },
    {
      degree: 'X — WBBSE',
      institute: 'South Point School, Kolkata',
      score: '89.14% · 2002 — 2016',
      icon: 'fa-school',
      highlight: false,
    },
  ];

  return (
    <Section id="education" className="bg-gray-950">
      <SectionTitle eyebrow="Education" title="Academic Journey" description="From Kolkata to France — a journey of continuous learning." />
      <div className="space-y-4">
        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-6 rounded-2xl border transition-all hover:-translate-y-0.5 ${edu.highlight
              ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-500/30'
              : 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700'
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${edu.highlight ? 'bg-emerald-500/20' : 'bg-gray-800'
                  }`}>
                  <i className={`fas ${edu.icon} ${edu.highlight ? 'text-emerald-400' : 'text-gray-400'}`}></i>
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                    {edu.badge && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">{edu.badge}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{edu.institute}</p>
                </div>
              </div>
              <div className="md:text-right">
                <div className={`font-medium text-sm ${edu.highlight ? 'text-emerald-400' : 'text-gray-300'}`}>{edu.score}</div>
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
      title: 'ASME HPVC — Global Rank 9th',
      description: 'Achieved Global Rank 9th and National Rank 3rd in ASME HPVC 2020 (E-FEST). Designed a Human Powered Vehicle from scratch as part of Team RAGNAR.',
      year: '2020',
      icon: 'fa-globe',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'L&T TECHgium — National Finalist',
      description: 'Served as Team Lead, reaching the national finals of L&T TECHgium contest (5th Edition). Led the design of an EGR-integrated Catalysed DPF for modern vehicles.',
      year: '2022',
      icon: 'fa-medal',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Research Publication — ISHRAE Journal',
      description: "Co-authored paper titled 'Thermo-Economic Analysis of Cascade Refrigeration System' published in ISHRAE Journal (2023) & presented at INCOM 2024.",
      year: '2023',
      icon: 'fa-file-lines',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Springer Nature Publication',
      description: 'Published as a Springer Nature chapter in "Advances in Energy & Sustainability" — evaluating optimal low-GWP refrigerant combinations for max efficiency.',
      year: '2024',
      icon: 'fa-book',
      color: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Sr. Management Recognition',
      description: 'Recognised by senior management at Jindal Stainless for notable contribution to efficient project planning & execution of the ₹1,400+ Cr BOF Expansion.',
      year: '2025',
      icon: 'fa-star',
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Revived Delayed RMHS Package',
      description: 'Single-handedly revived a Raw Material Handling System package delayed by over a year, propelling it ahead of other cross-functional teams.',
      year: '2025',
      icon: 'fa-rotate',
      color: 'from-cyan-500 to-blue-500',
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
      type: 'Primetals Technologies · Internship',
      description: 'Designed complete Hydraulic Ladle Tilter assembly from scratch using SolidWorks. Performed design validation ensuring structural integrity and operational feasibility.',
      tags: ['SolidWorks', 'Design Validation', 'Mechanical Design'],
      icon: 'fa-gears',
    },
    {
      title: 'Respiratory Droplet Dispersion Study',
      type: 'Jadavpur University · Research Intern',
      description: 'Researched influence of ambient conditions on droplet transport and evaporation in a closed indoor environment. Analysed effects of temperature, humidity, airflow, & viral load.',
      tags: ['Research', 'Data Analysis', 'Fluid Dynamics'],
      icon: 'fa-microscope',
    },
    {
      title: 'Cascade Refrigeration System',
      type: 'Academic Project · Research',
      description: 'Developed a thermodynamic model for a Cascade Refrigeration System with low GWP refrigerants. Analysed system performance utilizing thermodynamic & thermo-economic parameters.',
      tags: ['Thermodynamics', 'Sustainability', 'Modelling'],
      icon: 'fa-temperature-low',
    },
    {
      title: 'RMHS Material Tracking System',
      type: 'Jindal Stainless · Live Project',
      description: 'Created a robust material-tracking system spanning spec mapping, code generation & inventory checks for the ₹1,400+ Cr BOF project. Streamlined procurement workflows.',
      tags: ['SAP', 'Process Design', 'Inventory'],
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
  const topSkills = [
    { name: 'Strategy', icon: 'fa-chess' },
    { name: 'Operations Management', icon: 'fa-gears' },
    { name: 'Root Cause Analysis', icon: 'fa-magnifying-glass-chart' },
    { name: 'Project Management', icon: 'fa-diagram-project' },
    { name: 'Stakeholder Management', icon: 'fa-people-group' },
    { name: 'Procurement & Billing', icon: 'fa-file-invoice' },
    { name: 'SAP & ERP Systems', icon: 'fa-database' },
    { name: 'Team Leadership', icon: 'fa-users' },
    { name: 'SolidWorks / CAD', icon: 'fa-compass-drafting' },
    { name: 'Python & Data Structures', icon: 'fa-code' },
    { name: 'Excel & Data Analysis', icon: 'fa-table' },
    { name: 'Vendor Coordination', icon: 'fa-handshake' },
  ];

  const languages = [
    { name: 'English', level: 'Native / Bilingual', flag: '🇬🇧' },
    { name: 'Hindi', level: 'Native / Bilingual', flag: '🇮🇳' },
    { name: 'Bengali', level: 'Native / Bilingual', flag: '🇧🇩' },
    { name: 'French', level: 'Elementary', flag: '🇫🇷' },
  ];

  const certifications = [
    { name: 'Python: From Basics to Data Structure', icon: 'fab fa-python', color: 'text-blue-400' },
    { name: 'Automotive Engineering — Supercharging', icon: 'fa-car', color: 'text-red-400' },
  ];

  const interests = [
    { icon: 'fa-utensils', name: 'Cooking', desc: 'Experimenting with diverse recipes & cuisines as a creative pursuit' },
    { icon: 'fa-table-tennis-paddle-ball', name: 'Badminton', desc: 'Enjoying fast-paced rallies & competitive matches' },
    { icon: 'fa-gamepad', name: 'Gaming', desc: 'Strategy & story-driven PC game enthusiast' },
  ];

  return (
    <Section id="skills" className="bg-gray-900">
      <SectionTitle eyebrow="Skills & More" title="What I Bring to the Table" />

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Skills Grid */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-bold text-xl mb-6">Core Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-emerald-500/30 transition-all"
              >
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${skill.icon} text-emerald-400 text-xs`}></i>
                </div>
                <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="text-white font-bold text-xl mt-10 mb-6">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-gray-800/50 border border-gray-700/50 rounded-2xl"
              >
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <i className={`${cert.icon} ${cert.color} text-lg`}></i>
                </div>
                <div className="text-white text-sm font-medium">{cert.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages & Interests */}
        <div className="space-y-10">
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Languages</h3>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-white font-medium text-sm">{lang.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{lang.level}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-6">Beyond Work</h3>
            <div className="space-y-3">
              {interests.map((interest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-emerald-500/30 transition-all"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${interest.icon} text-emerald-400`}></i>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{interest.name}</div>
                    <div className="text-gray-500 text-xs">{interest.desc}</div>
                  </div>
                </motion.div>
              ))}
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
      <SectionTitle eyebrow="Contact" title="Let's Connect" description="Always open to conversations around business, tech, and anything worth learning about." />
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <a href="tel:+919073549642" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <i className="fas fa-phone text-emerald-400"></i>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Phone</div>
                <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">+91 9073549642</div>
              </div>
            </a>
            <a href="mailto:asreemany2000@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <i className="fas fa-envelope text-emerald-400"></i>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Email</div>
                <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">asreemany2000@gmail.com</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/aritra-sreemany-9171351ba/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <i className="fab fa-linkedin-in text-emerald-400"></i>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">LinkedIn</div>
                <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">aritra-sreemany</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-location-dot text-emerald-400"></i>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Location</div>
                <div className="text-white font-medium">Gurgaon, India → France (soon)</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm mb-4">Interests I'd love to discuss</p>
            <div className="flex flex-wrap gap-2">
              {['Operations', 'Marketing', 'Analytics', 'Strategy', 'Business', 'Tech'].map((topic) => (
                <span key={topic} className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-400 text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Download CV Button */}
          <button
            onClick={downloadCV}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
          >
            <i className="fas fa-file-arrow-down"></i>
            <span>Download My CV</span>
          </button>
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
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/aritra-sreemany-9171351ba/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="mailto:asreemany2000@gmail.com" className="text-gray-500 hover:text-emerald-400 transition-colors">
            <i className="fas fa-envelope"></i>
          </a>
          <span className="text-gray-600 text-sm">MiM '28 · PGDM-IB '28</span>
        </div>
      </div>
    </footer>
  );
}

// ============ FLOATING ACTION BUTTON ============
function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aritra-sreemany-9171351ba/',
      external: true,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: 'fas fa-globe',
      label: 'Website',
      href: '#',
      external: false,
      color: 'bg-cyan-600 hover:bg-cyan-700',
    },
    {
      icon: 'fas fa-phone',
      label: 'Call',
      href: 'tel:+919073549642',
      external: false,
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      href: 'mailto:asreemany2000@gmail.com',
      external: false,
      color: 'bg-rose-600 hover:bg-rose-700',
    },
    {
      icon: 'fas fa-download',
      label: 'Download CV',
      href: '#',
      external: false,
      color: 'bg-violet-600 hover:bg-violet-700',
      action: downloadCV,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3"
          >
            {actions.map((action, i) => (
              <motion.a
                key={i}
                href={action.action ? undefined : action.href}
                onClick={action.action ? (e) => { e.preventDefault(); action.action?.(); setIsOpen(false); } : undefined}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-3 px-4 py-3 ${action.color} text-white rounded-full shadow-lg whitespace-nowrap transition-all`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <i className={`${action.icon} w-5 text-center`}></i>
                <span className="text-sm font-medium">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${isOpen ? 'bg-gray-700 rotate-45' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className={`fas ${isOpen ? 'fa-plus' : 'fa-comment-dots'} text-white text-lg`}></i>
      </motion.button>
    </div>
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
      <FloatingActionButton />
    </div>
  );
}
