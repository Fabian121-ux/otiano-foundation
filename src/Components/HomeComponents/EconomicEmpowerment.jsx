import React from 'react'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'
import VocationalTrainingImg from '../../assets/downloadedimages/Financial Literacy.png'
import FinancialLiteracyImg from '../../assets/downloadedimages/Career Development.png'
import CareerDevelopmentImg from '../../assets/downloadedimages/Child Protection.png'

function EconomicEmpowerment() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Economic Empowerment</h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                Fueling self-reliance and breaking cycles of poverty through sustainable livelihoods.
              </p>
              {/* <p className="text-base text-white/90">
                Economic empowerment fuels self-reliance and breaks cycles of poverty, yet limited skills and opportunities stifle growth in many African communities. OFD equips individuals with the tools for sustainable livelihoods, blending education, innovation, and support to foster entrepreneurship and financial independence.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2> */}
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Economic empowerment fuels self-reliance and breaks cycles of poverty, yet limited skills and opportunities stifle growth in many African communities. OFD equips individuals with the tools for sustainable livelihoods, blending education, innovation, and support to foster entrepreneurship and financial independence.
          </p>
          <p className="text-gray-700 italic leading-relaxed">
            We realize this by offering resources that spark entrepreneurial spirit and financial autonomy:
          </p>
        </div>
      </section>

      {/* Vocational & Entrepreneurship Training */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img 
                src={VocationalTrainingImg}
                alt="Entrepreneurs in training program"
                className="w-full h-80 object-cover object-top rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6">Vocational & Entrepreneurship Training</h2>
              <p className="text-gray-700 leading-relaxed">
                We equip beneficiaries with vocational skills and entrepreneurship knowledge to start and grow sustainable businesses. Through hands-on courses in trades like tailoring, agriculture, and tech startups, we provide seed funding and market linkages. We demonstrate how skill-building can turn ideas into viable ventures that uplift families and local economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Literacy */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Financial Literacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our programs promote financial management, savings culture, and responsible economic decision-making. Interactive sessions cover budgeting, investment basics, and debt avoidance, tailored for youth and women in informal sectors. By enhancing financial acumen, we have helped participants increase savings by 40%, empowering them to navigate economic uncertainties with confidence.
              </p>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <img 
                src={FinancialLiteracyImg}
                alt="Financial planning workshop"
                className="w-full h-80 object-cover object-top rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Development */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img 
                src={CareerDevelopmentImg}
                alt="Mentorship session between professionals"
                className="w-full h-80 object-cover object-top rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6">Career Development</h2>
              <p className="text-gray-700 leading-relaxed">
                We support job readiness, mentorship, and career guidance for young people and early-career professionals. This includes resume workshops, interview coaching, and networking events with industry leaders. Our efforts have placed hundreds in meaningful employment, bridging the gap between education and workforce entry while fostering long-term career growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default EconomicEmpowerment