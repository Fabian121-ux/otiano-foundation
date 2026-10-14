import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const services = [
  {
    id: 1,
    title: "Business Consulting",
    description: "As one of the world's largest accountancy networks, elixir helps a diverse range of clients with a diverse range of needs. This is especially true of our Advisory Practice, which provides corporate finance and transaction services, business restructuring.",
    link: "#"
  },
  {
    id: 2,
    title: "Tax consulting",
    description: "Elixir serves clients across the country and around the world as they navigate an increasingly complex tax landscape. Our tax professionals draw on deep experience and industry-specific knowledge to deliver clients the insights and innovation they need.",
    link: "#"
  }
];

function Exploits() {
  return (
    <div className="py-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className='mb-16'>
            <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">Our Exploits</h2>
            <p className="text-neutral-600">Read our regional, national, and global media coverage.</p>
          </div>

        {/* Services List */}
        <div className="space-y-12 md:space-y-0">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-[400px] relative overflow-hidden group">
                <BrandVisual title={service.title} topic="partnership" className="h-full rounded-none border-0" />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a 
                  href={service.link} 
                  className="flex items-center text-neutral-700 font-semibold hover:text-neutral-900 transition-colors group w-fit"
                >
                  Learn More 
                  <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Exploits;
