"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, X, ArrowRight, ArrowLeft, Menu, CheckCircle2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollingBrandText from "@/components/ScrollingBrandText";

// Data for the Horizontal Scroll Services
const services = [
  { 
    id: "01", title: "Managed IT Services", category: "Infrastructure • Support", image: "/tech-support.webp",
    details: "We provide proactive IT support and management services that keep your business running efficiently and securely.",
    features: ["Help Desk Support", "Remote and Onsite Technical Support", "Network Administration", "User Account Management", "Hardware and Software Support", "Backup and Recovery Solutions", "Server Administration", "Microsoft 365 Management", "IT Asset Management"]
  },
  { 
    id: "02", title: "Cybersecurity", category: "Security • Audits", image: "/security.webp",
    details: "Cyber threats continue to evolve. Our cybersecurity services help organizations reduce risk, improve resilience, and maintain customer trust.",
    features: ["Cyber security Assessments", "Vulnerability Assessments", "Risk Assessments", "Security Policy Development", "Security Awareness Training", "Incident Response Planning", "Compliance Readiness (ISO 27001, NIST, CIS, GDPR)"]
  },
  { 
    id: "03", title: "Website & Portals", category: "Development • Web", image: "/data-mgmt.webp",
    details: "We design and develop modern, responsive websites that enhance brand visibility and support business growth.",
    features: ["Corporate Websites", "E-Commerce Websites", "Customer Portals", "HR Portals", "Asset Management Systems", "Workflow Automation", "Document Management"]
  },
  { 
    id: "04", title: "Data Protection", category: "Privacy • Compliance", image: "/security.webp",
    details: "Building trust through responsible data management. We help organizations establish privacy programs and align their operations with data protection requirements.",
    features: ["Privacy Impact Assessments", "Data Mapping and Classification", "Privacy Policy Development", "Compliance Reviews", "Staff Awareness Training", "Data Breach Response Planning"]
  },
  { 
    id: "05", title: "Cloud & M365", category: "Cloud • Productivity", image: "/network.webp",
    details: "Leverage the power of cloud technology to improve collaboration, security, and productivity.",
    features: ["Microsoft 365 Deployment", "SharePoint Solutions", "Microsoft Teams Administration", "Exchange Online Management", "Azure Cloud Solutions", "Cloud Migrations", "Cloud Security Reviews"]
  },
  { 
    id: "06", title: "IT Governance", category: "Strategy • Policies", image: "/data-mgmt.webp",
    details: "Strong governance ensures technology investments support organizational goals while maintaining compliance and reducing risk.",
    features: ["IT Governance Frameworks", "IT Policies and Procedures", "Information Security Policies", "Risk Registers", "Compliance Audits", "Technology Assessments"]
  },
  { 
    id: "07", title: "Printer Rentals", category: "Hardware • Print", image: "/rental.webp",
    details: "Our printer rental services provide organizations with reliable printing without significant upfront capital investment.",
    features: ["Printer Rentals", "Managed Print Services", "Printer Maintenance", "Toner Supply", "Network Printer Setup", "Technical Support"]
  },
  { 
    id: "08", title: "Training & Awareness", category: "Education • People", image: "/tech-support.webp",
    details: "Technology is only effective when people know how to use it safely and efficiently.",
    features: ["Cybersecurity Awareness", "Data Protection & Privacy", "Safe Internet Practices", "Microsoft 365 Productivity", "IT Governance", "Digital Transformation"]
  }
];

// Data for Core Values Marquee
const coreValues = [
  { title: "Innovation", desc: "Embracing the latest technological advancements to provide cutting-edge solutions." },
  { title: "Integrity", desc: "Upholding the highest standards of honesty and transparency in all our dealings." },
  { title: "Excellence", desc: "Striving for perfection in every project we undertake to exceed expectations." },
  { title: "Customer-Centric", desc: "Placing our clients at the heart of everything we do to provide personalized solutions." },
  { title: "Continuous Improvement", desc: "Learning and evolving constantly to remain at the forefront of the IT industry." },
  { title: "Collaboration", desc: "Fostering a collaborative working environment to deliver seamless, integrated solutions." },
];

