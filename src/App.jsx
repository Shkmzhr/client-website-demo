import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Users, TrendingUp, HardHat, Wrench, Zap, Shield, Linkedin, MapPin, Mail, Phone, Facebook, Twitter } from 'lucide-react';
// NEW ICON IMPORTS: Ensure this line includes all 9 icons
import {  Factory, Hotel, Truck, Building, HeartPulse, ShoppingCart, Mic } from 'lucide-react';
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
                        text="ARM Group" 
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
// 2. Hero Component 
// ===================================

const Hero = () => {
    // Hero is the only section not wrapped by FadeInSection as it is visible on load.
    return (
        <section id="hero" className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: DARK_BG }}>
            {/* Background pattern/image layer - Fixed position */}
            <div 
                className="absolute inset-0 opacity-10 bg-gray-900 bg-cover bg-center"
                style={{ 
                    // backgroundImage: "url('https://placehold.co/1200x800/544036/FBF9F6?text=ARM+Logo')",
                    backgroundAttachment: 'fixed' 
                }}
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
                <p 
                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto transition duration-700 opacity-100"
                >
                    ARM Group delivers highly skilled technical, maintenance, and construction personnel across the Middle East.
                </p>
               <motion.a 
                href="#services" 
                // Framer Motion Animation Properties
                animate={{
                    // Keyframe-like animation for the box shadow (the "flame/pulse")
                    boxShadow: [
                        `0 0 10px ${GLASS_ACCENT}50`, // Subtle start
                        `0 0 25px ${GLASS_ACCENT}90`, // Intense glow
                        `0 0 10px ${GLASS_ACCENT}50`, // Fade back
                    ],
                }}
                transition={{
                    duration: 3, // Duration of one pulse cycle
                    ease: "easeInOut", // Smooth in and out
                    repeat: Infinity, // Make it infinite
                    repeatType: "reverse", // Smoothly reverse the animation
                }}

                className="mt-10 inline-block px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-110"
                style={{ 
                    backgroundColor: GLASS_ACCENT, 
                    color: DARK_BG,
                    fontWeight: 700,
                    // Initial subtle glow (Framer Motion overwrites the boxShadow property here)
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
            <section id="about" className="py-16 md:py-24" style={{ backgroundColor: SOFT_CREAM }}>
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
                            For over two decades, ARM Group has been the reliable partner for major industrial and construction projects.
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
            </section>
        </FadeInSection>
    );
};

// ===================================
// 4. Services Component
// ===================================

