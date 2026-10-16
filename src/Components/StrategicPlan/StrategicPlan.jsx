import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'

function StrategicPlan() {
  return (
    <div>
      
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Our Strategic Plan</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium">
                A practical direction for programme development around community needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base max-w-prose">
                OFD’s strategic priorities set out areas for intended work. Specific activities should follow needs assessment, available resources, and appropriate partnerships. Progress will be described through documented activity records.
              </p>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Education Access & Quality" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand mb-6">Expanding Educational Access & Quality</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to explore learning materials, school engagement, teacher support, and digital literacy. These priorities guide programme development; they are not a claim of completed scholarship or infrastructure programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 text-center">
              <h2 className="text-2xl font-bold text-brand mb-6">Enhancing Community Health & Well-Being</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Our intended healthcare focus includes awareness, access, and identifying practical gaps in community services. Clinical activities or material support will require appropriate health expertise and confirmed arrangements.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Community Health & Wellbeing" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Economic Empowerment & Livelihoods" topic="livelihoods" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand mb-6">Boosting Economic Empowerment & Livelihoods</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to explore practical skills, career development, entrepreneurship guidance, and financial literacy. Intended outcomes should be distinguished from verified results as programmes develop.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 text-center">
              <h2 className="text-2xl font-bold text-brand mb-6">Strengthening Social Protection & Inclusion</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to place dignity, protection, and inclusion at the centre of programme decisions. Community engagement and appropriate professional guidance should shape support for people facing vulnerability.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Social Protection & Inclusion" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Partnerships for Scale" topic="partnership" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand mb-6">Building Partnerships for Scale</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We welcome discussions with community groups, public institutions, and other organisations about relevant opportunities to work together. Partnerships will be announced when arrangements are confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default StrategicPlan