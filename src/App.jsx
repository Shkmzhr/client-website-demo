import React, { useState, useEffect, useCallback, useRef } from 'react';
import heroParallaxBg from './assets/clientimages/constructionparallax1.jpg'; 
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { motion, useScroll, useTransform,useSpring,AnimatePresence   } from 'framer-motion'; 
import { Menu, X, Globe, Users, TrendingUp, HardHat, Wrench, Zap, Shield, Linkedin, MapPin, Mail, Phone, Facebook, Twitter,MessageCircle  } from 'lucide-react';
// NEW ICON IMPORTS: Ensure this line includes all 9 icons
import {  Factory, Hotel, Truck, Building, HeartPulse, ShoppingCart, Mic, Pause, Play, Repeat,ArrowUp, ArrowDown  } from 'lucide-react';
// ===================================
// IMAGE IMPORTS (UPDATED PATHS and all client images)
// ===================================
import nccLogo from './assets/clientimages/NCC.jpeg'; 
import ArmGroup from './assets/clientimages/ARM-Group-screenshot.jpg'; 
import clientImage1 from './assets/clientimages/alalkaif.jpeg';
import clientImage2 from './assets/clientimages/aldawaa.jpeg';
import clientImage3 from './assets/clientimages/accesspartners.jpeg';
import clientImage4 from './assets/clientimages/aljubailsanit.jpeg';
import clientImage5 from './assets/clientimages/alliedsolutions.jpeg';
import clientImage6 from './assets/clientimages/almarai.jpeg';
import clientImage7 from './assets/clientimages/alrajhi.jpeg';
import clientImage8 from './assets/clientimages/annasban.jpeg';
import clientImage9 from './assets/clientimages/flashdiamond.jpeg';
import clientImage10 from './assets/clientimages/gulfaar.jpeg';
import clientImage11 from './assets/clientimages/ARM-Group-screenshot.jpg';
import clientImage12 from './assets/clientimages/gulfaar.jpeg';
import clientImage13 from './assets/clientimages/integratedhr.jpeg';
import clientImage14 from './assets/clientimages/kamps.jpeg';
import clientImage15 from './assets/clientimages/karanint.jpeg';
import clientImage16 from './assets/clientimages/lucid.jpeg';
import clientImage17 from './assets/clientimages/marco.jpeg';
import clientImage18 from './assets/clientimages/muffalat.jpeg';
import clientImage19 from './assets/clientimages/musanadah.jpeg';
import clientImage20 from './assets/clientimages/nadec.jpeg';
import clientImage21 from './assets/clientimages/prosource.jpeg';
import clientImage22 from './assets/clientimages/qiwaOps.jpeg';
import clientImage23 from './assets/clientimages/rezyatgroup.jpeg';
import clientImage24 from './assets/clientimages/samayagroup.jpeg';
import clientImage25 from './assets/clientimages/saudieleccomp.jpeg';
import armGroupPhoto from './assets/clientimages/ARM-group-photo.jpeg';
import arm2GroupPhoto from './assets/clientimages/ARM-2Group.jpeg';
import MrRizwan from './assets/clientimages/mohammedrizwanahmed.jpg';
import MrMujeeb from './assets/clientimages/mujeebullah.jpg';
import MohammedHamid from './assets/clientimages/mohammedhamidansari.jpg';
import MrTajammul from './assets/clientimages/dummyProfile.png';
import MrAbdullah from './assets/clientimages/dummyProfile.png';
import MrPaleshRana from './assets/clientimages/dummyProfile.png';
import dummyServiceBg from './assets/clientimages/womenwashingdish.jpeg';
import ConstructionBg from './assets/clientimages/Construction.jpg';
import HvacBg from './assets/clientimages/HVAC.jpg';
import SupportstaffBg from './assets/clientimages/Support-staff.jpg';
import Maintenance from './assets/clientimages/Maintenance.jpg';
import OilGasBg from './assets/clientimages/OilandGas.jpg';
import HospitalityBg from './assets/clientimages/Hospitality.jpg';
import LogisticsBg from './assets/clientimages/Logistics.jpg';
import FacilityBg from './assets/clientimages/Facility.jpg';
import HealthcareBg from './assets/clientimages/Healthcare.jpg';
import RetailBg from './assets/clientimages/Retail.jpg';
import EventsBg from './assets/clientimages/Events.jpg';
// Variables for each service background (all pointing to the placeholder for now)

// const OilGasBg = supportStaffPlaceholder;
// const HospitalityBg = supportStaffPlaceholder;
// const LogisticsBg = supportStaffPlaceholder;
// const FacilityBg = supportStaffPlaceholder;
// const HealthcareBg = supportStaffPlaceholder;
// const RetailBg = supportStaffPlaceholder;
// const EventsBg = supportStaffPlaceholder;
// Renaming the old variables to the new comprehensive set
// ===================================
// Placeholder for all 8 service cards
// import supportStaffPlaceholder from './assets/clientimages/Support-staff.jpg';

// ===================================
// 0. Color Definitions & Utilities
// ===================================
// ===================================
// 0. Glassy Color Definitions & Utilities
// ===================================
// Theme Definitions
// ===================================
const THEMES = {
  dark: {
    BG: "#060B16",
    TEXT: "#F5F7FA",
    SUBTEXT: "rgba(240,240,240,0.7)",
    ACCENT: "#4B89F7",
    GLASS_BG: "rgba(255,255,255,0.12)",
    GLASS_BORDER: "1px solid #4B89F750",
    SHADOW: "0 8px 32px 0 rgba(75, 137, 247, 0.15)",
  },
  light: {
    BG: "#F7F9FC",
    TEXT: "#1A202C",
    SUBTEXT: "rgba(0,0,0,0.7)",
    ACCENT: "#2B6CB0",
    GLASS_BG: "rgba(255, 255, 255, 0.6)",
    GLASS_BORDER: "1px solid rgba(43, 108, 176, 0.2)",
    SHADOW: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
  },
};

// Characters used for the scrambling effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=';
const DURATION = 540; // Total duration of the scramble effect in ms

/**
 * ScrambleText Component (Animation Utility)
 * Animates text by cycling through random characters before resolving to the final text.
 */
