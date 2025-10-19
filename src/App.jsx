import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Globe, Users, TrendingUp, HardHat, Wrench, Zap, Shield, Linkedin, MapPin, Mail, Phone, Facebook, Twitter } from 'lucide-react';

// ===================================
// 0. Color Definitions & Utilities
// ===================================

const DEEP_BROWN = '#544036'; // Primary/Text Color
const ACCENT_SAND = '#A88F68'; // Secondary/Accent Color
const SOFT_CREAM = '#FBF9F6'; // Background Color

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
    const handleNavigation = (e) => {
        e.preventDefault();
        
        // 1. Close mobile menu immediately if open
        if (setIsOpen) {
            setIsOpen(false);
        }

        // 2. Introduce a short delay (e.g., 200ms) for smoothness
        setTimeout(() => {
            const targetElement = document.getElementById(to);
            if (targetElement) {
                // 3. Use smooth scroll behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Optionally update the URL hash after scrolling starts
            window.history.pushState(null, null, `#${to}`);
        }, 200); // 200ms delay for smooth transition
    };

    return (
        <a 
            href={`#${to}`} 
            onClick={handleNavigation}
            className="transition duration-300 block py-2 lg:py-0 lg:inline-block font-medium hover:scale-105"
            style={{ color: DEEP_BROWN, '--tw-text-hover-opacity': 1, ':hover': { color: ACCENT_SAND } }}
        >
            {children}
        </a>
    );
};

