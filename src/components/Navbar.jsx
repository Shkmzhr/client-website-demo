import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavLink = ({ href, children }) => (
    <a 
        href={href} 
        className="text-white hover:text-arm-gold transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
    >
        {children}
    </a>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About Us', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Directors', href: '#directors' },
        { name: 'Contact', href: '#footer' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-arm-blue shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand Section */}
                    <div className="flex items-center">
                        <a href="#hero" className="flex-shrink-0 flex items-center">
                            <span className="text-white text-2xl font-black tracking-wider">ARM</span>
                            <span className="text-arm-gold text-xl font-light ml-1">Group</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        {navItems.map((item) => (
                            <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
                        ))}
                        <a 
                            href="#footer"
                            className="ml-4 px-4 py-2 text-sm font-semibold rounded-full bg-arm-gold text-arm-blue hover:bg-yellow-500 transition duration-300 shadow-md"
                        >
                            Get Quote
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-arm-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-arm-blue focus:ring-white transition duration-300"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-arm-blue/95">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-arm-gold hover:text-arm-blue block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
