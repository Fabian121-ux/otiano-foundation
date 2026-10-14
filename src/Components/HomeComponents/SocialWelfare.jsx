import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function SocialWelfare() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Social Welfare & Protection</h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                Safeguarding vulnerable populations and promoting inclusion for all.
              </p>
              {/* <p className="text-base text-neutral-700">
                Social welfare and protection form the safety net that safeguards vulnerable populations, ensuring no one is left behind in the pursuit of progress. At OFD, we focus on holistic interventions that promote inclusion, resilience, and community solidarity.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* <h2 className="text-3xl font-bold text-neutral-900 mb-8">Overview</h2> */}
          <p className="text-neutral-700 leading-relaxed text-lg mb-8">
                Social welfare and protection form the safety net that safeguards vulnerable populations, ensuring no one is left behind in the pursuit of progress. At OFD, we focus on holistic interventions that promote inclusion, resilience, and community solidarity.
          </p>
          <p className="text-neutral-700 italic leading-relaxed">
            We advance this with supportive measures that foster inclusion and safeguard dignity:
          </p>
        </div>
      </section>

      {/* Child Protection */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Child Protection" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Child Protection</h2>
              <p className="text-neutral-700 leading-relaxed">
                We support initiatives that promote child welfare, safety, and access to care and education. Through advocacy campaigns, safe spaces, and legal aid partnerships, we combat exploitation and ensure basic rights. Our work has protected thousands of children, integrating education with protection to foster secure, nurturing upbringing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Support & Inclusion */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Community Support & Inclusion</h2>
              <p className="text-neutral-700 leading-relaxed">
                Our programs provide social support for widows, persons with disabilities, and vulnerable groups. This includes micro-grants, skill-building, and accessibility enhancements, tailored to promote independence and integration. By addressing specific needs, we have empowered marginalized individuals to participate fully in society, reducing isolation and enhancing community cohesion.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Community Support & Inclusion" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Mentorship */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Leadership & Mentorship" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Leadership & Mentorship</h2>
              <p className="text-neutral-700 leading-relaxed">
                We promote community leadership, mentorship, and civic responsibility to build resilient societies. Through training academies and peer networks, we cultivate leaders who drive local change. This initiative has inspired grassroots movements, highlighting how mentorship can ignite civic engagement and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gender-Based Violence Prevention */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Gender-Based Violence Prevention</h2>
              <p className="text-neutral-700 leading-relaxed">
                Focusing on prevention, we run education programs, support hotlines, and legal advocacy to combat gender-based violence. Collaborating with local organizations, we provide counseling and economic alternatives for survivors, aiming to shift cultural norms and create safer communities.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Gender-Based Violence Prevention" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Environmental and Social Resilience */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Environmental and Social Resilience" topic="protection" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Environmental and Social Resilience</h2>
              <p className="text-neutral-700 leading-relaxed">
                Integrating welfare with sustainability, we support programs that build resilience against climate impacts on vulnerable groups. This includes disaster preparedness training and eco-friendly livelihood options, ensuring social protections evolve with environmental challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default SocialWelfare