import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../GeneralComponents/Navbar'

function WhatWeDo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h1>
        {/* <h2 className="text-2xl text-gray-700 mb-8">Opportunity for All • Possibility Everywhere</h2> */}
        
        <p className="text-gray-700 leading-relaxed mb-12">
          At Otiano Foundation for Development (OFD), our work is focused on creating inclusive opportunities and sustainable impact across communities. We deliver our mission through four core areas of intervention.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
            <p className="text-gray-700 mb-4">
              We expand access to quality education and learning opportunities for underserved children and young people, laying the foundation for long-term social and economic mobility.
            </p>
            <Link to="/education" className="text-red-600 font-medium hover:underline">
              Learn more →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Healthcare</h3>
            <p className="text-gray-700 mb-4">
              We support community-based healthcare initiatives that improve access to essential services, promote preventive care, and strengthen health outcomes.
            </p>
            <Link to="/healthcare" className="text-red-600 font-medium hover:underline">
              Learn more →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Economic Empowerment</h3>
            <p className="text-gray-700 mb-4">
              We equip individuals with skills, knowledge, and resources to achieve financial independence and build sustainable livelihoods.
            </p>
            <Link to="/economic-empowerment" className="text-red-600 font-medium hover:underline">
              Learn more →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Social Welfare & Protection</h3>
            <p className="text-gray-700 mb-4">
              We protect dignity and wellbeing by supporting vulnerable populations and strengthening community safety nets.
            </p>
            <Link to="/social-welfare" className="text-red-600 font-medium hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo