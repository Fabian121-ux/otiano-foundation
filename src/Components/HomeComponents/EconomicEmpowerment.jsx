import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function EconomicEmpowerment() {
  return (
    <div>
      <Navbar />
      
      
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Economic Empowerment</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium mb-4">
                Focusing on skills, career development, and pathways to sustainable livelihoods.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base mb-8 max-w-prose">
                Economic empowerment is a programme priority for OFD. We aim to identify practical skills and support that can help young people and community members explore work and livelihood opportunities.
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
              <BrandVisual title="Vocational & Entrepreneurship Training" topic="livelihoods" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Vocational & Entrepreneurship Training</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to explore vocational learning and entrepreneurship support shaped by local opportunities. Practical training and guidance could help participants understand options for developing their skills and ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Financial Literacy</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Financial literacy is an intended area of work. Our focus includes budgeting, saving, and responsible financial decisions, with content adapted to participants’ needs.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Financial Literacy" topic="livelihoods" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Career Development" topic="livelihoods" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Career Development</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Career development is an area of focus, including job readiness, mentorship, and guidance for young people. Any future workshops or employment outcomes will be documented separately.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default EconomicEmpowerment