import { useEffect, useRef, useState } from 'react'
import Kingsley from '../../assets/trustees/kingsley-otiaba.jpg'
import David from '../../assets/trustees/david-achugbu.jpg'
import Raphael from '../../assets/trustees/raphael-anyanwu.jpg'
import Awan from '../../assets/trustees/zanang-diana-awan.jpg'
import Cheeka from '../../assets/trustees/cheeka-onyeka.jpg'
import Ekeoma from '../../assets/trustees/ekeoma-solomon-ogbu.jpg'
import Lucy from '../../assets/trustees/lucy-simon-ashide.jpg'
import FounderMessageBackground from '../../assets/trustees/trustees-hero.jpg'
import { founderProfile } from '../../data/founderProfile'

// Keep the Foundation-approved biography text intact while placing only its
// first complete sentence above the portrait. The rest follows the portrait.
function splitProfileBiography(bio) {
  if (!Array.isArray(bio) || bio.length === 0) return { introduction: null, remainder: [] }
  const [firstParagraph, ...laterParagraphs] = bio
  const end = firstParagraph.indexOf('. ')
  if (end < 0) return { introduction: firstParagraph, remainder: laterParagraphs }
  const introduction = firstParagraph.slice(0, end + 1)
  const continuation = firstParagraph.slice(end + 2).trim()
  return {
    introduction,
    remainder: continuation ? [continuation, ...laterParagraphs] : laterParagraphs,
  }
}

// Only the Foundation-approved profiles have biographies. Other profiles
// remain clearly marked as awaiting approved text.
const trustees = [
  { name: founderProfile.name, image: Kingsley, role: 'Chairman', bio: founderProfile.bio, founder: true },
  { name: 'David Achugbu', image: David, role: 'Secretary' },
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
  const [selectedTrustee, setSelectedTrustee] = useState(null)
  const dialogRef = useRef(null)
  const openingButtonRef = useRef(null)
  const profileText = splitProfileBiography(selectedTrustee?.bio)

  useEffect(() => {
    if (!selectedTrustee) return undefined
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()

    // Prevent the underlying board from moving on touchscreens while the
    // selected trustee's profile is open.
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = oldOverflow }
  }, [selectedTrustee])

  const openProfile = (trustee, button) => {
    openingButtonRef.current = button
    setSelectedTrustee(trustee)
  }

  const closeProfile = () => dialogRef.current?.close()

  const onProfileClosed = () => {
    setSelectedTrustee(null)
    openingButtonRef.current?.focus({ preventScroll: true })
  }

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
              Our Board provides independent oversight and guidance for the Foundation’s community work.
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
                className={`trustee-card ${selectedTrustee?.name === trustee.name ? 'is-selected' : ''}`}
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
                  <button
                    type="button"
                    className="trustee-profile-button"
                    aria-label={`View Profile: ${trustee.name}`}
                    onClick={(event) => openProfile(trustee, event.currentTarget)}
                  >
                    View Profile <span aria-hidden="true">›</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="trustee-profile-dialog"
        aria-labelledby="trustee-dialog-heading"
        aria-describedby="trustee-dialog-role"
        onClose={onProfileClosed}
        onClick={(event) => { if (event.target === event.currentTarget) closeProfile() }}
      >
        {selectedTrustee && (
          <>
            <div className="trustee-dialog-header">
              <button type="button" className="trustee-dialog-close" aria-label="Close trustee profile" onClick={closeProfile}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="trustee-dialog-content">
              <div className="trustee-dialog-text">
                <h2 id="trustee-dialog-heading">{selectedTrustee.name}</h2>
                <p id="trustee-dialog-role" className="trustee-dialog-role">{selectedTrustee.role}</p>
                <div className="trustee-dialog-accent" aria-hidden="true" />
                <div className="trustee-dialog-bio">
                  {profileText.introduction && (
                    <p className="trustee-dialog-lede">{profileText.introduction}</p>
                  )}
                  <img
                    className="trustee-dialog-portrait"
                    src={selectedTrustee.image}
                    alt={selectedTrustee.name}
                    decoding="async"
                  />
                  {profileText.introduction
                    ? profileText.remainder.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    : <p>A full biography will be added once approved by the Foundation.</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}

export default Trustees
