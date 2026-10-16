import { Link } from 'react-router-dom'

function EnhancingOpportunities() {
  return (
    <section className="section-space bg-white" aria-labelledby="introduction-heading">
      <div className="site-container grid gap-6 md:grid-cols-2 md:gap-12">
        <div>
          <p className="section-eyebrow">Our purpose</p>
          <h2 id="introduction-heading" className="section-heading">Enhancing opportunities for sustainable development</h2>
        </div>
        <div className="reading-copy space-y-4">
          <p>Otiano Foundation for Development (OFD) is a Nigerian nonprofit focused on education, healthcare, economic empowerment, and social welfare.</p>
          <p>Our aim is to listen to communities, identify practical needs, and build programmes that widen access to opportunity across Nigeria and Africa.</p>
          <Link to="/about/our-story" className="ofd-text-link">Read our story <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  )
}

export default EnhancingOpportunities
