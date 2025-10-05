import React, { useState, useEffect, useRef } from 'react';
import { Truck, Handshake, ChevronRight, Briefcase, Users, Shield, Globe, Fuel, UtensilsCrossed, Settings, Warehouse, MapPin, Mail, Phone, Menu, X, ArrowLeft, ArrowRight } from 'lucide-react';

// --- Color Palette ---
// arm-blue: Primary brand color
// arm-gold: Secondary accent color

// ====================================================================
// Mock Data for Client Logos
// ====================================================================

const CLIENT_LOGOS = [
    // ----------------------------------------------------------------
    // 1. Logos with Provided Image IDs
    // ----------------------------------------------------------------
    { name: "National Contracting Company (NCC)", url: "uploaded:image_39eefe.png-3c1fd9f1-437a-49ec-ac55-c4eb2164037d" },
    { name: "Musanadah", url: "uploaded:image_39ef1e.png-74f27426-07fe-4786-bfd3-c8c17f07faf1" },
    { name: "Rezayat Group", url: "uploaded:image_39ef3d.png-68e2625e-62e8-4366-9e7e-167c5e61ad51" },
    
    // ----------------------------------------------------------------
    // 2. LOGO ADDED BY USER (WhatsApp Image 2025-05-08)
    // ----------------------------------------------------------------
    { 
        name: "Punjab National Bank", 
        url: "uploaded:WhatsApp Image 2025-05-08 at 8.06.53 PM.jpeg-7d7bff67-c40e-47d5-b45b-c62003f09c17" 
    }, 
    
    // ----------------------------------------------------------------
    // 3. Remaining Placeholder Logos
    // ----------------------------------------------------------------
    { name: "Pro-Source", url: "uploaded:image_39ef45.png-68a2b843-b379-4ab2-86dc-851200cb1393" },
    { name: "Client Logo (Uploaded)", url: "uploaded:image_06a885.png-b4a8fc2b-ea8d-461d-85b2-b3019c5cdecd" }, 
    { name: "New Client Logo 2 (Replace URL)", url: "uploaded:client_logo_2.png-unique-id-here" },
    { name: "International Maritime Industries", url: "https://placehold.co/150x80/0d9488/ffffff?text=IMI" },
    { name: "Rukn Al Jouf", url: "https://placehold.co/150x80/7c3aed/ffffff?text=Rukn+Al+Jouf" },
    { name: "Sadara", url: "https://placehold.co/150x80/16a34a/ffffff?text=Sadara" },
    { name: "Zamil Operations & Maintenance (ZOMCO)", url: "https://placehold.co/150x80/f43f5e/ffffff?text=ZOMCO" },
    { name: "Nesma Partners", url: "https://placehold.co/150x80/22d3ee/1e3a8a?text=Nesma" },
    { name: "Al-Baik", url: "https://placehold.co/150x80/fbbf24/1e3a8a?text=Al-Baik" },
    { name: "Tamimi", url: "https://placehold.co/150x80/9ca3af/1e3a8a?text=Tamimi" },
    { name: "National Contracting Management Services (NCMS)", url: "https://placehold.co/150x80/999999/ffffff?text=NCMS" },
    { name: "Gulfaar", url: "https://placehold.co/150x80/555555/ffffff?text=Gulfaar" },
    { name: "Nova Star Contracting Company", url: "https://placehold.co/150x80/777777/ffffff?text=Nova+Star" },
    { name: "Saudi Arabian Amiantit", url: "https://placehold.co/150x80/888888/ffffff?text=Amiantit" },
    { name: "SmascO", url: "https://placehold.co/150x80/333333/ffffff?text=SmascO" },
    { name: "Orient Yeild", url: "https://placehold.co/150x80/AAAAAA/111111?text=Orient+Yeild" },
    { name: "Mukamel Company Limited", url: "https://placehold.co/150x80/BBBBBB/111111?text=Mukamel" },
    { name: "Jabir Harbi Groups (JSG)", url: "https://placehold.co/150x80/CCCCCC/111111?text=JSG" },
    { name: "AL Nahid Pharmacy", url: "https://placehold.co/150x80/DDDDDD/111111?text=Al+Nahid" },
    { name: "AL Dawa Pharmacy", url: "https://placehold.co/150x80/EEEEEE/111111?text=Al+Dawa" },
    { name: "Karan International", url: "https://placehold.co/150x80/111111/EEEEEE?text=Karan" },
];

