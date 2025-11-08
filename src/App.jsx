import React, { useState, useEffect, useCallback, useRef } from 'react';

import { motion, useScroll, useTransform,useSpring   } from 'framer-motion'; 
import { Menu, X, Globe, Users, TrendingUp, HardHat, Wrench, Zap, Shield, Linkedin, MapPin, Mail, Phone, Facebook, Twitter,MessageCircle  } from 'lucide-react';
// NEW ICON IMPORTS: Ensure this line includes all 9 icons
import {  Factory, Hotel, Truck, Building, HeartPulse, ShoppingCart, Mic, Pause, Play, Repeat  } from 'lucide-react';
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
import arm2GroupPhoto from './assets/clientimages/ARM-group-photo.jpeg';
import MrRizwan from './assets/clientimages/mohammedrizwanahmed.jpg';
import MrMujeeb from './assets/clientimages/mujeebullah.jpg';
import MohammedHamid from './assets/clientimages/mohammedhamidansari.jpg';
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

// CORE THEME COLORS (Dark Blue Glassmorphism)
const DARK_BG = '#08101F';      // Deep dark blue/black for background
const GLASS_ACCENT = '#4B89F7'; // Soft Electric Blue (Accent/Primary)
const BRIGHT_TEXT = '#FAFAFA';  // White/light gray for text

// GLASS EFFECT STYLES (Used for card and navbar backgrounds)
const GLASS_BASE_BG = 'rgba(255, 255, 255, 0.08)';
const GLASS_BORDER = `1px solid ${GLASS_ACCENT}30`;
const GLASS_SHADOW = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;

// Apply to old color variables for consistency
const DEEP_BROWN = DARK_BG;
const ACCENT_SAND = GLASS_ACCENT;
const SOFT_CREAM = DARK_BG;

// Characters used for the scrambling effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=';
const DURATION = 1000; // Total duration of the scramble effect in ms

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


// ===================================
// 1. Navbar Component
// ===================================

// UPDATED NavLink component for smooth scrolling and delay
const NavLink = ({ to, children, setIsOpen }) => {
    // NavLink logic remains the same
    const handleNavigation = (e) => {
        e.preventDefault();
        
        if (setIsOpen) {
            setIsOpen(false);
        }

        setTimeout(() => {
            const targetElement = document.getElementById(to);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            window.history.pushState(null, null, `#${to}`);
        }, 200); 
    };

    return (
        <a 
            href={`#${to}`} 
            onClick={handleNavigation}
            className="transition duration-300 block py-2 lg:py-0 lg:inline-block font-medium hover:scale-105"
            style={{ 
                color: BRIGHT_TEXT, 
                transition: 'color 0.3s', 
            }}
            onMouseEnter={(e) => {
                e.target.style.color = GLASS_ACCENT;
            }}
            onMouseLeave={(e) => {
                e.target.style.color = BRIGHT_TEXT;
            }}
        >
            {children}
        </a>
    );
};

