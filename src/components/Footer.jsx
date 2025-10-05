import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const clientNames = [
    "NCMS", "Rezayat Group", "Musanadah", "Pro-Sources", "Gulfaar", "Nova Star", "Amiantit", 
    "SmascO", "Tamimi", "Orient Yeild", "Al-Baik", "Mukamel Co.", "Nesma Partners", "Jabir Harbi", 
    "AL Nahid Pharmacy", "AL Dawa Pharmacy", "Karan International", "Allied-solutions", 
    "Lucid Investment", "Marco HR", "Integrated HR", "Saad Al Essa", "ZOMCO", "Ram Clinics", 
    "Align Sports", "KanooZ", "Bistro Lounge", "Al-Aker Sweets", "Global Suhaimi", "Doha Medical", 
    "Flash Diamond", "Shade Corporation", "Campass Arabia", "Samaya Group", "Cosmo Café", 
    "Jahez", "Access Partner", "AL Jubail Sanitary Pipe Factory Co. Ltd", "Mugulat al freej", 
    "Mofarreh Alharbi", "Namaq Café", "Abdulrahman Al Muaibid Group", "STOM", "AGINCO", 
    "Nafcel", "Manoosha alreef", "ARSAL Co", "Almajdouie Group", "Al Nusban group", "Hertel (OTC)"
];

const ContactLink = ({ Icon, text, href }) => (
    <a href={href} className="flex items-center text-gray-300 hover:text-arm-gold transition duration-300">
        <Icon className="w-5 h-5 mr-3 text-arm-gold" />
        <span>{text}</span>
    </a>
);

const Footer = () => {
    return (
        <footer id="footer" className="bg-arm-blue pt-16 pb-8">
            <div className="section-container">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-arm-gold/30 pb-12 mb-8">
                    
                    {/* Logo/Motto */}
                    <div className="md:col-span-1">
                        <div className="flex-shrink-0 flex items-center mb-4">
                            <span className="text-white text-3xl font-black tracking-wider">ARM</span>
                            <span className="text-arm-gold text-2xl font-light ml-1">Group</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted partner for expert manpower and workforce solutions across the Middle East. Excellence in every placement.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#hero" className="text-gray-400 hover:text-arm-gold transition duration-300">Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-arm-gold transition duration-300">About Us</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-arm-gold transition duration-300">Services</a></li>
                            <li><a href="#directors" className="text-gray-400 hover:text-arm-gold transition duration-300">Directors</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <ContactLink Icon={Phone} text="+966 50 XXX XXXX" href="tel:+96650XXXXXXX" />
                            <ContactLink Icon={Mail} text="info@armgroup.com" href="mailto:info@armgroup.com" />
                            <ContactLink Icon={MapPin} text="Riyadh, Saudi Arabia" href="#" />
                        </div>
                    </div>

                    {/* Client Showcase */}
                    <div className="md:col-span-1">
                         <h4 className="text-lg font-semibold text-white mb-4">Our Valued Clients</h4>
                         <p className="text-gray-400 text-sm">50+ major clients trust us for their manpower needs.</p>
                    </div>
                </div>

                {/* Client Ticker (Responsive List for all clients) */}
                <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Client Roster</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {clientNames.map((name, index) => (
                            <span key={index} className="text-sm font-medium text-arm-gold border border-arm-gold rounded-full px-3 py-1 bg-arm-gold/10">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-12">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ARM Group. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
