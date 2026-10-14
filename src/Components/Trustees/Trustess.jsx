import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Cheeka from '../../assets/trustees/Cheeka Onyeka.jpeg'
import Ekeoma from '../../assets/trustees/Ekeoma Ogbu.JPG'
import David from '../../assets/trustees/David Achugbu.jpeg'
import Kingsley from '../../assets/trustees/Kingsley Otiaba.png'
import Awan from '../../assets/trustees/zanang Awan.jpeg'
import Lucy from '../../assets/trustees/lucy simon.jpeg'


function Trustees() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-3xl font-bold text-brand mb-4">Our Trustees</h1>
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
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={Cheeka}
                  alt="Cheeka Onyeka"
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">Cheeka Onyeka</h3>
            </div>
            
            <div className="text-center">
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={Ekeoma}
                  alt="Ekeoma Ogbu"
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">Ekeoma Ogbu</h3>
            </div>
            
            <div className="text-center">
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={Kingsley} 
                  alt="Kingsley Otiaba"
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">Kingsley Otiaba</h3>
            </div>
            
            <div className="text-center">
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={Awan}
                  alt="Zanang Awan"
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">Zanang Awan</h3>
            </div>

            <div className="text-center">
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={David}
                  alt="David Achugbu" 
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">David Achugbu</h3>
            </div>
            
            <div className="text-center">
              <div className="aspect-[4/5] mb-4 rounded-card border border-neutral-200 bg-neutral-50 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={Lucy}
                  alt="Lucy Simon" 
                  className="w-full h-full object-bottom object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-800">Lucy Simon</h3>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trustees