// Combine the list to simulate infinite scrolling without duplicating images in the DOM initially
const logosForDisplay = [...CLIENT_LOGOS, ...CLIENT_LOGOS]; 


// ====================================================================
// 1. Header Component
//    (Updated to include the new 'Clients' page)
// ====================================================================

// NavLink now uses an onClick handler instead of a direct href
const NavLink = ({ pageKey, children, currentPage, setCurrentPage }) => (
    <button 
        onClick={() => setCurrentPage(pageKey)}
        className="relative py-2 transition-colors duration-300 group font-medium"
    >
        <span className={`${currentPage === pageKey ? 'text-arm-blue font-semibold' : 'text-gray-700 hover:text-arm-blue'}`}>
            {children}
        </span>
        <span 
            className={`absolute bottom-0 left-0 h-[2px] bg-arm-gold transition-all duration-300 ${
                currentPage === pageKey ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
        ></span>
    </button>
);

const Header = ({ currentPage, setCurrentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', pageKey: 'home' },
        { name: 'About Us', pageKey: 'about' },
        { name: 'Services', pageKey: 'services' },
        { name: 'Clients', pageKey: 'clients' }, // NEW: Clients page
        { name: 'Contact', pageKey: 'contact' },
    ];
    
    // Function to handle link clicks and close the menu
    const handleNavClick = (pageKey) => {
        setCurrentPage(pageKey);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    };

    return (
        <header 
            className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 
                ${isScrolled 
                    ? 'bg-white shadow-xl py-4' 
                    : 'bg-white/95 backdrop-blur-sm py-5 border-b border-gray-100'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <button 
                        onClick={() => handleNavClick('home')} 
                        className="flex items-center space-x-2 text-2xl font-bold text-arm-blue group"
                    >
                        <Truck className="w-6 h-6 text-arm-gold transition-transform duration-300 group-hover:rotate-12" />
                        <span>ARM Manpower</span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:space-x-8">
                        {navItems.map(item => (
                            <NavLink 
                                key={item.pageKey} 
                                pageKey={item.pageKey} 
                                currentPage={currentPage}
                                setCurrentPage={handleNavClick}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Contact Button (Desktop) */}
                    <div className="hidden lg:block">
                        <button 
                            onClick={() => handleNavClick('contact')}
                            className="px-5 py-2 text-sm font-semibold text-white bg-arm-blue rounded-xl hover:bg-arm-blue/90 transition duration-300 shadow-md"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Sliding Animation) */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col">
                    {navItems.map(item => (
                        <button 
                            key={item.pageKey} 
                            onClick={() => handleNavClick(item.pageKey)}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-arm-blue/10 hover:text-arm-blue transition duration-300 text-left"
                        >
                            {item.name}
                        </button>
                    ))}
                    <button 
                        onClick={() => handleNavClick('contact')}
                        className="mt-4 block px-3 py-2 text-center text-base font-semibold text-white bg-arm-gold rounded-xl hover:bg-arm-gold/90 transition duration-300 shadow-lg"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};


// ====================================================================
// 2. Home Page Component (Unchanged)
// ====================================================================

const HomePage = ({ setCurrentPage }) => {
    return (
        <section 
            id="home" 
            className="relative bg-white pt-40 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-[90vh]" 
        >
            {/* Background Shape */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/E5E7EB/4B5563?text=ARM+Manpower+Solutions+Background')" }}></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        <span className="inline-flex items-center text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                            <Truck className="w-4 h-4 mr-2" />
                            Manpower Solutions Since 2012
                        </span>
                        
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                            <span className="block">Your Reliable Partner for</span> 
                            <span className="block text-arm-blue">Skilled Manpower Supply</span>
                        </h1>
                        
                        <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:max-w-xl md:mt-5 lg:mx-0">
                            We specialize in providing skilled, reliable, and compliant workforce solutions across Oil & Gas, Construction, Hospitality, and Logistics sectors.
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <button 
                                onClick={() => setCurrentPage('contact')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-arm-blue hover:bg-arm-blue/90 transition duration-300 transform hover:scale-[1.02] active:scale-100"
                            >
                                <Handshake className="w-5 h-5 mr-2" />
                                Hire Your Team Now
                            </button>
                            <button 
                                onClick={() => setCurrentPage('services')} 
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-arm-blue text-base font-medium rounded-xl text-arm-blue bg-white hover:bg-gray-50 transition duration-300"
                            >
                                Our Services
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-5 flex justify-center">
                        <div className="w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl">
                            <img 
                                className="w-full h-auto object-cover" 
                                src="https://placehold.co/600x400/808080/FFFFFF?text=Skilled+Workers" 
                                alt="Skilled workers ready for deployment" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ====================================================================
// 3. About Page Component (Unchanged)
// ====================================================================

// Feature card component with smooth animation
const FeatureCard = ({ icon: Icon, title, description, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Simple sequential fade-in animation on mount
    useEffect(() => {
        // Use a small delay to make the entrance feel smoother
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100 * index); 

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div 
            className={`p-6 bg-white rounded-xl shadow-lg border-t-4 border-arm-gold transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.03] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="flex items-start space-x-4">
                <div className="p-3 bg-arm-blue/10 rounded-full flex-shrink-0">
                    <Icon className="w-6 h-6 text-arm-blue" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-arm-blue mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};