const ServiceCard = ({ icon: Icon, title, description, bgImage }) => {
    // NOTE: DEEP_BROWN, ACCENT_SAND, SOFT_CREAM are assumed to be defined globally or in scope
    // const { DEEP_BROWN, ACCENT_SAND, SOFT_CREAM } = { DEEP_BROWN: '#544036', ACCENT_SAND: '#A88F68', SOFT_CREAM: '#FBF9F6' };
    return (
        <motion.div 
            whileHover={{ 
                scale: 1.05, 
                // Enhanced shadow on hover for a lift
                boxShadow: `0 15px 40px rgba(75, 137, 247, 0.5)`,
                transition: { type: "spring", stiffness: 250, damping: 15 } 
            }}
            className="group relative p-8 rounded-xl overflow-hidden cursor-pointer h-full backdrop-blur-sm"
            style={{ 
                // 💡 GLASS CARD STYLES
                backgroundColor: GLASS_BASE_BG, 
                border: GLASS_BORDER,
                boxShadow: GLASS_SHADOW,
                // Add blur to the card itself for extra depth
                backdropFilter: 'blur(3px)', 
            }}
        >
            {/* Background Image Layer: Set for depth, not visibility */}
            <motion.div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${bgImage})` }}
                // Keep the image dark and subtle
                initial={{ filter: 'grayscale(100%) brightness(0.1)' }} 
                whileHover={{ scale: 1.1, filter: 'grayscale(50%) brightness(0.4)', transition: { duration: 0.7 } }} 
            >
                {/* Overlay Layer: Ensures maximum darkness behind the card content */}
                <div 
                    className="absolute inset-0 transition-all duration-500 opacity-80 group-hover:opacity-95" 
                    style={{ backgroundColor: DARK_BG }}
                ></div>
            </motion.div>
            
            {/* Content Layer (Must be z-10) */}
            <div className="relative z-10">
                {/* ICON CONTAINER: Bright accent color, no intense glow */}
                <div 
                    className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 transition duration-300 group-hover:scale-110 group-hover:rounded-2xl" 
                    style={{ 
                        backgroundColor: GLASS_ACCENT, 
                        boxShadow: `0 0 15px ${GLASS_ACCENT}80`, // Subtle blue shadow
                    }}
                >
                    <Icon className="w-8 h-8" style={{ color: DARK_BG }} /> 
                </div>
                
                {/* TEXT: Primary text is white/light gray */}
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
};

//Services Section
const itemVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30, rotate: -1 }, // Starts small, low, invisible, and slightly tilted
    show: { 
        scale: 1, 
        opacity: 1, 
        rotate: 0, // Springs back to level
        transition: { type: "spring", stiffness: 100, damping: 10 }
    }
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08, // Time delay between each card animation start (0.08s)
            delayChildren: 0.1 // Small initial delay before the first card starts
        }
    }
};
const Services = () => {
   return (
        <FadeInSection>
            <section id="services" className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center" style={{ color: GLASS_ACCENT }}>
                        Our Specialized Services
                    </h2>
                    <p className="text-center max-w-3xl mx-auto mb-16 text-lg text-gray-600">
                        We provide skilled manpower on a rental and local transfer basis, as well as recruiting from overseas, to meet diverse client requirements across multiple industries.
                    </p>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show" // Trigger animation when the section scrolls into view
                        viewport={{ once: true, amount: 0.1 }} // Only run once when 10% of the section is visible
                    >
                        
                        {/* 1. OIL & GAS */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Factory}
                                title="Oil & Gas"
                                description="We supply experienced engineers, technicians, and field workers for oil rigs, refineries, and petrochemical plants. Our workforce is trained in international safety standards."
                                // bgImage={OilGasBg} 
                            />
                        </motion.div>
                        
                        {/* 2. HOSPITALITY */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Hotel}
                                title="Hospitality"
                                description="We provide professional hospitality staff, including: Receptionists, Housekeeping Teams, Kitchen Assistants, Waiters, and Service Crew, ensuring seamless service delivery."
                                // bgImage={HospitalityBg} 
                            />
                        </motion.div>
                        
                        {/* 3. LOGISTICS & WAREHOUSING */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Truck}
                                title="Logistics & Warehousing"
                                description="We provide manpower for: Forklift Operators, Loaders & Pickers, Packing Staff, and Inventory Management."
                                // bgImage={LogisticsBg} 
                            />
                        </motion.div>
                        
                        {/* 4. FACILITY MANAGEMENT */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Building}
                                title="Facility Management"
                                description="We support day-to-day building operations by supplying: Cleaners, Landscaping Teams, and Maintenance Technicians."
                                // bgImage={FacilityBg} 
                            />
                        </motion.div>
                        
                        {/* 5. CONSTRUCTION & SKILLED WORKERS */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={HardHat}
                                title="Construction & Skilled Workers"
                                description="We deploy skilled and unskilled workers such as: Masons, Carpenters, Electricians, Plumbers, Welders & Fabricators, and General Helpers."
                                // bgImage={ConstructionBg} 
                            />
                        </motion.div>
                        
                        {/* 6. TECHNICAL & HVAC MAINTENANCE */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Zap}
                                title="Technical & HVAC Maintenance"
                                description="Includes Electrical & Mechanical maintenance staff and HVAC technicians, ensuring efficient industrial plant and building operations."
                                // bgImage={HvacBg} 
                            />
                        </motion.div>
                        
                        {/* 7. HEALTHCARE */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={HeartPulse}
                                title="Healthcare"
                                description="We provide manpower to support hospitals, clinics, and healthcare facilities, including: Nursing Assistants, Patient Care Staff, and Administrative Support."
                                // bgImage={HealthcareBg} 
                            />
                        </motion.div>
                        
                        {/* 8. RETAIL & CUSTOMER SERVICE */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={ShoppingCart}
                                title="Retail & Customer Service"
                                description="We support retail chains and outlets with: Sales Associates, Cashiers, Store Helpers, and Customer Support Staff."
                                // bgImage={RetailBg} 
                            />
                        </motion.div>

                        {/* 9. EVENTS & ENTERTAINMENT */}
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                icon={Mic}
                                title="Events & Entertainment"
                                description="We supply temporary and long-term staff for events such as: Ushers & Event Helpers, Stage Crew, Catering Staff, and Security."
                                // bgImage={EventsBg} 
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </FadeInSection>
    );
};

// ===================================
// 5. Directors Component
// ===================================

const DirectorCard = ({ name, title, bio, imageUrl }) => (
    <div 
        className="rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition duration-300 transform hover:scale-[1.03]" 
        style={{ 
            backgroundColor: 'white',
        }}
    >
        <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-56 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/e0e0e0/555?text=Director"; }}
        />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-1" style={{ color: DEEP_BROWN }}>{name}</h3>
            <p className="font-medium mb-3" style={{ color: ACCENT_SAND }}>{title}</p>
            <p className="text-sm text-gray-600 italic">{bio}</p>
            <a href="#" className="mt-4 inline-block text-gray-400 hover:text-gray-700 transition duration-200">
                <Linkedin className="w-6 h-6 mx-auto" style={{ color: DEEP_BROWN }} />
            </a>
        </div>
    </div>
);

const Directors = () => {
    const directors = [
        { 
            name: "Mr. Mohammed Rizwan Ahmed", 
            title: "Chairman & CEO", 
            bio: "Visionary leader responsible for corporate strategy, financial oversight, and driving ARM's market expansion and ethical growth.", 
            // USING IMPORTED IMAGE
            imageUrl: MrRizwan 
        },
        { 
            name: "Mr. Mujeeb Ullah", 
            title: "Director & COO", 
            bio: "Oversees all operational aspects, streamlining mobilization, logistics, and compliance for highly efficient project execution.", 
            // USING IMPORTED IMAGE
            imageUrl: MrMujeeb 
        },
        { 
            name: "Mr. Mohammad Hamid Ansari", 
            title: "Director - Training & Development", 
            bio: "Specialist in developing soft services personnel for hospitality, housekeeping, and facility management, ensuring service excellence.", 
            // USING IMPORTED IMAGE
            imageUrl: MohammedHamid 
        },
    ];

    return (
        <FadeInSection>
            <section id="directors" className="py-16 md:py-24" style={{ backgroundColor: SOFT_CREAM }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            <ScrambleText 
                                text="Our Leadership" 
                                className="inline-block" 
                                color={DEEP_BROWN} 
                            />
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Guidance from industry veterans drives our commitment to quality and safety.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {directors.map((director, index) => (
                            <DirectorCard 
                                key={index} 
                                {...director} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </FadeInSection>
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
            <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: 'white' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            <ScrambleText 
                                text="Get In Touch" 
                                className="inline-block" 
                                color={DEEP_BROWN} 
                            />
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Have a question about services or a potential partnership? Send us a message below.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto p-8 rounded-xl shadow-2xl" style={{ backgroundColor: SOFT_CREAM, border: `1px solid ${ACCENT_SAND}` }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium" style={{ color: DEEP_BROWN }}>Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ACCENT_SAND focus:border-ACCENT_SAND p-3"
                                    style={{ borderColor: ACCENT_SAND }}
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium" style={{ color: DEEP_BROWN }}>Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ACCENT_SAND focus:border-ACCENT_SAND p-3"
                                    style={{ borderColor: ACCENT_SAND }}
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium" style={{ color: DEEP_BROWN }}>Message</label>
                                <textarea 
                                    id="message" 
                                    rows="4" 
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ACCENT_SAND focus:border-ACCENT_SAND p-3"
                                    style={{ borderColor: ACCENT_SAND }}
                                ></textarea>
                            </div>
                            
                            {/* Status Message */}
                            {status === 'success' && (
                                <p className="text-green-600 font-semibold text-center">Thank you! Your message has been received.</p>
                            )}

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="inline-block px-8 py-3 font-bold text-lg rounded-full shadow-xl transition duration-300 transform hover:scale-105"
                                    style={{ backgroundColor: ACCENT_SAND, color: DEEP_BROWN }}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
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
                            <h3 className="text-2xl font-bold mb-4" style={{ color: ACCENT_SAND }}>ARM Group</h3>
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
                                <a href="#" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Facebook className="w-6 h-6" /></a>
                                <a href="#" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Twitter className="w-6 h-6" /></a>
                                <a href="#" className="text-gray-400 hover:text-ACCENT_SAND transition duration-200"><Linkedin className="w-6 h-6" /></a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-gray-400 pt-4">
                        &copy; 2025 ARM Group. All rights reserved.
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
    // List of client logos imported above
    const clients = [
        { name: "NCC Group", logo: nccLogo },
        // { name: "ARM Group", logo: ArmGroup },
        { name: "Client Partner 1", logo: clientImage1 },
        { name: "Client Partner 2", logo: clientImage2 },
        { name: "Client Partner 3", logo: clientImage3 },
        { name: "Client Partner 4", logo: clientImage4 },
        { name: "Client Partner 5", logo: clientImage5},
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
        // Placeholder clients for better layout balance
        { name: "Placeholder Client 3", logo: "https://placehold.co/120x60/f0f0f0/544036?text=Partner+3" },
        { name: "Placeholder Client 4", logo: "https://placehold.co/120x60/f0f0f0/544036?text=Partner+4" },
        { name: "Placeholder Client 5", logo: "https://placehold.co/120x60/f0f0f0/544036?text=Partner+5" },
    ];

    return (
        <section id="clients" className="py-16 md:py-20" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        <ScrambleText 
                            text="Our Valued Client Portfolio" 
                            className="inline-block" 
                            color={DEEP_BROWN} 
                        />
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We are proud to partner with leading organizations across various industrial and commercial sectors.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 max-w-6xl mx-auto">
                    {clients.map((client, index) => (
                        <div 
                            key={index} 
                            className="w-36 h-20 flex items-center justify-center p-2 transition duration-500 hover:grayscale-0"
                            // Modern Grayscale Effect: Logos are grayed out until hovered
                            style={{ 
                                filter: 'grayscale(100%)', 
                                WebkitFilter: 'grayscale(100%)',
                                border: `1px solid ${SOFT_CREAM}`
                            }}
                        >
                            <img 
                                src={client.logo} 
                                alt={client.name} 
                                // Object-contain ensures the entire logo is visible within the container
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


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
// 10. CompanyProfile Page Component (UPDATED with OurClients)
// ===================================

const CompanyProfile = ({ toggleView }) => {
    // Colors defined at the top of App.jsx
    const { DEEP_BROWN, ACCENT_SAND, SOFT_CREAM } = { DEEP_BROWN: '#544036', ACCENT_SAND: '#A88F68', SOFT_CREAM: '#FBF9F6' };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: SOFT_CREAM }}>
            <div className="container mx-auto max-w-5xl pt-24 pb-12 flex-grow">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center" style={{ color: DEEP_BROWN }}>
                    <ScrambleText text="ARM SOLUTIONS - Company Profile" />
                </h1>

                <div className="grid md:grid-cols-3 gap-10 mb-10">
                    {/* Image 1: NCC Logo (using the imported image) */}
                    <div className="md:col-span-1 p-3 rounded-xl shadow-xl flex flex-col items-center justify-center" style={{ backgroundColor: 'white', border: `1px solid ${ACCENT_SAND}` }}>
                        {/* <h3 className="text-xl font-bold mb-3" style={{ color: DEEP_BROWN }}> abababa</h3> */}
                        <img 
                            // Using the imported variable here
                            src={arm2GroupPhoto} 
                            alt="ARM Logo " 
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110 rounded-sm"
                        />
                    </div>

                    {/* Overview Content */}
                    <div className="md:col-span-2 p-8 rounded-xl shadow-2xl" style={{ backgroundColor: 'white', borderLeft: `5px solid ${ACCENT_SAND}` }}>
                        <h2 className="text-3xl font-bold mb-4" style={{ color: DEEP_BROWN }}>Overview</h2>
                        <p className="text-gray-700 mb-4">
                            ARM Group specializes in providing **skilled manpower** on a rental and local transfer basis, as well as recruiting from overseas to meet diverse client requirements across multiple industries.]. Our services ensure that clients have access to qualified professionals whenever needed—helping them maintain efficiency, reduce operational costs, and achieve long-term success.].
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    
                    {/* Vision & Mission */}
                    <div className="p-8 rounded-xl shadow-xl border-t-4" style={{ backgroundColor: 'white', borderColor: DEEP_BROWN }}>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: ACCENT_SAND }}>Vision & Mission</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li>
                                <span className="font-bold" style={{ color: DEEP_BROWN }}>Vision:</span> To be the leading manpower solutions provider recognized for **excellence, reliability, and innovation** in workforce management.].
                            </li>
                            <li>
                                <span className="font-bold" style={{ color: DEEP_BROWN }}>Mission:</span> To deliver qualified, trained, and motivated manpower that drives our clients' success while fostering growth, safety, and satisfaction among our workforce.].
                            </li>
                        </ul>
                    </div>

                    {/* Image 2: Corporate Image Placeholder */}
                   <div className="p-6 rounded-xl shadow-xl flex flex-col items-center justify-center border-b-4" style={{ backgroundColor: 'white', borderColor: ACCENT_SAND }}>
    <h3 className="text-xl font-bold mb-3" style={{ color: DEEP_BROWN }}>Group photo</h3>
    <img 
        // Using the newly imported variable here
        src={armGroupPhoto} 
        alt="ARM Group Team Photo or Office" 
        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
    />
</div>
                </div>

                {/* Core Values Section */}
                <div className="mt-10 p-8 rounded-xl shadow-2xl" style={{ backgroundColor: 'white', borderRight: `5px solid ${DEEP_BROWN}` }}>
                    <h2 className="text-3xl font-bold mb-4" style={{ color: ACCENT_SAND }}>Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                        <div>
                            <p className="font-bold mb-1" style={{ color: DEEP_BROWN }}>Integrity</p>
                            <p className="text-sm">We operate with transparency and honesty in all business dealings.].</p>
                        </div>
                         <div>
                            <p className="font-bold mb-1" style={{ color: DEEP_BROWN }}>Excellence</p>
                            <p className="text-sm">We strive to deliver top-quality services that exceed expectations.].</p>
                        </div>
                         <div>
                            <p className="font-bold mb-1" style={{ color: DEEP_BROWN }}>Commitment</p>
                            <p className="text-sm">We are dedicated to client satisfaction and continuous improvement.].</p>
                        </div>
                         <div>
                            <p className="font-bold mb-1" style={{ color: DEEP_BROWN }}>Teamwork</p>
                            <p className="text-sm">Collaboration is key to achieving collective goals.].</p>
                        </div>
                         <div>
                            <p className="font-bold mb-1" style={{ color: DEEP_BROWN }}>Innovation</p>
                            <p className="text-sm">We continuously improve processes and training for better service delivery.].</p>
                        </div>
                    </div>
                </div>
                
                {/* INSERTED: Our Clients Section (Only visible on this page) */}
                <FadeInSection>
                    <div className="mt-12">
                         <OurClients />
                    </div>
                </FadeInSection>
 <Directors />
                <div className="mt-12 text-center">
                    <button 
                        onClick={() => { toggleView('public'); window.location.hash = ''; }}
                        className="px-6 py-3 text-base font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                        style={{ 
                            backgroundColor: ACCENT_SAND, 
                            color: DEEP_BROWN,
                            border: `2px solid ${DEEP_BROWN}`
                        }}
                    >
                        &larr; Back to Main Site
                    </button>
                </div>
            </div>
            {/* <Directors /> */}
            <Footer/>
        </div>
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