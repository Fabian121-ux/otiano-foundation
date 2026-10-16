import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function SocialWelfare() {
  return (
    <div>
      <Navbar />
      
      
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Social Welfare & Protection</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium mb-4">
                Prioritising dignity, protection, and inclusion in community programmes.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base mb-8 max-w-prose">
                Social welfare is a programme priority for OFD. Our aim is to understand the needs of people facing vulnerability and explore appropriate support with communities and relevant organisations.
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
              <BrandVisual title="Child Protection" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Child Protection</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to support awareness of child welfare, safety, and access to education. Work in this area should be shaped by safeguarding needs and appropriate professional guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Community Support & Inclusion</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Community inclusion is an intended focus, including the needs of widows, persons with disabilities, and other groups facing barriers. The aim is to identify practical opportunities for participation and support.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Community Support & Inclusion" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Leadership & Mentorship" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Leadership & Mentorship</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Leadership, mentorship, and civic participation are areas of focus. We aim to create opportunities for people to share experience, develop skills, and engage with community priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Gender-Based Violence Prevention</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to support awareness of women’s inclusion and gender-based violence through appropriate engagement and partnerships. Proposed activities should be informed by local needs and relevant professional guidance.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Gender-Based Violence Prevention" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Environmental and Social Resilience" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Environmental and Social Resilience</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Environmental and social resilience is an area for future programme development. We aim to understand how local environmental pressures affect vulnerable groups before identifying appropriate responses.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default SocialWelfare