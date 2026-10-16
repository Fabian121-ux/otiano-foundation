import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function Education() {
  return (
    <div>
      <Navbar />
      
      
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Education</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium mb-4">
                Supporting learning, school engagement, and opportunity for children and young people.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base mb-8 max-w-prose">
                Education is one of OFD’s four programme priorities. Our aim is to understand barriers to learning and identify practical ways to support pupils, teachers, and communities.
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
              <BrandVisual title="Access to Education" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Access to Education</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Access to education is a programme priority. We aim to identify needs for learning materials and school support, and explore ways to reduce financial barriers. Specific programmes will depend on community needs, resources, and agreed arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Skills & Digital Literacy</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Digital literacy and practical learning are areas we intend to develop with educators and partners. Potential activities include introductory digital skills and learning support shaped by the needs of children and young people.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Skills & Digital Literacy" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Teacher & School Support" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Teacher & School Support</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                Teacher development and school engagement are central to this focus. We aim to explore practical workshops and support with educators, based on identified needs and available resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Community Engagement in Education</h2>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                We aim to involve parents, teachers, and community members in identifying learning priorities. Listening to these groups can help shape relevant support and shared responsibility for education.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Community Engagement in Education" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Education