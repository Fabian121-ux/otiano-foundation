import { Link } from 'react-router-dom'
import BrandVisual from '../GeneralComponents/BrandVisual'

const pillars = [
  { title: 'Education', topic: 'education', visual: 'Learning and opportunity', to: '/education', description: 'Supporting learning, school engagement, and opportunity for children and young people.' },
  { title: 'Healthcare', topic: 'healthcare', visual: 'Awareness and access', to: '/healthcare', description: 'Promoting health awareness, access to care, and practical community support.' },
  { title: 'Economic Empowerment', topic: 'livelihoods', visual: 'Skills and livelihoods', to: '/economic-empowerment', description: 'Focusing on skills, financial knowledge, career development, and pathways to work.' },
  { title: 'Social Welfare', topic: 'protection', visual: 'Dignity and inclusion', to: '/social-welfare', description: 'Prioritising protection, inclusion, and the needs of people facing vulnerability.' },
]

function OurWork() {
  return (
    <section id="our-work" className="section-space bg-neutral-50" aria-labelledby="pillars-heading">
      <div className="site-container">
        <div className="section-intro">
          <p className="section-eyebrow">Our programme pillars</p>
          <h2 id="pillars-heading" className="section-heading">What We Do</h2>
          <p className="reading-copy">Four connected areas guide the programmes we aim to build around community needs.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.to} className="ofd-card flex min-w-0 flex-col overflow-hidden">
              <BrandVisual title={pillar.visual} topic={pillar.topic} className="pillar-visual" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">{pillar.title}</h3>
                <p className="mb-6 text-[0.9375rem] leading-7 text-neutral-600 max-w-prose">{pillar.description}</p>
                <Link to={pillar.to} className="ofd-button ofd-button-outline mt-auto" aria-label={`Explore ${pillar.title}`}>Explore pillar <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurWork
