import Navbar from '../GeneralComponents/Navbar'

function OurRole() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Our Role</h1>
              <p className="text-lg md:text-xl font-medium">
                Catalyzing positive, sustainable change across communities by closing gaps in access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Otiano Foundation for Development (OFD) stands as a catalyst for enduring, positive transformation, bridging the divides that hinder progress in underserved communities worldwide. By addressing disparities in access to education, healthcare, economic pathways, and essential social services, we challenge the status quo and ignite cycles of empowerment. In a world where inequality often perpetuates itself, OFD confronts this reality head-on, questioning: What if every individual, regardless of circumstance, could harness their innate potential to reshape not just their own destiny, but the fabric of society?
            </p>
            
            <p>
              At our essence, we function as the vital conduit linking untapped human potential with the resources and opportunities required for realization. This role demands more than mere intervention; it calls for a profound commitment to equity, where empowerment is not a handout but a spark for self-determination. We ponder the deeper implications: How might societies evolve if barriers were dismantled not through temporary fixes, but through systemic strengthening that fosters resilience and autonomy?
            </p>
            
            <p>
              To achieve this, OFD meticulously designs and executes programs that equip individuals with critical knowledge, practical skills, and supportive networks, all while fortifying local infrastructures. Our collaborations with community leaders, governmental bodies, and strategic partners amplify these efforts, creating synergies that extend far beyond isolated initiatives. This holistic strategy provokes reflection on a larger scale: In an interconnected global landscape, can collective action truly eradicate the roots of inequity, paving the way for communities that are not only self-sustaining but thriving exemplars of human ingenuity?
            </p>
            
            <p>
              Ultimately, through our unwavering pursuit, OFD cultivates environments where resilience becomes the norm, and self-reliance empowers generations to envision and construct brighter horizons. We invite contemplation: If access is the key to unlocking human potential, what untapped possibilities await when we collectively commit to turning that key?
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurRole