import Navbar from '../GeneralComponents/Navbar'

function OurStory() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-7xl">
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Our Story</h1>
              <p className="text-lg md:text-xl font-medium">
                Opportunity for All • Possibility Everywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {/* First Section */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                The Otiano Foundation for Development (OFD) was born out of a deep commitment to expanding opportunity and transforming communities through sustainable development, inclusive growth, and human empowerment. Founded in response to the pressing challenges faced by underserved populations around the world, OFD emerged from a vision that recognized the interconnectedness of social, economic, and environmental factors.
              </p>
              
              <p>
                This dedication stems from the founders personal experiences and observations of inequality, inspiring a mission to create lasting change. By prioritizing equitable access to education, quality health services, economic pathways, and social protection, OFD was formally established as a beacon of hope for those often left behind.
              </p>
            </div>
            
            {/* Second Section */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                At its core, the Foundation believes that when individuals are equipped with the right skills, support, and resources, they can unlock their full potential and drive community-wide progress. This philosophy is rooted in the idea that empowerment is not just about immediate aid but fostering self-reliance and resilience.
              </p>
              
              <p>
                OFD focuses on holistic approaches that address root causes rather than symptoms, ensuring that interventions are culturally sensitive and community-led. Through targeted programs, the Foundation has already made strides in areas like vocational training, healthcare outreach, and financial literacy, helping countless individuals build brighter futures.
              </p>
            </div>
            
            {/* Third Section - Full Width */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Building on its foundational principles, OFD emphasizes the power of partnerships and innovation to amplify its impact. Collaborating with local governments, NGOs, businesses, and community leaders, the Foundation designs strategic interventions tailored to the unique needs of regions where change is most urgently required. Whether through technology-driven solutions, capacity-building workshops, or advocacy campaigns, OFD adapts to evolving challenges like climate change, urbanization, and global pandemics.
                </p>
                
                <p>
                  Looking ahead, OFD remains committed to growing as a dynamic force for long-term transformation, with a focus on scalability and measurable outcomes. By continuously evaluating its programs and incorporating feedback from beneficiaries, the Foundation ensures accountability and effectiveness. As it expands its reach, OFD invites like-minded individuals, organizations, and donors to join in this journey toward a more inclusive world. Ultimately, the story of OFD is one of possibility everywhere, where every act of empowerment contributes to a ripple effect of positive change across communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurStory
