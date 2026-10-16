import { Link } from 'react-router-dom'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function AmbassadorProgram() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4">Ambassador Program</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium">
                We welcome conversations about community needs and practical ways to contribute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-space bg-white">
        <div className="site-container">
          <div className="ofd-card max-w-3xl p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Discuss ways to represent OFD</h2>
            <p className="reading-copy">Contact the Foundation to share your interests or ask about possible participation. Any activity or role will be discussed once arrangements are confirmed.</p>
            <Link to="/contact" className="ofd-button mt-6">Contact OFD <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AmbassadorProgram