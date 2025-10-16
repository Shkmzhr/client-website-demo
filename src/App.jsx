import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Users, TrendingUp, HardHat, Wrench, Zap, Shield, Linkedin, MapPin, Mail, Phone, Facebook, Twitter } from 'lucide-react';

// ===================================
// 0. New Color Definitions (Khaki Brown & Sand Theme)
// ===================================

// Deep Coffee/Khaki Brown (Primary/Text Color)
const DEEP_BROWN = '#544036'; 
// Muted Sand/Gold (Secondary/Accent Color)
const ACCENT_SAND = '#A88F68';
// Very Light Cream/Brown Background (Background Color)
const SOFT_CREAM = '#FBF9F6';

// ===================================
// 1. Navbar Component
// ===================================

const NavLink = ({ to, children, setIsOpen }) => (
    <a 
        href={`#${to}`} 
        onClick={() => setIsOpen && setIsOpen(false)} // Close menu on mobile click
        // Updated text color to DEEP_BROWN and hover color to ACCENT_SAND for readability
        className="transition duration-200 block py-2 lg:py-0 lg:inline-block font-medium"
        style={{ color: DEEP_BROWN, '--tw-text-hover-opacity': 1, ':hover': { color: ACCENT_SAND } }}
    >
        {children}
    </a>
);

