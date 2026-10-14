import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'
import KingsleyImage from '../../assets/trustees/Kingsley Otiaba.png'

function FoundersMessage() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-cover bg-top relative overflow-hidden" style={{backgroundImage: `url(${KingsleyImage})`}}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Founder's Message</h1>
              <p className="text-lg md:text-xl font-medium">
                Africa's greatest resource is not beneath its soil, it is within its people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                I founded the Otiano Foundation for Development with a deep conviction that development must begin by expanding access to opportunity and by ensuring that possibility is not limited by geography, background, or circumstance. Across Nigeria and Africa, millions of capable individuals remain constrained - not by lack of talent or ambition - but by limited access to quality education, healthcare, economic opportunities, and social protection. OFD was created to help change this reality.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our work is guided by a simple but powerful belief: when people are given the right support, opportunity becomes accessible and possibility extends far beyond the individual to families, communities, and future generations. This belief shapes every program we design, every partnership we pursue, and every community we serve.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                At the Otiano Foundation for Development, we focus on four interconnected pillars - education, healthcare, economic empowerment, and social welfare and protection. These are not isolated interventions; they are deliberate pathways that move people from vulnerability to resilience, from dependence to dignity, and from exclusion to inclusion.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We are intentional about building solutions that endure. Through strong governance, transparent systems, data-driven impact measurement, and strategic partnerships, we are laying the foundation for an institution that ensures access is broadened, voices are heard, and meaningful progress can happen anywhere it is needed.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                While our journey is still unfolding, our commitment is unwavering. We remain focused on listening to communities, learning from evidence, innovating responsibly, and scaling what works. Above all, we are committed to placing people - especially the most vulnerable, at the center of development, so that no one is left without a pathway forward.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                I am deeply grateful to our Board of Trustees, volunteers, partners, donors, and community stakeholders who share this vision and walk this journey with us. Together, we are demonstrating that when opportunity is made accessible, possibility has no boundaries.
              </p>
              
              <p className="text-gray-700 leading-relaxed font-medium">
                The future we envision is achievable.<br />
                And together, we will build it.
              </p>
              
              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-900 font-bold">Kingsley Otiaba</p>
                <p className="text-gray-600">Founder & Executive Chairman</p>
                <p className="text-gray-600">Otiano Foundation for Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default FoundersMessage