const ScrambleText = ({ text, className, color = DEEP_BROWN }) => {
    const [scrambledText, setScrambledText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const scramble = useCallback(() => {
        if (!text) return;

        const interval = Math.max(10, DURATION / text.length / 2); 
        let iteration = 0;

        const scrambler = setInterval(() => {
            const newText = text.split('').map((char, index) => {
                const threshold = iteration / (text.length * 2);

                if (index < threshold * text.length) {
                    return char;
                }
                
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }).join('');

            setScrambledText(newText);
            iteration++;

            if (iteration > text.length * 2) { 
                clearInterval(scrambler);
                setScrambledText(text);
                setIsComplete(true);
            }
        }, interval);

        return () => clearInterval(scrambler);
    }, [text]);

    useEffect(() => {
        scramble();
    }, [scramble]);

    return (
        <span 
            className={`${className} transition-all duration-300`} 
            style={{ 
                color: color, 
                fontFamily: isComplete ? 'Inter, sans-serif' : 'monospace', 
            }}
        >
            {scrambledText}
        </span>
    );
};
const FramerFadeIn = ({ children, delay = 0, duration = 0.8, y = 30, once = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            viewport={{ once: once, amount: 0.1 }}
        >
            {children}
        </motion.div>
    );
};
/**
 * PageTransitionWrapper Component (Controls Admin/Public full-page fade)
 * Manages the fade-in/fade-out effect for the entire public site when switching views.
 */
const PageTransitionWrapper = ({ children, isPublic }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // When becoming public, trigger fade-in
        if (isPublic) {
            const timeout = setTimeout(() => setIsVisible(true), 50); 
            return () => clearTimeout(timeout);
        } else {
            // When leaving public, trigger fade-out
            setIsVisible(false);
        }
    }, [isPublic]);

    return (
        <div 
            className={`transition-opacity duration-500 ease-in-out`}
            style={{ opacity: isPublic && isVisible ? 1 : 0 }}
        >
            {children}
        </div>
    );
};

/**
 * FadeInSection Component (Controls Scroll-based fade for individual sections)
 * Uses IntersectionObserver to trigger a fade-in when the element enters the viewport.
 */
const FadeInSection = ({ children }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const currentRef = domRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(entries => {
            // Check if the element is intersecting
            if (entries[0].isIntersecting) {
                setVisible(true);
                // Stop observing after first appearance to prevent re-fading on scroll up/down
                observer.unobserve(currentRef); 
            }
        }, { 
            // Trigger when 10% of the element is visible
            threshold: 0.1 
        });

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Increased duration to 1000ms and translateY distance to 50px for a more visible effect
    return (
        <div
            className={`transition-all duration-1000 ease-out transform`} 
            style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
            }}
            ref={domRef}
        >
            {children}
        </div>
    );
};


// Service Card Component (Used in Services section)
const ServiceCard = ({ icon: Icon, title,COLORS, description, widthClass = "w-full" }) => (
     <motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: `0 15px 40px ${COLORS.ACCENT}70`,
      transition: { type: "spring", stiffness: 250, damping: 15 },
    }}
    className="group relative p-8 rounded-xl overflow-hidden cursor-pointer h-full backdrop-blur-sm flex-shrink-0 w-72 md:w-80"
  style={{
      backgroundColor: COLORS.GLASS_BG,
      border: COLORS.GLASS_BORDER,
      boxShadow: COLORS.SHADOW,
    }}
  >
    <div className="relative z-10">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 transition duration-300 group-hover:scale-110 group-hover:rounded-2xl"
      style={{
          backgroundColor: COLORS.ACCENT,
          boxShadow: `0 0 15px ${COLORS.ACCENT}80`,
        }}
      >
        <Icon className="w-8 h-8" style={{ color: COLORS.BG }} />
      </div>

      <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.TEXT }}>
        {title}
      </h3>
      <p style={{ color: COLORS.SUBTEXT }}>{description}</p>
    </div>
  </motion.div>
);

