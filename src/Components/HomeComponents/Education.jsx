import BrandVisual from '../GeneralComponents/BrandVisual'
import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function Education() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-brand mb-4">Education</h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                Transforming educational landscapes across Africa through equitable access and innovative learning.
              </p>
              {/* <p className="text-base text-neutral-700">
                Education is the cornerstone of empowerment, yet disparities in access and quality hinder millions from realizing their potential. At OFD, we are committed to transforming educational landscapes across Africa by fostering equitable access, innovative learning, and systemic strengthening.
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
Education is the cornerstone of empowerment, yet disparities in access and quality hinder millions from realizing their potential. At OFD, we are committed to transforming educational landscapes across Africa by fostering equitable access, innovative learning, and systemic strengthening.          </p>
          <p className="text-neutral-700 italic leading-relaxed">
            We achieve this by implementing initiatives that nurture knowledge and skills for lifelong success:
          </p>
        </div>
      </section>

      {/* Access to Education */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Access to Education" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Access to Education</h2>
              <p className="text-neutral-700 leading-relaxed">
                We provide scholarships, learning materials, and school support to ensure financial constraints do not limit access to education. Our initiatives target remote and low-income areas, offering tuition waivers, textbooks, and digital devices to thousands of students annually. By partnering with local governments, we have increased enrollment rates by over 25% in pilot regions, fostering environments where education becomes a right, not a privilege, and inspiring families to invest in long-term human development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Digital Literacy */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Skills & Digital Literacy</h2>
              <p className="text-neutral-700 leading-relaxed">
                OFD promotes literacy, digital skills, and practical learning programs that prepare learners for modern educational and employment environments. Through interactive workshops and online platforms, we teach coding, critical thinking, and vocational basics. This focus on future-ready skills empowers youth to navigate a tech-driven economy, challenging traditional curricula and sparking innovation in underserved communities.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Skills & Digital Literacy" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Teacher & School Support */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <BrandVisual title="Teacher & School Support" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand mb-6">Teacher & School Support</h2>
              <p className="text-neutral-700 leading-relaxed">
                We strengthen education systems through teacher training, school infrastructure support, and curriculum enhancement initiatives. Our programs include professional development workshops for educators, renovations of dilapidated facilities, and integration of culturally relevant content. By enhancing teacher efficacy and school environments, we have improved learning outcomes in partner schools, urging reflection on how empowered educators can reshape generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-brand mb-6">Community Engagement in Education</h2>
              <p className="text-neutral-700 leading-relaxed">
                Extending beyond classrooms, we foster parental and community involvement through awareness campaigns and volunteer networks. This holistic approach builds local ownership, reducing dropout rates and promoting lifelong learning cultures. Our efforts have mobilized hundreds of volunteers, demonstrating how community-led education can sustain progress even in resource-scarce settings.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <BrandVisual title="Community Engagement in Education" topic="education" className="h-64 sm:h-80 shadow-card" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Education