import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import kafdBg from './assets/clientimages/KAFFD_Hero1.webp'; // King Abdullah Financial District image
import kafd2Bg from './assets/clientimages/kafd2Bg.jpg'; // Hero section2 image
import HalftoneBG from './assets/halftone-purple.svg'; // Director section image
import AnimatedWave from "./assets/animated-wave.svg";
import {
  Menu, X, Globe, Users, TrendingUp, Shield, Linkedin, MapPin, Mail, Phone,
  Facebook, Twitter, MessageCircle, Factory, Hotel, Truck, Building, HeartPulse,
  ShoppingCart, Mic, ArrowLeft, ArrowRight, Wrench, Zap, Stethoscope, Activity,
  Hospital, HardHat, Sparkles, Pause, Play, Repeat, ArrowUp, ArrowDown, Check, Search, Inbox, Trash2, ListFilter, ChevronLeft,
  ChevronRight, UseMail, PhonBuilding, ArrowDownUp, User
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import OilandGas from './assets/clientimages/oilandgas-services.jpg'; // Services Image
import Hospitality from './assets/clientimages/Hospitality.jpg'; // Services Image
import Construction from './assets/clientimages/construction-service.jpg'; // Services Image
import Facility from './assets/clientimages/Facility.jpg'; // Services Image
import Nurses from './assets/clientimages/Nurses.png'; // Services Image
import Retail from './assets/clientimages/retail-service.webp'; // Services Image
import Events from './assets/clientimages/events-service.png'; // Services Image
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';


// ===================================
// IMAGE IMPORTS (UPDATED PATHS and all client images)
// ===================================
import nccLogo from './assets/clientimages/NCC.jpeg';
import ArmGroup from './assets/clientimages/ARM-Group-screenshot.jpeg';
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
// import clientImage11 from './assets/clientimages/ARM-Group-screenshot.jpg';
// import clientImage12 from './assets/clientimages/gulfaar.jpeg';
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
import clientImage26 from './assets/clientimages/nahdi.jpg';
import clientImage27 from './assets/clientimages/ram-marquee.jpg';
import clientImage28 from './assets/clientimages/halfmillion.jpg';
import armGroupPhoto from './assets/clientimages/ARM-group-photo.jpeg';
import arm2GroupPhoto from './assets/clientimages/ARM-2Group.jpeg';
import MrMujeeb from './assets/clientimages/mujeebullah.jpg';
import MrRizwan from './assets/clientimages/mohammedrizwanahmed.jpg';
import MohammedHamid from './assets/clientimages/mohammedhamidansari.jpg';
import MrTajammul from './assets/clientimages/Tajammul.jpeg';
import MrAbdullah from './assets/clientimages/Abdullah.jpg';
import MrPaleshRana from './assets/clientimages/Palash.jpg';
// import MrPaleshRana from './assets/clientimages/dummyProfile.png';
import MrMannan from './assets/clientimages/Mannan.jpeg';
import MrFarooq from './assets/clientimages/farooqi.jpeg';
import MrImtiyaz from './assets/clientimages/imtiyaz.jpeg';
import MrZafar from './assets/clientimages/zafarimam.jpg';
import dummyServiceBg from './assets/clientimages/womenwashingdish.jpeg';
import ConstructionBg from './assets/clientimages/Construction.jpg';
import HvacBg from './assets/clientimages/HVAC.jpg';
import SupportstaffBg from './assets/clientimages/Support-staff.jpg';
import Maintenance from './assets/clientimages/Maintenance.jpg';
import OilGasBg from './assets/clientimages/OilandGas.jpg';
import HospitalityBg from './assets/clientimages/Hospitality.jpg';
import Logistics from './assets/clientimages/Logistics.jpg';
import FacilityBg from './assets/clientimages/Facility.jpg';
import HealthcareBg from './assets/clientimages/Healthcare.jpg';
import RetailBg from './assets/clientimages/Retail.jpg';
import EventsBg from './assets/clientimages/Events.jpg';

//Firebase Imports
import { db } from '../src/firebaseconfig';
import { collection, onSnapshot, deleteDoc, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebaseconfig";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';




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
    BG: "#0a0714",              // deep dark purple / black
    TEXT: "#f2eaff",           // soft lavender white
    SUBTEXT: "#b8a6d9",        // muted lilac / dusty purple
    ACCENT: "#bb86ff",         // bright lavender highlight (buttons, icons)
    PRIMARY: "#a56bff",        // main purple brand color
    ACCENT_ALT: "#6b4cff",     // deep violet accent
    GLASS_BG: "rgba(155, 108, 255, 0.12)",   // subtle purple-glass background
    GLASS_BORDER: "1px solid rgba(155, 108, 255, 0.28)",
    SHADOW: "0 8px 32px rgba(94, 44, 255, 0.35)",           // violet glow shadow
    GRADIENT: "linear-gradient(180deg, #120b2c 0%, #1a1038 100%)",
  },
};
const MockUsers = Users;
const MockArrowLeft = ArrowLeft;
const MockArrowRight = ArrowRight;
const MockFactory = Factory;
const MockHotel = Hotel;
const MockTruck = Truck;
const MockBuilding = Building;
const MockHeartPulse = HeartPulse;
const MockWrench = Wrench;
const MockZap = Zap;
const MockStethoscope = Stethoscope;

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

  const handleServicesPageClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    toggleView("services");
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

  {/* Logo + Text Wrapper */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => {
      toggleView("public");
      window.location.hash = "";
      window.scrollTo(0, 0);
    }}
  >

    {/* Logo + Text */}
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Logo */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center">
        <img
          src={ArmGroup}
          alt="ARM group logo"
          className="nav-logo w-12 h-12 md:w-[50px] md:h-[60px] object-contain mix-blend-lighten"
        />
      </div>

      {/* Brand Text */}
      <span
        className="
        text-white font-extrabold tracking-wide
        text-xl md:text-2xl
        drop-shadow-[0_0_6px_rgba(150,120,255,0.4)]
      "
      >
        ARM Solutions
      </span>

    </motion.div>
  </motion.div>




        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-10 font-medium">
          <button
            onClick={() => {
              toggleView("public");
              window.location.hash = "";
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-blue-300 transition duration-300 font-semibold"
          >
            Home
          </button>
          {isPublicView ? (
            <>
              {/* Home Page Scroll Sections */}
              {/* <NavLink to="hero">Home</NavLink> */}
              {/* <NavLink to="about">About</NavLink> */}
              <NavLink to="services">Expertise</NavLink>
              {/* <NavLink to="directors">Leadership</NavLink> */}

              {/* ⭐ NEW — Services Full Page */}
              <a
                href="#services-page"
                onClick={handleServicesPageClick}
                className="hover:text-blue-300 transition duration-300"
              >
                Services
              </a>
              <NavLink to="contact">Contact</NavLink>

              {/* Company Profile */}
              <a
                href="#company-profile"
                onClick={handleCompanyProfileClick}
                className="hover:text-blue-300 transition duration-300"
              >
                About Us
              </a>
            </>
          ) : (
            <>
              {/* When NOT on public page, show Services Page directly */}
              <a
                href="#services-page"
                onClick={handleServicesPageClick}
                className="hover:text-blue-300 transition duration-300"
              >
                Services
              </a>

              <a
                href="#company-profile"
                onClick={handleCompanyProfileClick}
                className="hover:text-blue-300 transition duration-300"
              >
                Company Profile
              </a>
            </>
          )}

          {/* Right Section: Theme Toggle + Admin button + Contact */}
          {/* <div className="flex items-center space-x-5 ml-6">
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
            >
              {theme === "light" ? "☀️" : "🌙"}
            </motion.button>

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

       
          </div> */}
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
            {/* HOME */}
            <motion.a
              onClick={(e) => {
                e.preventDefault();
                toggleView("public");
                setIsOpen(false);

                window.location.hash = "";
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="block text-lg font-semibold hover:text-blue-400 transition"
              variants={itemVariants}
            >
              Home
            </motion.a>

            {/* PUBLIC VIEW NAVIGATION */}
            {isPublicView ? (
              <>
                {/* Expertise */}
                <motion.a
                  href="#services"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  Expertise
                </motion.a>

                {/* FULL SERVICES PAGE */}
                <motion.a
                  href="#services-page"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicesPageClick(e);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  Services
                </motion.a>

                {/* Contact */}
                <motion.a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  Contact
                </motion.a>

                {/* About Us */}
                <motion.a
                  href="#company-profile"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCompanyProfileClick(e);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  About Us
                </motion.a>
              </>
            ) : (
              <>
                {/* NOT-PUBLIC VIEW — Services */}
                <motion.a
                  href="#services-page"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicesPageClick(e);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  Services
                </motion.a>

                {/* Company Profile */}
                <motion.a
                  href="#company-profile"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCompanyProfileClick(e);
                    setIsOpen(false);
                  }}
                  className="block text-lg font-medium hover:text-blue-400 transition"
                  variants={itemVariants}
                >
                  Company Profile
                </motion.a>
              </>
            )}

            {/* Contact Button */}
            {/* <motion.a
        href="#contact"
        onClick={() => setIsOpen(false)}
        className="inline-flex items-center gap-2 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all"
        style={{ backgroundColor: COLORS.ACCENT }}
        variants={itemVariants}
      >
        Contact <ArrowRight className="w-4 h-4" />
      </motion.a> */}

            {/* THEME + ADMIN Button*/}
            {/* <div className="flex items-center justify-between pt-4 border-t border-white/10">
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
      </div> */}
          </motion.div>
        )}
      </AnimatePresence>


    </header>
  );
};

