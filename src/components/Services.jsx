import React from 'react';
import { Fuel, UtensilsCrossed, HardHat, Package, Factory, LayoutGrid } from 'lucide-react';
// useScrollAnimation hook import has been intentionally removed to avoid file resolution errors

// Stateless component for rendering individual service cards
const ServiceCard = ({ icon: Icon, title, description, color }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-500 border-t-4 border-arm-gold">
        {/* Icon container */}
        <div className={`p-3 inline-flex items-center justify-center rounded-full ${color}/10 mb-4`}>
            {/* The icon is rendered dynamically */}
            <Icon className={`w-8 h-8 text-arm-blue`} />
        </div>
        {/* Sub-heading styles previously defined by .heading-secondary */}
        <h3 className="text-2xl sm:text-3xl font-bold text-arm-blue mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


// Data structure for the service cards
const servicesData = [
    { 
        icon: Fuel, // Corrected from GasCylinder
        title: "Oil & Gas", 
        description: "Experienced engineers, technicians, and field workers for oil rigs, refineries, and petrochemical plants. Trained in international safety standards.",
        color: "bg-red-500" 
    },
    { 
        icon: UtensilsCrossed, // Corrected from ChefHat
        title: "Hospitality", 
        description: "Professional staff including receptionists, housekeeping, kitchen assistants, waiters, ensuring enhanced guest satisfaction.",
        color: "bg-amber-500" 
    },
    { 
        icon: HardHat, 
        title: "Construction & Skilled Workers", 
        description: "Masons, carpenters, electricians, plumbers, HVAC technicians, welders, and general helpers.",
        color: "bg-lime-500" 
    },
    { 
        icon: Package, 
        title: "Logistics & Warehousing", 
        description: "Manpower for forklift operators, loaders, pickers, packing staff, and inventory management.",
        color: "bg-blue-500" 
    },
    { 
        icon: Factory, 
        title: "Facility Management", 
        description: "Dedicated staff for soft and hard facility management roles, including maintenance and general services.",
        color: "bg-teal-500" 
    },
    { 
        icon: LayoutGrid, 
        title: "General Manpower", 
        description: "Flexible solutions for general helpers, cleaners, and administrative support across various sectors.",
        color: "bg-purple-500" 
    },
];

const Services = () => {
    return (
        <section 
            id="services" 
            // Tailwind classes providing padding and max-width, matching the removed .section-container CSS
            className="bg-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-opacity duration-1000 ease-in-out"
        >
            <div className="text-center mb-12">
                {/* Heading styles previously defined by .heading-primary */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-arm-blue tracking-tight mb-4">
                    Our Specialized Manpower Services
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    We supply qualified professionals across multiple key industries to maintain your operational efficiency and long-term success.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
};

export default Services;
