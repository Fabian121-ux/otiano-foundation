import SEO from '../GeneralComponents/SEO'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'
import FounderPortrait from '../../assets/trustees/kingsley-otiaba.jpg'

function FoundersMessage() {
  return (
    <div>
      <SEO title="Founder's Message" description="Africa's greatest resource is not beneath its soil, it is within its people." />
      <Navbar />
      
      <section className="founders-feature" aria-labelledby="founders-feature-heading">
        <div className="site-container founders-feature-layout">
          <div className="founders-feature-copy">
            <p className="founders-feature-eyebrow">A message from our founder</p>
            <h1 id="founders-feature-heading">Founder's Message</h1>
            <p className="founders-feature-quote">Africa's greatest resource is not beneath its soil, it is within its people.</p>
            <div className="founders-feature-byline">
              <p className="font-semibold">Kingsley Otiaba</p>
              <p>Founder &amp; Executive Chairman</p>
            </div>
          </div>
          <figure className="founders-feature-image-wrap">
            <img src={FounderPortrait} alt="Kingsley Chikaodili Otiaba, founder of the Otiano Foundation for Development"
              loading="eager" decoding="async" fetchPriority="high" className="founders-feature-portrait" />
          </figure>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="bg-white rounded-card shadow-card p-5 sm:p-8 md:p-10">
            <div className="space-y-6">
              <p className="text-neutral-700 leading-relaxed">
                I founded the Otiano Foundation for Development with a deep conviction that development must begin by expanding access to opportunity and by ensuring that possibility is not limited by geography, background, or circumstance. Across Nigeria and Africa, millions of capable individuals remain constrained - not by lack of talent or ambition - but by limited access to quality education, healthcare, economic opportunities, and social protection. OFD was created to help change this reality.
              </p>
              
              <p className="text-neutral-700 leading-relaxed">
                Our work is guided by a simple but powerful belief: when people are given the right support, opportunity becomes accessible and possibility extends far beyond the individual to families, communities, and future generations. This belief shapes every program we design, every partnership we pursue, and every community we serve.
              </p>
              
              <p className="text-neutral-700 leading-relaxed">
                At the Otiano Foundation for Development, we focus on four interconnected pillars - education, healthcare, economic empowerment, and social welfare and protection. These are not isolated interventions; they are deliberate pathways that move people from vulnerability to resilience, from dependence to dignity, and from exclusion to inclusion.
              </p>
              
              <p className="text-neutral-700 leading-relaxed">
                We are intentional about building solutions that endure. Through strong governance, transparent systems, data-driven impact measurement, and strategic partnerships, we are laying the foundation for an institution that ensures access is broadened, voices are heard, and meaningful progress can happen anywhere it is needed.
              </p>
              
              <p className="text-neutral-700 leading-relaxed">
                While our journey is still unfolding, our commitment is unwavering. We remain focused on listening to communities, learning from evidence, innovating responsibly, and scaling what works. Above all, we are committed to placing people - especially the most vulnerable, at the center of development, so that no one is left without a pathway forward.
              </p>
              
              <p className="text-neutral-700 leading-relaxed">
                I am deeply grateful to our Board of Trustees, volunteers, partners, donors, and community stakeholders who share this vision and walk this journey with us. Together, we are demonstrating that when opportunity is made accessible, possibility has no boundaries.
              </p>
              
              <p className="text-neutral-700 leading-relaxed font-medium">
                The future we envision is achievable.<br />
                And together, we will build it.
              </p>
              
              <div className="pt-6 border-t border-neutral-200">
                <p className="text-neutral-900 font-bold">Kingsley Otiaba</p>
                <p className="text-neutral-600">Founder & Executive Chairman</p>
                <p className="text-neutral-600">Otiano Foundation for Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default FoundersMessage