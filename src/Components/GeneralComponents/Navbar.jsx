import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../../assets/ofdlogo-red.png'

const navigation = [
  { id: 'about', label: 'About', links: [
    { label: 'Our Story', to: '/about/our-story' },
    { label: "Founder's Message", to: '/about/founders-message' },
    { label: 'Our Role', to: '/about/our-role' },
    { label: 'Our Values', to: '/about/our-values' },
    { label: 'Our Strategic Plan', to: '/about/strategic-plan' },
    { label: 'Our Trustees', to: '/about/trustees' },
  ] },
  { id: 'work', label: 'What We Do', links: [
    { label: 'Education', to: '/education' },
    { label: 'Healthcare', to: '/healthcare' },
    { label: 'Economic Empowerment', to: '/economic-empowerment' },
    { label: 'Social Welfare & Protection', to: '/social-welfare' },
  ] },
  { id: 'media', label: 'Media', links: [
    { label: 'News', to: '/latest-news' },
    { label: 'Events', to: '/events' },
  ] },
  { id: 'involved', label: 'Get Involved', links: [
    { label: 'Volunteer Opportunities', to: '/volunteer-opportunities' },
    { label: 'Advocacy Campaign', to: '/advocacy-campaign' },
    { label: 'Youth Program', to: '/youth-program' },
    { label: 'Ambassador Program', to: '/ambassador-program' },
  ] },
]

