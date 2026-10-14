import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Cheeka from '../../assets/trustees/Cheeka Onyeka.jpeg'
import Ekeoma from '../../assets/trustees/Ekeoma Ogbu.JPG'
import David from '../../assets/trustees/David Achugbu.jpeg'
import Kinglsey from '../../assets/trustees/Kingsley Otiaba.png'
import Solomon from '../../assets/trustees/Solomon Ogbu.JPG'
import Awan from '../../assets/trustees/zanang Awan.jpeg'
import Lucy from '../../assets/trustees/lucy simon.jpeg'


function Trustees() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-3xl font-bold text-red-600 mb-4">Our Trustees</h1>
              <p className="text-lg md:text-xl font-medium">
Our Board of Trustees embodies the guiding force behind the Otiano Foundation for Development, upholding uncompromising standards of governance, accountability, and ethical stewardship to propel our mission forward. Comprising visionary leaders from diverse fields, they ensure that every initiative aligns with our core values of integrity, inclusivity, and sustainable impact.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trustees Grid Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={Cheeka}
                  alt="Cheeka Onyeka"
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Cheeka Onyeka</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={Ekeoma}
                  alt="Ekeoma Ogbu"
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Ekeoma Ogbu</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={Kinglsey} 
                  alt="Kingsley Otiaba"
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Kingsley Otiaba</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={Awan}
                  alt="Zanang Awan"
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Zanang Awan</h3>
            </div>

            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={David}
                  alt="David Achugbu" 
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">David Achugbu</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 h-80 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={Lucy}
                  alt="Lucy Simon" 
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Lucy Simon</h3>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trustees