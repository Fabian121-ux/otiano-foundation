import React from 'react'

function StrategicPlan() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Our Strategic Plan</h1>
              <p className="text-lg md:text-xl font-medium">
                Charting a visionary course toward measurable, transformative impact across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-700 leading-relaxed text-lg">
            OFD's strategic plan charts a visionary course toward measurable, transformative impact, addressing the multifaceted challenges faced by underserved communities across Africa. By delineating clear, interconnected pathways, we not only respond to immediate needs but also cultivate ecosystems of resilience and growth. This blueprint challenges us to envision a future where opportunity is not a privilege but a universal reality: How might targeted, scalable actions redefine the trajectory of entire generations?
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Education Access"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Expanding Educational Access & Quality</h2>
              <p className="text-gray-700 leading-relaxed">
                In an era where knowledge is the cornerstone of progress, we are dedicated to dismantling barriers that hinder learning for underserved children and youth. Through scholarships that alleviate financial burdens, digital literacy programs that bridge the technological divide, and initiatives to fortify education systems, we ensure equitable access to quality education. Our approach empowers individuals to not just learn, but to innovate and lead, prompting reflection: What untapped potential lies dormant when education remains out of reach, and how can we unlock it to fuel societal advancement?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Enhancing Community Health & Well-Being</h2>
              <p className="text-gray-700 leading-relaxed">
                Health is the bedrock of human dignity and productivity, yet disparities persist in vulnerable regions. We commit to elevating health outcomes by reinforcing systems, heightening awareness through targeted campaigns, and expanding access to essential services via community outreach and robust health infrastructure support. This holistic strategy fosters preventive care and long-term wellness, inviting contemplation: In a world interconnected by health crises, how can empowered communities become the first line of defense against inequality in well-being?
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Community Health"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Economic Empowerment Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Economic Empowerment"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Boosting Economic Empowerment & Livelihoods</h2>
              <p className="text-gray-700 leading-relaxed">
                Economic independence is the engine of self-reliance, driving families and communities toward prosperity. We deliver comprehensive skills training, financial education, and entrepreneurial guidance to equip individuals with the tools for sustainable livelihoods. By nurturing innovation and financial acumen, we enable pathways to stability and growth, challenging us to consider: If economic barriers were systematically removed, what waves of entrepreneurship and wealth creation could reshape Africa's future?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Protection Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Strengthening Social Protection & Inclusion</h2>
              <p className="text-gray-700 leading-relaxed">
                True progress demands safeguarding the most vulnerable, weaving nets of support that promote inclusion and resilience. Our focus on holistic interventions - such as child protection programs and community-led support networks - builds frameworks that shield against adversity while fostering unity. This value-driven effort ensures no one is marginalized, provoking deeper insight: How might robust social protections not only heal wounds but also prevent them, creating societies where every voice contributes to collective strength?
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Social Protection"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Building Partnerships"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Building Partnerships for Scale</h2>
              <p className="text-gray-700 leading-relaxed">
                No single entity can achieve systemic change alone; it is through synergy that impact multiplies exponentially. We forge strategic alliances with public, private, and civil society partners to amplify reach and deepen efficacy, co-creating solutions that endure. This collaborative ethos leverages diverse expertise for sustainable outcomes, urging us to ponder: In an age of global challenges, what profound transformations await when unified efforts turn isolated initiatives into widespread revolutions?
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default StrategicPlan