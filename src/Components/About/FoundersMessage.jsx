import { Link } from 'react-router-dom'
import Navbar from '../GeneralComponents/Navbar'
import Footer from '../GeneralComponents/Footer'
import SEO from '../GeneralComponents/SEO'
import KingsleyImage from '../../assets/trustees/Kingsley Otiaba.png'
import { founderProfile } from '../../data/founderProfile'

const sections = [
  { title: 'Foundation leadership', start: 0 },
  { title: 'Community work and recognition', start: 2 },
  { title: 'Technology and wider experience', start: 4 },
]

function FoundersMessage() {
  return (
    <div>
      <SEO title="Founder Profile" description={founderProfile.bio[0]} />
      <Navbar />
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="site-container pb-10">
            <p className="section-eyebrow">Founder profile</p>
            <h1 className="mb-4 max-w-3xl text-3xl font-bold text-brand md:text-4xl">{founderProfile.name}</h1>
            <p className="max-w-2xl text-base font-medium leading-7 text-neutral-700">{founderProfile.role}</p>
          </div>
        </div>
      </section>
      <main className="section-space bg-white">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <aside className="order-first mx-auto w-full max-w-xs lg:order-last lg:sticky lg:top-24">
            <figure className="ofd-card overflow-hidden">
              <img src={KingsleyImage} alt={founderProfile.name + ', Founder and Executive Chairman'}
                fetchPriority="high" decoding="async" className="aspect-[4/5] w-full bg-neutral-50 object-contain object-bottom" />
              <figcaption className="border-t border-neutral-200 p-5">
                <p className="font-semibold text-neutral-900">{founderProfile.name}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600 max-w-prose">Founder and Executive Chairman</p>
              </figcaption>
            </figure>
          </aside>
          <article className="reading-copy space-y-8">
            {sections.map((section) => (
              <section key={section.start} aria-labelledby={`profile-section-${section.start}`} className="space-y-4">
                <h2 id={`profile-section-${section.start}`} className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                {founderProfile.bio.slice(section.start, section.start + 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <Link to="/about/trustees" className="ofd-text-link">Meet our trustees <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default FoundersMessage