function Chevron({ expanded }) {
  return (
    <svg aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [desktopDropdown, setDesktopDropdown] = useState(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const navRef = useRef(null)
  const closeTimer = useRef(null)
  const location = useLocation()

  const closeMenu = useCallback(() => {
    if (!dialogRef.current?.open || closeTimer.current) return
    setIsClosing(true)
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200
    closeTimer.current = window.setTimeout(() => {
      dialogRef.current?.close()
      closeTimer.current = null
    }, duration)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    // Fixed positioning also prevents the page moving underneath the dialog on iOS.
    const scrollY = window.scrollY
    const previous = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const padding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
    Object.assign(document.body.style, {
      position: 'fixed', top: `-${scrollY}px`, width: '100%', overflow: 'hidden',
      paddingRight: `${padding + scrollbar}px`,
    })
    return () => {
      Object.assign(document.body.style, previous)
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [isMenuOpen])

  useEffect(() => {
    closeMenu()
  }, [location.key, closeMenu])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => {
      if (desktop.matches) closeMenu()
    }
    const onOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) setDesktopDropdown(null)
    }
    desktop.addEventListener('change', onResize)
    document.addEventListener('pointerdown', onOutsideClick)
    return () => {
      desktop.removeEventListener('change', onResize)
      document.removeEventListener('pointerdown', onOutsideClick)
      window.clearTimeout(closeTimer.current)
    }
  }, [closeMenu])

  const openMenu = () => {
    setIsClosing(false)
    setMobileDropdown(null)
    dialogRef.current.showModal()
    setIsMenuOpen(true)
  }

  const onDialogClosed = () => {
    setIsMenuOpen(false)
    setIsClosing(false)
    setMobileDropdown(null)
    if (window.innerWidth < 1024) triggerRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <header ref={navRef} className="site-navbar fixed inset-x-0 top-0 z-40 border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Otiano Foundation for Development home" className="min-w-0 shrink-0">
            <img src={Logo} alt="Otiano Foundation for Development" width="335" height="170" className="h-auto w-36 sm:w-40 lg:w-44" />
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-2 lg:flex">
            {navigation.map((group) => {
              const expanded = desktopDropdown === group.id
              const active = group.links.some((link) => location.pathname === link.to)
              return (
                <div key={group.id} className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setDesktopDropdown(null)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      event.stopPropagation()
                      setDesktopDropdown(null)
                      event.currentTarget.querySelector('button').focus()
                    }
                    if (event.key === 'ArrowDown' && event.target.tagName === 'BUTTON') {
                      event.preventDefault()
                      setDesktopDropdown(group.id)
                      const groupElement = event.currentTarget
                      window.requestAnimationFrame(() => groupElement.querySelector('a')?.focus())
                    }
                  }}
                >
                  <button type="button" aria-expanded={expanded} aria-controls={`desktop-${group.id}`}
                    onClick={() => setDesktopDropdown(expanded ? null : group.id)}
                    className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors hover:bg-brand-50 hover:text-brand ${active ? 'text-brand' : 'text-neutral-800'}`}>
                    {group.label}<Chevron expanded={expanded} />
                  </button>
                  <div id={`desktop-${group.id}`} hidden={!expanded}
                    className="absolute right-0 top-full w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-card">
                    {group.links.map((link) => (
                      <NavLink key={link.to} to={link.to} onClick={() => setDesktopDropdown(null)}
                        className={({ isActive }) => `block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand ${isActive ? 'bg-brand-50 text-brand' : 'text-neutral-700'}`}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            })}
            <NavLink to="/contact" className={({ isActive }) => `ml-2 inline-flex min-h-11 items-center rounded-lg px-5 text-sm font-semibold ${isActive ? 'bg-brand-hover' : 'bg-brand'} text-white transition-colors hover:bg-brand-hover`}>Contact</NavLink>
          </nav>
          <button ref={triggerRef} type="button" aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls="mobile-navigation"
            onClick={openMenu} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-100 text-brand hover:bg-brand-50 lg:hidden">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      {createPortal(
        <dialog ref={dialogRef} id="mobile-navigation" aria-labelledby="mobile-navigation-title"
          className={`mobile-navigation ${isClosing ? 'is-closing' : ''}`}
          onCancel={(event) => { event.preventDefault(); closeMenu() }}
          onClose={onDialogClosed}>
          <div className="mobile-navigation-shell">
            <div className="mobile-navigation-header">
              <Link to="/" onClick={closeMenu} aria-label="Otiano Foundation for Development home">
                <img src={Logo} alt="Otiano Foundation for Development" width="335" height="170" className="h-auto w-36 sm:w-40" />
              </Link>
              <button type="button" autoFocus onClick={closeMenu} aria-label="Close navigation menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-white hover:bg-brand-hover">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="mobile-navigation-scroll">
              <h2 id="mobile-navigation-title" className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand">Explore the Foundation</h2>
              <nav aria-label="Mobile navigation">
                {navigation.map((group) => {
                  const expanded = mobileDropdown === group.id
                  return (
                    <div key={group.id} className="border-b border-neutral-200">
                      <button type="button" aria-expanded={expanded} aria-controls={`mobile-${group.id}`}
                        onClick={() => setMobileDropdown(expanded ? null : group.id)}
                        className={`flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-xl font-semibold ${expanded ? 'text-brand' : 'text-neutral-900'}`}>
                        {group.label}<Chevron expanded={expanded} />
                      </button>
                      <div id={`mobile-${group.id}`} className={`navigation-submenu ${expanded ? 'is-expanded' : ''}`} inert={!expanded}>
                        <div className="min-h-0 overflow-hidden">
                          <div className="mb-4 space-y-1 rounded-xl border-l-2 border-brand bg-brand-50 p-2">
                            {group.links.map((link) => (
                              <NavLink key={link.to} to={link.to} onClick={closeMenu}
                                className={({ isActive }) => `block rounded-lg px-3 py-3 text-base font-medium hover:bg-white hover:text-brand ${isActive ? 'bg-white text-brand' : 'text-neutral-700'}`}>
                                {link.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <NavLink to="/contact" onClick={closeMenu} className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-hover">Contact</NavLink>
              </nav>
              <p className="mt-8 border-t border-neutral-200 pt-6 text-sm leading-relaxed text-neutral-600">Opportunity for All<br />Possibility Everywhere</p>
            </div>
          </div>
        </dialog>,
        document.body
      )}
    </>
  )
}

export default Navbar
