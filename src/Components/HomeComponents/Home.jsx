import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SpeakerPhoto from '../../assets/homepage/landing-speaker.jpg'
import TeamPhoto from '../../assets/homepage/landing-team.jpg'
import StudentsPhoto from '../../assets/homepage/landing-students.jpg'


const SLIDE_INTERVAL_MS = 3800

const slides = [
  { title: 'Opportunity for All. Possibility Everywhere.',
    text: 'We believe opportunity should not depend on where someone lives or the circumstances they were born into.',
    button: 'Discover Our Story', to: '/about/our-story', image: TeamPhoto, position: 'center 45%' },
  { title: 'Development Starts With Listening',
    text: 'Our approach puts community priorities, thoughtful planning and accountable partnerships first.',
    button: 'Explore Our Approach', to: '/about/our-role', image: SpeakerPhoto, position: 'center 36%' },
  { title: 'The Future Is Built Together',
    text: 'Bring your ideas, expertise or time to a shared vision of wider access and lasting possibility.',
    button: 'Get Involved', to: '/volunteer-opportunities', image: StudentsPhoto, position: 'center 44%' },
]

function Home() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const carouselRef = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(media.matches)
    const onVisibility = () => setHidden(document.hidden)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(carouselRef.current)
    media.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const rotating = !paused && !reducedMotion && !hidden && !hovered && inView
  useEffect(() => {
    if (!rotating) return
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [rotating])

  const chooseSlide = (index) => {
    setActive((index + slides.length) % slides.length)
  }

  return (
    <section ref={carouselRef} className="landing-hero" aria-label="Otiano Foundation highlights" aria-roledescription="carousel"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true) }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        // Keyboard focus pauses autoplay for accessibility; touch selection keeps rotating.
        if (!event.currentTarget.contains(event.relatedTarget) && !event.target.closest('[data-rotation-control]') && event.target.matches(':focus-visible')) setPaused(true)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          chooseSlide(active + (event.key === 'ArrowRight' ? 1 : -1))
        }
      }}>
      <div className="landing-hero-images" aria-hidden="true">
        {slides.map((slide, index) => (
          <img key={slide.title} src={slide.image} alt="" decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            className={`landing-hero-image ${index === active ? 'is-active' : ''}`}
            style={{ objectPosition: slide.position }} />
        ))}
      </div>
      <div className="landing-hero-shade" aria-hidden="true" />
      <div className="site-container landing-hero-layout">
        <p className="landing-eyebrow">Otiano Foundation for Development</p>
        <div className="landing-slides" aria-live={paused || reducedMotion ? 'polite' : 'off'}>
          {slides.map((slide, index) => {
            const current = index === active
            const Heading = current ? 'h1' : 'h2'
            return (
              <div key={slide.title} id={`hero-slide-${index + 1}`} role="group" aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`} aria-hidden={!current} inert={!current}
                className={`landing-slide ${current ? 'is-active' : ''}`}>
                <Heading className="landing-heading">{slide.title}</Heading>
                <p className="landing-description">{slide.text}</p>
                <Link to={slide.to} className="ofd-button landing-cta">{slide.button}<span aria-hidden="true">→</span></Link>
              </div>
            )
          })}
        </div>
        <div className="landing-controls">
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Choose a highlight">
            {slides.map((slide, index) => (
              <button key={slide.title} type="button" onClick={() => chooseSlide(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={active === index ? 'true' : undefined}
                aria-controls={`hero-slide-${index + 1}`} className="landing-dot-button">
                <span className={`landing-dot ${active === index ? 'is-active' : ''}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="landing-control" aria-label="Previous slide" onClick={() => chooseSlide(active - 1)}>←</button>
            <button type="button" className="landing-control" aria-label="Next slide" onClick={() => chooseSlide(active + 1)}>→</button>
            {!reducedMotion && (
              <button type="button" data-rotation-control className="landing-control landing-play" aria-label={paused ? 'Start slideshow' : 'Pause slideshow'}
                onClick={() => setPaused((value) => !value)}>{paused ? 'Play' : 'Pause'}</button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Home
