import { useState } from 'react'

function OurValues() {
  const [activeValue, setActiveValue] = useState(null)

  const values = [
    {
      title: 'Integrity',
      icon: '🛡️',
      color: 'bg-brand',
      content: 'We uphold honesty, accountability, and ethical practice in all our engagements, ensuring trust with stakeholders and communities. Our approach emphasizes rigorous transparency in decision-making and resource allocation, conducting regular audits and open reporting to maintain credibility. In dealing with people, we prioritize respectful, truthful communication, building relationships based on mutual accountability where feedback loops empower beneficiaries to hold us responsible. Through this, we achieve sustainable trust that amplifies our impact, as seen in partnerships where ethical standards have led to increased donor confidence and more effective program delivery, ultimately fostering environments where communities can thrive without fear of exploitation.'
    },
    {
      title: 'Inclusivity',
      icon: '🤝',
      color: 'bg-brand',
      content: 'We champion equal access and participation for all, especially the marginalized, ensuring no one is left behind. Our method involves conducting inclusive needs assessments that actively incorporate voices from diverse groups, including women, youth, and ethnic minorities, to design tailored interventions. When interacting with people, we practice empathetic listening and co-creation, creating safe spaces for dialogue that dismantle barriers and promote empowerment. This value drives achievements like expanded educational outreach in remote areas, where inclusive strategies have boosted enrollment rates by integrating local languages and cultures, provoking deeper reflection on how true equity can redefine societal progress.'
    },
    {
      title: 'Sustainability',
      icon: '🌱',
      color: 'bg-brand',
      content: 'We design programs with long-term impact, ensuring positive outcomes that last beyond immediate interventions. Our approach integrates environmental, economic, and social considerations from the outset, using data-driven planning to build scalable models that adapt to future challenges. In our dealings with people, we focus on capacity-building through training and mentorship, empowering communities to take ownership and maintain initiatives independently. By doing so, we achieve enduring results, such as health programs that have reduced disease prevalence through ongoing community-led awareness campaigns, challenging us to consider: What legacies do we leave when short-term aid evolves into self-sustaining ecosystems?'
    },
    {
      title: 'Innovation',
      icon: '💡',
      color: 'bg-brand',
      content: 'We embrace creativity and forward-thinking solutions that address challenges efficiently and effectively. Our methodology involves leveraging technology and research to pilot novel ideas, iterating based on real-time feedback to refine approaches. When engaging with people, we encourage participatory innovation workshops where community members contribute ideas, fostering a sense of ownership and sparking collective ingenuity. This leads to breakthroughs like digital literacy tools that have transformed economic opportunities in underserved regions, inviting contemplation on how bold creativity can turn obstacles into opportunities for exponential growth.'
    },
    {
      title: 'Collaboration',
      icon: '🔗',
      color: 'bg-brand',
      content: 'We build strong partnerships with communities, governments, and institutions to multiply impact and co-create solutions that drive lasting change. Our approach centers on forging alliances through shared goals and joint planning, utilizing networks to pool resources and expertise. In interactions with people, we emphasize mutual respect and shared decision-making, facilitating cross-sector dialogues that bridge divides and align efforts. Through this, we accomplish amplified outcomes, such as multi-stakeholder health initiatives that have improved service access across borders, prompting us to reflect on the profound power of unity in reshaping futures for generations.'
    }
  ]
  return (
    <div>
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4">Our Values</h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                Integrity, inclusivity, and impact converge to forge pathways of lasting transformation.
              </p>
              <p className="text-base text-neutral-700">
                In a world grappling with persistent inequalities, the Otiano Foundation for Development (OFD) stands as a beacon of principled action, where our core values are not mere ideals but the foundational pillars that infuse every decision, program, and partnership with purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-card p-8 shadow-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 shrink-0 bg-brand-100 rounded-card flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Our Mission</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To provide innovative and sustainable solutions that enhance education, improve healthcare, create economic opportunities, and strengthen social welfare systems, ensuring individuals and communities reach their potentials.
              </p>
            </div>
            
            <div className="bg-white rounded-card p-8 shadow-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-card flex items-center justify-center mr-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Our Vision</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To transform lives and uplift communities across Africa by advancing education, healthcare, economic empowerment, and social welfare, fostering sustainable development and growth for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Our Approach to Upholding These Values</h2>
          <p className="text-neutral-700 leading-relaxed text-lg">
            At OFD, we approach our values as dynamic frameworks that guide our interactions, strategies, and outcomes. By embedding them into our daily operations, we foster trust, drive innovation, and ensure equitable progress. This means engaging stakeholders with transparency, adapting to community needs through collaborative dialogue, and measuring success not just by immediate results but by the enduring resilience we build.
          </p>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Values List */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Core Values</h3>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <button
                    key={index}
                    aria-expanded={activeValue === index}
                    aria-controls="value-content"
                    onClick={() => {
                      setActiveValue(activeValue === index ? null : index)
                      // Scroll to content on mobile
                      if (window.innerWidth < 1024) {
                        setTimeout(() => {
                          document.getElementById('value-content')?.scrollIntoView({ 
                            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                            block: 'start'
                          })
                        }, 100)
                      }
                    }}
                    className={`w-full text-left p-4 rounded-card transition-all duration-300 ${
                      activeValue === index 
                        ? `${value.color} text-white shadow-card` 
                        : 'bg-white hover:bg-neutral-100 text-neutral-800 shadow-md'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{value.icon}</span>
                      <span className="font-bold text-lg">{value.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Value Content */}
            <div className="lg:col-span-2" id="value-content" aria-live="polite">
              {activeValue !== null ? (
                <div className="bg-white rounded-card p-8 shadow-card h-full">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{values[activeValue].icon}</span>
                    <h3 className="text-3xl font-bold text-neutral-900">{values[activeValue].title}</h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-lg">
                    {values[activeValue].content}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-card p-8 shadow-card h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">✨</span>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Explore Our Values</h3>
                    <p className="text-neutral-600 text-lg">
                      Click on any value to learn more about how we implement it in our work and interactions with communities.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default OurValues