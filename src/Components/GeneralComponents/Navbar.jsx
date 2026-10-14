import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/ofdlogo-red.png'

function Navbar({ isDark = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const aboutDropdown = [
    { name: 'Our Story', path: '/about/our-story' },
    { name: 'Founder\'s Message', path: '/about/founders-message' },
    { name: 'Our Role', path: '/about/our-role' },
    { name: 'Our Values', path: '/about/our-values' },
    { name: 'Our Strategic Plan', path: '/about/strategic-plan' },
    { name: 'Our Trustees', path: '/about/trustees' }
  ]
  const whatWeDoDropdown = [
    { name: 'Education', path: '/education' },
    { name: 'Healthcare', path: '/healthcare' },
    { name: 'Economic Empowerment', path: '/economic-empowerment' },
    { name: 'Social Welfare & Protection', path: '/social-welfare' }
  ]
  const newsDropdown = [
    { name: 'News', path: '/latest-news' },
    { name: 'Events', path: '/events' }
  ]
  const getInvolvedDropdown = [
    { name: 'Volunteer Opportunities', path: '/volunteer-opportunities' },
    { name: 'Advocacy Campaign', path: '/advocacy-campaign' },
    { name: 'Youth Program', path: '/youth-program' },
    { name: 'Ambassador Program', path: '/ambassador-program' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 py-3 transition-all duration-300 ${
      isMenuOpen ? 'bg-black/95 backdrop-blur-md' : isDark ? 'bg-black/70 backdrop-blur-md' : isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          <img 
            src={Logo} 
            alt="Otinao Foundation for Development Logo" 
            className="h-16 object-contain"
          />
        </Link>
        
        <div className={`lg:flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 ${isMenuOpen ? 'fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 h-screen w-screen' : 'hidden'} lg:relative lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:h-auto lg:w-auto`}>
          {/* Close button for mobile */}
          {isMenuOpen && (
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl lg:hidden"
            >
              ✕
            </button>
          )}
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
              className="text-white text-lg hover:opacity-80 transition-opacity flex items-center gap-1 lg:pointer-events-none"
            >
              About
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`lg:absolute lg:top-full lg:left-0 lg:bg-white/85 lg:backdrop-blur-md lg:rounded-sm lg:shadow-lg lg:p-2 lg:space-y-1 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:duration-200 lg:min-w-60 ${openDropdown === 'about' ? 'block mt-4 space-y-2' : 'hidden lg:block'}`}>
              {aboutDropdown.map((item) => (
                <Link key={item.name} to={item.path} className="block text-white lg:text-gray-800 hover:text-red-600 lg:hover:text-red-600 lg:hover:bg-red-50 lg:px-3 lg:py-2 lg:rounded transition-all py-2 text-base">{item.name}</Link>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'whatWeDo' ? null : 'whatWeDo')}
              className="text-white text-lg hover:opacity-80 transition-opacity flex items-center gap-1 lg:pointer-events-none"
            >
              What we do
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`lg:absolute lg:top-full lg:left-0 lg:bg-white/85 lg:backdrop-blur-md lg:rounded-sm lg:shadow-lg lg:p-2 lg:space-y-1 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:duration-200 lg:min-w-60 ${openDropdown === 'whatWeDo' ? 'block mt-4 space-y-2' : 'hidden lg:block'}`}>
              {whatWeDoDropdown.map((item) => (
                <Link key={item.name} to={item.path} className="block text-white lg:text-gray-800 hover:text-red-600 lg:hover:text-red-600 lg:hover:bg-red-50 lg:px-3 lg:py-2 lg:rounded transition-all py-2 text-base">{item.name}</Link>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'news' ? null : 'news')}
              className="text-white text-lg hover:opacity-80 transition-opacity flex items-center gap-1 lg:pointer-events-none"
            >
              Media
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`lg:absolute lg:top-full lg:left-0 lg:bg-white/85 lg:backdrop-blur-md lg:rounded-sm lg:shadow-lg lg:p-2 lg:space-y-1 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:duration-200 lg:min-w-60 ${openDropdown === 'news' ? 'block mt-4 space-y-2' : 'hidden lg:block'}`}>
              {newsDropdown.map((item) => (
                <Link key={item.name} to={item.path} className="block text-white lg:text-gray-800 hover:text-red-600 lg:hover:text-red-600 lg:hover:bg-red-50 lg:px-3 lg:py-2 lg:rounded transition-all py-2 text-base">{item.name}</Link>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'getInvolved' ? null : 'getInvolved')}
              className="text-white text-lg hover:opacity-80 transition-opacity flex items-center gap-1 lg:pointer-events-none"
            >
              Get Involved
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`lg:absolute lg:top-full lg:left-0 lg:bg-white/85 lg:backdrop-blur-md lg:rounded-sm lg:shadow-lg lg:p-2 lg:space-y-1 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:duration-200 lg:min-w-60 ${openDropdown === 'getInvolved' ? 'block mt-4 space-y-2' : 'hidden lg:block'}`}>
              {getInvolvedDropdown.map((item) => (
                <Link key={item.name} to={item.path} className="block text-white lg:text-gray-800 hover:text-red-600 lg:hover:text-red-600 lg:hover:bg-red-50 lg:px-3 lg:py-2 lg:rounded transition-all py-2 text-base">{item.name}</Link>
              ))}
            </div>
          </div>
          
          <Link to="/contact" className="text-white text-lg hover:text-red-600 hover:bg-white/10 px-3 py-2 rounded transition-all flex items-center">Contact</Link>
        </div>
        
        <button className="lg:hidden flex flex-col gap-1 z-[60] relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar