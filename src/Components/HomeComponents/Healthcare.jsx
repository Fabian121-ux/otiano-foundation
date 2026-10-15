import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function Healthcare() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Healthcare</h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                Enhancing community health outcomes through strengthened systems and equitable access.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* <h2 className="text-3xl font-bold text-neutral-900 mb-8">Overview</h2> */}
          <p className="text-neutral-700 leading-relaxed text-lg mb-8">
                Healthcare is fundamental to human dignity and productivity, but systemic gaps leave vulnerable populations exposed to preventable risks. OFD works to enhance community health outcomes by strengthening systems, promoting preventive care, and ensuring equitable access to services.
          </p>
          <p className="text-neutral-700 italic leading-relaxed">
            We accomplish this via targeted efforts that enhance well-being and resilience in communities:
          </p>
        </div>
      </section>

      {/* Community Health Outreach */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Community Health Outreach" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Community Health Outreach</h2>
              <p className="text-neutral-700 leading-relaxed">
                We organize medical outreaches and health education programs that promote preventive care and early intervention. These initiatives include free screenings, vaccination drives, and workshops on hygiene and nutrition, serving remote villages where access is limited. By educating over 10,000 individuals annually, we reduce disease prevalence and empower communities to take proactive health steps, turning awareness into lasting behavioral change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maternal & Child Health */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Maternal & Child Health</h2>
              <p className="text-neutral-700 leading-relaxed">
                Our programs support maternal, newborn, and child health through awareness, care support, and partnerships with health facilities. We provide prenatal kits, training for midwives, and nutritional supplements, focusing on high-risk areas to lower mortality rates. Collaborations with local clinics have improved outcomes for thousands, highlighting the ripple effect of targeted interventions on family and community stability.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Maternal & Child Health" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Health System Support */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Health System Support" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Health System Support</h2>
              <p className="text-neutral-700 leading-relaxed">
                We provide essential medical equipment and supplies to strengthen community health services. This includes donating diagnostic tools, beds, and pharmaceuticals to under-equipped facilities, enabling better diagnosis and treatment. Our investment is to upgrade health centers, fostering sustainable systems that withstand health crises and ensure continuous care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Awareness */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Mental Health Awareness</h2>
              <p className="text-neutral-700 leading-relaxed">
                Recognizing the often-overlooked aspect of health, we run campaigns and support groups to raise mental health awareness and provide counseling services. Integrating this into broader outreach, we train community leaders to identify and address issues like stress and trauma. This initiative has reached vulnerable groups, provoking deeper discussions on holistic health as a pillar of societal resilience.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Mental Health Awareness" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Emergency Response Preparedness" topic="healthcare" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Emergency Response Preparedness</h2>
              <p className="text-neutral-700 leading-relaxed">
                In partnership with regional authorities, we build capacity for emergency responses through simulations, supply stockpiling, and rapid-response teams. This proactive measure has equipped communities to handle outbreaks and disasters, ensuring that healthcare systems remain robust even in adversity.
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