// Data for Industries List
const industries = [
  { name: "Government", emoji: "🏛️", category: "Public Sector", desc: "Secure, scalable digital infrastructure for public sector services." },
  { name: "NGOs", emoji: "🤝", category: "Non-Profit", desc: "Technology solutions that maximize impact and donor trust." },
  { name: "Education", emoji: "🎓", category: "Academia", desc: "Empowering learning environments with modern IT and data protection." },
  { name: "Healthcare", emoji: "🏥", category: "Medical", desc: "Protecting sensitive patient data and ensuring system uptime." },
  { name: "Financial Services", emoji: "💳", category: "Finance", desc: "Robust cybersecurity and compliance for financial institutions." },
  { name: "Professional Services", emoji: "💼", category: "B2B", desc: "Streamlining operations and securing client data for firms." },
  { name: "Retail", emoji: "🛍️", category: "Commerce", desc: "Reliable POS systems and network security for retail spaces." },
  { name: "Startups", emoji: "🚀", category: "Venture", desc: "Agile IT strategies to help you scale securely from day one." },
  { name: "SMEs", emoji: "🏬", category: "Enterprise", desc: "Enterprise-grade support tailored for growing businesses." }
];

// Data for the Marquee Slider (The Advantage)
const marqueeItems1 = [
  { text: "Trusted Expertise", style: "bold" },
  { text: "Security-First Approach", style: "light" },
  { text: "Tailored Solutions", style: "bold" },
  { text: "Local Support", style: "light" },
];

const marqueeItems2 = [
  { text: "Long-Term Partnerships", style: "light" },
  { text: "Professional Credentials", style: "bold" },
  { text: "Continuous Growth", style: "light" },
  { text: "Digital Transformation", style: "bold" },
];