const Navbar = ({ toggleView, currentView }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const isPublicView = currentView === 'public';

    // 🌟 FIX IS HERE: Changed 'company-profile' to the expected key 'profile'
    const handleCompanyProfileClick = (e) => {
        e.preventDefault();
        setIsOpen(false);
        toggleView('company-profile'); // <-- CORRECTED KEY
    };

    return (
        <header 
            className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md`}
            style={{ 
                backgroundColor: 'rgba(8, 16, 31, 0.8)', 
                borderBottom: GLASS_BORDER,
                boxShadow: GLASS_SHADOW,
                backdropFilter: 'blur(10px)',
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <ScrambleText 
                        text="ARM Solutions" 
                        className="tracking-widest" 
                        color={BRIGHT_TEXT} 
                    />
                </div>

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
                                className="transition duration-300 block py-2 lg:py-0 lg:inline-block font-medium hover:scale-105"
                                style={{ color: BRIGHT_TEXT }}
                                onMouseEnter={(e) => { e.target.style.color = GLASS_ACCENT; }}
                                onMouseLeave={(e) => { e.target.style.color = BRIGHT_TEXT; }}
                            >
                                Company Profile
                            </a>
                        </>
                    )}
                    
                    {/* Admin Login Button */}
                    <button 
                        onClick={() => toggleView && toggleView(isPublicView ? 'admin' : 'public')}
                        className="px-4 py-2 text-sm font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                        style={{ 
                            backgroundColor: isPublicView ? GLASS_ACCENT : DARK_BG, 
                            color: isPublicView ? DARK_BG : BRIGHT_TEXT,
                            border: `2px solid ${GLASS_ACCENT}`,
                        }}
                    >
                        {isPublicView ? 'Admin Login' : 'Back to Site'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 rounded-md transition duration-200 hover:bg-gray-800"
                    style={{ color: GLASS_ACCENT }}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div 
                    className="lg:hidden px-4 pt-2 pb-4 space-y-2 border-t" 
                    style={{ backgroundColor: DARK_BG, borderColor: GLASS_ACCENT }}
                >
                    {isPublicView && (
                        <>
                            <NavLink to="hero" setIsOpen={setIsOpen}>Home</NavLink>
                            <NavLink to="services" setIsOpen={setIsOpen}>Services</NavLink>
                            <NavLink to="directors" setIsOpen={setIsOpen}>Leadership</NavLink>
                            <NavLink to="contact" setIsOpen={setIsOpen}>Contact</NavLink>
                            <a 
                                href="#company-profile"
                                onClick={handleCompanyProfileClick} // Uses the corrected handler
                                className="transition duration-300 block py-2 lg:py-0 lg:inline-block font-medium hover:scale-105"
                                style={{ color: BRIGHT_TEXT }}
                                onMouseEnter={(e) => { e.target.style.color = GLASS_ACCENT; }}
                                onMouseLeave={(e) => { e.target.style.color = BRIGHT_TEXT; }}
                            >
                                Company Profile
                            </a>
                        </>
                    )}
                    
                    <button 
                        onClick={() => { toggleView && toggleView(isPublicView ? 'admin' : 'public'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm font-semibold rounded-md shadow-md transition duration-300 mt-2"
                         style={{ 
                            backgroundColor: isPublicView ? GLASS_ACCENT : DARK_BG, 
                            color: isPublicView ? DARK_BG : BRIGHT_TEXT,
                            border: `2px solid ${GLASS_ACCENT}`,
                        }}
                    >
                        {isPublicView ? 'Admin Login' : 'Back to Site'}
                    </button>
                </div>
            )}
        </header>
    );
};
// ===================================
const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, -350]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

    return (
        <section
            id="hero"
            className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: DARK_BG }}
        >
            {/* Enhanced Parallax Background */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1950&q=80')`,
                    y,
                    scale,
                }}
            ></motion.div>

            {/* Background pattern/image layer */}
            <div
                className="absolute inset-0 opacity-10 bg-gray-900 bg-cover bg-center"
                style={{ backgroundAttachment: 'fixed' }}
            ></div>

            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 opacity-80" style={{ backgroundColor: DEEP_BROWN }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    <ScrambleText text="Powering Infrastructure with" className="inline-block" color="white" />
                    <span style={{ color: ACCENT_SAND }} className="block">
                        <ScrambleText text="Expert Manpower" className="inline-block" color={ACCENT_SAND} />
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto transition duration-700 opacity-100">
                    ARM Solutions delivers highly skilled technical, maintenance, and construction personnel across the Middle East.
                </p>

                <motion.a
                    href="#services"
                    animate={{
                        boxShadow: [
                            `0 0 10px ${GLASS_ACCENT}50`,
                            `0 0 25px ${GLASS_ACCENT}90`,
                            `0 0 10px ${GLASS_ACCENT}50`,
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
                        backgroundColor: GLASS_ACCENT,
                        color: DARK_BG,
                        fontWeight: 700,
                        boxShadow: `0 0 10px ${GLASS_ACCENT}50`,
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

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div 
        className="p-6 rounded-xl shadow-lg border-t-4" 
        style={{ 
            backgroundColor: 'white', 
            borderColor: ACCENT_SAND, 
        }}
    >
        <Icon className="w-8 h-8 mb-4" style={{ color: DEEP_BROWN }} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);
const About = () => {
    return (
        <FadeInSection>
            <motion.section
                id="about"
                className="relative py-16 md:py-24 -mt-20 z-20"
                style={{ backgroundColor: SOFT_CREAM }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            <ScrambleText 
                                text="A Legacy of Trust and Excellence" 
                                className="inline-block" 
                                color={DEEP_BROWN} 
                            />
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            For over two decades, ARM Solutions has been the reliable partner for major industrial and construction projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Globe}
                            title="Global Reach"
                            description="Sourcing and mobilizing top talent from key regions worldwide to meet localized project demands."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Skilled Manpower"
                            description="Providing certified engineers, technicians, and specialized labor vetted for immediate deployment."
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Operational Efficiency"
                            description="Streamlining recruitment, logistics, and compliance processes to minimize project lead times."
                        />
                    </div>
                </div>
            </motion.section>
        </FadeInSection>
    );
};


// ===================================
// 4. Services Component
// ===================================

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


const ServiceCard = ({ icon: Icon, title, description, widthClass = "w-full" }) => (
    <motion.div 
        whileHover={{ 
            scale: 1.05, 
            boxShadow: `0 15px 40px rgba(75, 137, 247, 0.5)`,
            transition: { type: "spring", stiffness: 250, damping: 15 } 
        }}
        // widthClass is critical for the horizontal layout
        className={`group relative p-8 rounded-xl overflow-hidden cursor-pointer h-full backdrop-blur-sm flex-shrink-0 ${widthClass}`}
        style={{ 
            // 💡 GLASS CARD STYLES
            backgroundColor: GLASS_BASE_BG, 
            border: GLASS_BORDER,
            boxShadow: GLASS_SHADOW,
            backdropFilter: 'blur(3px)', 
        }}
    >
        <div className="relative z-10">
            <div 
                className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 transition duration-300 group-hover:scale-110 group-hover:rounded-2xl" 
                style={{ 
                    backgroundColor: GLASS_ACCENT, 
                    boxShadow: `0 0 15px ${GLASS_ACCENT}80`, 
                }}
            >
                <Icon className="w-8 h-8" style={{ color: DARK_BG }} /> 
            </div>
            
            <h3 
                className="text-2xl font-bold mb-3" 
                style={{ 
                    color: BRIGHT_TEXT, 
                }}
            >{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    </motion.div>
);

const Services = () => {
    
    // 1. Setup useRef for the container that generates the scroll distance
    const containerRef = useRef(null);
    const [scrollRange, setScrollRange] = useState(-1300);
useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth;
      setScrollRange(width < 768 ? -800 : -1300);
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

    
    // 2. Track the scroll progress of the container
 const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"], // starts when 70% visible
  });
    
    // 3. Define the horizontal translation (x) based on scroll progress
    // x is transformed from 0% scroll progress (0px) to 100% scroll progress (-1300px)
 const xRaw = useTransform(scrollYProgress, [0, 1], ["0px", `${scrollRange}px`]);
  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
    // Framer Motion Variants for vertical-in animation
 const itemVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30, rotate: -1 },
    show: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

   return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FramerFadeIn y={50}>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: GLASS_ACCENT }}
            >
              <ScrambleText
                text="Our Specialized Manpower Solutions"
                className="inline-block"
                color={GLASS_ACCENT}
              />
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              We cover a full spectrum of workforce needs for capital-intensive industries.
            </p>
            <p
              className="text-sm text-gray-400 mt-2 font-bold"
              style={{ color: GLASS_ACCENT }}
            >
              Scroll down — cards will move horizontally when section reaches 70%.
            </p>
          </FramerFadeIn>
        </div>
      </div>

      {/* --- Scroll Wrapper --- */}
      <div ref={containerRef} className="relative z-0" style={{ height: "300vh" }}>
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="w-full relative">
            {/* Gradient Edge Masks */}
            <div className="absolute left-0 top-0 h-full w-32 pointer-events-none bg-gradient-to-r from-[#08101F] to-transparent z-20"></div>
            <div className="absolute right-0 top-0 h-full w-32 pointer-events-none bg-gradient-to-l from-[#08101F] to-transparent z-20"></div>

            {/* Horizontal Track */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                style={{ x }}
                className="flex space-x-8 pb-8 md:pb-12"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={HardHat}
                    title="Construction"
                    description="Engineers, Foremen, Welders, and general labor for large-scale projects."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Wrench}
                    title="Maintenance & Shutdown"
                    description="Skilled technicians for industrial plant maintenance and critical shutdown operations."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Zap}
                    title="Technical & HVAC"
                    description="Experts in electrical systems, instrumentation, and HVAC services."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Shield}
                    title="Support Staff"
                    description="Trained security personnel, drivers, and administrative support roles."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Factory}
                    title="Oil & Gas"
                    description="Specialized manpower for oil rigs, refineries, and petrochemical plants."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Hotel}
                    title="Hospitality"
                    description="Soft services personnel, housekeeping, and facility management experts."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-shrink-0 w-72 md:w-80">
                  <ServiceCard
                    icon={Building}
                    title="Manufacturing"
                    description="Assembly line workers, quality control inspectors, and logistics support."
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// ===================================
// 5. Directors Component
// ===================================

const DirectorCard = ({ name, title, bio, imageUrl, index }) => (
  <motion.div
    className="rounded-2xl overflow-hidden text-center backdrop-blur-lg relative border transition-all duration-500 cursor-pointer"
    style={{
      background: GLASS_BASE_BG,
      border: GLASS_BORDER,
      boxShadow: GLASS_SHADOW,
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.2,
      duration: 0.7,
      ease: "easeOut",
    }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{
      scale: 1.05,
      boxShadow: `0 0 25px ${GLASS_ACCENT}80`,
      transition: { duration: 0.4 },
    }}
  >
    <motion.div
      className="overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={imageUrl}
        alt={name}
        className="w-full h-56 object-contain opacity-90"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x300/0a0a0a/777?text=Director";
        }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Accent glow ring */}
      <motion.div
        className="absolute inset-0 opacity-20"
        whileHover={{ opacity: 0.3 }}
        style={{
      background: `radial-gradient(circle at 50% 0%, ${GLASS_ACCENT}50, transparent 70%)`,
        }}
      ></motion.div>
    </motion.div>

    <div className="p-6">
      <h3
        className="text-xl font-bold mb-1"
        style={{ color: BRIGHT_TEXT }}
      >
        {name}
      </h3>
      <p
        className="font-medium mb-3"
        style={{ color: GLASS_ACCENT }}
      >
        {title}
      </p>
      <p className="text-sm text-gray-400 italic mb-4">{bio}</p>

      <motion.a
        href="#"
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="inline-block"
      >
        <Linkedin
          className="w-6 h-6 mx-auto"
          style={{ color: GLASS_ACCENT }}
        />
      </motion.a>
    </div>
  </motion.div>
);

const Directors = () => {
  const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -200]);

  const directors = [
    {
      name: "Mr. Mohammed Rizwan Ahmed",
      title: "Chairman & CEO",
      bio: "Visionary leader responsible for corporate strategy, financial oversight, and driving ARM's market expansion and ethical growth.",
      imageUrl: MrRizwan,
    },
    {
      name: "Mr. Mujeeb Ullah",
      title: "Director & COO",
      bio: "Oversees all operational aspects, streamlining mobilization, logistics, and compliance for highly efficient project execution.",
      imageUrl: MrMujeeb,
    },
    {
      name: "Mr. Mohammad Hamid Ansari",
      title: "Director - Training & Development",
      bio: "Specialist in developing soft services personnel for hospitality, housekeeping, and facility management, ensuring service excellence.",
      imageUrl: MohammedHamid,
    },
  ];

  return (
    <section
      id="directors"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: DARK_BG }}
    >
      {/* Moving Parallax Glow Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
     style={{
    background: `radial-gradient(circle at 50% 0%, ${GLASS_ACCENT}50, transparent 70%)`,
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
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: GLASS_ACCENT }}
          >
            <ScrambleText
              text="Our Leadership"
              className="inline-block"
              color={GLASS_ACCENT}
            />
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Guidance from industry veterans drives our commitment to
            quality, innovation, and safety.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {directors.map((director, index) => (
            <DirectorCard key={index} {...director} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// ===================================
// 6. Contact Form Component
// ===================================

const Contact = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
        setTimeout(() => setStatus(null), 4000);
        e.target.reset();
    };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: DARK_BG }}
      >
        {/* Animated glowing background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${GLASS_ACCENT}40, transparent 70%), 
                         radial-gradient(circle at 80% 80%, ${GLASS_ACCENT}30, transparent 70%)`,
          }}
          animate={{ opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="font-semibold uppercase mb-2 tracking-widest"
              style={{ color: GLASS_ACCENT }}
            >
              Connect With Us
            </p>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-6"
              style={{ color: BRIGHT_TEXT }}
            >
              Ready to Build Your Team?
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              style={{ lineHeight: "1.6" }}
            >
              Reach out today and let’s create workforce solutions that move your projects forward.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info Card */}
            <motion.div
              className="p-8 rounded-2xl backdrop-blur-lg border shadow-xl space-y-6"
              style={{
                background: GLASS_BASE_BG,
                border: GLASS_BORDER,
                boxShadow: GLASS_SHADOW,
              }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3
                className="text-2xl font-bold mb-6 border-b pb-2"
                style={{ color: BRIGHT_TEXT, borderColor: `${GLASS_ACCENT}40` }}
              >
                Our Details
              </h3>

              <div className="space-y-6 text-left">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6" style={{ color: GLASS_ACCENT }} />
                  <div>
                    <p className="font-semibold text-white">Headquarters</p>
                    <p className="text-gray-400">Riyadh, Kingdom of Saudi Arabia</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6" style={{ color: GLASS_ACCENT }} />
                  <div>
                    <p className="font-semibold text-white">Email Us</p>
                    <a
                      href="mailto:info@armsolutions.sa"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      info@armsolutions.sa
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6" style={{ color: GLASS_ACCENT }} />
                  <div>
                    <p className="font-semibold text-white">Call Us</p>
                    <a
                      href="tel:+966500000000"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      +966 50 000 0000
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 flex space-x-4">
                  {[Facebook, Linkedin, Twitter, MessageCircle].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="p-2 rounded-full backdrop-blur-sm border transition-all hover:scale-110"
                        style={{
                          color: GLASS_ACCENT,
                          borderColor: `${GLASS_ACCENT}30`,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-8 rounded-2xl backdrop-blur-lg border shadow-xl"
              style={{
                background: GLASS_BASE_BG,
                border: GLASS_BORDER,
                boxShadow: GLASS_SHADOW,
              }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: BRIGHT_TEXT }}
              >
                Send Us a Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-transparent border focus:outline-none focus:ring-2"
                  style={{
                    color: BRIGHT_TEXT,
                    borderColor: `${GLASS_ACCENT}40`,
                    focusRingColor: GLASS_ACCENT,
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-transparent border focus:outline-none focus:ring-2"
                  style={{
                    color: BRIGHT_TEXT,
                    borderColor: `${GLASS_ACCENT}40`,
                    focusRingColor: GLASS_ACCENT,
                  }}
                  required
                />
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-transparent border focus:outline-none focus:ring-2"
                  style={{
                    color: BRIGHT_TEXT,
                    borderColor: `${GLASS_ACCENT}40`,
                    focusRingColor: GLASS_ACCENT,
                  }}
                  required
                ></textarea>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${GLASS_ACCENT}` }}
                  transition={{ duration: 0.3 }}
                  className="w-full py-3 font-semibold rounded-lg transition-all"
                  style={{
                    backgroundColor: GLASS_ACCENT,
                    color: DARK_BG,
                  }}
                >
                  Submit Inquiry
                </motion.button>
              </form>

              {status === "success" && (
                <p className="mt-4 text-green-400 text-center">
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

const Footer = () => {
    const geometricStyle = {
        backgroundColor: DEEP_BROWN,
        backgroundImage: `repeating-linear-gradient(
            45deg,
            ${DEEP_BROWN} 0%,
            ${DEEP_BROWN} 1px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 3px
        )`,
    };

    return (
        <FadeInSection>
            <footer id="footer" className="text-white py-12" style={geometricStyle}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-8 mb-8" style={{ borderColor: ACCENT_SAND }}>
                        {/* Company Info */}
                        <div className="transition duration-700">
                            <h3 className="text-2xl font-bold mb-4" style={{ color: ACCENT_SAND }}>ARM Solutions</h3>
                            <p className="text-sm text-gray-300">
                                Delivering skilled manpower solutions for infrastructure and industrial projects across the MENA region.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="transition duration-700">
                            <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: ACCENT_SAND }}>Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#about" className="hover:text-ACCENT_SAND transition duration-200">About Us</a></li>
                                <li><a href="#services" className="hover:text-ACCENT_SAND transition duration-200">Our Services</a></li>
                                <li><a href="#" className="hover:text-ACCENT_SAND transition duration-200">Careers</a></li>
                                <li><a href="#" className="hover:text-ACCENT_SAND transition duration-200">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="transition duration-700">
                            <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: ACCENT_SAND }}>Contact Details</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-3" style={{ color: ACCENT_SAND }} />
                                    Riyadh, Kingdom of Saudi Arabia
                                </li>
                                <li className="flex items-center">
                                    <Phone className="w-5 h-5 mr-3" style={{ color: ACCENT_SAND }} />
                                    +966 50 123 4567
                                </li>
                                <li className="flex items-center">
                                    <Mail className="w-5 h-5 mr-3" style={{ color: ACCENT_SAND }} />
                                    info@arm-group.com
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="transition duration-700">
                            <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: ACCENT_SAND }}>Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" target="_blank" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Facebook className="w-6 h-6" /></a>
                                <a href="#" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Twitter className="w-6 h-6" /></a>
                                <a href="#" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Linkedin className="w-6 h-6" /></a>
                                  {/* <a href="https://wa.me/XXXXXXXXXX" target="_blank" className="text-green-500 hover:text-green-300 transition" aria-label="WhatsApp">
                                <MessageCircle  className="h-6 w-6" />
                            </a> */}
                              <a href="https://wa.me/+917097453414" target="_blank" className="text-green-500 hover:text-green-300 transition" aria-label="WhatsApp">
                                <MessageCircle  className="h-6 w-6" />
                            </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-gray-400 pt-4">
                        &copy; 2025 ARM Solutions. All rights reserved.
                    </div>
                </div>
            </footer>
        </FadeInSection>
    );
};

// ===================================
// 8. NEW OurClients Component (Now Defined Here)
// ===================================

const OurClients = () => {
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
            <ScrambleText text="Our Valued Clients" />
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

const AdminDashboard = ({ toggleView }) => {
    return (
        <div className="min-h-screen p-8 flex-grow" style={{ backgroundColor: SOFT_CREAM }}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-extrabold" style={{ color: DEEP_BROWN }}>
                        Admin Dashboard
                    </h2>
                    <button 
                        onClick={() => toggleView && toggleView('public')}
                        className="px-4 py-2 text-sm font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                        style={{ 
                            backgroundColor: ACCENT_SAND, 
                            color: DEEP_BROWN,
                            border: `2px solid ${DEEP_BROWN}`
                        }}
                    >
                        Back to Site
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Cards are static on the Admin page */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900">1,250</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                        <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                        <p className="text-3xl font-bold text-gray-900">45</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: ACCENT_SAND }}>
                        <p className="text-sm font-medium text-gray-500">Active Contracts</p>
                        <p className="text-3xl font-bold text-gray-900">32</p>
                    </div>
                </div>

                <div className="mt-10 p-8 rounded-xl shadow-lg" style={{ backgroundColor: 'white' }}>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center text-gray-700 p-3 rounded-lg" style={{ backgroundColor: SOFT_CREAM }}>
                            <span>New Engineer application from India</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                        </li>
                        <li className="flex justify-between items-center text-gray-700 p-3 rounded-lg" style={{ backgroundColor: SOFT_CREAM }}>
                            <span>Contract #A901 renewed with PetroCorp</span>
                            <span className="text-xs text-gray-500">Yesterday</span>
                        </li>
                        <li className="flex justify-between items-center text-gray-700 p-3 rounded-lg" style={{ backgroundColor: SOFT_CREAM }}>
                            <span>System alert: Database backup successful</span>
                            <span className="text-xs text-gray-500">5 minutes ago</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// ===================================
// 10. CompanyProfile Page Component (Dark Glassmorphic Version)
// ===================================



const CompanyProfile = ({ toggleView }) => {
  const { DARK_BG, GLASS_ACCENT, BRIGHT_TEXT, GLASS_BASE_BG, GLASS_BORDER, GLASS_SHADOW } = {
    DARK_BG: "#08101F",
    GLASS_ACCENT: "#4B89F7",
    BRIGHT_TEXT: "#FAFAFA",
    GLASS_BASE_BG: "rgba(255, 255, 255, 0.08)",
    GLASS_BORDER: `1px solid #4B89F730`,
    GLASS_SHADOW: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: DARK_BG }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${GLASS_ACCENT}40, transparent 70%),
                       radial-gradient(circle at 80% 80%, ${GLASS_ACCENT}30, transparent 70%)`,
        }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="container mx-auto max-w-5xl pt-24 pb-12 flex-grow relative z-10">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
          style={{ color: BRIGHT_TEXT }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrambleText text="ARM SOLUTIONS — Company Profile" color={GLASS_ACCENT} />
        </motion.h1>

        {/* Top Grid (Image + Overview) */}
        <motion.div
          className="grid md:grid-cols-3 gap-10 mb-10"
initial={{ opacity: 0.7, scale: 1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Company Image */}
          <div
            className="md:col-span-1 p-3 rounded-2xl backdrop-blur-md border flex flex-col items-center justify-center"
            style={{
              background: GLASS_BASE_BG,
              border: GLASS_BORDER,
              boxShadow: GLASS_SHADOW,
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
              background: GLASS_BASE_BG,
              border: GLASS_BORDER,
              boxShadow: GLASS_SHADOW,
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: GLASS_ACCENT }}>
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">
              ARM Solutions specializes in providing <span className="text-white font-semibold">skilled manpower</span> on a rental and local transfer basis, as well as recruiting from overseas to meet diverse client requirements across multiple industries. Our services ensure that clients have access to qualified professionals whenever needed — helping them maintain efficiency, reduce operational costs, and achieve long-term success.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
   initial={{ opacity: 0.7, scale: 1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div
            className="p-8 rounded-2xl backdrop-blur-md border-t-4"
            style={{
              background: GLASS_BASE_BG,
              borderColor: GLASS_ACCENT,
              boxShadow: GLASS_SHADOW,
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: GLASS_ACCENT }}>
              Vision & Mission
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li>
                <span className="font-bold text-white">Vision:</span> To be the leading manpower solutions provider recognized for <span className="text-blue-400">excellence, reliability, and innovation</span> in workforce management.
              </li>
              <li>
                <span className="font-bold text-white">Mission:</span> To deliver qualified, trained, and motivated manpower that drives our clients' success while fostering growth, safety, and satisfaction among our workforce.
              </li>
            </ul>
          </div>

          <div
            className="p-6 rounded-2xl backdrop-blur-md border-b-4 flex flex-col items-center justify-center"
            style={{
              background: GLASS_BASE_BG,
              borderColor: GLASS_ACCENT,
              boxShadow: GLASS_SHADOW,
            }}
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: BRIGHT_TEXT }}>
              Group Photo
            </h3>
           <img
  src={armGroupPhoto}
  alt="ARM Logo"
  loading="lazy"
  className="w-full h-auto object-contain rounded-md"
/>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mt-12 p-8 rounded-2xl backdrop-blur-md border shadow-2xl"
          style={{
            background: GLASS_BASE_BG,
            border: GLASS_BORDER,
            boxShadow: GLASS_SHADOW,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: GLASS_ACCENT }}>
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
            {[
              ["Integrity", "We operate with transparency and honesty in all business dealings."],
              ["Excellence", "We strive to deliver top-quality services that exceed expectations."],
              ["Commitment", "We are dedicated to client satisfaction and continuous improvement."],
              ["Teamwork", "Collaboration is key to achieving collective goals."],
              ["Innovation", "We continuously improve processes and training for better service delivery."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-bold mb-2 text-white">{title}</p>
                <p className="text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients + Directors */}
        <FadeInSection>
          <div className="mt-12">
            <OurClients />
          </div>
        </FadeInSection>

        <Directors />

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
              backgroundColor: GLASS_ACCENT,
              color: DARK_BG,
              border: `2px solid ${GLASS_ACCENT}`,
            }}
          >
            &larr; Back to Main Site
          </button>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};


// ===================================
// 11. Public View Wrapper
// ===================================
const PublicView = ({ toggleView }) => (
    <>
        <main className="flex-grow">
            <Hero /> 
            <About /> 
            <Services />
            {/* Removed <OurClients /> from here */}
            <Directors />
            <Contact />
        </main>
        <Footer />
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

    // Toggle view function: used by Navbar and AdminDashboard buttons
    const toggleView = (targetView) => {
        if (targetView !== 'public' && targetView !== 'admin' && targetView !== 'company-profile') {
            return; 
        }

        // Determine the hash for the target view
        let targetHash = '';
        if (targetView === 'admin') targetHash = ADMIN_HASH;
        if (targetView === 'company-profile') targetHash = COMPANY_PROFILE_HASH;

        // Apply fade-out effect when leaving the main public view
        if (view === 'public' && (targetView === 'admin' || targetView === 'company-profile')) {
            setView('fading-out'); 
            setTimeout(() => {
                window.location.hash = targetHash;
                setView(targetView);
            }, 500); // Wait for PageTransitionWrapper to fade out
        } else {
            // Instant switch (e.g., admin to public, or public to section scroll)
            window.location.hash = targetHash;
            setView(targetView);
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
        <div className="font-sans min-h-screen flex flex-col" style={{ backgroundColor: SOFT_CREAM }}>
            {/* Navbar is rendered for public and company-profile views */}
            {currentView !== 'admin' && <Navbar toggleView={toggleView} currentView={currentView} />}
            
            <div className="flex-grow">
                {currentView === 'admin' && (
                    // The Admin Dashboard remains static
                    <AdminDashboard toggleView={toggleView} />
                )}
                
                {/* Render the CompanyProfile page */}
                {currentView === 'company-profile' && (
                    <CompanyProfile toggleView={toggleView} />
                )}

                {(currentView === 'public' || view === 'fading-out') && (
                    // The Public View is wrapped in the transition logic
                    <PageTransitionWrapper isPublic={view === 'public'}>
                        <PublicView toggleView={toggleView} />
                    </PageTransitionWrapper>
                )}
            </div>
        </div>
    );
}