const AboutPage = ({ setCurrentPage }) => {
    return (
        <section 
            id="about" 
            className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-screen"
        >
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                
                {/* Left Column: Text and Intro */}
                <div className="mb-12 lg:mb-0">
                    <span className="inline-block text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                        Who We Are
                    </span>
                    
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                        <span className="block">Manpower Solutions</span>
                        <span className="block text-arm-blue">Built on Trust and Quality</span>
                    </h2>
                    
                    <p className="text-lg text-gray-700 mb-6">
                        ARM Group specializes in providing **skilled manpower** on a rental, local transfer, and overseas recruitment basis. Our mission is to seamlessly connect leading companies with qualified, reliable professionals across high-demand sectors.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Since 2012, we have focused on maintaining exceptional standards of service and compliance, ensuring that our clients benefit from operational efficiency and reduced workforce management costs.
                    </p>

                    <button 
                        onClick={() => setCurrentPage('contact')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-arm-gold hover:bg-arm-gold/90 transition duration-300"
                    >
                        Get a Consultation
                    </button>
                </div>

                {/* Right Column: Features Grid */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FeatureCard 
                            icon={Briefcase} 
                            title="Sector Specialization" 
                            description="Deep expertise in Oil & Gas, Construction, Hospitality, and Logistics recruitment."
                            index={1}
                        />
                        <FeatureCard 
                            icon={Users} 
                            title="Rapid Mobilization" 
                            description="Access to a vast, pre-screened talent pool for fast deployment."
                            index={2}
                        />
                        <FeatureCard 
                            icon={Shield} 
                            title="Compliance & Safety" 
                            description="Strict adherence to international labor laws and safety standards."
                            index={3}
                        />
                        <FeatureCard 
                            icon={Globe} 
                            title="Global Reach" 
                            description="Proven track record in local transfers and large-scale overseas recruitment."
                            index={4}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

// ====================================================================
// 4. Services Page Component (Unchanged)
// ====================================================================

const servicesData = [
    { 
        icon: Fuel, 
        title: "Oil & Gas Manpower", 
        description: "Experienced engineers, technicians, and field workers trained in international safety standards for rigs and refineries.",
        index: 1 
    },
    { 
        icon: UtensilsCrossed, 
        title: "Hospitality Staffing", 
        description: "Professional receptionists, housekeeping, waiters, and service crew ensuring seamless guest satisfaction.",
        index: 2
    },
    { 
        icon: Settings, 
        title: "Construction & Skilled Trade", 
        description: "Masons, carpenters, electricians, plumbers, and HVAC technicians for all phases of construction.",
        index: 3
    },
    { 
        icon: Warehouse, 
        title: "Logistics & Warehousing", 
        description: "Forklift operators, loaders, pickers, and inventory staff to maximize supply chain efficiency.",
        index: 4
    },
];

const ServiceCard = ({ icon: Icon, title, description, index }) => {
    // Reusing the simple fade-in logic for visual continuity
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100 * index); 
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div className={`p-6 rounded-xl bg-white shadow-lg border border-gray-100 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.01] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
            <div className="flex items-center justify-center w-16 h-16 bg-arm-gold/10 rounded-full mb-4">
                <Icon className="w-8 h-8 text-arm-gold" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-base">{description}</p>
        </div>
    );
}

const ServicesPage = () => {
    return (
        <section id="services" className="py-16 md:py-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="inline-block text-sm font-semibold text-arm-gold bg-arm-gold/10 rounded-full px-3 py-1 mb-4">
                    Expert Staffing Solutions
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-12">
                    Our Core Manpower Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// ====================================================================
// 5. Clients Page Component (NEW)
// ====================================================================

const ClientsPage = () => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollSpeed = 5; // Pixels per interval
    const intervalTime = 50; // Milliseconds (20 times per second)

    // Auto-scroll effect
    useEffect(() => {
        if (isHovered) return; // Stop scrolling on manual interaction
        
        let animationFrameId;
        let lastTimestamp = performance.now();
        
        const scroll = (timestamp) => {
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            if (scrollRef.current) {
                const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                
                // Calculate scroll distance based on time (smooth scrolling)
                const distance = (scrollSpeed * deltaTime) / (1000 / intervalTime);

                scrollRef.current.scrollLeft += distance;

                // Infinite loop logic: If scrolled past the first set of logos, jump back
                if (scrollRef.current.scrollLeft >= maxScrollLeft / 2) {
                    scrollRef.current.scrollLeft -= (maxScrollLeft / 2);
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    const handleManualScroll = (direction) => {
        setIsHovered(true); // Stop auto-scroll temporarily
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth / 3; // Scroll about 1/3 of the container width
            scrollRef.current.scrollLeft += (direction === 'left' ? -scrollAmount : scrollAmount);
        }
        // Set a timeout to re-enable auto-scroll after interaction
        setTimeout(() => setIsHovered(false), 2000);
    };

    return (
        <section id="clients" className="py-16 md:py-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Text Section */}
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                        Trusted Partnerships
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Our Valued Clients
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We are proud to serve some of the leading companies in the region across diverse sectors, including **Oil & Gas, Construction, and Hospitality.**
                    </p>
                </div>

                {/* Client Logo Slider Container */}
                <div className="relative">
                    {/* Scroll Wrapper - Hides the scrollbar */}
                    <div className="overflow-hidden p-4">
                        {/* Scrollable Logos */}
                        <div
                            ref={scrollRef}
                            className="flex space-x-8 pb-4 scroll-smooth transition-transform duration-300"
                            style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
                        >
                            {logosForDisplay.map((logo, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-40 h-24 p-2 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md transition duration-300 hover:shadow-2xl hover:scale-[1.05]"
                                    aria-label={`Client logo for ${logo.name}`}
                                >
                                    {/* Updated img tag with fallback error handler */}
                                    <img 
                                        src={logo.url} 
                                        alt={logo.name} 
                                        className="h-full w-full object-contain"
                                        onError={(e) => { 
                                            // Fallback if the image path fails to load
                                            e.target.onerror = null; 
                                            e.target.src="https://placehold.co/150x80/EEEEEE/333333?text=Logo+Placeholder"; 
                                        }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Manual Scroll Controls (Hidden on Mobile, or less prominent) */}
                    <div className="hidden lg:flex justify-center mt-6 space-x-8">
                        <button 
                            onClick={() => handleManualScroll('left')}
                            className="p-3 rounded-full bg-arm-blue text-white shadow-lg hover:bg-arm-blue/90 transition duration-300 transform hover:scale-105"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => handleManualScroll('right')}
                            className="p-3 rounded-full bg-arm-blue text-white shadow-lg hover:bg-arm-blue/90 transition duration-300 transform hover:scale-105"
                            aria-label="Scroll right"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Instruction for Mobile Users (less prominent controls) */}
                    <p className="text-center text-sm text-gray-500 mt-4 lg:hidden">
                        <span className="font-semibold">Tip:</span> Swipe the logo area left or right to view all clients.
                    </p>
                </div>
            </div>
        </section>
    );
};

// ====================================================================
// 6. Contact Page Component (Unchanged)
// ====================================================================

const ContactPage = () => {
    return (
        <section id="contact" className="py-16 md:py-24 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    
                    {/* Contact Info (Left Column) */}
                    <div className="lg:col-span-5 mb-12 lg:mb-0">
                        <span className="inline-block text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                            Get in Touch
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                            Start Building Your Team
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            We are ready to discuss your manpower needs and deliver tailored solutions. Reach out to us through any of the channels below.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-arm-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900">Our Location</h3>
                                    <p className="text-gray-600">Riyadh, Al-Khobar, & Jubail, KSA</p>
                                    <p className="text-gray-600">Manama, Bahrain (Lucid Solutions Co. WLL)</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-arm-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900">Email Us</h3>
                                    <a href="mailto:info@armgroup.com" className="text-arm-blue hover:text-arm-gold transition duration-300">info@armgroup.com</a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-arm-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900">Call Us</h3>
                                    <a href="tel:+966500000000" className="text-arm-blue hover:text-arm-gold transition duration-300">+966 50 000 0000</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Column) */}
                    <div className="lg:col-span-7 p-8 bg-white rounded-xl shadow-2xl">
                        <form className="space-y-6">
                            <h3 className="text-2xl font-bold text-arm-blue mb-4">Send Us a Message</h3>
                            
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arm-blue focus:border-arm-blue transition duration-200"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arm-blue focus:border-arm-blue transition duration-200"
                                    placeholder="you@company.com"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Requirements</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows="4" 
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arm-blue focus:border-arm-blue transition duration-200"
                                    placeholder="I need 10 skilled electricians for a 3-month project..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-arm-blue hover:bg-arm-blue/90 transition duration-300 transform hover:scale-[1.01] active:scale-100"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


// ====================================================================
// 7. Footer Component (Unchanged)
// ====================================================================

const Footer = () => {
    // This footer will appear consistently at the bottom of every 'page'
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-gray-400">© {new Date().getFullYear()} ARM Manpower Solutions. All rights reserved.</p>
                        <p className="text-sm text-gray-500 mt-1">Specializing in skilled workforce supply.</p>
                    </div>
                    <div className="flex space-x-6">
                        {/* Note: Footer links still use onClick to navigate internally */}
                        <button className="text-gray-400 hover:text-arm-gold transition duration-300">Home</button>
                        <button className="text-gray-400 hover:text-arm-gold transition duration-300">About</button>
                        <button className="text-gray-400 hover:text-arm-gold transition duration-300">Services</button>
                        <button className="text-gray-400 hover:text-arm-gold transition duration-300">Contact</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};


// ====================================================================
// 8. Main App Component (Controls Routing)
// ====================================================================

const App = () => {
    // State to track the currently visible page
    const [currentPage, setCurrentPage] = useState('home');

    // Inject custom brand colors via Tailwind configuration for 'arm-blue' and 'arm-gold'
    useEffect(() => {
        const script = document.createElement('script');
        script.textContent = `
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'arm-blue': '#1e3a8a', // Dark Blue (e.g., Royal Blue)
                            'arm-gold': '#f59e0b', // Amber/Gold (Accent)
                        },
                        fontFamily: {
                            sans: ['Inter', 'sans-serif'],
                        }
                    }
                }
            }
        `;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    
    // Function to render the correct page component
    const renderPage = () => {
        switch (currentPage) {
            case 'about':
                return <AboutPage setCurrentPage={setCurrentPage} />;
            case 'services':
                return <ServicesPage setCurrentPage={setCurrentPage} />;
            case 'clients':
                return <ClientsPage setCurrentPage={setCurrentPage} />; // NEW: Clients route
            case 'contact':
                return <ContactPage setCurrentPage={setCurrentPage} />;
            case 'home':
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Tailwind CDN Load (Mandatory) */}
            <script src="https://cdn.tailwindcss.com"></script>
            
            {/* Add Inter Font (Mandatory) */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
            
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="pt-20 lg:pt-0"> {/* Adjusted top padding */}
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
