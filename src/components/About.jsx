import React from 'react';
import { Briefcase, Users, Shield, Globe } from 'lucide-react';
// useScrollAnimation hook import has been intentionally removed to avoid the Uncaught TypeError

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-arm-gold transition duration-300 hover:shadow-xl">
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


const About = () => {
    return (
        <section 
            id="about" 
            // Tailwind classes providing padding and max-width, matching the removed .section-container CSS
            className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                
                {/* Left Column: Text and Intro */}
                <div className="mb-12 lg:mb-0">
                    <span className="inline-block text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                        Who We Are
                    </span>
                    
                    {/* Heading styles previously defined by .heading-primary */}
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

                    <a 
                        href="#contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-arm-gold hover:bg-arm-gold/90 transition duration-300"
                    >
                        Get a Consultation
                    </a>
                </div>

                {/* Right Column: Features Grid */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FeatureCard 
                            icon={Briefcase} 
                            title="Sector Specialization" 
                            description="Deep expertise in Oil & Gas, Construction, Hospitality, and Logistics recruitment."
                        />
                        <FeatureCard 
                            icon={Users} 
                            title="Rapid Mobilization" 
                            description="Access to a vast, pre-screened talent pool for fast deployment."
                        />
                        <FeatureCard 
                            icon={Shield} 
                            title="Compliance & Safety" 
                            description="Strict adherence to international labor laws and safety standards."
                        />
                        <FeatureCard 
                            icon={Globe} 
                            title="Global Reach" 
                            description="Proven track record in local transfers and large-scale overseas recruitment."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