const Navbar = ({ toggleView, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isPublicView = currentView === 'public';

    return (
        <header 
            className={`sticky top-0 z-50 border-b border-gray-100 transition-all duration-300`}
            style={{ 
                backgroundColor: SOFT_CREAM,
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)'
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <ScrambleText text="ARM Group" className="tracking-widest" color={DEEP_BROWN} />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {isPublicView && (
                        <>
                            <NavLink to="hero">Home</NavLink>
                            <NavLink to="about">About Us</NavLink>
                            <NavLink to="services">Services</NavLink>
                            <NavLink to="directors">Leadership</NavLink>
                            <NavLink to="contact">Contact</NavLink> 
                        </>
                    )}
                    
                    <button 
                        onClick={() => toggleView && toggleView(isPublicView ? 'admin' : 'public')}
                        className="px-4 py-2 text-sm font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                        style={{ 
                            backgroundColor: isPublicView ? DEEP_BROWN : ACCENT_SAND, 
                            color: isPublicView ? SOFT_CREAM : DEEP_BROWN,
                            border: `2px solid ${DEEP_BROWN}`
                        }}
                    >
                        {isPublicView ? 'Admin Login' : 'Back to Site'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 rounded-md transition duration-200 hover:bg-gray-200"
                    style={{ color: DEEP_BROWN }}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                 <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 border-t" style={{ backgroundColor: SOFT_CREAM, borderColor: DEEP_BROWN }}>
                    {isPublicView && (
                        <>
                            <NavLink to="hero" setIsOpen={setIsOpen}>Home</NavLink>
                            <NavLink to="about" setIsOpen={setIsOpen}>About Us</NavLink>
                            <NavLink to="services" setIsOpen={setIsOpen}>Services</NavLink>
                            <NavLink to="directors" setIsOpen={setIsOpen}>Leadership</NavLink>
                            <NavLink to="contact" setIsOpen={setIsOpen}>Contact</NavLink>
                        </>
                    )}
                    
                    <button 
                        onClick={() => { toggleView && toggleView(isPublicView ? 'admin' : 'public'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm font-semibold rounded-md shadow-md transition duration-300 mt-2"
                        style={{ 
                            backgroundColor: isPublicView ? DEEP_BROWN : ACCENT_SAND, 
                            color: isPublicView ? SOFT_CREAM : DEEP_BROWN,
                            border: `2px solid ${DEEP_BROWN}`
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
        <section id="hero" className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: DEEP_BROWN }}>
            {/* Background pattern/image layer - Fixed position */}
            <div 
                className="absolute inset-0 opacity-10 bg-gray-900 bg-cover bg-center"
                style={{ 
                    backgroundImage: "url('https://placehold.co/1200x800/544036/FBF9F6?text=ARM+Logo')",
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
                <a 
                    href="#services" 
                    className="inline-block px-8 py-3 font-bold text-lg rounded-full shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                    style={{ backgroundColor: ACCENT_SAND, color: DEEP_BROWN }}
                >
                    Explore Our Services
                </a>
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

const ServiceCard = ({ icon: Icon, title, description }) => (
    <div 
        className="p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1" 
        style={{ 
            backgroundColor: 'white',
        }}
    >
        <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 transition duration-300 group-hover:scale-110" style={{ backgroundColor: ACCENT_SAND }}>
            <Icon className="w-8 h-8" style={{ color: DEEP_BROWN }} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Services = () => {
    return (
        <FadeInSection>
            <section id="services" className="py-16 md:py-24" style={{ backgroundColor: 'white' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            <ScrambleText 
                                text="Our Specialized Manpower Solutions" 
                                className="inline-block" 
                                color={DEEP_BROWN} 
                            />
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We cover a full spectrum of workforce needs for capital-intensive industries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceCard
                            icon={HardHat}
                            title="Construction"
                            description="Engineers, Foremen, Welders, and general labor for large-scale projects."
                        />
                        <ServiceCard
                            icon={Wrench}
                            title="Maintenance & Shutdown"
                            description="Skilled technicians for industrial plant maintenance and critical shutdown operations."
                        />
                        <ServiceCard
                            icon={Zap}
                            title="Technical & HVAC"
                            description="Experts in electrical systems, instrumentation, and Heating, Ventilation, and AC."
                        />
                        <ServiceCard
                            icon={Shield}
                            title="Support Staff"
                            description="Trained security personnel, drivers, and administrative support roles."
                        />
                    </div>
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
            className="w-full h-56 object-cover"
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
            imageUrl: "https://placehold.co/400x300/544036/FBF9F6?text=R.A" 
        },
        { 
            name: "Mr. Mujeeb Ullah", 
            title: "Director & COO", 
            bio: "Oversees all operational aspects, streamlining mobilization, logistics, and compliance for highly efficient project execution.", 
            imageUrl: "https://placehold.co/400x300/A88F68/544036?text=M.U" 
        },
        { 
            name: "Mr. Mohammad Hamid Ansari", 
            title: "Director - Training & Development", 
            bio: "Specialist in developing soft services personnel for hospitality, housekeeping, and facility management, ensuring service excellence.", 
            imageUrl: "https://placehold.co/400x300/544036/A88F68?text=M.H.A" 
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
// 8. Admin Dashboard Component (STATIC)
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
// 9. Public View Component (Container for all public elements)
// ===================================
const PublicView = ({ toggleView, view }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar toggleView={toggleView} currentView={view} /> 
        <main className="flex-grow">
            <Hero /> {/* No FadeInSection - always visible on load */}
            <About />
            <Services />
            <Directors />
            <Contact />
        </main>
        <Footer />
    </div>
);


// ===================================
// 10. Main App Component
// ===================================

const App = () => {
    const getInitialView = () => {
        const path = window.location.hash;
        if (path === '#admin-key-123') {
            return 'admin';
        }
        return 'public';
    };

    const [view, setView] = useState(getInitialView);

    const toggleView = (targetView) => {
        // Handle fade-out transition when leaving public view
        if (view === 'public' && targetView === 'admin') {
            setView('fading-out'); 
            setTimeout(() => {
                window.location.hash = 'admin-key-123';
                setView('admin');
            }, 500); 
        } else {
            if (targetView === 'admin') {
                 window.location.hash = 'admin-key-123';
            } else {
                 window.location.hash = '';
            }
            setView(targetView);
        }
    };

    useEffect(() => {
        const handleHashChange = () => {
            const newView = getInitialView();
            // This is only for external hash changes, internal navigation uses handleNavigation
            if (view !== newView && view !== 'fading-out') {
                setView(newView);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [view]);

    const currentView = view === 'fading-out' ? 'public' : view;

    return (
        <div className="font-sans">
            {/* The PageTransitionWrapper handles the full fade when toggling Admin/Public */}
            {(currentView === 'public' || view === 'fading-out') ? (
                <PageTransitionWrapper isPublic={view === 'public'}>
                    <PublicView toggleView={toggleView} view={currentView} />
                </PageTransitionWrapper>
            ) : (
                // The Admin Dashboard remains static
                <AdminDashboard toggleView={toggleView} />
            )}
        </div>
    );
};

export default App;
