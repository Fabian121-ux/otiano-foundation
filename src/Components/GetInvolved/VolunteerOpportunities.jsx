import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function VolunteerOpportunities() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4">Volunteer Opportunities</h1>
              <p className="text-lg md:text-xl font-medium">
                We're excited to launch volunteer opportunities that allow you to contribute directly to our education, healthcare, and empowerment initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8">
            Stay tuned for details on how you can get involved
          </h2>
          <p className="text-xl text-brand font-medium">
            Coming soon!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default VolunteerOpportunities