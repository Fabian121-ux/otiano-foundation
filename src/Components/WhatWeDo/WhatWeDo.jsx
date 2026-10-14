import React from 'react'
import Navbar from '../GeneralComponents/Navbar'

function WhatWeDo() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">What We Do</h1>
              <p className="text-lg md:text-xl font-medium">
                Opportunity for All • Possibility Everywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Pillars Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Four Core Areas</h2>
            <p className="text-gray-600 leading-relaxed">
              We deliver our mission through four core areas of intervention, creating inclusive opportunities and sustainable impact across communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Education
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p><strong>Access to Education:</strong> We provide scholarships, learning materials, and school support to ensure that financial constraints do not limit access to education.</p>
                <p><strong>Skills & Digital Literacy:</strong> OFD promotes literacy, digital skills, and practical learning programs that prepare learners for modern educational and employment environments.</p>
                <p><strong>Teacher & School Support:</strong> We strengthen education systems through teacher training, school infrastructure support, and curriculum enhancement initiatives.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Healthcare
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p><strong>Community Health Outreach:</strong> We organize medical outreaches and health education programs that promote preventive care and early intervention.</p>
                <p><strong>Maternal & Child Health:</strong> Our programs support maternal, newborn, and child health through awareness, care support, and partnerships with health facilities.</p>
                <p><strong>Health System Support:</strong> We provide essential medical equipment and supplies to strengthen community health services.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Economic Empowerment
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p><strong>Vocational & Entrepreneurship Training:</strong> We equip beneficiaries with vocational skills and entrepreneurship knowledge to start and grow sustainable businesses.</p>
                <p><strong>Financial Literacy:</strong> Our programs promote financial management, savings culture, and responsible economic decision-making.</p>
                <p><strong>Career Development:</strong> We support job readiness, mentorship, and career guidance for young people and early-career professionals.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Social Welfare & Protection
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p><strong>Child Protection:</strong> We support initiatives that promote child welfare, safety, and access to care and education.</p>
                <p><strong>Community Support & Inclusion:</strong> Our programs provide social support for widows, persons with disabilities, and vulnerable groups.</p>
                <p><strong>Leadership & Mentorship:</strong> We promote community leadership, mentorship, and civic responsibility to build resilient societies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhatWeDo