import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function Healthcare() {
  return (
    <div>
      <Navbar />
      
      
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Healthcare</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium mb-4">
                Promoting stronger communities through awareness, access, and practical support.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base mb-8 max-w-prose">
                Healthcare is a programme priority for OFD. Our aim is to understand local needs and explore practical support for awareness, access to care, and community health services.
              </p>
          <p className="text-neutral-700 italic leading-relaxed max-w-prose">
                Our areas of focus include:
              </p>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Community Health Outreach" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Community Health Outreach</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to explore community health education and outreach with qualified health professionals. Topics may include prevention, hygiene, nutrition, and when to seek care, shaped by the needs identified locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Maternal & Child Health</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Maternal and child health is an area of intended focus. We aim to listen to families and health professionals to identify opportunities for awareness and appropriate support.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Maternal & Child Health" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Health System Support" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Health System Support</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to identify gaps in essential medicines, equipment, and facilities through engagement with healthcare stakeholders. Any supply or facility support will depend on assessed needs, resources, and appropriate partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Mental Health Awareness</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Mental health awareness is a potential area for collaboration with qualified practitioners. Our goal is to explore informed discussion and appropriate signposting within community health programmes.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Mental Health Awareness" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Emergency Response Preparedness" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Emergency Response Preparedness</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Emergency preparedness is a longer-term area of interest. We aim to explore how awareness and coordination with relevant health authorities could support communities facing health emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Healthcare