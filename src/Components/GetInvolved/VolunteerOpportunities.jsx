import { Link } from 'react-router-dom'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'

function VolunteerOpportunities() {
  return (
    <div>
      <Navbar />
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="site-container pb-10">
            <h1 className="mb-4 text-3xl font-bold text-brand md:text-4xl">Volunteer Opportunities</h1>
            <p className="reading-copy">Interested in contributing to OFD? Start a conversation about your skills, interests, and availability.</p>
          </div>
        </div>
      </section>
      <main className="section-space bg-white">
        <div className="site-container">
          <div className="ofd-card max-w-3xl p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Express your interest</h2>
            <div className="reading-copy space-y-4">
              <p>Email the Foundation with a short introduction, the programme area that interests you, your relevant experience, and your availability.</p>
              <p>Expressions of interest help us understand potential contributions. Any role, responsibilities, or participation arrangements will be discussed directly with you.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a className="ofd-button" href="mailto:info@otianofoundation.org?subject=Volunteer%20expression%20of%20interest">Email your interest <span aria-hidden="true">→</span></a>
              <Link className="ofd-button ofd-button-outline" to="/contact">Contact OFD</Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-neutral-600 max-w-prose">info@otianofoundation.org</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default VolunteerOpportunities
