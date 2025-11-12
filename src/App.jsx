import React, { useState, useEffect, useCallback, useRef,useMemo  } from 'react';
import kafdBg from './assets/clientimages/KAFFD_Hero1.webp'; // King Abdullah Financial District image
import kafd2Bg from './assets/clientimages/kafd2Bg.jpg'; // Hero section2 image
import aboutIcon from "./assets/clientimages/aboutIcon.jpg"; //
import { ArrowLeft, ArrowRight,Wrench ,Zap ,Factory,Hotel ,Building , HeartPulse, Stethoscope, Activity, Users, Shield, Hospital, HardHat,Sparkles,Pause, Play, Repeat,ArrowUp, ArrowDown   } from "lucide-react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { motion, useScroll, useTransform,useSpring,AnimatePresence,useInView    } from 'framer-motion'; 
import { Menu, X, Linkedin, MapPin, Mail, Phone, Facebook, Twitter,MessageCircle  } from 'lucide-react';


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
light: {
  BG: "#f9fafc", // soft off-white
  TEXT: "#1a2233", // deep navy-gray
  SUBTEXT: "#6b7b8c", // subtle gray-blue
  ACCENT: "#2db5c9", // Musanadah aqua-teal
  ACCENT_ALT: "#6dd3e8", // brighter cyan glow
  GLASS_BG: "rgba(255,255,255,0.6)",
  GLASS_BORDER: "1px solid rgba(45,181,201,0.25)",
  SHADOW: "0 8px 32px rgba(45,181,201,0.1)",
  GRADIENT: "linear-gradient(180deg, #ffffff 0%, #eaf5f7 100%)",
},

  dark: {
    BG: "#070a14", // very dark navy
  TEXT: "#e6f9ff", // soft aqua white
  SUBTEXT: "#a0b9cc", // subtle light steel blue
  ACCENT: "#4cf3ff", // neon aqua highlight
  ACCENT_ALT: "#9a6cff", // violet glow secondary
  GLASS_BG: "rgba(76,243,255,0.08)",
  GLASS_BORDER: "1px solid rgba(76,243,255,0.25)",
  SHADOW: "0 8px 32px rgba(154,108,255,0.25)",
  GRADIENT: "linear-gradient(180deg, #0a0f22 0%, #121e33 100%)",
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

//RANSITION THEME Component

//Transition theme Component
//Navbar Component
const NavLink = ({ to, children, setIsOpen }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(to);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className="relative group font-semibold tracking-wide transition-all duration-300 hover:text-blue-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

const Navbar = ({ toggleView, currentView, theme, toggleTheme, COLORS }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPublicView = currentView === "public";

  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.08 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleCompanyProfileClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    toggleView("company-profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 w-full z-50 backdrop-blur-lg transition-all duration-500"
      style={{
        background: COLORS.GRADIENT,
        boxShadow: COLORS.SHADOW,
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="cursor-pointer text-2xl font-extrabold tracking-wide"
          style={{ color: COLORS.TEXT }}
        >
          ARM Solutions
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-10 font-medium">
          {isPublicView && (
            <>
              <NavLink to="hero">Home</NavLink>
              <NavLink to="about">About</NavLink>
              <NavLink to="services">Expertise</NavLink>
              <NavLink to="directors">Leadership</NavLink>
              <NavLink to="contact">Contact</NavLink>
              <a
                href="#company-profile"
                onClick={handleCompanyProfileClick}
                className="hover:text-blue-300 transition duration-300"
              >
                Company Profile
              </a>
            </>
          )}

          {/* Right Section: Theme Toggle + Admin Profile + Contact */}
          <div className="flex items-center space-x-5 ml-6">

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full border backdrop-blur-md shadow-md transition"
              style={{
                background: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                boxShadow: COLORS.SHADOW,
              }}
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#462d86]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.485-8.485h-1m-14.97 0H3m15.364 6.364l-.707-.707m-10.607 0l-.707.707m12.02-12.02l-.707.707m-10.607 0l-.707-.707" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#60ddff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 0112.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
                </svg>
              )}
            </motion.button>

            {/* Admin Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-md border cursor-pointer"
              style={{
                background: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                boxShadow: COLORS.SHADOW,
              }}
              onClick={() => toggleView("admin")}
            >
              <img
                src="https://placehold.co/40x40?text=A"
                alt="Admin"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-sm font-medium" style={{ color: COLORS.TEXT }}>
                Admin
              </span>
            </motion.div>

            {/* Contact Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 font-semibold rounded-full shadow-md transition-all"
              style={{
                backgroundColor: COLORS.ACCENT,
                color: COLORS.BG,
                boxShadow: COLORS.SHADOW,
              }}
            >
              Contact
            </motion.a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md border text-white hover:bg-white/10"
          style={{
            borderColor: COLORS.GLASS_BORDER,
            color: COLORS.TEXT,
          }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden origin-top px-8 py-5 space-y-4"
            style={{
              background: COLORS.GRADIENT,
              color: COLORS.TEXT,
              borderTop: COLORS.GLASS_BORDER,
              boxShadow: COLORS.SHADOW,
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {isPublicView && (
              <>
                {["hero", "about", "services", "directors", "contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium hover:text-blue-400 transition"
                      variants={itemVariants}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  )
                )}
                <motion.a
                  href="#company-profile"
                  onClick={handleCompanyProfileClick}
                  className="block text-lg font-semibold text-blue-400"
                  variants={itemVariants}
                >
                  Company Profile
                </motion.a>
              </>
            )}

            {/* Contact Button */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all"
              style={{
                backgroundColor: COLORS.ACCENT,
              }}
              variants={itemVariants}
            >
              Contact <ArrowRight className="w-4 h-4" />
            </motion.a>

            {/* Theme & Admin below */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full border"
                style={{
                  color: COLORS.TEXT,
                  border: COLORS.GLASS_BORDER,
                }}
              >
                {theme === "light" ? "☀️" : "🌙"}
              </motion.button>

              <motion.div
                onClick={() => {
                  toggleView("admin");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src="https://placehold.co/32x32?text=A"
                  alt="Admin"
                  className="w-8 h-8 rounded-full border border-gray-400"
                />
                <span className="text-sm font-medium">Admin</span>
              </motion.div>
            </div>
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
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  const slides = [
    {
      id: 1,
      image: kafdBg,
      subtitle: "FOR A VIBRANT SOCIETY",
      title: "Award-Winning Facility Management Services",
      button: "Explore Solutions",
    },
    {
      id: 2,
      image: kafd2Bg,
      subtitle: "EXCELLENCE IN EVERY DETAIL",
      title: "Delivering Quality Across All Sectors",
      button: "Discover Expertise",
      
    },
  ];

  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* --- Background Carousel --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[active].id}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${slides[active].image})`,
            y,
            scale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* --- Purple Shade Overlay --- */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.8 }}
        animate={{
          background:
            "linear-gradient(180deg, rgba(99,51,109,0.85) 0%, rgba(10,10,25,0.9) 100%)",
        }}
      />

      {/* --- Text Layer --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[active].title}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <motion.p
            className="text-blue-300 font-semibold tracking-widest mb-3 text-sm md:text-base uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {slides[active].subtitle}
          </motion.p>

          <motion.h1
            className="text-white text-4xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {slides[active].title}
          </motion.h1>

          <motion.a
            href="#services"
            className="inline-flex items-center gap-2 mt-10 bg-gradient-to-r from-purple-500 to-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {slides[active].button}
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
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        </motion.div>
      </AnimatePresence>

      {/* --- Scroll Indicator (mouse shape) --- */}
      <motion.div
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
        onClick={handleScrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center relative overflow-hidden">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-1"
            animate={{ y: [0, 16, 0], opacity: [1, 0.6, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
      </motion.div>

      {/* --- Indicators --- */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-4 h-2 rounded-full transition-all duration-300 ${
              i === active ? "bg-blue-400 w-8" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

//About component

const About = ({ COLORS, theme }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Custom spring transition for smooth movement
    const springTransition = {
        type: "spring",
        damping: 18, // Adjusted damping for a good "settle" effect
        stiffness: 120, // Adjusted stiffness for speed
        restDelta: 0.001,
    };

    // Animation Variants with improved smoothness
    const fadeLeft = {
        hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: springTransition },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: springTransition },
    };

    const fadeUp = (delay = 0) => ({
        hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                delay,
                duration: 1.0, // Increased duration
                ease: [0.22, 1, 0.36, 1] // Smoother custom ease
            }
        },
    });

    const isLight = theme === "light";
    const sectionTextColor = isLight ? COLORS.TEXT : "#fff";
    const sectionSubText = isLight ? COLORS.SUBTEXT : "rgba(255,255,255,0.85)";
    // Kept user's hardcoded dark mode background color
    const sectionBg = isLight ? COLORS.GRADIENT : "#3e1971";

    // Replaced aboutIcon with Zap icon for the theme of vibrancy/energy
    const IconComponent = Zap;

    return (
        <section id="about" ref={ref} className="relative overflow-hidden">
            {/* ---------- Top Section ---------- */}
            <motion.div
                className="relative py-20 md:py-24 px-6 lg:px-16"
                style={{ background: sectionBg, color: sectionTextColor, willChange: "transform, opacity" }}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                {/* Animated Background Glow */}
                <motion.div
                    className="absolute inset-0 opacity-15 z-0"
                    animate={{
                        background: [
                            `radial-gradient(circle at 25% 30%, ${COLORS.ACCENT}25, transparent 70%)`,
                            `radial-gradient(circle at 70% 60%, ${COLORS.ACCENT}25, transparent 70%)`,
                        ],
                    }}
                    transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                />

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
                    {/* Left Side */}
                    <motion.div variants={fadeLeft}>
                        <div className="flex items-start space-x-4">
                            {/* Icon replacement */}
                            <IconComponent className="w-12 h-12" style={{ color: isLight ? COLORS.ACCENT : COLORS.ACCENT_LIGHT }} />
                            <h2
                                className="text-2xl md:text-3xl font-semibold leading-snug max-w-sm"
                                style={{ color: sectionTextColor }}
                            >
                                Integrated facility management services to transform facilities and workspaces into healthy,
                                vibrant living.
                            </h2>
                        </div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div variants={fadeRight}>
                        <p className="leading-relaxed text-base md:text-lg" style={{ color: sectionSubText }}>
                            Founded in 2010, ARM Solutions is a leading manpower and facilities management company in Saudi Arabia.
                            We deliver tailored workforce and maintenance solutions across industrial, residential, and commercial
                            sectors with an unwavering focus on safety, performance, and efficiency.
                        </p>

                        <motion.a
                            href="#services"
                            className="inline-flex items-center font-semibold mt-6 group"
                            style={{ color: isLight ? COLORS.ACCENT : COLORS.ACCENT_LIGHT }}
                            whileHover={{ x: 6 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        >
                            Read more
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>

            {/* ---------- Bottom Section ---------- */}
            <motion.div
                className="py-16 md:py-24 px-6 lg:px-16"
                style={{ background: COLORS.BG, willChange: "transform, opacity" }}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Bottom Left */}
                        <motion.div variants={fadeUp(0.2)}>
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: COLORS.TEXT }}>
                                Serving diverse industries and sectors
                            </h3>
                            <div className="grid grid-cols-2 gap-2 font-medium text-lg" style={{ color: COLORS.ACCENT }}>
                                <span>Retail</span>
                                <span>Commercial Sector & Facilities</span>
                                <span>Industrial & Oilfield</span>
                                <span>Telecom</span>
                            </div>

                            <motion.a
                                href="#services"
                                className="inline-flex items-center font-semibold mt-5 group"
                                style={{ color: COLORS.ACCENT }}
                                whileHover={{ x: 6 }}
                                transition={{ type: "spring", stiffness: 150 }}
                            >
                                Read more
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </motion.div>

                        {/* Bottom Right */}
                        <motion.div className="grid grid-cols-3 gap-4 text-center md:text-left">
                            {[
                                { label: "Specialized Service Lines", value: "50+" },
                                { label: "Qualified Workforce", value: "1400+" },
                                { label: "Client Retention Rate", value: "98%" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp(0.4 + i * 0.2)}
                                >
                                    <p className="text-sm uppercase tracking-wide" style={{ color: COLORS.SUBTEXT }}>
                                        {stat.label}
                                    </p>
                                    <h4 className="text-4xl font-bold" style={{ color: COLORS.ACCENT }}>
                                        {stat.value}
                                    </h4>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

// ===================================
// 4. Services Component
const servicesList = [
  { icon: HardHat, title: "Construction", description: "Engineers, foremen, welders, and general labor for large-scale projects." },
  { icon: Wrench, title: "Maintenance & Shutdown", description: "Skilled technicians for industrial plant maintenance and critical shutdown operations." },
  { icon: Zap, title: "Technical & HVAC", description: "Experts in electrical systems, instrumentation, and HVAC services." },
  { icon: Shield, title: "Support Staff", description: "Trained security personnel, drivers, and administrative support roles." },
  { icon: Factory, title: "Oil & Gas", description: "Specialized manpower for oil rigs, refineries, and petrochemical plants." },
  { icon: Hotel, title: "Hospitality", description: "Soft services personnel, housekeeping, and facility management experts." },
  { icon: Building, title: "Manufacturing", description: "Assembly line workers, quality control inspectors, and logistics support." },
  {
    icon: Users,
    title: "Nursing Services",
    description:
      "We offer nurses like OT Nurse, Home Care Nurse, Technician Nurse, ICU Nurse, ER Nurse, Dental Technician Nurse, Sterilization Nurse, and Derma Nurse — ensuring comprehensive medical care across diverse disciplines and environments.",
  },
];

const Card = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -6 }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer h-full"
    style={{
      background: "rgba(75,0,130,0.12)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      flex: "1 0 calc(33.333% - 16px)",
      minWidth: "300px",
      boxSizing: "border-box",
    }}
  >
    <motion.div
      className="absolute inset-0 rounded-2xl"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(0,163,224,0.25), rgba(94,75,255,0.2))",
        boxShadow: "0 0 25px rgba(0,163,224,0.25)",
        pointerEvents: "none",
      }}
    />
    <div className="relative z-10">
      <div
        className="flex items-center justify-center w-14 h-14 rounded-lg mb-5 transition-transform duration-300"
        style={{ background: "rgba(0,163,224,0.2)" }}
      >
        <Icon className="w-7 h-7 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-200 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Services = () => {
  const cardsPerPage = 3;
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < servicesList.length; i += cardsPerPage) {
      result.push(servicesList.slice(i, i + cardsPerPage));
    }
    return result;
  }, []);

  const totalPages = pages.length;
  const next = () => setPage((p) => (p + 1) % totalPages);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(40,0,70,0.6), rgba(20,0,40,0.8)), url(${kafdBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl"
        >
          <h2 className="text-white text-4xl font-extrabold mb-4">Solutions</h2>
          <p className="text-gray-300 text-lg">
            A wide range of specialized and integrated FM services customized to
            meet all your facility management needs to maintain a healthy and
            productive environment.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* left arrow */}
          <button
            onClick={prev}
            className="absolute -left-10 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* visible area */}
          <div className="overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                className="flex gap-6 justify-center"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {pages[page].map((service, i) => (
                  <Card key={i} {...service} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* right arrow */}
          <button
            onClick={next}
            className="absolute -right-10 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === page ? "bg-blue-400 w-6" : "bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};


// ===================================
// 5. Directors Component
// ===================================
// ===================================
// Directors Section (Theme Adaptive)
// ===================================
const DirectorCard = ({ name, title, bio, intro, imageUrl, index, COLORS }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <motion.div
      className="relative w-full h-[430px] cursor-pointer perspective"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Inner 3D rotation wrapper */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.1, 0.2, 1] }}
        className="relative w-full h-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ---------- FRONT ---------- */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-between text-center backdrop-blur-md"
          style={{
            background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col items-center justify-center pt-6">
            <motion.img
              src={imageUrl}
              alt={name}
              className="h-[180px] w-[180px] object-cover rounded-lg shadow-lg border border-white/40"
              whileHover={{ scale: 1.05 }}
              onError={(e) => {
                e.target.src = "https://placehold.co/200x200/cccccc/333?text=No+Image";
              }}
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT }}>
              {name}
            </h3>
            <p
              className="text-sm font-semibold uppercase mt-1 tracking-wide"
              style={{ color: COLORS.ACCENT }}
            >
              {title}
            </p>
            <p
              className="text-xs italic mt-2 leading-snug"
              style={{ color: COLORS.SUBTEXT }}
            >
              {bio}
            </p>
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="mb-4"
          >
            <Linkedin className="w-5 h-5" style={{ color: COLORS.ACCENT }} />
          </motion.a>
        </div>

        {/* ---------- BACK ---------- */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-center items-center px-6 py-5 text-center backdrop-blur-md"
          style={{
            background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.ACCENT }}>
            {name}
          </h3>
          <p className="text-sm leading-relaxed opacity-90" style={{ color: COLORS.TEXT }}>
            {intro}
          </p>
        </div>
      </motion.div>

      {/* Hover glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-[-1]"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: `0 0 40px 10px ${COLORS.ACCENT}25`,
          filter: "blur(10px)",
        }}
      ></motion.div>
    </motion.div>
  );
};

const Directors = ({ COLORS }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);

  const directors = [
    { name: "Mr. Mohammed Rizwan Ahmed", title: "Managing Director", bio: "14+ years of leadership experience in manpower operations and strategic management.", intro: "Mr. Mohammed Rizwan Ahmed serves as the Head of Operations Manager at Lucid Investment Company...", imageUrl: MrRizwan },
    { name: "Mr. Mujeeb Ullah", title: "CEO", bio: "A decade of experience in sales and workforce client relations.", intro: "Mr. Mujeeb Ullah currently works as the Sales Manager at Lucid Investment Company...", imageUrl: MrMujeeb },
    { name: "Mr. Mohammad Hamid Ansari", title: "Founder & Business Development", bio: "Expert recruiter skilled in strategic hiring and workforce planning.", intro: "Mr. Mohammad Hamid Ansari serves as the Recruitment Manager at Lucid Investment Company...", imageUrl: MohammedHamid },
    { name: "Mr. Mohammed Tajammul Ahmed", title: "Administrator", bio: "Expert in soft services training and staff development.", intro: "Mr. Mohammed Tajammul Ahmed specializes in the training and development of soft services personnel...", imageUrl: MrTajammul },
    { name: "Mr Abdullah", title: "Deputy CEO", bio: "Expert in soft services training and staff development.", intro: "Mr. Abdullah specializes in the training and development of soft services personnel...", imageUrl: MrAbdullah },
    { name: "Mr. Palesh Rana", title: "Senior Recruiter - Overseas & Local (Bangladesh)", bio: "Expert in soft services training and staff development.", intro: "Mr. Palesh Rana specializes in the training and development of soft services personnel...", imageUrl: MrPaleshRana },
  ];

  return (
    <section
      id="directors"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: COLORS.GRADIENT }}
    >
      {/* Abstract floating glow */}
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 10%, ${COLORS.ACCENT}30, transparent 70%)`,
          y,
        }}
      ></motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: COLORS.ACCENT }}>
            Our Leadership
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: COLORS.SUBTEXT }}>
            Our leadership team combines experience, integrity, and innovation to shape Lucid’s success in manpower excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {directors.map((director, index) => (
            <DirectorCard key={index} {...director} index={index} COLORS={COLORS} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================================
// Contact Form (Theme Adaptive)
// ===================================

const CustomStyles = (COLORS) => (
    <style jsx="true">
        {`
        @keyframes blob-move-one {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 40px) scale(0.9); }
        }

        @keyframes blob-move-two {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40% { transform: translate(-40px, 60px) scale(0.95); }
            80% { transform: translate(50px, -30px) scale(1.05); }
        }

        .animate-blob-slow {
            animation: blob-move-one 20s infinite ease-in-out alternate;
        }

        .animate-blob-slower {
            animation: blob-move-two 25s infinite ease-in-out alternate;
        }
        
        /* Ensure inputs and textareas look good on dark/glass background */
        input::placeholder, textarea::placeholder {
            color: ${COLORS.SUBTEXT}80;
        }
        `}
    </style>
);

const Contact = ({ COLORS }) => {
    const [status, setStatus] = useState(null);

    // Simple submission handler for UI feedback
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("success");
        // Clear status after 4 seconds
        setTimeout(() => setStatus(null), 4000); 
        e.target.reset(); // Reset form fields
    };

    return (
        <>
            <CustomStyles /> {/* Inject custom CSS for blob animation */}
            <FadeInSection>
                <section
                    id="contact"
                    className="relative py-20 md:py-28 overflow-hidden min-h-screen flex items-center w-full"
                    style={{ background: COLORS.GRADIENT }}
                >
                    {/* Abstract Background Elements (Blobs) for Enhanced Design */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        {/* Blob 1: Top Left - Blue Accent */}
                        <div 
                            className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob-slow" 
                            style={{ background: COLORS.ACCENT }}
                        ></div>
                        {/* Blob 2: Bottom Right - Alt Accent (Red) */}
                        <div 
                            className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full mix-blend-screen filter blur-[150px] opacity-35 animate-blob-slower" 
                            style={{ background: COLORS.ACCENT_ALT }}
                        ></div>
                        {/* Blob 3: Center - More Subtle Blue */}
                        <div 
                            className="absolute top-1/4 right-[20%] w-64 h-64 rounded-full mix-blend-screen filter blur-[100px] opacity-30" 
                            style={{ background: COLORS.ACCENT }}
                        ></div>
                    </div>


                    {/* Existing Animated Radial Gradient (kept for motion flair) */}
                    <motion.div
                        className="absolute inset-0 z-0 overflow-hidden"
                        animate={{
                            background: [
                                `radial-gradient(circle at 20% 30%, ${COLORS.ACCENT}10, transparent 70%), radial-gradient(circle at 80% 70%, ${COLORS.ACCENT_ALT}15, transparent 70%)`,
                                `radial-gradient(circle at 25% 25%, ${COLORS.ACCENT}15, transparent 70%), radial-gradient(circle at 85% 75%, ${COLORS.ACCENT_ALT}20, transparent 70%)`,
                            ],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    ></motion.div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <div className="text-center mb-16">
                            <p className="font-semibold uppercase mb-2 tracking-widest" style={{ color: COLORS.ACCENT }}>
                                Connect With Us
                            </p>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: COLORS.TEXT }}>
                                Ready to Build Your Team?
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg" style={{ color: COLORS.SUBTEXT }}>
                                Reach out today and let’s create workforce solutions that move your projects forward.
                            </p>
                        </div>

                        {/* Contact Layout */}
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                            
                            {/* Contact Info Card (Glassmorphism) */}
                            <motion.div
                                className="p-8 lg:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all duration-500 hover:shadow-3xl"
                                style={{
                                    background: COLORS.GLASS_BG,
                                    border: COLORS.GLASS_BORDER,
                                    boxShadow: COLORS.SHADOW,
                                    // Added an explicit backdrop filter for cross-browser consistency
                                    backdropFilter: 'blur(20px)', 
                                }}
                                initial={{ opacity: 0, x: -60, rotateY: 10 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                transition={{ duration: 1.0, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold mb-6 border-b pb-3" style={{ color: COLORS.TEXT, borderColor: COLORS.ACCENT + '40' }}>
                                    Our Details
                                </h3>

                                <div className="space-y-8 text-left">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                                        <div>
                                            <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>
                                                Headquarters
                                            </p>
                                            <p className="text-base" style={{ color: COLORS.SUBTEXT }}>Dammam, Kingdom of Saudi Arabia</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Mail className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                                        <div>
                                            <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>Email Us</p>
                                            <a href="mailto:info@armsolutions.sa" className="text-base hover:text-white transition-colors" style={{ color: COLORS.SUBTEXT }}>
                                                info@armsolutions.sa
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Phone className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                                        <div>
                                            <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>Call Us</p>
                                            <a href="tel:+966500000000" className="text-base hover:text-white transition-colors" style={{ color: COLORS.SUBTEXT }}>
                                                +966 50 000 0000
                                            </a>
                                        </div>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="pt-6 flex space-x-4">
                                        {[Facebook, Linkedin, Twitter, MessageCircle].map((Icon, i) => (
                                            <motion.a
                                                key={i}
                                                href="#"
                                                className="p-3 rounded-full border transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                                whileHover={{ scale: 1.2, rotate: 10, backgroundColor: COLORS.ACCENT + '30' }}
                                                style={{
                                                    color: COLORS.ACCENT,
                                                    border: COLORS.GLASS_BORDER,
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                }}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form (Glassmorphism) */}
                            <motion.div
                                className="p-8 lg:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl"
                                style={{
                                    background: COLORS.GLASS_BG,
                                    border: COLORS.GLASS_BORDER,
                                    boxShadow: COLORS.SHADOW,
                                    backdropFilter: 'blur(20px)',
                                }}
                                initial={{ opacity: 0, x: 60, rotateY: -10 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                transition={{ duration: 1.0, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.TEXT }}>
                                    Send Us a Message
                                </h3>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    {["Name", "Email", "Phone", "Company"].map((placeholder, i) => (
                                        <input
                                            key={i}
                                            type={placeholder === "Email" ? "email" : "text"}
                                            placeholder={`Your ${placeholder}`}
                                            className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                                            style={{
                                                borderColor: COLORS.ACCENT + '80', // Slightly transparent border when unfocused
                                                color: COLORS.TEXT,
                                                background: 'rgba(255, 255, 255, 0.02)', // Very subtle internal background for contrast
                                                '--tw-ring-color': COLORS.ACCENT + '80',
                                            }}
                                            required
                                        />
                                    ))}
                                    <textarea
                                        placeholder="How can we help you?"
                                        rows="4"
                                        className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                                        style={{
                                            borderColor: COLORS.ACCENT + '80',
                                            color: COLORS.TEXT,
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            '--tw-ring-color': COLORS.ACCENT + '80',
                                        }}
                                        required
                                    ></textarea>

                                    <motion.button
                                        type="submit"
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow: `0 0 20px ${COLORS.ACCENT}`,
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full py-4 text-lg font-bold rounded-xl transition-all border-2"
                                        style={{
                                            backgroundColor: COLORS.ACCENT,
                                            color: COLORS.BG,
                                            borderColor: COLORS.ACCENT,
                                        }}
                                    >
                                        Submit Inquiry
                                    </motion.button>
                                </form>

                                {status === "success" && (
                                    <motion.p 
                                        className="mt-6 text-center text-lg font-medium p-3 rounded-xl" 
                                        style={{ color: COLORS.TEXT, background: COLORS.ACCENT + '20' }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Zap className="inline h-5 w-5 mr-2" style={{ color: COLORS.ACCENT }} />
                                        Your message has been sent successfully! We'll be in touch.
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </FadeInSection>
        </>
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
const ClientMarquee = ({ COLORS, theme }) => {
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
  ];

  const duplicatedClients = [...clients, ...clients];
  const isLight = theme === "light";

  const bgColor = isLight
    ? "linear-gradient(90deg, #100025 0%, #b793d2 100%)"
    : "linear-gradient(90deg, #100025 0%, #1a0038 100%)";

  const fadeLeft = isLight
    ? "linear-gradient(to right, rgba(242,231,245,0.9), rgba(242,231,245,0))"
    : "linear-gradient(to right, rgba(16,0,37,0.9), rgba(16,0,37,0))";
  const fadeRight = isLight
    ? "linear-gradient(to left, rgba(242,231,245,0.9), rgba(242,231,245,0))"
    : "linear-gradient(to left, rgba(16,0,37,0.9), rgba(16,0,37,0))";

  return (
    <section
      className="py-12 md:py-16 overflow-hidden relative border-t border-b"
      style={{
        background: bgColor,
        borderColor: isLight ? "#e5e0ec" : "rgba(255,255,255,0.08)",
      }}
    >
      <style jsx="true">{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marqueeScroll 25s linear infinite; /* ⏩ Increased speed */
          will-change: transform;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-container::before,
        .marquee-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 4rem;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }

        .marquee-container::before {
          left: 0;
          background: ${fadeLeft};
        }

        .marquee-container::after {
          right: 0;
          background: ${fadeRight};
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* -------- Left Section -------- */}
        <motion.div
          className="w-full md:w-1/3 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{
              color: isLight ? COLORS.BG : "#ffffff",
            }}
          >
            Our Clients
          </h2>
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{
              color: isLight ? COLORS.SUBTEXT : "rgba(255,255,255,0.7)",
            }}
          >
            Trusted by industry leaders globally
          </p>
        </motion.div>

        {/* -------- Right Marquee Section -------- */}
        <div className="w-full md:w-2/3 relative overflow-hidden">
          <div className="marquee-container relative w-full overflow-hidden">
            <div className="marquee-track flex w-[200%] items-center">
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 mx-6 md:mx-8 lg:mx-10 relative"
                  whileHover={{ scale: 1.08 }}
                >
                  <motion.img
                    src={client.logo}
                    alt={client.name}
                    className="h-10 md:h-12 lg:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-500"
                    style={{
                      filter: isLight
                        ? "none"
                        : `drop-shadow(0 0 6px ${COLORS.ACCENT}80)`,
                    }}
                    animate={
                      !isLight
                        ? {
                            opacity: [0.85, 1, 0.85],
                            scale: [1, 1.03, 1],
                            filter: [
                              `drop-shadow(0 0 4px ${COLORS.ACCENT}50)`,
                              `drop-shadow(0 0 8px ${COLORS.ACCENT}90)`,
                              `drop-shadow(0 0 4px ${COLORS.ACCENT}50)`,
                            ],
                          }
                        : {}
                    }
                    transition={
                      !isLight
                        ? {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/120x40/cccccc/333333?text=Logo";
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
const PublicView = ({ toggleView, COLORS, theme }) => (
  <>
    <main className="flex-grow">
      <Hero COLORS={COLORS} />
      <About COLORS={COLORS} />
      <Services COLORS={COLORS} />
      <ClientMarquee COLORS={COLORS} theme={theme} />
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
   const [theme, setTheme] = useState("light");
      const COLORS = THEMES[theme];
const toggleTheme = () => {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
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
  <PublicView toggleView={toggleView} COLORS={COLORS} theme={theme} />
</PageTransitionWrapper>
      )}
    </div>
  </div>
);
}