// ===================================
// Hero section
// ===================================

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  const slides = [
    {
      id: 1,
      image: kafdBg,
      subtitle: "CREATING SMARTER SPACES",
      title: "Redefining the Future of Facility Management",
      button: "Explore Solutions",
    },
    {
      id: 2,
      image: kafd2Bg,
      subtitle: "WHERE QUALITY MEETS CARE",
      title: "Building the Future of Facility Services",
      button: "Discover Expertise",

    },
  ];

  const [active, setActive] = React.useState(0);

  // Auto-scroll effect
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

          {/* === MODIFICATION: Replaced motion.h1 content with ScrambleText === */}
          <motion.h1
            // Keeping Framer Motion animation for the whole H1 element to slide up
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white text-4xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight"
          >
            <ScrambleText
              text={slides[active].title}
              className="inline-block"
              color="white" // Ensure text is visible on the dark overlay
              delay={0.9} // Start the scramble slightly after the h1 slides in
            />
          </motion.h1>

          <motion.a
            href="#services"
            className="inline-flex items-center gap-2 mt-10 bg-gradient-to-r from-indigo-500 to-fuchsia-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {slides[active].button}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </AnimatePresence>

      {/* --- Scroll Indicator (Big Down Arrow) --- */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={handleScrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >

        <motion.div
          animate={{ y: [0, 16, 0], opacity: [1, 0.7, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >
          {/* BIG Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"   // <<< Increased from w-10 h-10
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={0.5}       // <<< Slightly thicker stroke
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 13l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>

      </motion.div>

      {/* --- Indicators --- */}
      <div className="absolute bottom-10 left-10 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-4 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-blue-400 w-8" : "bg-white/50"
              }`}
          ></button>
        ))}
      </div>
    </section>
  );
};


//About component
const About = ({ COLORS, theme }) => {
  const springTransition = {
    type: "spring",
    damping: 18,
    stiffness: 120,
    restDelta: 0.001,
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { ...springTransition, delay: 0.1 }
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { ...springTransition, delay: 0.2 }
    },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  });

  const isLight = theme === "light";
  const textColor = isLight ? COLORS.TEXT : "#fff";
  const subText = isLight ? COLORS.SUBTEXT : "#e6e6e6";

  return (
    // Main wrapper with dark background
    <section
      id="about"
      className="relative overflow-hidden min-h-[60vh] md:min-h-[75vh] font-inter"
      style={{ backgroundColor: COLORS.BG, color: COLORS.TEXT }}
    >

      {/* ---------------------------------------------------------------- */}
      {/* ⭐ 1. TOP SECTION (INDUSTRIES & STATS) 	 	 	 	 	 */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        className="relative py-20 md:py-28 px-6 lg:px-20 overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Abstract Background Element 1: Faded Neon Blob */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-screen opacity-30 blur-3xl z-0"
          style={{ background: `radial-gradient(circle, ${COLORS.ACCENT} 0%, transparent 70%)` }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* GRID WRAPPER */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >

            {/* ========================================================
                            LEFT — INDUSTRIES LIST (TAG STYLE)
                        ======================================================== */}
            <motion.div variants={fadeUp(0)}>
              <h3
                className="text-3xl md:text-4xl font-extrabold mb-6"
                style={{ color: COLORS.TEXT }}
              >
                Industries We Serve
              </h3>

              {/* TAGS — WRAP AND GLOW */}
              <div
                className="flex flex-wrap gap-3 pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {[
                  "Healthcare",
                  "Retail",
                  "Construction",
                  "Industrial & Oilfield",
                  "Skilled Worker",
                  "Logistics",
                  "Management",
                  "Events",
                ].map((item, i) => (
                  <motion.span
                    key={i}
                    className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)', // Subtle dark glass effect
                      color: COLORS.NEON_CYAN,
                      borderColor: COLORS.NEON_CYAN + '33',
                      textShadow: `0 0 4px ${COLORS.NEON_CYAN}55`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              {/* CTA with Neon Underline Effect */}
              <motion.a
                href="#services"
                className="inline-flex items-center font-bold text-lg mt-8 group relative"
                style={{ color: COLORS.ACCENT }}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                Read more about our solutions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {/* Neon underline */}
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: COLORS.ACCENT, boxShadow: `0 0 5px ${COLORS.ACCENT}` }}
                />
              </motion.a>
            </motion.div>


            {/* ========================================================
                            RIGHT — CORPORATE PARAGRAPH + STATS
                        ======================================================== */}
            <motion.div
              variants={fadeUp(0.2)}
              className="space-y-10"
            >
              {/* Corporate Paragraph */}
              <motion.div
                className="text-base md:text-lg leading-relaxed tracking-wide"
                style={{ color: COLORS.SUBTEXT }}
                variants={fadeUp(0.3)}
              >
                Our agency provides strategic manpower and workforce solutions across
                key industry sectors, delivering professionals who uphold the highest
                standards of performance, compliance, and reliability. We support
                healthcare organizations with qualified medical support teams, empower
                the retail sector with trained service personnel, and strengthen
                construction and infrastructure projects with site workers. We also
                serve industrial and oilfield operations with safety-driven technical
                specialists, supply certified skilled workers across multiple trades,
                and enhance supply chain efficiency through logistics manpower.
                Additionally, we offer management-level professionals and dedicated
                event manpower to meet diverse operational demands.
              </motion.div>

              {/* Stats Grid with Neon Text */}
              <motion.div
                className="grid grid-cols-3 gap-6 md:gap-12 text-center md:text-left p-6 rounded-xl shadow-inner"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)', // Subtle dark card background
                  border: `1px solid ${COLORS.ACCENT}22`,
                }}
                variants={{
                  show: {
                    transition: { staggerChildren: 0.2 },
                  },
                }}
              >
                {[
                  { icon: Users, label: "Workforce", value: "600+" },
                  { icon: Factory, label: "Service Lines", value: "50+" },
                  { icon: TrendingUp, label: "Retention", value: "98%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <stat.icon className="w-6 h-6 mb-2 mx-auto md:mx-0" style={{ color: COLORS.NEON_CYAN }} />
                    <h4
                      className="text-3xl md:text-4xl font-extrabold"
                      style={{ color: COLORS.ACCENT, textShadow: `0 0 8px ${COLORS.ACCENT}88` }} // Neon glow
                    >
                      {stat.value}
                    </h4>
                    <p
                      className="text-xs uppercase tracking-widest mt-1"
                      style={{ color: COLORS.SUBTEXT }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </motion.div> {/* end grid */}

        </div>
      </motion.div>

      {/* Divider Transition - More pronounced neon effect */}
      <div
        className="h-10 w-full"
        style={{
          background: `linear-gradient(to bottom, ${COLORS.BG} 0%, ${COLORS.ACCENT}11 50%, ${COLORS.ACCENT}00 100%)`,
          boxShadow: `0 0 10px ${COLORS.ACCENT}33`,
        }}
      />


      {/* ---------------------------------------------------------------- */}
      {/* ⭐ 2. BOTTOM SECTION (COMPANY FOCUS) 	 	 	 	 	 */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        className="relative py-20 md:py-28 px-6 lg:px-20 overflow-hidden"
        style={{ background: "#210d3f", color: "#fff" }} // Slightly different dark purple for contrast
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Abstract Background Element 2: Animated Line Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20 z-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundImage: [
              `repeating-linear-gradient(45deg, ${COLORS.ACCENT}22 0, ${COLORS.ACCENT}22 1px, transparent 1px, transparent 20px)`,
              `repeating-linear-gradient(135deg, ${COLORS.ACCENT}22 0, ${COLORS.ACCENT}22 1px, transparent 1px, transparent 20px)`,
            ],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 max-w-7xl mx-auto relative z-10 items-center">

          {/* Left content: Title and CTA */}
          <motion.div variants={fadeLeft}>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Transforming Workspaces
              <span style={{ color: COLORS.NEON_CYAN }} className="block"> with Reliability & Expertise</span>
            </h2>

            <p className="text-lg mt-4 leading-relaxed" style={{ color: COLORS.TEXT }}>
              We create environments where businesses thrive—delivering manpower and integrated facility
              services that elevate comfort, safety, and operational excellence across all sectors.
            </p>

            <motion.a
              href="#company-profile"
              className="inline-flex items-center font-bold text-lg mt-8 group relative"
              style={{ color: COLORS.NEON_CYAN }}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              Explore Our Company Profile
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Neon underline */}
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: COLORS.NEON_CYAN, boxShadow: `0 0 5px ${COLORS.NEON_CYAN}` }}
              />
            </motion.a>
          </motion.div>

          {/* Right content: Glass Card */}
          <motion.div
            variants={fadeRight}
            className="p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${COLORS.ACCENT}`, // Stronger neon border
              backdropFilter: "blur(15px)",
              boxShadow: `0 0 20px ${COLORS.ACCENT}44, inset 0 0 8px ${COLORS.ACCENT}33`, // Inner and outer glow
              minWidth: "260px",
            }}
          >
            <p className="leading-relaxed text-gray-100 font-bold md:text-lg">
              Founded in 2015, ARM Solutions has grown into a trusted partner <span className="text-cyan-400" style={{ textShadow: `0 0 5px ${COLORS.NEON_CYAN}99` }}> delivering skilled manpower,
                FM solutions, and operational support across Saudi Arabia.</span> Our mission is built around quality,
              consistency, and strong customer relationships.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};


// =======================================================
// 🔹 SERVICES MODULE (All 3: Home Carousel + Full Page + Details)
// =======================================================

// ---------------------------
// ICON-BASED HOMEPAGE LIST
// ---------------------------
// const servicesList = [
//   { icon: HardHat, title: "Construction", description: "Engineers, foremen, welders, and labor for large-scale projects." },
//   { icon: Wrench, title: "Maintenance & Shutdown", description: "Technicians for plant maintenance and shutdown operations." },
//   { icon: Zap, title: "Technical & HVAC", description: "Experts in electrical, instrumentation, and HVAC services." },
//   { icon: Shield, title: "Support Staff", description: "Security personnel, drivers, helpers, and admin staff." },
//   { icon: Factory, title: "Oil & Gas", description: "Manpower for oil rigs, refineries, and petrochemical sites." },
//   { icon: Hotel, title: "Hospitality", description: "Housekeeping, soft services, and facility attendants." },
//   { icon: Building, title: "Manufacturing", description: "Quality controllers, assembly labor, and machine operators." },
//   {
//     icon: Users,
//     title: "Nursing Services",
//     description:
//       "OT, ICU, ER, Homecare nurses, technicians, sterilization & dental support.",
//   },
// ];

// =======================================================
// PART 1 — HOMEPAGE SERVICES CAROUSEL
// =======================================================
const servicesList = [
  { icon: MockFactory, title: "Industrial & Manufacturing", description: "Providing skilled labor for assembly lines, quality control, and machinery operation." },
  { icon: MockWrench, title: "Oil & Gas Operations", description: "Specialized engineers, technicians, and field workers compliant with international safety standards." },
  { icon: MockBuilding, title: "Construction & Infrastructure", description: "Supplying certified tradesmen, project managers, and site supervisors." },
  { icon: MockHotel, title: "Hospitality & Tourism", description: "Manpower for hotel management, food & beverage services, and guest relations." },
  { icon: MockTruck, title: "Logistics & Supply Chain", description: "Drivers, warehouse staff, and supply chain managers for efficient operations." },
  { icon: MockHeartPulse, title: "Healthcare Support", description: "Trained medical assistants, administrative staff, and facility support personnel." },
  { icon: MockStethoscope, title: "IT & Technology", description: "Tech talent for software development, network administration, and data analysis." },
];

/**
 * Card Component (Styled for Dark/Vibrant Theme)
 */
const Card = ({ icon: Icon, title, description, onExplore }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -6 }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="group relative p-6 rounded-2xl overflow-hidden flex flex-col justify-between w-full h-full"
    style={{
      background: "rgba(75,0,130,0.12)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
    }}
  >
    {/* Icon */}
    <div
      className="flex items-center justify-center w-14 h-14 rounded-xl mb-4"
      style={{ background: "rgba(0,163,224,0.20)" }}
    >
      {/* Using MockUsers as default fallback */}
      {Icon ? <Icon className="w-7 h-7 text-blue-400" /> : <MockUsers className="w-7 h-7 text-blue-400" />}
    </div>

    {/* Title & text */}
    <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>

    {/* Button (Commented out as in original) */}
    {/* <button
            onClick={onExplore}
            className="mt-6 w-full text-sm font-semibold py-2 rounded-lg text-white"
            style={{ backgroundColor: "rgba(0,163,224,0.6)", border: "1px solid rgba(0,163,224,0.85)" }}
        >
            Explore Services <MockArrowRight className="w-4 h-4 inline ml-1" />
        </button> */}
  </motion.div>
);

