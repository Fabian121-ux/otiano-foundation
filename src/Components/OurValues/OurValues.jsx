import { useState } from 'react'

function OurValues() {
  const [activeValue, setActiveValue] = useState(null)

  const values = [
    {
      title: 'Integrity',
      icon: '🛡️',
      color: 'bg-brand',
      content: "Integrity means being honest about our work, responsible with resources, and clear about what has been achieved and what is planned. We aim to support trust through accurate information and accountability."
    },
    {
      title: 'Inclusivity',
      icon: '🤝',
      color: 'bg-brand',
      content: "Inclusivity means listening to people who face barriers to participation. We aim to involve different community voices in identifying needs and shaping relevant programmes."
    },
    {
      title: 'Sustainability',
      icon: '🌱',
      color: 'bg-brand',
      content: "Sustainability means considering how proposed activities could remain useful beyond their initial delivery. We aim to understand local conditions, available resources, and the responsibilities needed for continued support."
    },
    {
      title: 'Innovation',
      icon: '💡',
      color: 'bg-brand',
      content: "Innovation means remaining open to practical ideas and learning from experience. We aim to assess proposed approaches against community needs rather than assume that new technology alone creates better outcomes."
    },
    {
      title: 'Collaboration',
      icon: '🔗',
      color: 'bg-brand',
      content: "Collaboration means respecting the knowledge and responsibilities of communities and partners. We aim to agree clear purposes and contributions before presenting any partnership as established."
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
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium mb-4">
                The principles that guide our programme decisions and relationships.
              </p>
              <p className="text-base text-neutral-700 max-w-prose">
                Our values set expectations for how we listen, plan, work with others, and communicate progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-neutral-50 section-space">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-card p-8 shadow-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 shrink-0 bg-brand-100 rounded-card flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Our Mission</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed max-w-prose">
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
              <p className="text-neutral-700 leading-relaxed max-w-prose">
                To transform lives and uplift communities across Africa by advancing education, healthcare, economic empowerment, and social welfare, fostering sustainable development and growth for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white section-space">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Our Approach to Upholding These Values</h2>
          <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base max-w-prose">
            We aim to apply these values when identifying community needs, assessing proposed activities, and communicating what has been done. They are commitments that should guide decisions and be reflected in documented work.
          </p>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="bg-neutral-50 section-space">
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
                  <p className="text-neutral-700 leading-relaxed text-[0.9375rem] sm:text-base max-w-prose">
                    {values[activeValue].content}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-card p-8 shadow-card h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">✨</span>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Explore Our Values</h3>
                    <p className="text-neutral-600 text-[0.9375rem] sm:text-base max-w-prose">
                      Select a value to read what it means for our intended approach.
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