// Smooth scrolling NavLink helper
const NavLink = ({ to, children, setIsOpen }) => {
  const handleClick = (e) => {
    e.preventDefault();

    // Find the target section and scroll to it smoothly
    const target = document.getElementById(to);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // If on mobile menu, close it after clicking
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className="transition duration-300 block py-2 lg:py-0 lg:inline-block font-medium hover:scale-105"
    >
      {children}
    </a>
  );
};
const Navbar = ({ toggleView, currentView, theme, toggleTheme, COLORS }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPublicView = currentView === "public";

  const handleCompanyProfileClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    toggleView("company-profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✨ Animation Variants
  const menuVariants = {
    hidden: { opacity: 0, y: -30, scaleY: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, y: -30, scaleY: 0.95, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor:
          theme === "dark"
            ? "rgba(8, 16, 31, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        borderBottom: COLORS.GLASS_BORDER,
        boxShadow: COLORS.SHADOW,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ScrambleText
            text="ARM Solutions"
            className="tracking-widest"
            color={COLORS.TEXT}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {isPublicView && (
            <>
              <NavLink to="hero">Home</NavLink>
              <NavLink to="services">Services</NavLink>
              <NavLink to="directors">Leadership</NavLink>
              <NavLink to="contact">Contact</NavLink>
              <a
                href="#company-profile"
                onClick={handleCompanyProfileClick}
                className="transition duration-300 block py-2 font-medium hover:scale-110"
                style={{ color: COLORS.TEXT }}
                onMouseEnter={(e) => (e.target.style.color = COLORS.ACCENT)}
                onMouseLeave={(e) => (e.target.style.color = COLORS.TEXT)}
              >
                Company Profile
              </a>
            </>
          )}

          {/* Admin Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              toggleView && toggleView(isPublicView ? "admin" : "public")
            }
            className="px-4 py-2 text-sm font-semibold rounded-full shadow-md transition"
            style={{
              backgroundColor: isPublicView ? COLORS.ACCENT : COLORS.BG,
              color: isPublicView ? COLORS.BG : COLORS.TEXT,
              border: `2px solid ${COLORS.ACCENT}`,
            }}
          >
            {isPublicView ? "Admin Login" : "Back to Site"}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full transition border"
            style={{
              backgroundColor: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              color: COLORS.ACCENT,
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md transition duration-200 hover:bg-opacity-20"
          style={{
            color: COLORS.ACCENT,
            background: `${COLORS.ACCENT}10`,
            border: COLORS.GLASS_BORDER,
          }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/*  Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden origin-top"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            style={{
              background: COLORS.GLASS_BG,
              borderTop: COLORS.GLASS_BORDER,
              boxShadow: `0 8px 32px ${COLORS.ACCENT}30`,
              backdropFilter: "blur(15px)",
            }}
          >
            <motion.div
              className="px-6 py-5 space-y-4 text-center"
              variants={itemVariants}
            >
              {isPublicView && (
                <>
                  {["home", "services", "directors", "contact"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium tracking-wide hover:scale-105 transition"
                      style={{ color: COLORS.TEXT }}
                      variants={itemVariants}
                      whileHover={{ color: COLORS.ACCENT, scale: 1.1 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  ))}

                  <motion.a
                    href="#company-profile"
                    onClick={handleCompanyProfileClick}
                    className="block text-lg font-semibold hover:scale-105"
                    style={{ color: COLORS.ACCENT }}
                    variants={itemVariants}
                  >
                    Company Profile
                  </motion.a>
                </>
              )}

              <motion.button
                variants={itemVariants}
                onClick={() => {
                  toggleView && toggleView(isPublicView ? "admin" : "public");
                  setIsOpen(false);
                }}
                className="w-full py-2 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
                style={{
                  backgroundColor: COLORS.ACCENT,
                  color: COLORS.BG,
                }}
              >
                {isPublicView ? "Admin Login" : "Back to Site"}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                variants={itemVariants}
                onClick={toggleTheme}
                className="mt-2 p-2 w-full rounded-md border font-medium transition hover:scale-105"
                style={{
                  border: COLORS.GLASS_BORDER,
                  color: COLORS.ACCENT,
                  background: COLORS.GLASS_BG,
                }}
              >
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
// ===================================
// Hero section
// ===================================
const Hero = ({ COLORS }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -350]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

  return (
    <section
      id="hero"
      className="relative h-screen sm:h-screen flex items-center justify-center overflow-hidden"
      style={{ background: COLORS.GRADIENT }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url('${heroParallaxBg}')`, y, scale }}
      ></motion.div>

      {/* Dark/Light overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: COLORS.BG }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          <ScrambleText text="Powering Infrastructure with" color={COLORS.TEXT} />
          <span className="block" style={{ color: COLORS.ACCENT }}>
            <ScrambleText text="Expert Manpower" color={COLORS.ACCENT} />
          </span>
        </h1>

        <p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto transition duration-700"
          style={{ color: COLORS.SUBTEXT }}
        >
          ARM Solutions delivers highly skilled technical, maintenance, and construction personnel across Saudi Arabia.
        </p>

        <motion.a
          href="#services"
          animate={{
            boxShadow: [
              `0 0 10px ${COLORS.ACCENT}50`,
              `0 0 25px ${COLORS.ACCENT}90`,
              `0 0 10px ${COLORS.ACCENT}50`,
            ],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="mt-10 inline-block px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-110"
          style={{
            backgroundColor: COLORS.ACCENT,
            color: COLORS.BG,
            boxShadow: `0 0 15px ${COLORS.ACCENT}`,
          }}
        >
          Explore Our Services
        </motion.a>
      </div>
    </section>
  );
};




// ===================================
// 3. About Component 
// ===================================
const About = ({ COLORS }) => {
  return (
    <FadeInSection>
      <motion.section
        id="about"
        className="relative py-20 md:py-28 z-20 overflow-hidden"
        style={{
          background: `linear-gradient(120deg, ${COLORS.BG} 0%, ${COLORS.ACCENT}15 100%)`,
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Glow Accent */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 30%, ${COLORS.ACCENT}60, transparent 70%)`,
          }}
        ></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ color: COLORS.ACCENT }}
            >
              <ScrambleText
                text="A Legacy of Trust and Excellence"
                color={COLORS.ACCENT}
              />
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: COLORS.SUBTEXT }}
            >
              For over two decades, ARM Solutions has been the reliable partner
              for major industrial and construction projects — delivering manpower
              excellence, safety, and dependability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Global Reach", description: "Sourcing and mobilizing top talent from key regions worldwide to meet localized project demands." },
              { icon: Users, title: "Skilled Manpower", description: "Providing certified engineers, technicians, and specialized labor vetted for immediate deployment." },
              { icon: TrendingUp, title: "Operational Efficiency", description: "Streamlining recruitment, logistics, and compliance processes to minimize project lead times." },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px ${COLORS.ACCENT}60`,
                }}
                className="p-6 rounded-2xl backdrop-blur-md border transition-all duration-300"
                style={{
                  background: COLORS.GLASS_BG,
                  border: COLORS.GLASS_BORDER,
                  boxShadow: COLORS.SHADOW,
                }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                  style={{
                    background: COLORS.ACCENT,
                    boxShadow: `0 0 15px ${COLORS.ACCENT}40`,
                  }}
                >
                  <card.icon className="w-8 h-8" style={{ color: COLORS.BG }} />
                </div>

                <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.TEXT }}>
                  {card.title}
                </h3>
                <p style={{ color: COLORS.SUBTEXT }}>{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </FadeInSection>
  );
};