// Data for FAQ
const faqs = [
  {
    q: "WHAT IT SERVICES DO YOU PROVIDE?",
    a: "We offer a comprehensive suite of technology services including Managed IT Support, Cybersecurity Consulting, Cloud and Microsoft 365 Solutions, IT Governance, Custom Website Development, and Printer Rentals."
  },
  {
    q: "DO YOU OFFER REMOTE IT SUPPORT?",
    a: "Yes, we provide both remote and onsite technical support across Botswana. Our helpdesk is equipped to resolve most issues remotely, ensuring minimal downtime for your business."
  },
  {
    q: "IS KALAHARI HERTZ PPADB REGISTERED?",
    a: "Yes, Kalahari Hertz is a fully registered company with the Public Procurement and Asset Disposal Board (PPADB). We adhere strictly to national regulations and service standards."
  },
  {
    q: "CAN WE RENT PRINTERS WITHOUT A FULL IT CONTRACT?",
    a: "Absolutely. Our printer rental services are available as standalone solutions. We provide high-performance printers, maintenance, and toner supply on flexible terms."
  },
  {
    q: "HOW DO I START A PROJECT WITH YOU?",
    a: "Simply fill out the contact form, email us at info@kalaharihertz.co.bw, or send us a message on WhatsApp. We'll schedule a consultation to discuss your specific needs and provide a tailored proposal."
  }
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for Service Detail Popups
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // State for FAQ Accordion (default to first item open)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Loader States
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Image Carousel Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % services.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Loader Effect
  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // CODE PROTECTION EFFECT
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main id="top" className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-6 md:p-12"
          >
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-500">
              <span>Kalahari Hertz</span>
              <span>Loading</span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white/20">
                Please Wait
              </h1>
            </div>

            <div className="flex justify-end items-end">
              <span className="text-6xl md:text-9xl font-black tracking-tighter text-white">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MINIMAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.webp" alt="Kalahari Hertz" width={150} height={40} className="w-auto h-8 md:h-10 object-contain pointer-events-none" priority />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#industries" className="hover:text-white transition-colors">Industries</Link>
            <Link href="#about" className="hover:text-white transition-colors">Company</Link>
            <Link href="#collaborations" className="hover:text-white transition-colors">Clients</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#F4F4F5] text-[#06141B] flex flex-col pt-6 px-6 h-screen overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <Image src="/logo.webp" alt="Kalahari Hertz" width={120} height={30} className="w-auto h-6 object-contain pointer-events-none" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="bg-[#06141B] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                Close
              </button>
            </div>

            <div className="flex flex-col gap-1 pb-12">
              <Link href="#top" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">1</span>
                <span className="text-3xl font-medium tracking-tight">Home</span>
              </Link>
              <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] ml-[5%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">2</span>
                <span className="text-3xl font-medium tracking-tight">Services</span>
              </Link>
              <Link href="#industries" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] ml-[10%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">3</span>
                <span className="text-3xl font-medium tracking-tight">Industries</span>
              </Link>
              <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] ml-[15%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">4</span>
                <span className="text-3xl font-medium tracking-tight">Company</span>
              </Link>
              <Link href="#collaborations" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] ml-[20%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">5</span>
                <span className="text-3xl font-medium tracking-tight">Clients</span>
              </Link>
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#E5E5E5] p-6 w-[90%] ml-[25%] flex flex-col justify-center min-h-[100px]">
                <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mb-3">6</span>
                <span className="text-3xl font-medium tracking-tight">Contact</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-between pt-20 overflow-hidden bg-black">
        <div className="relative flex-grow flex items-center justify-center overflow-hidden">
          <motion.div className="absolute flex w-max whitespace-nowrap z-0 select-none" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
            {[0, 1, 2, 3].map((i) => (
              <h1 key={i} className="text-[20vw] md:text-[22vw] font-black leading-[0.8] tracking-tighter text-white pr-12">KALAHARI HERTZ</h1>
            ))}
          </motion.div>

          <div className="relative z-10 w-[280px] md:w-[400px] aspect-square md:aspect-[4/3] overflow-hidden bg-black shadow-2xl border border-white/10">
            <AnimatePresence mode="popLayout">
              <motion.div key={currentImage} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: "linear" }} className="absolute inset-0">
                <Image src={services[currentImage].image} alt={services[currentImage].title} fill className="object-cover grayscale pointer-events-none" priority />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="w-full px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9 flex flex-col gap-3">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500">(Company Profile)</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-white">
              Empowering your business <br /><span className="text-gray-500">with cutting-edge IT.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
            <button onClick={() => setIsContactOpen(true)} className="group relative w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/20 flex items-center justify-center hover:bg-white transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[10px] font-bold uppercase tracking-widest fill-white group-hover:fill-black transition-colors duration-500">
                    <textPath href="#circlePath">Start a project • Start a project •</textPath>
                  </text>
                </svg>
              </div>
              <div className="relative z-10 text-white group-hover:text-black transition-colors duration-500 transform group-hover:rotate-45"><ArrowUpRight size={24} strokeWidth={2} /></div>
            </button>
          </div>
        </div>
      </section>

      {/* SCROLLING TEXT */}
      <div className="w-full bg-black"><ScrollingBrandText /></div>

      {/* HORIZONTAL SCROLL SERVICES SECTION */}
      <section id="services" className="pt-24 pb-32 relative z-20 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white uppercase">
              <span className="text-blue-500 font-mono text-xl mr-4">{"//"}</span>Capabilities
            </h2>
            <p className="text-gray-400 text-sm mt-4 md:mt-0 font-mono uppercase tracking-widest flex items-center gap-2">
              [ Scroll to explore <ArrowRight size={14} /> ]
            </p>
          </div>
        </div>

        <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-6 md:px-12 pb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group cursor-pointer flex flex-col flex-shrink-0 w-[280px] md:w-[320px] snap-center md:snap-start ${
                index % 4 === 1 ? "md:mt-16" : index % 4 === 2 ? "md:mt-32" : index % 4 === 3 ? "md:mt-8" : ""
              }`}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-900 mb-6 border border-white/5">
                <Image src={service.image} alt={service.title} fill className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" sizes="(max-width: 768px) 100vw, 320px" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-black font-bold text-xs uppercase tracking-widest px-4 py-2">View Details</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-mono text-sm tracking-wider uppercase">{service.id} — {service.title}</h3>
                  <p className="text-gray-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">{service.category}</p>
                </div>
                <ArrowUpRight size={18} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES MARQUEE */}
      <section className="relative z-20 bg-black py-16 border-t border-white/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        <motion.div className="flex w-max hover:[animation-play-state:paused]" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 35 }}>
          {[...coreValues, ...coreValues].map((value, index) => (
            <div key={index} className="flex flex-col min-w-[280px] md:min-w-[350px] border-l border-white/10 px-8 md:px-12 group">
              <h3 className="text-white font-bold tracking-[0.15em] uppercase text-sm mb-6 group-hover:text-blue-400 transition-colors">{value.title}</h3>
              <p className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-wider leading-relaxed max-w-[250px]">{value.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MANUAL HORIZONTAL SCROLL: MISSION & VISION */}
      <section className="relative h-screen bg-[#0A0A0A]">
        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          
          <div className="w-full flex-shrink-0 snap-start h-full flex flex-col justify-center px-6 md:px-24 relative">
            <div className="max-w-4xl w-full">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">(01) Our Mission</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-[1.05]">To empower businesses <br/> through innovative <br/> and reliable IT solutions.</h2>
              <p className="mt-6 text-lg md:text-xl text-gray-400 font-serif italic max-w-xl">Delivering exceptional service and support that fosters growth and enhances operational efficiency.</p>
            </div>
            <div className="absolute bottom-12 left-6 md:left-24 flex items-center gap-3 text-gray-500 animate-pulse">
              <span className="text-xs font-mono uppercase tracking-widest">Swipe or Scroll Right</span><ArrowRight size={16} />
            </div>
          </div>

          <div className="w-full flex-shrink-0 snap-start h-full flex flex-col justify-center px-6 md:px-24 relative">
            <div className="max-w-4xl w-full">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-blue-400/80 mb-6">(02) Our Vision</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter text-blue-500 leading-[1.05]">To be a leading <br/> IT service provider <br/> in Botswana.</h2>
              <p className="mt-6 text-sm md:text-base text-gray-400 font-sans uppercase tracking-widest max-w-xl">Recognized for our commitment to excellence, customer-centric approach, and contributions to the advancement of technology in the region.</p>
            </div>
            <div className="absolute bottom-12 right-6 md:right-24 flex items-center gap-3 text-gray-500 animate-pulse">
              <ArrowLeft size={16} /><span className="text-xs font-mono uppercase tracking-widest">Scroll Left</span>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <motion.section id="about" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative z-30 bg-[#F4F4F5] text-[#06141B] py-24 px-6 md:px-12 w-full border-t-[6px] border-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start mb-20">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]">
                We are Kalahari Hertz — a dynamic IT service provider based in Gaborone. We build technology solutions that people don&apos;t have to worry about.
                <br />
                <span className="text-gray-500 block mt-4">Infrastructure, security, and the systems your business runs on — when the work needs expert hands, it gets done here.</span>
              </h2>
            </div>
            <motion.div initial={{ opacity: 0, rotate: 10, scale: 0.9 }} whileInView={{ opacity: 1, rotate: 4, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full lg:w-1/3 flex-shrink-0 relative">
              <div className="relative aspect-square md:aspect-[4/5] w-full max-w-[320px] mx-auto shadow-2xl rounded-sm overflow-hidden bg-gray-200">
                <Image src="/about-photo.webp" alt="Kalahari Hertz Team" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 1. INDUSTRIES WE SERVE (LIST DESIGN) */}
      <section id="industries" className="relative z-30 bg-[#0A0A0A] py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center mb-16 text-[10px] md:text-xs font-mono tracking-widest text-gray-500 uppercase">
            <span>[ Industries We Serve ]</span>
            <span>01 — 09</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
              Built for every sector.
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-sm md:text-right">
              Empowering organizations of all sizes with secure, innovative technology solutions tailored for their specific needs.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer px-4 md:px-0"
              >
                <div className="flex items-center gap-4 md:gap-8 w-full md:w-2/3">
                  <span className="text-xs font-mono text-gray-600 w-6">0{index + 1}</span>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#151515] border border-white/5 flex items-center justify-center text-2xl md:text-3xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    {industry.emoji}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-3xl font-medium text-white group-hover:text-blue-400 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-widest mt-1">
                      {industry.category}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex w-1/3 items-center justify-center">
                  <p className="text-sm text-gray-400 text-center">{industry.desc}</p>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Active</span>
                  </div>
                  <ArrowUpRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE ADVANTAGE SLIDER */}
      <section className="relative z-30 bg-[#0A0A0A] py-20 border-t border-white/10 overflow-hidden flex flex-col gap-8">
        <motion.div className="flex whitespace-nowrap w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }}>
          {[...marqueeItems1, ...marqueeItems1, ...marqueeItems1, ...marqueeItems1].map((item, i) => (
            <div key={`r1-${i}`} className="flex items-center">
              {item.style === "bold" ? (
                <span className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                  {item.text}
                </span>
              ) : (
                <span className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.1em] text-gray-300">
                  {item.text}
                </span>
              )}
              <span className="text-blue-500 text-xl md:text-3xl mx-6 md:mx-10">◆</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="flex whitespace-nowrap w-max" animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
          {[...marqueeItems2, ...marqueeItems2, ...marqueeItems2, ...marqueeItems2].map((item, i) => (
            <div key={`r2-${i}`} className="flex items-center">
              {item.style === "bold" ? (
                <span className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
                  {item.text}
                </span>
              ) : (
                <span className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.1em] text-gray-300">
                  {item.text}
                </span>
              )}
              <span className="text-gray-600 text-xl md:text-3xl mx-6 md:mx-10">◆</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. COLLABORATIONS & FAQ (WHITE BACKGROUND) */}
      <section id="collaborations" className="relative z-30 bg-white text-[#06141B] py-24 md:py-32 px-6 md:px-12 border-t-[6px] border-[#06141B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Side: Collaborations */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Our<br />Collaboration
              </h2>
              
              <div className="relative w-full aspect-[4/3] mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <Image 
                  src="/geoflux-collab.webp" 
                  alt="Geoflux Collaboration" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                Kalahari Hertz is proud to provide expert IT support services and printer rentals to <span className="font-bold text-[#06141B]">Geoflux</span>, demonstrating our ability to meet complex demands with reliability and technical expertise.
              </p>
            </div>

            {/* Split Button Style & Credentials */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center w-full max-w-sm">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="flex-grow bg-[#06141B] text-white py-4 px-6 text-sm font-bold uppercase tracking-widest rounded-l-full hover:bg-blue-600 transition-colors"
                >
                  Start a project
                </button>
                <div className="w-[2px] h-full bg-white/20"></div>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#06141B] text-white py-4 px-6 text-sm font-bold uppercase tracking-widest rounded-r-full hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>

              <p className="text-[10px] md:text-xs font-bold tracking-widest text-[#06141B] uppercase bg-gray-100 px-5 py-3 rounded-full border border-gray-200 inline-block w-fit">
                Led by 20+ Years Experience • SSCP • CC • IBM Cyber Analyst
              </p>
            </div>
          </motion.div>

          {/* Right Side: FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex flex-col border-t border-[#06141B]/20">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border-b border-[#06141B]/20">
                    <button 
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                          Q.00{index + 1} /
                        </span>
                        <span className={`text-lg md:text-xl font-bold uppercase tracking-tight transition-colors ${isOpen ? "text-[#06141B]" : "text-[#06141B]/60 group-hover:text-[#06141B]"}`}>
                          {faq.q}
                        </span>
                      </div>
                      <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${isOpen ? "bg-[#06141B] text-white" : "bg-gray-100 text-[#06141B] group-hover:bg-gray-200"}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. FOOTER */}
      <footer id="contact" className="relative z-30 bg-[#0A0A0A] pt-32 pb-12 px-6 md:px-12 w-full overflow-hidden border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          
          <p className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 md:mb-8">Got something in mind?</p>
          
          <button onClick={() => setIsContactOpen(true)} className="text-[15vw] md:text-[13vw] font-black tracking-tighter leading-none text-[#F4F4F5] hover:text-blue-500 transition-colors duration-300 w-full text-left block">
            LET&apos;S TALK
          </button>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 text-[11px] md:text-xs font-mono tracking-wider text-gray-400 uppercase">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <a href="mailto:info@kalaharihertz.co.bw" className="hover:text-white transition-colors">INFO@KALAHARIHERTZ.CO.BW</a>
              <a href="https://wa.me/26774076795" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHATSAPP</a>
              <span>GABORONE, BOTSWANA</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>AVAILABLE FOR WORK</div>
              <a href="#top" className="flex items-center gap-1 hover:text-white transition-colors">BACK TO TOP <ArrowUpRight size={14} /></a>
            </div>
          </div>

          <div className="mt-8 text-[10px] text-gray-600 flex justify-between items-center">
            <p>© 2026 KALAHARI HERTZ. ALL RIGHTS RESERVED.</p>
            <p>Website by <a href="https://xlassicstudio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline underline-offset-4 transition-colors">xlassicstudio</a></p>
          </div>

        </div>
      </footer>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContactOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer" />
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-[#06141B] border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-10 relative pointer-events-auto shadow-2xl overflow-y-auto max-h-[90vh]">
                <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white mb-2">Let&apos;s build something.</h3>
                <p className="text-gray-400 text-sm mb-8">Fill out the details below and choose how you want to reach us.</p>
                <form action="https://formsubmit.co/ajax/info@kalaharihertz.co.bw" method="POST" className="flex flex-col gap-6">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Inquiry from Kalahari Hertz Website!" />
                  <input type="hidden" name="_template" value="table" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name</label><input type="text" name="name" required placeholder="John Doe" className="w-full bg-transparent border-b border-white/20 pb-2 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors" /></div>
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</label><input type="email" name="email" required placeholder="john@company.com" className="w-full bg-transparent border-b border-white/20 pb-2 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors" /></div>
                  </div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label><textarea name="message" required rows={3} placeholder="How can we help you?" className="w-full bg-transparent border-b border-white/20 pb-2 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea></div>
                  <div className="flex flex-col gap-4 pt-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Send via</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button type="submit" className="flex-1 bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors rounded-sm"><Mail size={16} /> Send Email</button>
                      <button type="button" onClick={() => { const name = (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || ""; const message = (document.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value || ""; const text = encodeURIComponent(`Hi Kalahari Hertz, my name is ${name}. ${message}`); window.open(`https://wa.me/26774076795?text=${text}`, '_blank'); }} className="flex-1 bg-[#25D366] text-black px-6 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors rounded-sm"><MessageCircle size={16} /> WhatsApp</button>
                    </div>
                    <p className="text-[10px] text-gray-600 text-center">By sending, you agree to our <Link href="/privacy" className="underline hover:text-gray-400">Privacy Policy</Link>.</p>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* SERVICE DETAIL MODAL (POPUP) */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
            />
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[#06141B] border border-white/10 rounded-2xl w-full max-w-3xl p-6 md:p-10 relative pointer-events-auto shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden bg-gray-900 border border-white/5">
                    <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover grayscale" />
                  </div>
                  <div className="w-full md:w-2/3 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{selectedService.category}</p>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">{selectedService.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedService.details}</p>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Services Include</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-400 font-mono">
                          <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button onClick={() => { setSelectedService(null); setIsContactOpen(true); }} className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-sm">
                    Request this service
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* GLOBAL CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Disable Text Selection & Image Dragging */
        * {
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>

    </main>
  );
}