/**
 * Main Services Component (Responsive Carousel Logic)
 */
const Services = ({ goToServiceDetails, COLORS }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(0);

  // 1. Dynamic cardsPerPage based on screen size
  const getCardsPerPage = useCallback((width) => {
    if (width < 640) return 1;    // Mobile
    if (width < 1024) return 2;   // Tablet
    return 3;                     // Desktop
  }, []);

  const cardsPerPage = getCardsPerPage(windowWidth);

  // 2. Recalculate pages whenever windowWidth (and thus cardsPerPage) changes
  const pages = useMemo(() => {
    const out = [];
    // Reset page to 0 if the total number of pages changes drastically
    // This prevents the carousel from landing on a page that no longer exists
    if (page >= Math.ceil(servicesList.length / cardsPerPage) && cardsPerPage > 0) {
      setPage(0);
    }
    for (let i = 0; i < servicesList.length; i += cardsPerPage) {
      out.push(servicesList.slice(i, i + cardsPerPage));
    }
    return out;
  }, [cardsPerPage, page]); // Dependency on 'page' is necessary for the reset logic

  // 3. Handle window resize event
  useEffect(() => {
    const handleResize = () => {
      // Only update if the breakpoint actually changes
      if (getCardsPerPage(window.innerWidth) !== getCardsPerPage(windowWidth)) {
        setWindowWidth(window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, getCardsPerPage]);


  const next = () => setPage((p) => (p + 1) % pages.length);
  const prev = () => setPage((p) => (p - 1 + pages.length) % pages.length);

  if (pages.length === 0) return null; // Handle empty list

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-10xl"
        >
          {/* Heading */}
          <h2 className="text-white text-4xl font-bold mb-4">
            <a href="#services-page">Our Service Sectors</a>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We provide highly skilled and certified professionals across a wide range of
            industries. From technical operations to corporate support departments, our manpower
            solutions empower businesses to scale efficiently and operate with confidence.
          </p>

          {/* Additional Highlights */}
          <ul className="text-gray-300 text-base space-y-2 mb-6">
            <li>• Trained and verified workforce for all sectors</li>
            <li>• Flexible staffing models tailored to your business</li>
            <li>• Nationwide availability with fast deployment</li>
            <li>• Quality-driven teams with strong work ethics</li>
          </ul>

          {/* CTA Button */}
          <a
            href="#services-page"
            className="inline-block px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Explore Services
          </a>
        </motion.div>


        {/* Carousel - Responsive Structure */}
        <div className="relative mt-10">
          <div className="overflow-hidden w-full px-12 sm:px-16 md:px-20 lg:px-0"> {/* Add padding for arrow space on smaller screens */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                // Card layout adapts using gap and flex
                className="flex gap-6 items-stretch"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
              >
                {pages[page].map((service, i) => (
                  <div key={i} className="w-full">
                    <Card {...service} onExplore={() => goToServiceDetails && goToServiceDetails(service)} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Positioning is now relative to the carousel area */}
          {pages.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-0 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all duration-300 hidden sm:block" // Hide on xs screens, show on small screens and up
              >
                <MockArrowLeft className="w-5 h-5" />
              </button>
              {/* Next Button */}
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-0 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all duration-300 hidden sm:block" // Hide on xs screens, show on small screens and up
              >
                <MockArrowRight className="w-5 h-5" />
              </button>

              {/* Mobile arrows (smaller and positioned below the cards) */}
              <div className="flex justify-center space-x-4 mt-8 sm:hidden">
                <button
                  onClick={prev}
                  className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition"
                >
                  <MockArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition"
                >
                  <MockArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>


      </div>
    </section>
  );
};

// =======================================================
// PART 2 — FULL SERVICES PAGE (Parallax + Stagger Animations)
// =======================================================
const ServicesPage = ({ goToServiceDetails, COLORS }) => {
  const servicesSections = [
    {
      key: "oilgas",
      title: "Oil & Gas",
      subtitle: "Engineers • Technicians • Field Workforce",
      text: `We supply experienced engineers, technicians, and field workers for oil rigs, refineries, 
and petrochemical plants. Our workforce is trained in international safety standards 
and committed to operational excellence.`,
      image: OilandGas,
    },
    {
      key: "hospitality",
      title: "Hospitality",
      subtitle: "Reception • Housekeeping • Kitchen Crew",
      text: `We provide professional hospitality staff including receptionists, housekeeping teams, 
kitchen assistants, waiters, and service crews — ensuring excellent guest satisfaction.`,
      image: Hospitality,
    },
    {
      key: "construction",
      title: "Construction & Skilled Workers",
      subtitle: "Skilled & Unskilled Manpower",
      text: `We deploy masons, carpenters, electricians, plumbers, welders, fabricators, HVAC technicians, 
general helpers, and many more specialized field workers.`,
      image: Construction,
    },
    {
      key: "logistics",
      title: "Logistics & Warehousing",
      subtitle: "Pickers • Packers • Forklift Operators",
      text: `We provide manpower for forklift operations, loaders, pickers, packers, and inventory staff 
ensuring smooth supply chain operations.`,
      image: Logistics,
    },
    {
      key: "facility",
      title: "Facility Management",
      subtitle: "Cleaning • Maintenance • Landscaping",
      text: `We provide trained building cleaners, landscaping crews, and maintenance technicians to keep 
facilities safe, clean, and operational at all times.`,
      image: Facility,
    },
    {
      key: "healthcare",
      title: "Healthcare",
      subtitle: "Nurses • Patient Care • Medical Support",
      text: `We provide nursing assistants, patient care teams, and medical administrative staff to support hospitals, clinics, and home-care environments, including specialized roles such as OT nurse, Home care nurse, Technician nurse, ICU nurse, ER nurse, Dental technician nurse, Sterilization nurse, and Derma nurse.`,
      image: Nurses,
    },
    {
      key: "retail",
      title: "Retail & Customer Service",
      subtitle: "Cashiers • Sales Associates • Store Helpers",
      text: `We support retail chains with sales teams, merchandisers, cashiers, storekeepers, helpers, 
and customer service agents.`,
      image: Retail,
    },
    {
      key: "events",
      title: "Events & Entertainment",
      subtitle: "Ushers • Stage Crew • Catering",
      text: `We supply temporary and long-term manpower such as ushers, event helpers, catering teams, 
stage assistants, and security staff for events and exhibitions.`,
      image: Events,
    },
  ];

  return (
    <>
      <style jsx="true">{`
      @keyframes float-blob {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(25px, -25px) scale(1.05); }
        100% { transform: translate(0, 0) scale(1); }
      }
      @keyframes float-blob-2 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-25px, 25px) scale(0.97); }
        100% { transform: translate(0, 0) scale(1); }
      }
    `}</style>

      <section
        className="relative overflow-hidden min-h-screen pt-28"
        style={{
          background: `
          linear-gradient(
            140deg,
            ${COLORS.BG} 0%,
            rgba(20, 25, 40, 0.92) 40%,
            rgba(10, 12, 25, 0.92) 100%
          )
        `,
          color: COLORS.TEXT,
        }}
      >
        {/* SUBTLE WHITE GLOWING BLOBS */}
        <div className="absolute inset-0 -z-10 pointer-events-none">

          {/* lightly visible top-left white glow */}
          <div
            className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full blur-[110px] opacity-[0.55]"
            style={{
              top: "-90px",
              left: "-70px",
              background: "rgba(255, 255, 255, 0.55)",
              animation: "float-blob 25s ease-in-out infinite",
            }}
          ></div>

          {/* bottom-right soft glow */}
          <div
            className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full blur-[120px] opacity-[0.45]"
            style={{
              bottom: "-100px",
              right: "-90px",
              background: "rgba(255,255,255,0.35)",
              animation: "float-blob-2 28s ease-in-out infinite",
            }}
          ></div>

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff0f 1px, transparent 1px), linear-gradient(90deg, #ffffff0f 1px, transparent 1px)",
              backgroundSize: "120px 120px",
            }}
          ></div>
        </div>

        {/* PAGE CONTAINER */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* PAGE HEADER */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: COLORS.SUBTEXT }}
            >
              SERVICE PORTFOLIO
            </p>

            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: COLORS.ACCENT }}
            >
              Our Service Sectors
            </h1>

            <p
              className="text-base md:text-lg max-w-3xl mx-auto"
              style={{ color: COLORS.SUBTEXT }}
            >
              Skilled, reliable manpower delivered across key industries – with consistency, compliance, and professionalism.
            </p>
          </motion.div>

          {/* SERVICES LIST */}
          <div className="space-y-16 md:space-y-24">
            {servicesSections.map((s, index) => {
              const reverse = index % 2 !== 0;

              return (
                <motion.article
                  key={s.key}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}
                  >

                    {/* IMAGE SIDE */}
                    <div
                      className={`relative rounded-3xl overflow-hidden shadow-xl lg:col-span-4 ${reverse ? "lg:order-2" : "lg:order-1"
                        }`}
                      style={{ minHeight: "320px" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${s.image})`,
                          filter: "brightness(0.92) saturate(1.08)",
                        }}
                        whileHover={{
                          scale: 1.03,
                          filter: "brightness(1.02) saturate(1.15)",
                        }}
                        transition={{ duration: 0.45 }}
                      />

                      {/* Dark top/bottom fade */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15), transparent)",
                        }}
                      />

                      {/* Subtitle Glass Label */}
                      <div
                        className="absolute left-4 bottom-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                        style={{
                          background: "rgba(0,0,0,0.55)",
                          color: "#E9F8FF",
                          border: "1px solid rgba(255,255,255,0.25)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {s.subtitle}
                      </div>
                    </div>

                    {/* TEXT CARD */}
                    <motion.div
                      className={`lg:col-span-8 ${reverse ? "lg:order-1" : "lg:order-2"}`}
                      initial={{ opacity: 0, x: reverse ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55 }}
                    >
                      <div
                        className="p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
                        onClick={() =>
                          goToServiceDetails({
                            title: s.title,
                            description: s.text,
                            imageUrl: s.image,
                            icon: s.icon || null,
                          })
                        }
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <h2
                          className="text-2xl md:text-3xl font-bold mb-3"
                          style={{ color: COLORS.PRIMARY || COLORS.ACCENT }}
                        >
                          {s.title}
                        </h2>

                        <p className="text-sm md:text-base font-medium mb-4" style={{ color: COLORS.ACCENT }}>
                          {s.subtitle}
                        </p>

                        <div
                          className="text-sm md:text-lg leading-relaxed space-y-4"
                          style={{ color: COLORS.SUBTEXT }}
                        >
                          {s.text.split("\n").map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                          <div
                            className="h-[3px] w-20 rounded-full"
                            style={{ background: COLORS.ACCENT }}
                          />
                          {/* <span className="text-xs md:text-sm uppercase tracking-wide" style={{ color: COLORS.SUBTEXT }}>
                          View sector details
                        </span> */}
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* FOOTER + FLOATING */}
        <div className="mt-20">
          <Footer COLORS={COLORS} />
        </div>

        <FloatingButtons COLORS={COLORS} />
      </section>
    </>
  );


};
// =======================================================
//New Service Inquiry
const InquirePage = ({ service, toggleView, COLORS }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: service ? `Inquiry about: ${service.title}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      message: service
        ? `Inquiry about: ${service.title}\n\n[Your detailed message here]`
        : '[Your detailed message here]',
    }));
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  // --------------------------------------
  // 🔥 Updated handleSubmit with Firebase
  // --------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Retry logic (unchanged)
    const maxRetries = 3;
    let success = false;

    for (let i = 0; i < maxRetries; i++) {
      await new Promise(res => setTimeout(res, 500 * (i + 1)));

      if (Math.random() > 0.1) {
        success = true;
        break;
      }
    }

    if (!success) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Submit to Firebase
    try {
      const enquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "N/A",
        company: formData.company || "N/A",
        message: formData.message,
        service: service ? service.title : "General Inquiry",
        dateTime: serverTimestamp(),
      };

      await addDoc(collection(db, "enquiries"), enquiryData);

      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: service
          ? `Inquiry about: ${service.title}\n\n[Your detailed message here]`
          : "",
      });
    } catch (err) {
      console.error("Firebase error:", err);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Blob Animations */}
      <style jsx="true">{`
        @keyframes blob-one { 
          0%,100%{transform:translate(0,0)scale(1);} 
          33%{transform:translate(30px,-50px)scale(1.1);} 
          66%{transform:translate(-20px,40px)scale(0.9);} 
        }
        @keyframes blob-two {
          0%,100%{transform:translate(0,0)scale(1);}
          40%{transform:translate(-40px,60px)scale(0.95);}
          80%{transform:translate(50px,-30px)scale(1.05);}
        }
        .blob-one { animation: blob-one 22s infinite ease-in-out; }
        .blob-two { animation: blob-two 26s infinite ease-in-out; }
      `}</style>

      <section
        className="relative py-20 md:py-28 overflow-hidden min-h-screen flex items-center w-full"
        style={{ background: COLORS.GRADIENT }}
      >
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] blur-[120px] opacity-40 rounded-full blob-one"
            style={{ top: "-50px", left: "-50px", background: COLORS.ACCENT }}
          ></div>

          <div
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] blur-[150px] opacity-35 rounded-full blob-two"
            style={{ bottom: "-50px", right: "-50px", background: COLORS.ACCENT_ALT }}
          ></div>

          <div
            className="absolute w-64 h-64 blur-[100px] opacity-30 rounded-full"
            style={{ top: "25%", right: "20%", background: COLORS.ACCENT }}
          ></div>
        </div>

        {/* Animated background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${COLORS.ACCENT}10, transparent 70%), radial-gradient(circle at 80% 70%, ${COLORS.ACCENT_ALT}15, transparent 70%)`,
              `radial-gradient(circle at 25% 25%, ${COLORS.ACCENT}15, transparent 70%), radial-gradient(circle at 85% 75%, ${COLORS.ACCENT_ALT}20, transparent 70%)`,
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        ></motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-16">
            <p
              className="font-semibold uppercase mb-2 tracking-widest"
              style={{ color: COLORS.ACCENT }}
            >
              Service Inquiry
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: COLORS.TEXT }}>
              {service ? `Inquire About ${service.title}` : "General Inquiry"}
            </h2>

            <p className="max-w-2xl mx-auto text-lg" style={{ color: COLORS.SUBTEXT }}>
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          {/* 2 Column Layout EXACTLY like original contact page */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-10">

            {/* LEFT SIDE — Modern Hero Typography */}
            <div className="relative flex items-center justify-center md:justify-start order-1 md:order-1 py-10 md:py-0">

              {/* BIG Modern Vertical Text */}
              <h1
                className="font-extrabold leading-none select-none text-center md:text-left"
                style={{
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  color: COLORS.TEXT,
                }}
              >
                Let's<br />
                <span style={{ color: COLORS.ACCENT }}>Fill This</span><br />
                Form
              </h1>



            </div>

            {/* RIGHT SIDE — Your Inquiry Form (same UI & logic) */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="p-8 lg:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl order-2 md:order-2"
              style={{
                background: COLORS.GLASS_BG,
                border: COLORS.GLASS_BORDER,
                boxShadow: COLORS.SHADOW,
              }}
            >
              {/* Fields */}
              <div className="space-y-5">

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-transparent border"
                  style={{ borderColor: COLORS.ACCENT, color: COLORS.TEXT }}
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl bg-transparent border"
                  style={{ borderColor: COLORS.ACCENT, color: COLORS.TEXT }}
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (Optional)"
                  className="w-full p-4 rounded-xl bg-transparent border"
                  style={{ borderColor: COLORS.ACCENT, color: COLORS.TEXT }}
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company (Optional)"
                  className="w-full p-4 rounded-xl bg-transparent border"
                  style={{ borderColor: COLORS.ACCENT, color: COLORS.TEXT }}
                />

                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-transparent border"
                  placeholder="How can we help you?"
                  style={{ borderColor: COLORS.ACCENT, color: COLORS.TEXT }}
                ></textarea>
              </div>

              {/* Status */}
              {submitStatus === "success" && (
                <p className="mt-6 p-3 text-center rounded-xl" style={{ background: "Green", color: COLORS.TEXT }}>
                  Inquiry sent successfully!
                </p>
              )}

              {submitStatus === "error" && (
                <p className="mt-6 p-3 text-center rounded-xl bg-red-500/30 text-red-200">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                className="w-full mt-6 py-4 font-bold rounded-xl flex items-center justify-center gap-3"
                style={{ background: COLORS.ACCENT, color: COLORS.BG }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    {/* Simple basic loader */}
                    <div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    ></div>
                    Sending...
                  </div>
                ) : (
                  "Submit Inquiry"
                )}
              </motion.button>

            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
};


// =============================

// PART 3 — SERVICE DETAILS VIEW (Animated, Safe, Enhanced)
// =======================================================
const ServiceDetailsView = ({ service, toggleView, COLORS, goToInquire }) => {
  // If service object is missing — prevent crash
  if (!service || typeof service !== "object") {
    return (
      <div
        className="min-h-screen p-20 flex flex-col items-center justify-center text-center"
        style={{ background: COLORS.BG, color: COLORS.TEXT }}
      >
        <h1 className="text-3xl font-bold text-red-500 mb-4">Service Not Found</h1>
        <button
          onClick={() => toggleView("services")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // 100% crash proof — fallback image
  const imageToUse = service.imageUrl ? service.imageUrl : kafd2Bg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="min-h-screen py-20"
      style={{ background: COLORS.BG, color: COLORS.TEXT }}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">

        {/* BACK BUTTON */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => toggleView("services")}
          className="flex items-center text-cyan-400 mb-10 font-medium"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Services
        </motion.button>

        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-6 mb-10"
        >
          <div
            className="p-2 rounded-2xl shadow-lg"
            style={{
              background: "rgba(0,150,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            {service.icon ? (
              <service.icon className="w-10 h-10 text-blue-400" />
            ) : (
              <img
                src={imageToUse}
                className="w-[7rem] h-[8rem] md:w-[9rem] md:h-[10rem] object-cover rounded-xl"
                alt={service.title}
              />
            )}
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
              {service.title}
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "90px" }}
              transition={{ duration: 0.6 }}
              className="h-1 rounded-full"
              style={{ background: COLORS.ACCENT }}
            />
          </div>
        </motion.div>

        {/* DESCRIPTION BOX */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 rounded-3xl mb-12 leading-relaxed shadow-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(14px)",
          }}
        >
          <p className="text-gray-500 text-lg whitespace-pre-line">
            {service.description}
          </p>
        </motion.div>

        {/* KEY ROLES SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: COLORS.ACCENT }}
          >
            Key Roles We Supply
          </h3>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-gray-300 text-lg">
            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-400 mr-3 mt-1" />
              <p className="text-gray-500">Specialist Engineers / Project Managers</p>
            </div>

            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-400 mr-3 mt-1" />
              <p className="text-gray-500">Technicians & Skilled Labor Workforce</p>
            </div>

            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-400 mr-3 mt-1" />
              <p className="text-gray-500">  Safety Compliance & QA/QC Personnel</p>
            </div>

            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-400 mr-3 mt-1" />
              <p className="text-gray-500"> Support, Logistics & On-Site Coordinators</p>
            </div>
          </div>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToInquire(service)}
            className="
    px-8 py-3 text-lg
    sm:px-10 sm:py-3.5 sm:text-lg
    md:px-12 md:py-4 md:text-xl
    font-bold rounded-full shadow-xl
  "
            style={{
              background: COLORS.ACCENT,
              color: COLORS.BG,
              boxShadow: `${COLORS.ACCENT}55 0px 10px 30px`,
            }}
          >
            Inquire About {service.title}
          </motion.button>

        </motion.div>

      </div>
    </motion.div>
  );
};


// ===================================
// 5. Directors Component
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
            backgroundImage: `url(${HalftoneBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: 0.25,
            mixBlendMode: "overlay",
            // background: COLORS.GLASS_BG,
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col items-center justify-center pt-6">
            <motion.img
              src={imageUrl}
              alt={name}
              className="h-[180px] w-[180px] object-contain rounded-lg shadow-lg border border-white/40"
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

const Directors = ({ COLORS, handleCompanyProfileClick }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);

  const directors = [
    { name: "Mohammad Hamid Ansari", title: "Founder & Chairman", bio: "Expert recruiter skilled in strategic hiring and workforce planning.", intro: "Mr. Mohammad Hamid Ansari is the visionary Founder & Chairman of Investment Company...", imageUrl: MohammedHamid },
    { name: "Mujeeb Ullah", title: "CEO", bio: "A decade of experience in sales and workforce client relations.", intro: "Mr. Mujeeb Ullah currently works as the Sales Manager at Investment Company...", imageUrl: MrMujeeb },
    { name: "Abdullah Masoud Ghazi Alotaib", title: "Deputy CEO", bio: "Expert in soft services training and staff development.", intro: "Mr. Abdullah specializes in the training and development of soft services personnel...", imageUrl: MrAbdullah },
    { name: " Mohammed Rizwan Ahmed", title: "Managing Director", bio: "14+ years of leadership experience in manpower operations and strategic management.", intro: "Mr. Mohammed Rizwan Ahmed serves as the Head of Operations Manager at Investment Company...", imageUrl: MrRizwan },
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
            Our leadership team combines experience, integrity, and innovation to shape 's success in manpower excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {directors.map((director, index) => (
            <DirectorCard key={index} {...director} index={index} COLORS={COLORS} />
          ))}
        </div>

        {/* Know More Button */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            onClick={handleCompanyProfileClick}

            href="#company-profile"// Change this to your About Us page route
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: COLORS.ACCENT,
              color: '#ffffff',
              boxShadow: `0 8px 32px ${COLORS.ACCENT}40`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = COLORS.PRIMARY;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = COLORS.ACCENT;
              e.target.style.transform = 'translateY(0px)';
            }}
          >
            Explore More
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};


// ================Management section===================
const ManagerCard = ({ name, title, bio, intro, imageUrl, COLORS, index, layoutType, linkedinUrl }) => {
  const description = intro || bio;
  const isDirector = layoutType === 'director';

  // Conditional classes based on layoutType
  const cardContentClasses = isDirector
    ? "flex flex-col md:grid md:grid-cols-12 md:gap-10" // Horizontal for Directors
    : "flex flex-col items-center text-center"; // Vertical for Operational

  const imageContainerClasses = isDirector
    ? "md:col-span-3 lg:col-span-2 flex justify-center md:block md:justify-start mb-6 md:mb-0"
    : "mb-6 flex justify-center";

  const textContainerClasses = isDirector
    ? "md:col-span-9 lg:col-span-10 text-left"
    : "text-center";

  return (
    <motion.div
      className="p-8 md:p-10 rounded-3xl overflow-hidden backdrop-blur-lg transition-all duration-500 w-full cursor-pointer hover:scale-[1.01]"
      style={{
        // Enhanced Glassmorphism Style
        background: COLORS.GLASS_BG_LIGHT,
        border: COLORS.GLASS_BORDER,
        boxShadow: COLORS.SHADOW_DARK,
        minHeight: isDirector ? '300px' : '380px',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: isDirector ? 1.0 : 1.05, // Subtle scale on hover
        background: COLORS.HOVER_GLASS_BG
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        delay: index * 0.1,
        duration: 0.5
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={cardContentClasses}>
        {/* Image Section */}
        <div className={imageContainerClasses}>
          <img
            src={imageUrl}
            alt={name}
            className="h-32 w-32 md:h-40 md:w-40 object-contain rounded-xl shadow-xl border-4 border-white/50 transform transition-transform duration-300 hover:rotate-1"
            onError={(e) => {
              e.target.src = "https://placehold.co/160x160/cccccc/333?text=No+Image";
            }}
          />
        </div>

        {/* Text and Description Section */}
        <div className={textContainerClasses}>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: COLORS.PRIMARY_HEADER }}>
            {name}
          </h3>
          <p className="text-base md:text-lg font-semibold uppercase tracking-wider mb-4" style={{ color: COLORS.ACCENT }}>
            {title}
          </p>

          {/* Full Description */}
          <div className="text-sm leading-relaxed space-y-4 pr-2" style={{ color: COLORS.SUBTEXT }}>
            <p>{description}</p>
          </div>
        </div>
      </div>

      {/* LinkedIn Icon - Only show if linkedinUrl exists */}
      {linkedinUrl && (
        <div className={`mt-6 pt-4 border-t border-white/10 ${isDirector ? 'flex justify-end' : 'flex justify-center'}`}>
          <motion.a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-6 h-6" style={{ color: COLORS.ACCENT }} />
          </motion.a>
        </div>
      )}
    </motion.div>
  );
};

// ===================================
// Management Section (Updated Layouts)
// ===================================

const Management = ({ COLORS }) => {
  if (!COLORS) {
    console.error("COLORS prop is missing in Management component.");
    return null;
  }

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);

  // =========================================
  // Board of Directors
  // =========================================
  const boardOfDirectors = [
    {
      name: "Mohammad Hamid Ansari",
      title: "Founder & Group Vice Chairman",
      bio: "Over 12 years of experience in the GCC and GCC markets, specializing in strategic planning and long-term project management.",
      intro: "Mr. Mohammad Hamid Ansari stands as the distinguished Founder and Chairman of ARM Solutions, guiding the organization with a clear and unwavering strategic direction. His leadership is not merely administrative; it is the driving force and the very foundation upon which ARM Solutions' continuous expansion and notable success have been built. Possessing a profound and comprehensive level of expertise, Mr. Ansari's professional journey spans over twelve years of intensive and highly successful engagement within the competitive and dynamic GCC markets.",
      imageUrl: MohammedHamid
      // linkedinUrl:
    },
    {
      name: "Mujeeb Ullah",
      title: "Chief Executive Officer (CEO)",
      bio: "A decade of experience in strategic business development, client relations, and financial oversight.",
      intro: "Mr. Mujeeb Ullah, the dynamic Chief Executive Officer (CEO), brings a highly valuable decade of experience in key areas including comprehensive strategic business development, sophisticated client relations management, and meticulous financial oversight. He plays an absolutely instrumental and indispensable role in shaping the company's deeply client-centric approach. Furthermore, he is essential for consistently ensuring operational excellence and adherence to the highest standards across all organizational departments, successfully driving the company's growth and stability.",
      imageUrl: MrMujeeb
      // linkedinUrl:
    },
    {
      name: "Abdullah Masoud Ghazi Alotaibi",
      title: "Deputy CEO",
      bio: "Oversight of cross-departmental operations and strategic implementation.",
      intro: "As the Deputy CEO, Mr. Abdullah performs a truly crucial role in maintaining organizational synergy and efficiency. He is specifically tasked with the oversight of cross-departmental operations, ensuring that workflows and activities are perfectly aligned. His focus is on guaranteeing seamless coordination and effective communication between all project teams and the executive management. This vital function ensures that strategies are executed smoothly and that all projects remain on track, directly supporting the firm's overall operational success.",
      imageUrl: MrAbdullah
      //linkedinUrl:
    },
    {
      name: "Mohammed Rizwan Ahmed",
      title: "Managing Director",
      bio: "14+ years of robust leadership experience in manpower operations and strategic management.",
      intro: "Serving as the Managing Director, Mr. Mohammed Rizwan Ahmed leverages an impressive 14+ years of robust leadership experience. His specialization spans critical areas, including complex manpower operations, rigorous regulatory compliance, and stringent international standards enforcement. His leadership is absolutely pivotal to the organization, directly enabling the consistent maintenance of high-quality project delivery and guaranteeing sustained and high levels of client satisfaction across all operations. His expertise ensures operational integrity and market trust.",
      imageUrl: MrRizwan,
      linkedinUrl: "https://www.linkedin.com/in/rizwan-ahmed-07636182/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
  ];

  // =========================================
  // Operational Management
  // =========================================
  const operationalManagement = [


    {
      name: "Zafar Imam",
      title: "Procurement manager ",
      bio: "Experienced procurement specialist with 12+ years in strategic sourcing, vendor management, and cost-efficient procurement operations.",
      intro: "Mr. Zafar Imam, the Procurement Manager, offers over 12 years of hands-on expertise in crucial procurement and supply chain operations. He specializes in strategic sourcing, skillful vendor negotiations, and meticulous contract management. His specialized focus ensures optimized resource acquisition, cost efficiency, and robust supply chain integrity for the organization.",
      imageUrl: MrZafar
      // linkedinUrl:
    },
    {
      name: "Mohammed Tajammul Ahmed",
      title: "Administrator",
      bio: "Specialist in soft services training and continuous staff development.",
      intro: "We proudly introduce Mr. Mohammed Tajammul Ahmed, an expert in the training and development of soft services personnel for housekeeping, hospitality, and facility management. He ensures teams deliver service excellence in diverse environments. Highly skilled in building strong client relationships, he tailors solutions based on operational needs, consistently enhancing efficiency, performance, and long-term client trust.",
      imageUrl: MrTajammul
      // linkedinUrl: 
    },
    {
      name: "Mohammed Abdul Mannan Ahmed",
      title: "Payroll Officer",
      bio: "Manages all payroll operations and workforce compensation compliance.",
      intro: "Mr. Mohammed Abdul Mannan Ahmed, the Payroll Officer, offers essential expertise in precise and compliant employee payment administration. He specializes in accurate compensation calculations, strict adherence to tax and labor regulations, and meticulous documentation management. His specialized focus guarantees consistent compliance, fosters employee confidence, and ensures the absolute financial accuracy of the organization",
      imageUrl: MrMannan
      // linkedinUrl: 
    },
    {
      name: "Palesh Rana",
      title: "Senior Recruiter - Overseas & Local (Bangladesh)",
      bio: "Expert in regional talent acquisition and large-scale project sourcing.",
      intro: "Mr. Palesh Rana serves as our indispensable Senior Recruiter, specializing in crucial talent acquisition efforts. His scope encompasses securing both overseas and local talent from the vital recruitment market of Bangladesh. With a keen focus on sourcing and engaging top professionals, he plays an essential role in expanding our workforce and ensuring the successful placement of well-vetted candidates into key roles.",
      imageUrl: MrPaleshRana
      // linkedinUrl:
    },

    {
      name: "Farooq Nawaz",
      title: "Operations Supervisor",
      bio: "ensuring smooth workflow, high productivity, and consistent achievement of organizational goals..",
      intro: "Mr. Farooq Nawaz, the Operations Supervisor, possesses extensive experience in the comprehensive management of daily operations and diligent workforce performance. He is crucial for ensuring a smooth workflow and maintaining consistently high productivity. His dedicated efforts directly contribute to the consistent achievement of all organizational goals and operational efficiency.",
      imageUrl: MrFarooq
      // linkedinUrl:
    },

    {
      name: "Imtiyaz Alam",
      title: "Finance Manager",
      bio: "Oversees all financial reporting, budgeting, and fiscal strategy.",
      intro: "Mr. Imtiyaz Alam efficiently manages the comprehensive scope of the organization's fiscal operations. His primary responsibilities include meticulous oversight of all financial reporting, strategic budgeting processes, and the day-to-day fiscal activities. His expertise ensures the financial health, accuracy, and regulatory compliance of the company's entire monetary structure.",
      imageUrl: MrImtiyaz
      // linkedinUrl:
    },
  ];

  return (
    <section
      id="management"
      className="relative py-4 md:py-3 overflow-hidden"
      style={{ background: COLORS.GRADIENT }}
    >
      {/* Parallax glow */}
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 10%, ${COLORS.ACCENT}30, transparent 70%)`,
          y,
        }}
      ></motion.div>

      {/* ===================================================== */}
      {/* 🔥 Abstract Animated Background */}
      {/* ===================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blob Left */}
        <motion.div
          initial={{ x: -150, y: 0, opacity: 0.4 }}
          animate={{ x: 0, y: 30 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: COLORS.ACCENT + "55", left: "-10%", top: "12%" }}
        />

        {/* Blob Right */}
        <motion.div
          initial={{ x: 150, y: 50, opacity: 0.4 }}
          animate={{ x: 0, y: -20 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-30"
          style={{ background: COLORS.PRIMARY + "40", right: "-12%", bottom: "8%" }}
        />

        {/* Floating Light Bar */}
        <motion.div
          initial={{ opacity: 0.2, y: -20 }}
          animate={{ opacity: 0.4, y: 10 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[70%] h-40 rounded-3xl blur-2xl"
          style={{ background: COLORS.ACCENT + "30", top: "5%", left: "15%" }}
        />
      </div>

      {/* ===================================================== */}
      {/* Content */}
      {/* ===================================================== */}
      <div className="container mx-auto px-6 text-center relative z-10">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4" style={{ color: COLORS.ACCENT }}>
            The ARM Leadership
          </h2>
          <p className="text-lg max-w-4xl mx-auto" style={{ color: COLORS.SUBTEXT }}>
            Our leadership team combines deep industry experience, integrity, and innovation.
          </p>
        </div>

        {/* =============================== */}
        {/* Board of Directors */}
        {/* =============================== */}
        <h3
          className="text-3xl font-bold mb-8 md:mb-12 border-b-4 border-indigo-400/50 pb-2 inline-block px-4"
          style={{ color: COLORS.ACCENT }}
        >
          Board of Directors
        </h3>

        <div className="grid grid-cols-1 max-w-6xl mx-auto mb-20 gap-12">
          {boardOfDirectors.map((manager, index) => (
            <motion.div
              key={`director-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              className="rounded-3xl p-10 md:p-12 bg-violet-950 shadow-2xl mx-auto relative overflow-hidden"
              style={{
                border: `1px solid ${COLORS.ACCENT}30`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 items-center">

                {/* =============================== */}
                {/* TEXT BLOCK — Mobile: second | Desktop: first */}
                {/* =============================== */}
                <div className="md:col-span-2 text-left space-y-6 order-2 md:order-1">

                  {/* NAME + TITLE */}
                  <div>
                    <h2
                      className="text-4xl font-black"
                      style={{ color: COLORS.PRIMARY_HEADER }}
                    >
                      {manager.name}
                    </h2>

                    <p
                      className="text-xl font-semibold mt-1"
                      style={{ color: COLORS.ACCENT }}
                    >
                      {manager.title}
                    </p>
                  </div>

                  {/* ABOUT */}
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: COLORS.PRIMARY_HEADER }}
                    >
                      About
                    </h4>

                    <p
                      className="text-base leading-relaxed"
                      style={{ color: COLORS.SUBTEXT }}
                    >
                      {manager.intro || manager.bio}
                    </p>
                  </div>

                  {/* SOCIAL ICONS */}
                  {manager.linkedinUrl && (
                    <div className="flex items-center gap-4 mt-4">
                      <motion.a
                        href={manager.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="p-3 rounded-full bg-black/5 hover:bg-black/20 transition"
                      >
                        <Linkedin
                          className="w-6 h-6"
                          style={{ color: COLORS.ACCENT }}
                        />
                      </motion.a>
                    </div>
                  )}
                </div>

                {/* =============================== */}
                {/* IMAGE BLOCK — Mobile: first | Desktop: second */}
                {/* =============================== */}
                <div className="flex justify-center md:justify-end mt-6 mb-6 md:mt-0 md:mb-0 order-1 md:order-2">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "white",
                        padding: "4px",
                        borderRadius: "9999px",
                      }}
                    ></div>

                    <img
                      src={manager.imageUrl}
                      alt={manager.name}
                      className="relative rounded-full w-48 h-48 md:w-60 md:h-60 object-contain p-1 border-4 border-white shadow-xl"
                      style={{ transform: "scale(1.1)" }}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/300x300/cccccc/333?text=No+Image";
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* =============================== */}
        {/* Operational Management */}
        {/* =============================== */}
        <h3 className="text-3xl font-bold mb-8 md:mb-12 border-b-4 border-gray-400/50 pb-2 inline-block px-4"
          style={{ color: COLORS.ACCENT }}>
          Operational Management
        </h3>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"> */}
        <div className="grid grid-cols-1 gap-10 max-w-6xl mx-auto mb-20">
          {operationalManagement.map((manager, index) => (
            <motion.div
              key={`staff-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <ManagerCard
                {...manager}
                index={index + boardOfDirectors.length}
                COLORS={COLORS}
                layoutType="director"
                glass
              />
            </motion.div>
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const enquiryData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company") || "N/A",
      message: formData.get("message"),
      dateTime: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "enquiries"), enquiryData);

      setStatus("success");
      setTimeout(() => setStatus(null), 4000);
      e.target.reset();

    } catch (err) {
      console.error("Error saving enquiry:", err);
      setStatus("error");
    }
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
                    <MapPin className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                    <div>
                      <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>
                        Our Branches
                      </p>
                      <ul className="text-base" style={{ color: COLORS.SUBTEXT }}>
                        <li>Riyadh, Jeddah, Madina, Najran</li>
                        {/* <li>Jeddah</li>
                                              <li>Madina</li>
                                              <li>Najran</li> */}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                    <div>
                      <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>Email Us</p>
                      <a href="mailto:info@armgroups.org" className="text-base hover:text-white transition-colors" style={{ color: COLORS.SUBTEXT }}>
                        info@armgroups.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 flex-shrink-0" style={{ color: COLORS.ACCENT }} />
                    <div>
                      <p className="font-semibold text-lg" style={{ color: COLORS.TEXT }}>Call Us</p>
                      <a href="tel:+966536514449" className="text-base hover:text-white transition-colors" style={{ color: COLORS.SUBTEXT }}>
                        +966 53 651 4449
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

                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                    style={{ borderColor: COLORS.ACCENT + '80', color: COLORS.TEXT, background: 'rgba(255,255,255,0.02)' }}
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                    style={{ borderColor: COLORS.ACCENT + '80', color: COLORS.TEXT, background: 'rgba(255,255,255,0.02)' }}
                    required
                  />

                  <input
                    name="phone"
                    type="text"
                    placeholder="Your Phone"
                    className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                    style={{ borderColor: COLORS.ACCENT + '80', color: COLORS.TEXT, background: 'rgba(255,255,255,0.02)' }}
                    required
                  />

                  <input
                    name="company"
                    type="text"
                    placeholder="Your Company (Optional)"
                    className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                    style={{ borderColor: COLORS.ACCENT + '80', color: COLORS.TEXT, background: 'rgba(255,255,255,0.02)' }}
                  />

                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    rows="4"
                    className="w-full p-4 rounded-xl bg-transparent border focus:outline-none focus:ring-4 transition-all duration-300"
                    style={{ borderColor: COLORS.ACCENT + '80', color: COLORS.TEXT, background: 'rgba(255,255,255,0.02)' }}
                    required
                  ></textarea>

                  <motion.button
                    type="submit"
                    className="w-full py-4 text-lg font-bold rounded-xl transition-all border-2"
                    style={{ backgroundColor: COLORS.ACCENT, color: COLORS.BG, borderColor: COLORS.ACCENT }}
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
        className="relative py-12 overflow-hidden"
        style={{
          backgroundColor: COLORS.BG,
          borderTop: COLORS.GLASS_BORDER,
          boxShadow: COLORS.SHADOW,
          color: COLORS.SUBTEXT,
        }}
      >

        {/* =============================== */}
        {/*  ANIMATED WAVES BACKGROUND      */}
        {/* =============================== */}
        <div
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${AnimatedWave})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "waveMove 12s ease-in-out infinite",
            // mixBlendMode: "overlay",
          }}
        ></div>

        {/* CUSTOM KEYFRAME ANIMATION */}
        <style>{`
          @keyframes waveMove {
            0%   { background-position-x: 0%; }
            50%  { background-position-x: 40%; }
            100% { background-position-x: 0%; }
          }
        `}</style>

        {/* =============================== */}
        {/*  FOOTER CONTENT                 */}
        {/* =============================== */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-8 mb-8"
            style={{ borderColor: COLORS.ACCENT }}
          >
            <div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: COLORS.ACCENT }}
              >
                ARM Solutions
              </h3>
              <p>
                Delivering skilled manpower solutions for infrastructure and industrial projects across the MENA region.
              </p>
            </div>

            <div>
              <h4
                className="text-lg font-semibold mb-4 border-b pb-2"
                style={{ borderColor: COLORS.ACCENT }}
              >
                Quick Links
              </h4>

              {[
                { text: "About", href: "#company-profile" },
                { text: "Services", href: "#services-page" },
                { text: "Careers", href: "/careers" },
                { text: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="mb-2 block hover:underline"
                  style={{ color: COLORS.SUBTEXT }}
                >
                  {link.text}
                </a>
              ))}
            </div>

            <div>
              <h4
                className="text-lg font-semibold mb-4 border-b pb-2"
                style={{ borderColor: COLORS.ACCENT }}
              >
                Contact
              </h4>
              <p>Dammam, Taibah District, Al Harith Ibn Al Summah, Kingdom of Saudi Arabia</p>
              <p>+966536514449</p>
              <p>info@armgroups.org</p>
            </div>

            <div>
              <h4
                className="text-lg font-semibold mb-4 border-b pb-2"
                style={{ borderColor: COLORS.ACCENT }}
              >
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

          <div className="text-center text-sm pt-4">
            © 2025 ARM Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </FadeInSection>
  );
};

//Floating Buttons

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
        href="https://wa.me/966538274449"
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

    { name: "Client Partner 1", logo: clientImage26 },
    { name: "Client Partner 2", logo: clientImage27 },
    { name: "Client Partner 3", logo: clientImage28 },
    { name: "Client Partner 4", logo: clientImage2 },
    { name: "Client Partner 5", logo: clientImage6 },
    { name: "Client Partner 6", logo: clientImage20 },
    { name: "Client Partner 7", logo: clientImage17 },
    { name: "Client Partner 8", logo: clientImage25 },

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
    // { name: "Client Partner 11", logo: clientImage11 },
    // { name: "Client Partner 12", logo: clientImage12 },
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
                className={`w-6 h-6 text-blue-400 transition-transform ${reverse ? "rotate-180" : ""
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
              className={`flex gap-8 mb-6 ${reverse
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
// =========================
//  LOGIN COMPONENT
// Username: admin
// Password: 12345
// =========================
const AdminLogin = ({ COLORS, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true); // Notify parent component
    } catch (err) {
      setError("Invalid email or password");
    }
    setIsLoading(false); // stop loader
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{ background: COLORS.BG }}
    >

      {/* Soft Glow Background */}
      <div
        className="absolute inset-0 opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${COLORS.ACCENT}, transparent 60%)`,
        }}
      ></div>

      <div
        className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl shadow-2xl border relative z-10"
        style={{
          background: COLORS.GLASS_BG,
          border: COLORS.GLASS_BORDER,
          boxShadow: COLORS.SHADOW,
        }}
      >
        <h2
          className="text-3xl font-extrabold mb-6 text-center tracking-wide"
          style={{ color: COLORS.ACCENT }}
        >
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded-xl border outline-none transition focus:ring-4"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              color: COLORS.TEXT,
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.03)",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border outline-none transition focus:ring-4"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              color: COLORS.TEXT,
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.03)",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.03]"
            style={{
              background: COLORS.ACCENT,
              color: COLORS.BG,
            }}
            disabled={isLoading}
          >
            {!isLoading ? (
              "Login"
            ) : (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  style={{ color: COLORS.BG }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Authenticating...
              </>
            )}
          </button>
        </form>
      </div>
    </div>

  );
};

// ===================================
//  Admin Dashboard (Theme-Aware)
// ===================================
export const AdminDashboard = ({ toggleView, COLORS, theme, toggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState("enquiries");

  // Firestore data + UI states
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search / Sort / Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' | 'oldest'
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Firestore enquiries in realtime
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "enquiries"),
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setEnquiries(list);
        setLoading(false);
        setCurrentPage(1); // reset to first page on fresh load
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteDoc(doc(db, "enquiries", id));
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  // === Filtering ===
  const filtered = useMemo(() => {
    if (!searchQuery) return enquiries;
    const q = searchQuery.trim().toLowerCase();
    return enquiries.filter((it) => {
      const fields = [
        it.name,
        it.email,
        it.phone,
        it.company,
        it.message,
      ].map((f) => (f ? String(f).toLowerCase() : ""));
      return fields.some((f) => f.includes(q));
    });
  }, [enquiries, searchQuery]);

  // === Sorting ===
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const at = a.dateTime?.seconds ?? 0;
      const bt = b.dateTime?.seconds ?? 0;
      return sortOrder === "newest" ? bt - at : at - bt;
    });
    return copy;
  }, [filtered, sortOrder]);

  // === Pagination calculations ===
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // Ensure currentPage remains in bounds
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  // Helpers for UI
  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

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
        className="w-full flex justify-between items-center px-6 py-4 sticky top-0 z-50 backdrop-blur-lg border-b shadow-xl"
        style={{
          background: COLORS.GLASS_BG,
          borderColor: COLORS.GLASS_BORDER,
        }}
      >
        <div className="flex items-center gap-3">
          <Inbox size={28} color={COLORS.ACCENT} />
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border hover:scale-110 transition-all"
            style={{
              backgroundColor: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
              color: COLORS.ACCENT,
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="px-4 py-2 font-semibold rounded-full flex items-center gap-2 hover:scale-105 transition"
            style={{
              backgroundColor: COLORS.ACCENT,
              color: COLORS.BG,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <aside
            className="rounded-xl p-5 border backdrop-blur-lg shadow-lg"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
            }}
          >
            <h3
              className="text-lg font-bold mb-4 pb-2 border-b flex items-center gap-2"
              style={{ color: COLORS.ACCENT, borderColor: COLORS.ACCENT }}
            >
              <ListFilter size={18} /> Navigation
            </h3>

            {["enquiries"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full px-4 py-3 mb-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === tab ? "font-bold scale-105" : ""
                  }`}
                style={{
                  background:
                    activeTab === tab ? COLORS.ACCENT : COLORS.GLASS_BG,
                  color: activeTab === tab ? COLORS.BG : COLORS.SUBTEXT,
                  border: COLORS.GLASS_BORDER,
                }}
              >
                <Inbox size={20} />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </aside>

          {/* MAIN PANEL */}
          <section
            className="md:col-span-3 rounded-xl border backdrop-blur-lg p-6 shadow-xl"
            style={{
              background: COLORS.GLASS_BG,
              border: COLORS.GLASS_BORDER,
            }}
          >
            {/* HEADER CONTROLS */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: COLORS.ACCENT }}>
                <Inbox size={24} /> Enquiry List
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">

                {/* Search */}
                <div className="relative w-full sm:w-[360px]">
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                  />
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search enquiries..."
                    className="w-full pl-10 p-3 rounded-xl border focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: COLORS.ACCENT + "40",
                      color: COLORS.TEXT,
                    }}
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <ArrowDownUp
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                    style={{ color: COLORS.ACCENT }}
                  />

                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="
      pl-10 pr-8 py-2.5
      rounded-xl
      shadow-lg
      text-sm md:text-base
      transition-all duration-300
      focus:ring-2 focus:ring-opacity-40
    "
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${COLORS.ACCENT}40`,
                      color: COLORS.TEXT,
                      backdropFilter: "blur(6px)",
                      boxShadow: `0px 0px 12px ${COLORS.ACCENT}20`,
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>

                {/* Page Size */}
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="
    px-4 py-2.5
    rounded-xl
    shadow-lg
    text-sm md:text-base
    transition-all duration-300
    focus:ring-2 focus:ring-opacity-40
  "
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${COLORS.ACCENT}40`,
                    color: COLORS.TEXT,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0px 0px 12px ${COLORS.ACCENT}20`,
                  }}
                >
                  <option value={5}>5 / page</option>
                  <option value={8}>8 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={20}>20 / page</option>
                </select>
              </div>
            </div>

            {/* LOADING SPINNER */}
            {loading ? (
              <div className="flex justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full"
                  style={{
                    width: 50,
                    height: 50,
                    border: `4px solid ${COLORS.ACCENT}40`,
                    borderTop: `4px solid ${COLORS.ACCENT}`,
                  }}
                />
              </div>
            ) : sorted.length === 0 ? (
              <p className="opacity-70 text-center py-10">No enquiries found.</p>
            ) : (
              <>
                {/* ENQUIRIES LIST */}
                <div className="space-y-4">
                  {paginated.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-md"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      <div className="flex-grow space-y-2">
                        <p className="font-bold text-lg flex items-center gap-2">
                          <User size={18} /> {item.name}
                        </p>

                        <div className="text-sm flex flex-wrap gap-4 opacity-80">
                          <span className="flex items-center gap-1">
                            <Mail size={16} /> {item.email}
                          </span>

                          <span className="flex items-center gap-1">
                            <Phone size={16} /> {item.phone}
                          </span>

                          {item.company && (
                            <span className="flex items-center gap-1">
                              <Building size={16} /> {item.company}
                            </span>
                          )}
                        </div>

                        <p className="text-sm opacity-80">{item.message}</p>

                        <p className="text-xs opacity-60">
                          {item.dateTime?.seconds
                            ? new Date(item.dateTime.seconds * 1000).toLocaleString()
                            : "No timestamp"}
                        </p>
                      </div>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => deleteEnquiry(item.id)}
                        className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between mt-6 flex-col sm:flex-row gap-4">
                  <p className="text-sm opacity-70">
                    Showing{" "}
                    <strong>{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                    <strong>{Math.min(currentPage * pageSize, sorted.length)}</strong> of{" "}
                    <strong>{sorted.length}</strong>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border disabled:opacity-40"
                      style={{
                        background: COLORS.GLASS_BG,
                        borderColor: COLORS.GLASS_BORDER,
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border disabled:opacity-40"
                      style={{
                        background: COLORS.GLASS_BG,
                        borderColor: COLORS.GLASS_BORDER,
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </motion.div>
  );

};

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
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${COLORS.ACCENT}40, transparent 70%),
                       radial-gradient(circle at 80% 80%, ${COLORS.ACCENT}30, transparent 70%)`,
        }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-10xl pt-24 pb-12 flex-grow relative z-10">

        {/* ===================================================== */}
        {/* 1. COMPANY OVERVIEW SECTION                           */}
        {/* ===================================================== */}

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-12 mt-12 text-center"
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

        <motion.div
          className="p-8 rounded-2xl backdrop-blur-md border shadow-xl mb-16"
          style={{

            backgroundImage: `url(${HalftoneBG})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            mixBlendMode: "overlay",
            border: COLORS.GLASS_BORDER,
            boxShadow: COLORS.SHADOW,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: COLORS.ACCENT,

            }}
          >
            Company Overview
          </h2>

          <p style={{ color: COLORS.SUBTEXT, lineHeight: "1.7" }}>
            ARM Solutions specializes in providing{" "}
            <span className="font-semibold" style={{ color: COLORS.TEXT }}>
              skilled manpower
            </span>{" "}
            on rental, local transfer, and overseas recruitment basis to serve
            multiple industries. We ensure clients receive qualified workers
            whenever required — improving operational efficiency, reducing cost,
            and enabling long-term success.
          </p>
        </motion.div>

        {/* ===================================================== */}
        {/* 2. LEADERSHIP (Management Component)                  */}
        {/* ===================================================== */}

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: COLORS.ACCENT }}
          >
            Leadership
          </h2> */}
          <Management COLORS={COLORS}
          />
        </motion.div>

        {/* ===================================================== */}
        {/* 3. VISION + MISSION + BOTH GROUP PHOTOS              */}
        {/* ===================================================== */}