// ===================================
// 4. Services Component
const Services = ({ COLORS }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Update horizontal scroll range
    const updateRange = () => {
      if (containerRef.current && trackRef.current) {
        const contentWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const newRange =
          contentWidth > containerWidth
            ? -(contentWidth - containerWidth + 200)
            : 0;
        setScrollRange(newRange);
      }
    };

    updateRange();
    window.addEventListener("resize", updateRange);
    const timeout = setTimeout(updateRange, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateRange);
      clearTimeout(timeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["0px", `${scrollRange}px`]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, mass: 0.5 });

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30, rotate: -1 },
    show: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const services = [
    { icon: HardHat, title: "Construction", description: "Engineers, Foremen, Welders, and general labor for large-scale projects." },
    { icon: Wrench, title: "Maintenance & Shutdown", description: "Skilled technicians for industrial plant maintenance and critical shutdown operations." },
    { icon: Zap, title: "Technical & HVAC", description: "Experts in electrical systems, instrumentation, and HVAC services." },
    { icon: Shield, title: "Support Staff", description: "Trained security personnel, drivers, and administrative support roles." },
    { icon: Factory, title: "Oil & Gas", description: "Specialized manpower for oil rigs, refineries, and petrochemical plants." },
    { icon: Hotel, title: "Hospitality", description: "Soft services personnel, housekeeping, and facility management experts." },
    { icon: Building, title: "Manufacturing", description: "Assembly line workers, quality control inspectors, and logistics support." },
  ];

  return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: COLORS.BG }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FramerFadeIn y={50}>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: COLORS.ACCENT }}
            >
              <ScrambleText
                text="Our Specialized Manpower Solutions"
                className="inline-block"
                color={COLORS.ACCENT}
              />
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              We cover a full spectrum of workforce needs for capital-intensive industries.
            </p>
            {!isMobile && (
              <p
                className="text-sm text-gray-400 mt-2 font-bold"
                style={{ color: COLORS.ACCENT }}
              >
                Scroll down — cards will move horizontally
              </p>
            )}
          </FramerFadeIn>
        </div>
      </div>

      {/* 🔹 Desktop: Horizontal Scroll  */}
      {!isMobile && (
        <div ref={containerRef} className="relative z-0" style={{ height: "300vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            <div className="w-full relative">
              {/* Gradient Edge Masks */}
              <div className="absolute left-0 top-0 h-full w-32 pointer-events-none bg-gradient-to-r from-[#08101F] to-transparent z-20"></div>
              <div className="absolute right-0 top-0 h-full w-32 pointer-events-none bg-gradient-to-l from-[#08101F] to-transparent z-20"></div>

              {/* Horizontal Track */}
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  ref={trackRef}
                  style={{ x }}
                  className="flex space-x-8 pb-8 md:pb-12 pl-32 pr-32"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {services.map((s, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96"
                    >
                      <ServiceCard {...s} COLORS={COLORS} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Mobile: Simple Vertical List  */}
      {isMobile && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <ServiceCard {...s} COLORS={COLORS} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ===================================
// 5. Directors Component
// ===================================
const DirectorCard = ({ name, title, bio, intro, imageUrl, index, COLORS }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <motion.div
      className="relative w-full h-[420px] cursor-pointer perspective"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Inner 3D rotation wrapper */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative w-full h-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col text-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${COLORS.GLASS_BG}, ${COLORS.BG})`,
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Image container */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: "210px",
              background: `radial-gradient(circle at 50% 20%, ${COLORS.ACCENT}30, transparent 70%)`,
            }}
          >
            <motion.img
              src={imageUrl}
              alt={name}
              className="h-[190px] object-contain drop-shadow-lg transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x300/0a0a0a/777?text=Director";
              }}
              whileHover={{ scale: 1.05 }}
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-between flex-grow p-5">
            <div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: COLORS.TEXT }}
              >
                {name}
              </h3>
              <p
                className="text-sm font-medium mb-2 uppercase tracking-wide"
                style={{ color: COLORS.ACCENT }}
              >
                {title}
              </p>
              <p
                className="text-xs opacity-80 italic leading-snug"
                style={{ color: COLORS.SUBTEXT }}
              >
                {bio}
              </p>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="mt-3 inline-block"
            >
              <Linkedin
                className="w-5 h-5 mx-auto"
                style={{ color: COLORS.ACCENT }}
              />
            </motion.a>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-center items-center px-6 py-5 text-left"
          style={{
            background: `linear-gradient(160deg, ${COLORS.BG}, ${COLORS.ACCENT}20)`,
            border: `1px solid ${COLORS.ACCENT}50`,
            boxShadow: `inset 0 0 20px ${COLORS.ACCENT}20, 0 0 25px ${COLORS.ACCENT}40`,
            color: COLORS.TEXT,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3
            className="text-lg font-bold mb-2 text-center"
            style={{ color: COLORS.ACCENT }}
          >
            {name}
          </h3>
          <p
            className="text-sm text-center leading-relaxed opacity-90"
            style={{ color: COLORS.TEXT }}
          >
            {intro}
          </p>
        </div>
      </motion.div>

      {/* Outer Glow Aura */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-[-1]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: `0 0 30px 8px ${COLORS.ACCENT}30`,
          filter: "blur(8px)",
        }}
      ></motion.div>
    </motion.div>
  );
};

const Directors = ({ COLORS }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  const directors = [
    {
      name: "Mr. Mohammed Rizwan Ahmed",
      title: "Managing Director",
      bio: "14+ years of leadership experience in manpower operations and strategic management.",
      intro: `Mr. Mohammed Rizwan Ahmed serves as the Head of Operations Manager at Lucid Investment Company. With over 14 years of experience, he has led large-scale operations, optimized workforce strategies, and implemented effective process improvements contributing to organizational growth.`,
      imageUrl: MrRizwan,
    },
    {
      name: "Mr. Mujeeb Ullah",
      title: "CEO",
      bio: "A decade of experience in sales and workforce client relations.",
      intro: `Mr. Mujeeb Ullah currently works as the Sales Manager at Lucid Investment Company. With over 10 years of experience in manpower solutions, he is known for his client relationship expertise, strategic sales vision, and ability to deliver tailored workforce solutions.`,
      imageUrl: MrMujeeb,
    },
    {
      name: "Mr. Mohammad Hamid Ansari",
      title: "Founder and Business Development",
      bio: "Expert recruiter skilled in strategic hiring and workforce planning.",
      intro: `Mr. Mohammad Hamid Ansari serves as the Recruitment Manager at Lucid Investment Company. With more than a decade of experience in recruitment and manpower solutions, he brings deep understanding of talent acquisition, strategic hiring practices, and workforce planning.`,
      imageUrl: MohammedHamid,
    },
    {
      name: "Mr. Mohammed Tajammul Ahmed",
      title: "Administrator",
      bio: "Expert in soft services training and staff development.",
      intro: `Mr. Mohammed Tajammul Ahmed specializes in the training and development of soft services personnel. With deep expertise in grooming workers for hospitality and facility management, he ensures service excellence and client satisfaction.`,
      imageUrl: MrTajammul,
    },
    {
      name: "Mr Abdullah",
      title: "Deputy CEO",
      bio: "Expert in soft services training and staff development.",
      intro: 
      `Mr. Abdullah specializes in the training and development of soft services personnel. With deep expertise in grooming workers for hospitality and facility management, he ensures service excellence and client satisfaction.`,
      imageUrl: MrAbdullah,
    },
    {
      name: "Mr. Palesh Rana",
      title: "Senior Recruiter - Overseas and Local (Bangladesh)",
      bio: "Expert in soft services training and staff development.",
      intro: `Mr. Mr. Palesh Rana specializes in the training and development of soft services personnel. With deep expertise in grooming workers for hospitality and facility management, he ensures service excellence and client satisfaction.`,
      imageUrl: MrPaleshRana,
    },
  ];

  return (
    <section id="directors" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: COLORS.BG }}>
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${COLORS.ACCENT }50, transparent 70%)`,
          y,
        }}
      ></motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: COLORS.ACCENT  }}>
            <ScrambleText text="Our Leadership" className="inline-block" color={COLORS.ACCENT } />
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-blue-400">
            Our leadership team combines experience, integrity, and innovation to shape Lucid’s success in manpower
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {directors.map((director, index) => (
            <DirectorCard key={index} {...director} index={index} COLORS={COLORS} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};


// ===================================
// 6. Contact Form Component
// ===================================
const Contact = ({ COLORS }) => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus(null), 4000);
    e.target.reset();
  };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: COLORS.GRADIENT }}
      >
        {/* Animated glowing background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${COLORS.ACCENT}40, transparent 70%),
                         radial-gradient(circle at 80% 80%, ${COLORS.ACCENT}30, transparent 70%)`,
          }}
          animate={{ opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="font-semibold uppercase mb-2 tracking-widest"
              style={{ color: COLORS.ACCENT }}
            >
              Connect With Us
            </p>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-6"
              style={{ color: COLORS.TEXT }}
            >
              Ready to Build Your Team?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: COLORS.SUBTEXT }}>
              Reach out today and let’s create workforce solutions that move your projects forward.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info Card */}
            <motion.div
              className="p-8 rounded-2xl backdrop-blur-lg border shadow-xl space-y-6"
              style={{
                background: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                boxShadow: COLORS.SHADOW,
              }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3
                className="text-2xl font-bold mb-6 border-b pb-2"
                style={{ color: COLORS.TEXT, borderColor: COLORS.ACCENT }}
              >
                Our Details
              </h3>

              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6" style={{ color: COLORS.ACCENT }} />
                  <div>
                    <p className="font-semibold" style={{ color: COLORS.TEXT }}>Headquarters</p>
                    <p style={{ color: COLORS.SUBTEXT }}>Dammam, Kingdom of Saudi Arabia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6" style={{ color: COLORS.ACCENT }} />
                  <div>
                    <p className="font-semibold" style={{ color: COLORS.TEXT }}>Email Us</p>
                    <a href="mailto:info@armsolutions.sa" style={{ color: COLORS.SUBTEXT }}>
                      info@armsolutions.sa
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6" style={{ color: COLORS.ACCENT }} />
                  <div>
                    <p className="font-semibold" style={{ color: COLORS.TEXT }}>Call Us</p>
                    <a href="tel:+966500000000" style={{ color: COLORS.SUBTEXT }}>
                      +966 50 000 0000
                    </a>
                  </div>
                </div>

                <div className="pt-4 flex space-x-4">
                  {[Facebook, Linkedin, Twitter, MessageCircle].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-2 rounded-full backdrop-blur-sm border transition-all hover:scale-110"
                      style={{
                        color: COLORS.ACCENT,
                        border: COLORS.GLASS_BORDER,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-8 rounded-2xl backdrop-blur-lg border shadow-xl"
              style={{
                background: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                boxShadow: COLORS.SHADOW,
              }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.TEXT }}>
                Send Us a Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {["Name", "Email", "Phone", "Company"].map((placeholder, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Your ${placeholder}`}
                    className="w-full p-3 rounded-lg bg-transparent border focus:outline-none"
                    style={{
                      color: COLORS.TEXT,
                      borderColor: COLORS.ACCENT,
                    }}
                    required
                  />
                ))}
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-transparent border focus:outline-none"
                  style={{
                    color: COLORS.TEXT,
                    borderColor: COLORS.ACCENT,
                  }}
                  required
                ></textarea>

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${COLORS.ACCENT}`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full py-3 font-semibold rounded-lg transition-all"
                  style={{
                    backgroundColor: COLORS.ACCENT,
                    color: COLORS.BG,
                  }}
                >
                  Submit Inquiry
                </motion.button>
              </form>

              {status === "success" && (
                <p className="mt-4 text-center" style={{ color: "limegreen" }}>
                  ✅ Your message has been sent!
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};


// ===================================
// 7. Footer Component
// ===================================
const Footer = ({ COLORS }) => {
  return (
    <FadeInSection>
      <footer
        id="footer"
        className="py-12"
        style={{
          backgroundColor: COLORS.BG,
          borderTop: COLORS.GLASS_BORDER,
          boxShadow: COLORS.SHADOW,
          color: COLORS.SUBTEXT,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-8 mb-8"
            style={{ borderColor: COLORS.ACCENT }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.ACCENT }}>
                ARM Solutions
              </h3>
              <p>
                Delivering skilled manpower solutions for infrastructure and industrial projects across the MENA region.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: COLORS.ACCENT }}>
                Quick Links
              </h4>
              {["About", "Services", "Careers", "Privacy Policy"].map((text) => (
                <p key={text} className="mb-2 hover:underline" style={{ color: COLORS.SUBTEXT }}>
                  {text}
                </p>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: COLORS.ACCENT }}>
                Contact
              </h4>
              <p style={{ color: COLORS.SUBTEXT }}>Dammam, Kingdom of Saudi Arabia</p>
              <p style={{ color: COLORS.SUBTEXT }}>+966 50 123 4567</p>
              <p style={{ color: COLORS.SUBTEXT }}>info@arm-group.com</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: COLORS.ACCENT }}>
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="transition hover:scale-110">
                    <Icon className="w-6 h-6" style={{ color: COLORS.ACCENT }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-sm pt-4" style={{ color: COLORS.SUBTEXT }}>
            © 2025 ARM Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </FadeInSection>
  );
};

//
const FloatingButtons = ({ COLORS }) => {
  const [visible, setVisible] = useState(true);

  // Hide buttons when idle or not scrolling
  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 4000); // hides after 4s idle
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <motion.div
      className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 sm:bottom-6 sm:right-6"
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/966500000000"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 sm:p-4 rounded-full backdrop-blur-md border transition-transform hover:scale-110 active:scale-95"
        style={{
          background: `${COLORS.ACCENT}20`,
          borderColor: `${COLORS.ACCENT}50`,
          boxShadow: `0 0 20px ${COLORS.ACCENT}70`,
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "#25D366" }} />
      </motion.a>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="p-3 sm:p-4 rounded-full backdrop-blur-md border transition-transform hover:scale-110 active:scale-95"
        style={{
          background: `${COLORS.ACCENT}20`,
          borderColor: `${COLORS.ACCENT}50`,
          boxShadow: `0 0 20px ${COLORS.ACCENT}70`,
          color: COLORS.TEXT,
        }}
        aria-label="Scroll to Top"
      >
        <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button>

      {/* Scroll to Bottom */}
      <motion.button
        onClick={scrollToBottom}
        className="p-3 sm:p-4 rounded-full backdrop-blur-md border transition-transform hover:scale-110 active:scale-95"
        style={{
          background: `${COLORS.ACCENT}20`,
          borderColor: `${COLORS.ACCENT}50`,
          boxShadow: `0 0 20px ${COLORS.ACCENT}70`,
          color: COLORS.TEXT,
        }}
        aria-label="Scroll to Bottom"
      >
        <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button>
    </motion.div>
  );
};

//
// ===================================
// Client Marquee
// ===================================


const clients = [
 { name: "NCC Group", logo: nccLogo },
    { name: "Client Partner 1", logo: clientImage1 },
    { name: "Client Partner 2", logo: clientImage2 },
    { name: "Client Partner 3", logo: clientImage3 },
    { name: "Client Partner 4", logo: clientImage4 },
    { name: "Client Partner 5", logo: clientImage5 },
    { name: "Client Partner 6", logo: clientImage6 },
    { name: "Client Partner 7", logo: clientImage7 },
    { name: "Client Partner 8", logo: clientImage8 },
    { name: "Client Partner 9", logo: clientImage9 },
    { name: "Client Partner 10", logo: clientImage10 },
    { name: "Client Partner 11", logo: clientImage11 },
    { name: "Client Partner 12", logo: clientImage12 },
    { name: "Client Partner 13", logo: clientImage13 },
    { name: "Client Partner 14", logo: clientImage14 },
    { name: "Client Partner 15", logo: clientImage15 },
    { name: "Client Partner 16", logo: clientImage16 },
    { name: "Client Partner 17", logo: clientImage17 },
    { name: "Client Partner 18", logo: clientImage18 },
    { name: "Client Partner 19", logo: clientImage19 },
    { name: "Client Partner 20", logo: clientImage20 },
    { name: "Client Partner 21", logo: clientImage21 },
    { name: "Client Partner 22", logo: clientImage22 },
    { name: "Client Partner 23", logo: clientImage23 },
    { name: "Client Partner 24", logo: clientImage24 },
    { name: "Client Partner 25", logo: clientImage25 },
];
const duplicatedClients = [...clients, ...clients];

const ClientLogo = ({ client }) => (
    <div className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8">
        <img
            src={client.logo}
            alt={client.name}
            className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-all duration-300 filter  hover:grayscale-0 opacity-70 hover:opacity-100"
            // Adding a placeholder fallback in case of loading error
            onError={(e) => { e.target.onerror = null; e.target.src = mockLogo(client.name); }}
        />
    </div>
);

const ClientMarquee = () => {
    return (
        <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden relative border-t border-b border-gray-200">
            {/* Custom style block for the CSS keyframes */}
    <style jsx="true">{`
  /* Defines the keyframes for the continuous scroll */
  @keyframes marquee {
    0% {
      transform: translateX(-50%); /* Start fully shifted left */
    }
    100% {
      transform: translateX(0%); /* End at original position */
    }
  }

  /* Apply the animation to the inner container */
  .marquee-inner {
    animation: marquee 50s linear infinite; /* Adjust speed as needed */
  }

  /* Fade effect on the edges */
  .marquee-container::before,
  .marquee-container::after {
    content: '';
    position: absolute;
    top: 0;
    width: 5rem;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }

  .marquee-container::before {
    left: 0;
    background: linear-gradient(to right, #f9fafb, rgba(249, 250, 251, 0));
  }

  .marquee-container::after {
    right: 0;
    background: linear-gradient(to left, #f9fafb, rgba(249, 250, 251, 0));
  }
`}</style>
            
            {/* Outer container to hide overflow and apply fade effects */}
            <div className="marquee-container relative w-full overflow-hidden">
                
                {/* Inner container that scrolls. Total width is 200% of the viewport width. */}
                <div className="marquee-inner flex w-[200%] items-center">
                    
                    {/* Map the duplicated list to create the seamless loop */}
                    {duplicatedClients.map((client, index) => (
                        <ClientLogo key={index} client={client} />
                    ))}
                </div>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-500 font-medium tracking-wider uppercase">
                    Trusted by leading industry leaders globally
                </p>
            </div>
        </section>
    );
};


//
// ===================================
// 8. NEW OurClients Component (Now Defined Here)
// ===================================

const OurClients = (COLORS) => {
  const [isPaused, setIsPaused] = useState(false);
  const [reverse, setReverse] = useState(false);

  const clients = [
    { name: "NCC Group", logo: nccLogo },
    { name: "Client Partner 1", logo: clientImage1 },
    { name: "Client Partner 2", logo: clientImage2 },
    { name: "Client Partner 3", logo: clientImage3 },
    { name: "Client Partner 4", logo: clientImage4 },
    { name: "Client Partner 5", logo: clientImage5 },
    { name: "Client Partner 6", logo: clientImage6 },
    { name: "Client Partner 7", logo: clientImage7 },
    { name: "Client Partner 8", logo: clientImage8 },
    { name: "Client Partner 9", logo: clientImage9 },
    { name: "Client Partner 10", logo: clientImage10 },
    { name: "Client Partner 11", logo: clientImage11 },
    { name: "Client Partner 12", logo: clientImage12 },
    { name: "Client Partner 13", logo: clientImage13 },
    { name: "Client Partner 14", logo: clientImage14 },
    { name: "Client Partner 15", logo: clientImage15 },
    { name: "Client Partner 16", logo: clientImage16 },
    { name: "Client Partner 17", logo: clientImage17 },
    { name: "Client Partner 18", logo: clientImage18 },
    { name: "Client Partner 19", logo: clientImage19 },
    { name: "Client Partner 20", logo: clientImage20 },
    { name: "Client Partner 21", logo: clientImage21 },
    { name: "Client Partner 22", logo: clientImage22 },
    { name: "Client Partner 23", logo: clientImage23 },
    { name: "Client Partner 24", logo: clientImage24 },
    { name: "Client Partner 25", logo: clientImage25 },
  ];

 const row1 = clients.slice(0, 9);
 
  const row2 = clients.slice(9, 17);
  const row3 = clients.slice(17, 25);

 return (
    <section
      id="clients"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#08101F" }}
    >
      {/* Subtle Glow Accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 25% 20%, #4B89F7 0%, transparent 70%)`,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">
           Our Valued Clients
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-md">
            We take pride in collaborating with industry leaders across sectors,
            offering skilled manpower and operational excellence that drive
            success.
          </p>

          {/* CONTROL BUTTONS */}
          <div className="flex space-x-4 pt-4">
            {/* Play / Pause */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 rounded-full backdrop-blur-md bg-white/5 border border-blue-500/30 hover:bg-blue-600/20 transition-all shadow-md"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-6 h-6 text-blue-400" />
              ) : (
                <Pause className="w-6 h-6 text-blue-400" />
              )}
            </button>

            {/* Reverse Direction */}
            <button
              onClick={() => setReverse(!reverse)}
              className="p-3 rounded-full backdrop-blur-md bg-white/5 border border-blue-500/30 hover:bg-blue-600/20 transition-all shadow-md"
              title="Reverse Direction"
            >
              <Repeat
                className={`w-6 h-6 text-blue-400 transition-transform ${
                  reverse ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <button 
                   
                        className="px-4 py-2 text-lg font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                   style={{
    background: COLORS.GLASS_BG,
    border: COLORS.GLASS_BORDER,
    boxShadow: COLORS.SHADOW,
  }}
                    >
                        Become our Client
                    </button>
        </div>

        {/* RIGHT: MULTI-LINE MARQUEE */}
     <div className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-blue-500/20 shadow-lg p-6 overflow-hidden">
  {[row1, row2, row3].map((row, i) => (
<div
  key={i}
  className={`flex gap-8 mb-6 ${
    reverse
      ? "animate-marquee-reverse"
      : i % 2 === 0
      ? "animate-marquee"
      : "animate-marquee-reverse"
  }`}
  style={{
    animationPlayState: isPaused ? "paused" : "running",
    animationDuration: `${18 + i * 4}s`, // ✅ refined smooth duration
  }}
>
      {/* Duplicate logos once for seamless looping */}
      {[...row, ...row].map((client, index) => (
        <div
          key={`${i}-${index}`}
          className="w-36 h-20 flex items-center justify-center rounded-lg bg-white/10 border border-blue-500/10 hover:bg-blue-600/10 transition transform hover:scale-105 shadow-md flex-shrink-0"
        >
          <img
            src={client.logo}
            alt={client.name}
            className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>
      ))}
    </div>
  ))}
</div>
      </div>
    </section>
  );
};
;


// ===================================
// 9. Admin Dashboard Component (STATIC)
// ===================================
// ===================================
//  Admin Dashboard (Theme-Aware)
// ===================================

const COLORS_PALETTE = ["#4B89F7", "#63B3ED", "#2B6CB0", "#9F7AEA"];

export const AdminDashboard = ({ toggleView, COLORS, theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG} 0%, ${COLORS.ACCENT}20 100%)`,
        color: COLORS.TEXT,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <header
        className="w-full flex justify-between items-center px-6 py-4 sticky top-0 z-50 backdrop-blur-lg border-b shadow-lg"
        style={{
          background: COLORS.GLASS_BG,
          borderColor: COLORS.GLASS_BORDER,
          boxShadow: COLORS.SHADOW,
        }}
      >
        <h1
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{ color: COLORS.ACCENT }}
        >
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border transition duration-300 hover:scale-110"
            style={{
              backgroundColor: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
              color: COLORS.ACCENT,
            }}
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              // 🌞 Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h1M3 12H2m16.95 4.95l.707.707M5.05 5.05l.707.707m12.728 12.728l.707.707M5.757 18.364l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                />
              </svg>
            ) : (
              // 🌙 Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            )}
          </button>

          {/* Back Button */}
          <button
            onClick={() => toggleView("public")}
            className="px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-transform hover:scale-105"
            style={{
              backgroundColor: COLORS.ACCENT,
              color: COLORS.BG,
              border: `2px solid ${COLORS.ACCENT}`,
            }}
          >
            ← Back to Site
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <aside
            className="rounded-xl p-4 md:col-span-1 border backdrop-blur-md"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <h3
              className="text-lg font-bold mb-4 border-b pb-2"
              style={{ borderColor: COLORS.ACCENT, color: COLORS.ACCENT }}
            >
              Navigation
            </h3>
            {["overview", "analytics", "users", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 mb-2 rounded-lg transition-all ${
                  activeTab === tab ? "font-bold scale-105" : ""
                }`}
                style={{
                  background:
                    activeTab === tab ? COLORS.ACCENT : COLORS.GLASS_BG,
                  color: activeTab === tab ? COLORS.BG : COLORS.SUBTEXT,
                  border: COLORS.GLASS_BORDER,
                  boxShadow: activeTab === tab ? COLORS.SHADOW : "none",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </aside>

          {/* MAIN PANEL */}
          <section
            className="md:col-span-3 rounded-xl border backdrop-blur-md p-6 transition-all"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
          >
            {activeTab === "overview" && <DashboardOverview COLORS={COLORS} />}
            {activeTab === "analytics" && <DashboardAnalytics COLORS={COLORS} />}
            {activeTab === "users" && <DashboardUsers COLORS={COLORS} />}
            {activeTab === "settings" && <DashboardSettings COLORS={COLORS} />}
          </section>
        </div>
      </main>
    </motion.div>
  );
};

/* =======================================================
   OVERVIEW TAB (Animated KPIs + Line Chart)
======================================================= */
const DashboardOverview = ({ COLORS }) => {
  const stats = [
    { title: "Active Users", value: 1248 },
    { title: "Projects Completed", value: 87 },
    { title: "Pending Requests", value: 23 },
    { title: "Revenue (SAR)", value: "1.2M" },
  ];

  const lineData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 600 },
    { month: "Mar", users: 800 },
    { month: "Apr", users: 700 },
    { month: "May", users: 1100 },
    { month: "Jun", users: 950 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.ACCENT }}>
        Overview
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl text-center shadow-md"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <p className="text-sm font-medium" style={{ color: COLORS.SUBTEXT }}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold mt-2" style={{ color: COLORS.ACCENT }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Line Chart */}
      <div
        className="w-full h-64 rounded-xl p-4"
        style={{
          background: COLORS.GLASS_BG,
          border: COLORS.GLASS_BORDER,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.SUBTEXT} />
            <XAxis dataKey="month" stroke={COLORS.SUBTEXT} />
            <YAxis stroke={COLORS.SUBTEXT} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                color: COLORS.TEXT,
              }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke={COLORS.ACCENT}
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* =======================================================
   ANALYTICS TAB (BAR + PIE CHART)
======================================================= */
const DashboardAnalytics = ({ COLORS }) => {
  const barData = [
    { name: "Construction", value: 240 },
    { name: "Maintenance", value: 160 },
    { name: "Technical", value: 320 },
    { name: "Hospitality", value: 210 },
    { name: "Oil & Gas", value: 180 },
  ];

  const pieData = [
    { name: "Saudi", value: 400 },
    { name: "India", value: 300 },
    { name: "Bangladesh", value: 300 },
    { name: "Nepal", value: 200 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.ACCENT }}>
        Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div
          className="p-4 rounded-xl"
          style={{
            background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
          }}
        >
          <h3 className="text-lg font-semibold mb-4">Active Projects by Sector</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke={COLORS.SUBTEXT} />
              <YAxis stroke={COLORS.SUBTEXT} />
              <Tooltip
                contentStyle={{
                  backgroundColor: COLORS.GLASS_BG,
                  border: COLORS.GLASS_BORDER,
                  color: COLORS.TEXT,
                }}
              />
              <Bar dataKey="value" fill={COLORS.ACCENT} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          className="p-4 rounded-xl"
          style={{
            background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
          }}
        >
          <h3 className="text-lg font-semibold mb-4">Manpower Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill={COLORS.ACCENT}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS_PALETTE[index % COLORS_PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: COLORS.GLASS_BG,
                  border: COLORS.GLASS_BORDER,
                  color: COLORS.TEXT,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

/* =======================================================
   USERS TAB
======================================================= */
const DashboardUsers = ({ COLORS }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.ACCENT }}>
      Users
    </h2>
    <p style={{ color: COLORS.SUBTEXT }}>
      Manage user accounts and access controls. (Coming soon)
    </p>
  </div>
);

/* =======================================================
   SETTINGS TAB
======================================================= */
const DashboardSettings = ({ COLORS }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.ACCENT }}>
      Settings
    </h2>
    <p style={{ color: COLORS.SUBTEXT }}>
      Adjust dashboard appearance, theme, and configurations.
    </p>
  </div>
);


// ===================================
// 10. CompanyProfile Page Component (Dark Glassmorphic Version)
// ===================================
const CompanyProfile = ({ toggleView, COLORS }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: COLORS.BG, color: COLORS.TEXT }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${COLORS.ACCENT}40, transparent 70%),
                       radial-gradient(circle at 80% 80%, ${COLORS.ACCENT}30, transparent 70%)`,
        }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="container mx-auto max-w-5xl pt-24 pb-12 flex-grow relative z-10">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
          style={{ color: COLORS.TEXT }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrambleText
            text="ARM SOLUTIONS — Company Profile"
            color={COLORS.ACCENT}
          />
        </motion.h1>

        {/* Top Grid (Image + Overview) */}
        <motion.div
          className="grid md:grid-cols-3 gap-10 mb-10"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Company Image */}
          <div
            className="md:col-span-1 p-3 rounded-2xl backdrop-blur-md border flex flex-col items-center justify-center"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <img
              src={arm2GroupPhoto}
              alt="ARM Logo"
              loading="lazy"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>

          {/* Overview */}
          <div
            className="md:col-span-2 p-8 rounded-2xl backdrop-blur-md border shadow-xl"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.ACCENT }}
            >
              Overview
            </h2>
            <p style={{ color: COLORS.SUBTEXT, lineHeight: "1.7" }}>
              ARM Solutions specializes in providing{" "}
              <span
                className="font-semibold"
                style={{ color: COLORS.TEXT }}
              >
                skilled manpower
              </span>{" "}
              on a rental and local transfer basis, as well as recruiting from
              overseas to meet diverse client requirements across multiple
              industries. Our services ensure that clients have access to
              qualified professionals whenever needed — helping them maintain
              efficiency, reduce operational costs, and achieve long-term
              success.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="p-8 rounded-2xl backdrop-blur-md border-t-4"
            style={{
              background: COLORS.GLASS_BG,
              borderColor: COLORS.ACCENT,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: COLORS.ACCENT }}
            >
              Vision & Mission
            </h2>
            <ul style={{ color: COLORS.SUBTEXT }} className="space-y-4">
              <li>
                <span
                  className="font-bold"
                  style={{ color: COLORS.TEXT }}
                >
                  Vision:
                </span>{" "}
                To be the leading manpower solutions provider recognized for{" "}
                <span style={{ color: COLORS.ACCENT }}>
                  excellence, reliability, and innovation
                </span>{" "}
                in workforce management.
              </li>
              <li>
                <span
                  className="font-bold"
                  style={{ color: COLORS.TEXT }}
                >
                  Mission:
                </span>{" "}
                To deliver qualified, trained, and motivated manpower that drives
                our clients' success while fostering growth, safety, and
                satisfaction among our workforce.
              </li>
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl backdrop-blur-md border-b-4 flex flex-col items-center justify-center"
            style={{
              background: COLORS.GLASS_BG,
              borderColor: COLORS.ACCENT,
              boxShadow: COLORS.SHADOW,
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: COLORS.TEXT }}
            >
              Group Photo
            </h3>
            <img
              src={armGroupPhoto}
              alt="ARM Group"
              loading="lazy"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mt-12 p-8 rounded-2xl backdrop-blur-md border shadow-2xl"
          style={{
            background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: COLORS.ACCENT }}
          >
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              [
                "Integrity",
                "We operate with transparency and honesty in all business dealings.",
              ],
              [
                "Excellence",
                "We strive to deliver top-quality services that exceed expectations.",
              ],
              [
                "Commitment",
                "We are dedicated to client satisfaction and continuous improvement.",
              ],
              ["Teamwork", "Collaboration is key to achieving collective goals."],
              [
                "Innovation",
                "We continuously improve processes and training for better service delivery.",
              ],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className="font-bold mb-2"
                  style={{ color: COLORS.TEXT }}
                >
                  {title}
                </p>
                <p style={{ color: COLORS.SUBTEXT }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients + Directors */}
        <FadeInSection>
          <div className="mt-12">
            <OurClients COLORS={COLORS} />
          </div>
        </FadeInSection>

        <Directors COLORS={COLORS} />

        {/* Back Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={() => {
              toggleView("public");
              window.location.hash = "";
            }}
            className="px-6 py-3 text-base font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
            style={{
              backgroundColor: COLORS.ACCENT,
              color: COLORS.BG,
              border: `2px solid ${COLORS.ACCENT}`,
            }}
          >
            &larr; Back to Main Site
          </button>
        </motion.div>
      </div>

      <Footer COLORS={COLORS} />
      <FloatingButtons COLORS={COLORS} />
    </motion.div>
  );
};

// ===================================
// 11. Public View Wrapper
// ===================================
const PublicView = ({ toggleView, COLORS }) => (
  <>
    <main className="flex-grow">
      <Hero COLORS={COLORS} />
      <About COLORS={COLORS} />
      <Services COLORS={COLORS} />
      <ClientMarquee COLORS={COLORS} />
      <Directors COLORS={COLORS}/>
      <Contact COLORS={COLORS} />
    </main>
    <Footer COLORS={COLORS} />
    <FloatingButtons COLORS={COLORS} />
  </>
);


// ===================================
// 12. Main App Component & Routing
// ===================================

const ADMIN_HASH = '#admin-key-123';
const COMPANY_PROFILE_HASH = '#company-profile';

const getInitialView = () => {
    if (window.location.hash.includes(ADMIN_HASH)) return 'admin';
    if (window.location.hash.includes(COMPANY_PROFILE_HASH)) return 'company-profile';
    return 'public';
};

export default function App() {
    // The view state can be 'public', 'admin', 'company-profile', or 'fading-out'
    const [view, setView] = useState(getInitialView());
      const [theme, setTheme] = useState('dark');
      const COLORS = THEMES[theme];
const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };
    // Toggle view function: used by Navbar and AdminDashboard buttons
  const toggleView = (targetView) => {
  // ✅ Validate the target view
  if (
    targetView !== "public" &&
    targetView !== "admin" &&
    targetView !== "company-profile"
  ) {
    return;
  }

  // ✅ Determine hash
  let targetHash = "";
  if (targetView === "admin") targetHash = ADMIN_HASH;
  if (targetView === "company-profile") targetHash = COMPANY_PROFILE_HASH;

  // ✅ Handle fade-out when leaving public view
  if (view === "public" && (targetView === "admin" || targetView === "company-profile")) {
    setView("fading-out");

    setTimeout(() => {
      window.location.hash = targetHash;
      setView(targetView);

      // ✅ Scroll to top once new view is mounted
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }, 500); // Wait for fade-out to complete
  } else {
    // ✅ Instant switch for other transitions
    window.location.hash = targetHash;
    setView(targetView);

    // ✅ Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

    // Listen for browser back/forward buttons or manual URL hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const newView = getInitialView();
            // Ignore hash changes triggered by internal smooth-scrolling NavLinks
            // Only update view if the main route has changed.
            if (newView !== 'public' && view !== newView && view !== 'fading-out') {
                setView(newView);
            } else if (newView === 'public' && view !== 'public' && view !== 'fading-out') {
                 // Check if we are returning from a special route
                 setView(newView);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [view]);

    // Determine the component to render
    const currentView = view === 'fading-out' ? 'public' : view;

    return (
  <div
    className="font-sans min-h-screen flex flex-col"
    style={{ backgroundColor: COLORS.BG, color: COLORS.TEXT }}
  >
    {/* Navbar only once — visible on public & company profile views */}
    {currentView !== 'admin' && (
      <Navbar
        toggleView={toggleView}
        currentView={currentView}
        theme={theme}
        toggleTheme={toggleTheme}
        COLORS={COLORS}
      />
    )}

    {/* Main dynamic content */}
    <div className="flex-grow">
      {currentView === 'admin' && (
         <AdminDashboard
    toggleView={toggleView}
    COLORS={COLORS}
    theme={theme}
    toggleTheme={toggleTheme}
  />
        
      )}

      {currentView === 'company-profile' && (
        <CompanyProfile toggleView={toggleView} COLORS={COLORS} />
      )}

      {(currentView === 'public' || view === 'fading-out') && (
        <PageTransitionWrapper isPublic={view === 'public'}>
          <PublicView toggleView={toggleView} COLORS={COLORS} />
        </PageTransitionWrapper>
      )}
    </div>
  </div>
);
}