const Navbar = ({ toggleView, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isPublicView = currentView === 'public';

    return (
        // *DESIGN CHANGE*: Removed default shadow and added a subtle, clean box-shadow for a "lifted" effect.
        <header 
            className="sticky top-0 z-50 border-b border-gray-100" 
            style={{ 
                backgroundColor: SOFT_CREAM,
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)' // Subtle, clean shadow
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold" style={{ color: DEEP_BROWN }}>
                    ARM <span style={{ color: ACCENT_SAND }}>Group</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {isPublicView && (
                        <>
                            <NavLink to="hero">Home</NavLink>
                            <NavLink to="about">About Us</NavLink>
                            <NavLink to="services">Services</NavLink>
                            <NavLink to="directors">Leadership</NavLink>
                            {/* UPDATED: Link now points to the new contact form section */}
                            <NavLink to="contact">Contact</NavLink> 
                        </>
                    )}
                    
                    <button 
                        onClick={() => toggleView && toggleView(isPublicView ? 'admin' : 'public')}
                        className="px-4 py-2 text-sm font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105"
                        style={{ 
                            // Primary Button: DEEP_BROWN background, SOFT_CREAM text
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
                 // Changed background to SOFT_CREAM
                 <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 border-t" style={{ backgroundColor: SOFT_CREAM, borderColor: DEEP_BROWN }}>
                    {isPublicView && (
                        <>
                            <NavLink to="hero" setIsOpen={setIsOpen}>Home</NavLink>
                            <NavLink to="about" setIsOpen={setIsOpen}>About Us</NavLink>
                            <NavLink to="services" setIsOpen={setIsOpen}>Services</NavLink>
                            <NavLink to="directors" setIsOpen={setIsOpen}>Leadership</NavLink>
                            {/* UPDATED: Link now points to the new contact form section */}
                            <NavLink to="contact" setIsOpen={setIsOpen}>Contact</NavLink>
                        </>
                    )}
                    
                    <button 
                        onClick={() => { toggleView && toggleView(isPublicView ? 'admin' : 'public'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm font-semibold rounded-md shadow-md transition duration-300 mt-2"
                        style={{ 
                             // Primary Button: DEEP_BROWN background, SOFT_CREAM text
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
    return (
        // Changed background to DEEP_BROWN
        <section id="hero" className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: DEEP_BROWN }}>
            {/* Background pattern - adjusted colors to match new theme */}
            <div className="absolute inset-0 opacity-10 bg-gray-900 bg-[url('https://placehold.co/1200x800/544036/FBF9F6?text=ARM+Logo')] bg-cover bg-center"></div>
            <div className="absolute inset-0 opacity-80" style={{ backgroundColor: DEEP_BROWN }}></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    Powering Infrastructure with <span style={{ color: ACCENT_SAND }}>Expert Manpower</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                    ARM Group delivers highly skilled technical, maintenance, and construction personnel across the Middle East.
                </p>
                <a 
                    href="#services" 
                    className="inline-block px-8 py-3 font-bold text-lg rounded-full shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                    // Accent button: ACCENT_SAND background, DEEP_BROWN text
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
    <div className="p-6 rounded-xl shadow-lg border-t-4" style={{ backgroundColor: 'white', borderColor: ACCENT_SAND }}>
        <Icon className="w-8 h-8 mb-4" style={{ color: DEEP_BROWN }} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const About = () => {
    return (
        // Changed background to SOFT_CREAM
        <section id="about" className="py-16 md:py-24" style={{ backgroundColor: SOFT_CREAM }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        A Legacy of Trust and Excellence
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
    );
};

// ===================================
// 4. Services Component
// ===================================

const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: ACCENT_SAND }}>
            <Icon className="w-8 h-8" style={{ color: DEEP_BROWN }} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Services = () => {
    return (
        <section id="services" className="py-16 md:py-24" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Our Specialized Manpower Solutions
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
    );
};

// ===================================
// 5. Directors Component
// ===================================

const DirectorCard = ({ name, title, bio, imageUrl }) => (
    <div className="rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition duration-300" style={{ backgroundColor: 'white' }}>
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
        // Updated placeholder colors to match the new theme
        { name: "Ahmed Al-Malki", title: "CEO & Founder", bio: "Visionary leader with 30+ years in international project management.", imageUrl: "https://placehold.co/400x300/544036/FBF9F6?text=Ahmed" },
        { name: "Fatima Al-Riyadh", title: "Chief Operating Officer", bio: "Expert in logistics and compliance, ensuring flawless mobilization.", imageUrl: "https://placehold.co/400x300/A88F68/544036?text=Fatima" },
        { name: "Omar Hassan", title: "Head of Finance", bio: "Manages major capital flow and fiscal strategy for the group.", imageUrl: "https://placehold.co/400x300/544036/A88F68?text=Omar" },
    ];

    return (
        // Changed background to SOFT_CREAM
        <section id="directors" className="py-16 md:py-24" style={{ backgroundColor: SOFT_CREAM }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Our Leadership
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Guidance from industry veterans drives our commitment to quality and safety.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {directors.map((director, index) => (
                        <DirectorCard key={index} {...director} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// ===================================
// 6. Contact Form Component (NEW)
// ===================================

const Contact = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend server.
        // For this demo, we simulate a successful submission.
        setStatus('success');
        setTimeout(() => setStatus(null), 4000);
        e.target.reset();
    };

    return (
        <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: 'white' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Get In Touch
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
                                // Accent button: ACCENT_SAND background, DEEP_BROWN text
                                style={{ backgroundColor: ACCENT_SAND, color: DEEP_BROWN }}
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

// ===================================
// 7. Footer Component (Now just for company info and links)
// ===================================

const Footer = () => {
    // *DESIGN CHANGE*: Geometric pattern style for the footer
    const geometricStyle = {
        backgroundColor: DEEP_BROWN,
        // Subtle diagonal stripe pattern using linear gradients (for richness)
        backgroundImage: `repeating-linear-gradient(
            45deg,
            ${DEEP_BROWN} 0%,
            ${DEEP_BROWN} 1px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 3px
        )`,
    };

    return (
        // Apply geometric style
        <footer id="footer" className="text-white py-12" style={geometricStyle}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Updated border color to ACCENT_SAND for a richer look */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-8 mb-8" style={{ borderColor: ACCENT_SAND }}>
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4" style={{ color: ACCENT_SAND }}>ARM Group</h3>
                        <p className="text-sm text-gray-300">
                            Delivering skilled manpower solutions for infrastructure and industrial projects across the MENA region.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        {/* Updated border color to ACCENT_SAND */}
                        <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: ACCENT_SAND }}>Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {/* Changed hover colors to ACCENT_SAND */}
                            <li><a href="#about" className="hover:text-ACCENT_SAND transition duration-200">About Us</a></li>
                            <li><a href="#services" className="hover:text-ACCENT_SAND transition duration-200">Our Services</a></li>
                            <li><a href="#" className="hover:text-ACCENT_SAND transition duration-200">Careers</a></li>
                            <li><a href="#" className="hover:text-ACCENT_SAND transition duration-200">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        {/* Updated border color to ACCENT_SAND */}
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
                    <div>
                        {/* Updated border color to ACCENT_SAND */}
                        <h4 className="text-lg font-semibold mb-4 border-b pb-2" style={{ borderColor: ACCENT_SAND }}>Follow Us</h4>
                        <div className="flex space-x-4">
                            {/* Changed hover colors to ACCENT_SAND */}
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
    );
};


// ===================================
// 8. Admin Dashboard Component (Simple)
// ===================================

const AdminDashboard = ({ toggleView }) => {
    return (
        // Changed background to SOFT_CREAM
        <div className="min-h-screen p-8 flex-grow" style={{ backgroundColor: SOFT_CREAM }}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-extrabold" style={{ color: DEEP_BROWN }}>Admin Dashboard</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900">1,250</p>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                        <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                        <p className="text-3xl font-bold text-gray-900">45</p>
                    </div>
                    {/* Stat Card 3 - Accent Color for key metric */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: ACCENT_SAND }}>
                        <p className="text-sm font-medium text-gray-500">Active Contracts</p>
                        <p className="text-3xl font-bold text-gray-900">32</p>
                    </div>
                </div>

                <div className="mt-10 p-8 rounded-xl shadow-lg" style={{ backgroundColor: 'white' }}>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
                    <ul className="space-y-4">
                        {/* Changed background for list items to SOFT_CREAM */}
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
// 9. Main App Component
// ===================================

const App = () => {
    // START: User access key implementation for Admin View
    const getInitialView = () => {
        const path = window.location.hash;
        if (path === '#admin-key-123') {
            return 'admin';
        }
        return 'public';
    };

    const [view, setView] = useState(getInitialView); // State to manage view: 'public' or 'admin'

    const toggleView = (targetView) => {
        // Update URL hash when toggling view to simulate deep linking
        if (targetView === 'admin') {
            window.location.hash = 'admin-key-123';
        } else {
            window.location.hash = '';
        }
        setView(targetView);
    };
    // END: User access key implementation

    // Listen for hash changes (e.g., when the user manually changes the URL hash)
    useEffect(() => {
        const handleHashChange = () => {
            setView(getInitialView());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            
            <Navbar toggleView={toggleView} currentView={view} />

            {view === 'public' ? (
                <main className="flex-grow">
                    {/* Public Website Sections */}
                    <Hero />
                    <About />
                    <Services />
                    <Directors />
                    {/* NEW CONTACT FORM SECTION */}
                    <Contact /> 
                </main>
            ) : (
                <main className="flex-grow">
                    {/* Admin View */}
                    <AdminDashboard toggleView={toggleView} />
                </main>
            )}

            {/* Footer only appears on the public site */}
            {view === 'public' && <Footer />}
        </div>
    );
};

export default App;
