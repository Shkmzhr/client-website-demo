import React from 'react';
import { Truck, Handshake, ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <section 
            id="hero" 
            className="relative bg-white pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden"
        >
            {/* Background Shape (Placeholder for graphic design) */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/E5E7EB/4B5563?text=ARM+Manpower+Solutions+Background')" }}></div>
            </div>

            {/* Content Container (Matches removed .section-container styles) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        <span className="inline-flex items-center text-sm font-semibold text-arm-blue bg-arm-blue/10 rounded-full px-3 py-1 mb-4">
                            <Truck className="w-4 h-4 mr-2" />
                            Manpower Solutions Since 2012
                        </span>
                        
                        {/* Heading styles previously defined by .heading-primary */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                            <span className="block">Your Reliable Partner for</span> 
                            <span className="block text-arm-blue">Skilled Manpower Supply</span>
                        </h1>
                        
                        <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:max-w-xl md:mt-5 lg:mx-0">
                            We specialize in providing skilled, reliable, and compliant workforce solutions across Oil & Gas, Construction, Hospitality, and Logistics sectors.
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <a 
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-arm-blue hover:bg-arm-blue/90 transition duration-300 transform hover:scale-[1.02] active:scale-100"
                            >
                                <Handshake className="w-5 h-5 mr-2" />
                                Hire Your Team Now
                            </a>
                            <a 
                                href="#services" 
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-arm-blue text-base font-medium rounded-xl text-arm-blue bg-white hover:bg-gray-50 transition duration-300"
                            >
                                Our Services
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-5 flex justify-center">
                        <div className="w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl">
                            {/* Placeholder for a relevant industry image */}
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

export default Hero;
