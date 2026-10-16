import Kingsley from '../../assets/trustees/kingsley-otiaba.jpg'
import David from '../../assets/trustees/david-achugbu.jpg'
import Raphael from '../../assets/trustees/raphael-anyanwu.jpg'
import Awan from '../../assets/trustees/zanang-awan.jpg'
import Cheeka from '../../assets/trustees/cheeka-onyeka.jpg'
import Ekeoma from '../../assets/trustees/ekeoma-solomon-ogbu.jpg'
import Lucy from '../../assets/trustees/lucy-simon-ashide.jpg'
import { founderProfile } from '../../data/founderProfile'

const trustees = [
  { name: founderProfile.name, image: Kingsley, role: 'Chairman', founder: true },
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
                  <div className="mt-auto border-t border-neutral-200 pt-3">
                    <a href="#chairman-profile" className="ofd-text-link">View Profile <span aria-hidden="true">→</span></a>
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
      <section id="chairman-profile" className="section-space scroll-mt-24 bg-neutral-50" aria-labelledby="chairman-profile-heading">
        <div className="site-container">
          <div className="mx-auto grid max-w-5xl items-start gap-8 rounded-card border border-neutral-200 bg-white p-5 shadow-card sm:p-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
            <div>
              <p className="section-eyebrow">Board of Trustees</p>
              <h2 id="chairman-profile-heading" className="mb-2 text-2xl font-bold text-neutral-900 sm:text-3xl">{founderProfile.name}</h2>
              <p className="mb-6 text-base font-semibold text-brand">Chairman</p>
              <div className="reading-copy space-y-5">
                {founderProfile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <img src={Kingsley} alt={founderProfile.name} loading="lazy" decoding="async"
              className="order-first mx-auto aspect-[4/5] w-full max-w-60 rounded-card bg-neutral-50 object-contain object-bottom lg:order-last" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trustees
