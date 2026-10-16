import { Link } from 'react-router-dom'
import Kingsley from '../../assets/trustees/kingsley-otiaba.jpg'
import David from '../../assets/trustees/david-achugbu.jpg'
import Raphael from '../../assets/trustees/raphael-anyanwu.jpg'
import Awan from '../../assets/trustees/zanang-awan.jpg'
import Cheeka from '../../assets/trustees/cheeka-onyeka.jpg'
import Ekeoma from '../../assets/trustees/ekeoma-solomon-ogbu.jpg'
import Lucy from '../../assets/trustees/lucy-simon-ashide.jpg'
import { founderProfile } from '../../data/founderProfile'

const trustees = [
  { name: founderProfile.name, image: Kingsley, role: 'Founder and Executive Chairman', founder: true },
  { name: 'David Achugbu', image: David, role: 'Secretary, Board of Trustees' },
  { name: 'Raphael Anyanwu', image: Raphael, role: 'Trustee' },
  { name: 'Zanang Awan', image: Awan, role: 'Trustee' },
  { name: 'Cheeka Onyeka Esq.', image: Cheeka, role: 'Trustee' },
  { name: 'Ekeoma Solomon Ogbu Esq.', image: Ekeoma, role: 'Trustee' },
  { name: 'Lucy Simon Ashide', image: Lucy, role: 'Trustee' },
]

function Trustees() {
  return (
    <div>
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="site-container pb-10">
            <h1 className="mb-4 text-3xl font-bold text-brand md:text-4xl">Our Trustees</h1>
            <p className="reading-copy">Our trustees provide oversight and guidance for the Foundation’s direction, governance, and programme priorities.</p>
          </div>
        </div>
      </section>
      <section className="section-space bg-white" aria-label="Board of Trustees">
        <div className="site-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustees.map((trustee) => (
            <article key={trustee.name} className="ofd-card flex min-w-0 flex-col overflow-hidden">
              <div className="aspect-[4/5] w-full border-b border-neutral-200 bg-neutral-50">
                <img src={trustee.image} alt={trustee.name} loading="lazy" decoding="async" className="h-full w-full object-contain object-bottom" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-neutral-900">{trustee.name}</h2>
                <p className="mb-5 mt-2 text-sm font-medium leading-6 text-brand">{trustee.role}</p>
                {trustee.founder ? (
                  <div className="mt-auto">
                    <p className="mb-4 text-sm leading-6 text-neutral-600 max-w-prose">Read the approved founder biography and learn about his community and technology work.</p>
                    <Link to="/about/founders-message" className="ofd-text-link">Read founder profile <span aria-hidden="true">→</span></Link>
                  </div>
                ) : trustee.bio ? (
                  <details className="mt-auto border-t border-neutral-200 pt-3">
                    <summary className="cursor-pointer py-2 text-sm font-semibold text-neutral-800 hover:text-brand">Read profile</summary>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{trustee.bio}</p>
                  </details>
                ) : (
                  <p className="mt-auto border-t border-neutral-200 pt-4 text-sm leading-6 text-neutral-600">Profile details to be updated.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Trustees
