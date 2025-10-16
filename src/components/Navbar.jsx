import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavLink = ({ to, children, setIsOpen }) => (
    <a 
        href={`#${to}`} 
        onClick={() => setIsOpen && setIsOpen(false)} // Close menu on mobile click
        className="text-gray-700 hover:text-[#D4A74B] transition duration-200 block py-2 lg:py-0 lg:inline-block"
    >
        {children}
    </a>
);

const Navbar = ({ toggleView, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isPublicView = currentView === 'public';

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#1F3B66]">
                    ARM <span className="text-[#D4A74B]">Group</span>
                </div>

                {/* Desktop Navigation & Toggle Button */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {isPublicView && (
                        <>
                            <NavLink to="hero">Home</NavLink>
                            <NavLink to="about">About Us</NavLink>
                            <NavLink to="services">Services</NavLink>
                            <NavLink to="directors">Leadership</NavLink>
                            <NavLink to="footer">Contact</NavLink>
                        </>
                    )}
                    
                    <button 
                        // Added defensive check: toggleView && 
                        onClick={() => toggleView && toggleView(isPublicView ? 'admin' : 'public')}
                        className="px-4 py-2 bg-[#1F3B66] text-white text-sm font-semibold rounded-full shadow-md hover:bg-[#D4A74B] hover:text-[#1F3B66] transition duration-300 transform hover:scale-105"
                    >
                        {isPublicView ? 'Admin Login' : 'Back to Site'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition duration-200"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t">
                    {isPublicView && (
                        <>
                            <NavLink to="hero" setIsOpen={setIsOpen}>Home</NavLink>
                            <NavLink to="about" setIsOpen={setIsOpen}>About Us</NavLink>
                            <NavLink to="services" setIsOpen={setIsOpen}>Services</NavLink>
                            <NavLink to="directors" setIsOpen={setIsOpen}>Leadership</NavLink>
                            <NavLink to="footer" setIsOpen={setIsOpen}>Contact</NavLink>
                        </>
                    )}
                    <button 
                        // Added defensive check: toggleView && 
                        onClick={() => { toggleView && toggleView(isPublicView ? 'admin' : 'public'); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 bg-[#1F3B66] text-white text-sm font-semibold rounded-md shadow-md hover:bg-[#D4A74B] hover:text-[#1F3B66] transition duration-300 mt-2"
                    >
                        {isPublicView ? 'Admin Login' : 'Back to Site'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
