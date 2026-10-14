import React from 'react'

function WhatWeDo() {
  return (
    <div>
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">What We Do</h1>
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
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">Four Core Areas</h2>
            <p className="text-neutral-600 leading-relaxed">
              We deliver our mission through four core areas of intervention, creating inclusive opportunities and sustainable impact across communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-brand mb-4">
                Education
              </h3>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p><strong>Access to Education:</strong> We provide scholarships, learning materials, and school support to ensure that financial constraints do not limit access to education.</p>
                <p><strong>Skills & Digital Literacy:</strong> OFD promotes literacy, digital skills, and practical learning programs that prepare learners for modern educational and employment environments.</p>
                <p><strong>Teacher & School Support:</strong> We strengthen education systems through teacher training, school infrastructure support, and curriculum enhancement initiatives.</p>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-brand mb-4">
                Healthcare
              </h3>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p><strong>Community Health Outreach:</strong> We organize medical outreaches and health education programs that promote preventive care and early intervention.</p>
                <p><strong>Maternal & Child Health:</strong> Our programs support maternal, newborn, and child health through awareness, care support, and partnerships with health facilities.</p>
                <p><strong>Health System Support:</strong> We provide essential medical equipment and supplies to strengthen community health services.</p>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-brand mb-4">
                Economic Empowerment
              </h3>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p><strong>Vocational & Entrepreneurship Training:</strong> We equip beneficiaries with vocational skills and entrepreneurship knowledge to start and grow sustainable businesses.</p>
                <p><strong>Financial Literacy:</strong> Our programs promote financial management, savings culture, and responsible economic decision-making.</p>
                <p><strong>Career Development:</strong> We support job readiness, mentorship, and career guidance for young people and early-career professionals.</p>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-brand mb-4">
                Social Welfare & Protection
              </h3>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
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