<motion.div
  className="flex flex-col md:flex-row md:gap-10 gap-6 mb-12 md:mb-20"
  initial={{ opacity: 0.7 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Vision & Mission */}
  <div
    className="flex-1 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-md border shadow-xl"
    style={{
      background: COLORS.GLASS_BG,
      borderColor: COLORS.ACCENT,
      boxShadow: COLORS.SHADOW,
    }}
  >
    <h2
      className="text-3xl sm:text-4xl md:text-8xl font-bold mb-4 p-1 md:p-2 leading-tight"
      style={{ color: COLORS.ACCENT }}
    >
      Vision & Mission
    </h2>

    <ul style={{ color: COLORS.SUBTEXT }} className="space-y-4">
      <li>
        <span className="font-bold text-xl sm:text-2xl md:text-3xl" style={{ color: COLORS.TEXT }}>
          Vision:
        </span>{" "}
        <br />
        <p className="leading-relaxed sm:leading-loose py-2 text-sm sm:text-base md:text-lg">
           To become the most trusted and sought-after manpower solutions provider, recognized not only for excellence, reliability, and innovation, but also for our ability to transform workforce management across industries. We aspire to set new benchmarks in quality, safety, and operational efficiency by continuously elevating the standards of manpower supply—locally and internationally. Our vision is to empower organizations with a highly skilled and motivated workforce while contributing to regional development, sustainable business growth, and long-term industry leadership. .
          </p>
  
      </li>

      <li>
        <span className="font-bold text-xl sm:text-2xl md:text-3xl" style={{ color: COLORS.TEXT }}>
          Mission:
        </span>{" "}
        <br />
<p className="leading-relaxed sm:leading-loose py-2 text-sm sm:text-base md:text-lg">

 To deliver qualified, trained, and motivated manpower that strengthens our clients’ operational success while fostering the professional growth and well-being of our workforce. We are committed to supplying industry-ready personnel equipped with international safety standards, strong work ethics, and specialized technical skills. Our mission is to create a seamless and efficient manpower ecosystem—bridging talent with opportunity—while upholding excellence, transparency, safety, and continuous improvement
</p>
      </li>
    </ul>
  </div>

  {/* Photos */}
  <div className="flex-1 flex flex-col gap-4 md:gap-6 justify-between">
    <img
      src={arm2GroupPhoto}
      alt="ARM Team"
      className="w-full h-auto md:h-full object-cover"
    />
    <img
      src={armGroupPhoto}
      alt="ARM Group"
      className="w-full h-auto md:h-full object-cover"
    />
  </div>
</motion.div>


        {/* ===================================================== */}
        {/* 4. OUR CLIENTS (kept untouched but moved here)       */}
        {/* ===================================================== */}

        <FadeInSection>
          <div className="mt-12">
            <OurClients COLORS={COLORS} />
          </div>
        </FadeInSection>

        {/* ===================================================== */}
        {/* 5. CORE VALUES (Final Section Before Footer)         */}
        {/* ===================================================== */}

        <motion.div
          className="mt-20 p-8 rounded-2xl backdrop-blur-md border shadow-2xl"
          style={{
            background: COLORS.GLASS_BG,
            backgroundImage: `url(${HalftoneBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: 0.25,
            // mixBlendMode: "overlay",
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
                "We conduct all operations with honesty, transparency, and ethical responsibility, ensuring trust and long-term partnerships with our clients and workforce."
              ],
              [
                "Excellence",
                "We are committed to delivering superior manpower solutions by maintaining high standards of quality, safety, training, and continuous performance improvement."
              ],
              [
                "Commitment",
                "We remain dedicated to client satisfaction, operational efficiency, and timely workforce mobilization, ensuring reliable support across all sectors."
              ],
              [
                "Teamwork",
                "We believe in a collaborative environment where employees, management, and clients work together to achieve shared goals and sustainable success."
              ],
              [
                "Innovation",
                "We continuously adopt new technologies, training methods, and modern workforce practices to enhance service delivery and meet evolving industry demands."
              ],
            ].map(([title, desc], i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <p className="font-bold mb-2" style={{ color: COLORS.TEXT }}>
                  {title}
                </p>
                <p style={{ color: COLORS.SUBTEXT }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BACK BUTTON */}
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
            className="px-6 py-3 text-base font-semibold rounded-full shadow-md hover:scale-105 transition"
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
const PublicView = ({ toggleView, COLORS, theme, goToServiceDetails, handleCompanyProfileClick }) => (
  <>
    <main className="flex-grow">
      <Hero COLORS={COLORS} />
      <About COLORS={COLORS} />
      <Services goToServiceDetails={goToServiceDetails} COLORS={COLORS} />
      {/* <ServiceItem COLORS={COLORS} /> */}
      <ClientMarquee COLORS={COLORS} theme={theme} />
      <Directors COLORS={COLORS} handleCompanyProfileClick={handleCompanyProfileClick}
      />
      <Contact COLORS={COLORS} />
    </main>
    <Footer COLORS={COLORS} />
    <FloatingButtons COLORS={COLORS} />
  </>
);


// ===================================
// 12. Main App Component & Routing
// ===================================
// ===================================
// 12. Main App Component & Routing
// ===================================
const ADMIN_HASH = '#admin-key-123';
const COMPANY_PROFILE_HASH = '#company-profile';
const SERVICES_HASH = '#services-page';
const SERVICE_DETAILS_HASH = '#service-details';

const getInitialView = () => {
  if (window.location.hash.includes(ADMIN_HASH)) return 'admin';
  if (window.location.hash.includes(COMPANY_PROFILE_HASH)) return 'company-profile';
  if (window.location.hash.includes(SERVICES_HASH)) return 'services';
  if (window.location.hash.includes(SERVICE_DETAILS_HASH)) return 'service-details';
  return 'public';
};

export default function App() {
  const [theme, setTheme] = useState("dark"); //Default theme
  const [view, setView] = useState("public");
  const [selectedService, setSelectedService] = useState(null);
  // --- NEW STATE FOR INQUIRY ---
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState(null);

  // Admin auth state (keeps in sync with Firebase)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const COLORS = THEMES[theme];

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  ////////// Manually updating the URLs for service-page //////////////////
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

  if (hash === "company-profile") {
    toggleView("company-profile");
    window.scrollTo(0, 0);
  }

    if (hash === "#services-page") {
      // Open full services page automatically
      toggleView("services");
          window.scrollTo(0, 0);


      // Ensure page scrolls to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, []);


  const handleCompanyProfileClick = (e) => {
    e.preventDefault();
    toggleView("company-profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SERVICE DETAILS VIEW HANDLER
  const goToServiceDetails = (service) => {
    setSelectedService(service);
    setView("fading-out");

    setTimeout(() => {
      window.location.hash = SERVICE_DETAILS_HASH;
      setView("service-details");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  const goToInquire = useCallback((service) => {
    setSelectedServiceForInquiry(service);
    setView("inquire");
  }, []);

  // --- NEW BACK NAVIGATION HANDLER FOR INQUIRY FORM ---
  const handleInquireBack = useCallback(() => {
    // Determine the target view based on whether an inquiry service was selected
    const targetView = selectedServiceForInquiry ? 'service-details' : 'public';

    // Clear the inquiry context state
    setSelectedServiceForInquiry(null);
  });
  // -----------------------------

  // toggleView WITH services support
  const toggleView = (targetView) => {
    const validViews = ["public", "admin", "company-profile", "services"];
    if (!validViews.includes(targetView)) return;

    let targetHash = "";
    if (targetView === "admin") targetHash = ADMIN_HASH;
    if (targetView === "company-profile") targetHash = COMPANY_PROFILE_HASH;
    if (targetView === "services") targetHash = SERVICES_HASH;

    if ((view === "service-details" || view === "fading-out") && targetView === "public") {
      setSelectedService(null);
      window.location.hash = "";
      setView("public");
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setView("fading-out");
    setTimeout(() => {
      window.location.hash = targetHash;
      setView(targetView);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  // HASH LISTENER - do not override admin/login flow or logout redirect - Manually entering the URL
  useEffect(() => {
    const handler = () => {
      const newView = getInitialView();

      // Always allow admin view when hash matches
      if (newView === "admin") {
        setView("admin");
        return;
      }

      // Normal handling for all other pages
      if (view !== "fading-out") {
        setView(newView);
      }
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [view]);

  // Listen to Firebase Auth state (keeps adminLoggedIn accurate)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAdminLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  // Logout handler in App - passed down to AdminDashboard as onLogout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // signOut triggers onAuthStateChanged which updates adminLoggedIn -> false
      // Ensure UI redirects to public immediately
      setAdminLoggedIn(false);
      setView("public");
      window.location.hash = "";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const currentView = view === "fading-out" ? "public" : view;

  return (
    <div className="font-sans min-h-screen flex flex-col" style={{ background: COLORS.BG, color: COLORS.TEXT }}>
      {currentView !== "admin" && (
        <Navbar
          toggleView={toggleView}
          currentView={currentView}
          theme={theme}
          toggleTheme={toggleTheme}
          COLORS={COLORS}
        />
      )}

      <div className="flex-grow">
        {currentView === "admin" && (
          adminLoggedIn ? (
            <AdminDashboard
              toggleView={toggleView}
              COLORS={COLORS}
              theme={theme}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin
              COLORS={COLORS}
              onLogin={() => {
                // When AdminLogin signals successful login, we rely on onAuthStateChanged
                // to set adminLoggedIn. But ensure view switches properly:
                setView("admin");
              }}
            />
          )
        )}

        {currentView === "company-profile" && (
          <CompanyProfile toggleView={toggleView} COLORS={COLORS} />
        )}

        {currentView === "service-details" && (
          <ServiceDetailsView service={selectedService} toggleView={toggleView} COLORS={COLORS}
            goToInquire={goToInquire}
          />
        )}

        {currentView === "services" && (
          <ServicesPage goToServiceDetails={goToServiceDetails} COLORS={COLORS} />
        )}
        {currentView === "inquire" && (
          <InquirePage
            service={selectedServiceForInquiry}
            toggleView={toggleView}
            COLORS={COLORS}
            onNavigateBack={handleInquireBack}
          />
        )}

        {(currentView === "public" || view === "fading-out") && (
          <PageTransitionWrapper isPublic={view === "public"}>
            <PublicView
              toggleView={toggleView}
              COLORS={COLORS}
              goToServiceDetails={goToServiceDetails}
              handleCompanyProfileClick={handleCompanyProfileClick}
            />
          </PageTransitionWrapper>
        )}
      </div>
    </div>
  );
}

