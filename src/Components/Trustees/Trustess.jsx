import Kingsley from '../../assets/trustees/kingsley-otiaba.jpg'
import David from '../../assets/trustees/david-achugbu.jpg'
import Raphael from '../../assets/trustees/raphael-anyanwu.jpg'
import Awan from '../../assets/trustees/zanang-diana-awan.jpg'
import Cheeka from '../../assets/trustees/cheeka-onyeka.jpg'
import Ekeoma from '../../assets/trustees/ekeoma-solomon-ogbu.jpg'
import Lucy from '../../assets/trustees/lucy-simon-ashide.jpg'
import FounderMessageBackground from '../../assets/trustees/trustees-hero.jpg'
import { founderProfile } from '../../data/founderProfile'

// Only the Foundation-approved profiles have biographies. Other profiles
// remain clearly marked as awaiting approved text.
const trustees = [
  { name: founderProfile.name, image: Kingsley, role: 'Chairman', bio: founderProfile.bio, founder: true },
  { name: 'David Achugbu', image: David, role: 'Secretary, Board of Trustees' },
  { name: 'Raphael Anyanwu', image: Raphael, role: 'Trustee' },
  {
    name: 'Miss Zanang Diana Awan',
    image: Awan,
    role: 'Trustee',
    bio: [
      'Zanang Diana Awan holds a BA in International Relations from the American University of Nigeria and an MA in Global Governance and Sustainable Development from Middlesex University London. She works in tax administration, bringing a practical understanding of public service to her interest in governance and sustainable development.',
      'She is passionate about community development, agriculture and youth empowerment, particularly initiatives that promote inclusive growth and create opportunities for young people to thrive. As a trustee, she supports the Foundation’s efforts to build stronger, more resilient communities.',
    ],
  },
  { name: 'Cheeka Onyeka Esq.', image: Cheeka, role: 'Trustee' },
  { name: 'Ekeoma Solomon Ogbu Esq.', image: Ekeoma, role: 'Trustee' },
  { name: 'Lucy Simon Ashide', image: Lucy, role: 'Trustee' },
]

function Trustees() {
  return (
    <div>
      <section className="brand-hero trustees-hero" aria-labelledby="trustees-heading">
        {/* Reuse the exact background asset from Founder's Message; that page is unchanged. */}
        <img src={FounderMessageBackground} alt="" fetchPriority="high" decoding="async" className="trustees-hero-image" />
        <div className="relative z-10">
          <div className="site-container trustees-hero-content">
            <p className="trustees-hero-eyebrow">Otiano Foundation for Development</p>
            <h1 id="trustees-heading">Meet Our Board of Trustees</h1>
            <div className="trustees-hero-rule" aria-hidden="true" />
            <p className="trustees-hero-description">
              Our trustees provide oversight, guidance and diverse experience to help the Foundation
              pursue its mission through responsible governance and community-led programmes.
            </p>
          </div>
        </div>
      </section>

      <section className="trustees-board-section" aria-labelledby="trustee-list-heading">
        <div className="site-container">
          <div className="trustees-board-label">
            <h2 id="trustee-list-heading">Board of Trustees</h2>
          </div>
          <div className="trustees-grid">
            {trustees.map((trustee) => (
              <article
                key={trustee.name}
                id={trustee.founder ? 'chairman-profile' : undefined}
                className="trustee-card"
                aria-label={trustee.name}
              >
                <div className="trustee-photo-frame">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    loading="lazy"
                    decoding="async"
                    className="trustee-portrait"
                  />
                </div>
                <div className="trustee-card-body">
                  <h3 className="trustee-card-name">{trustee.name}</h3>
                  <p className="trustee-card-role">{trustee.role}</p>
                  <details className="trustee-profile-details">
                    <summary className="trustee-profile-button">
                      View Profile <span aria-hidden="true">›</span>
                    </summary>
                    <div className="trustee-profile-copy">
                      {trustee.bio ? (
                        trustee.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                      ) : (
                        <p>A full biography will be added once approved by the Foundation.</p>
                      )}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trustees
