import React from 'react'

function Home() {
  const scrollToOurWork = () => {
    const ourWorkSection = document.getElementById('our-work')
    if (ourWorkSection) {
      ourWorkSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
  }
  return (
    <div className="home-hero relative overflow-hidden bg-neutral-900">
      <div aria-hidden="true" className="home-hero-accent"></div>
      <div className="relative flex min-h-[100svh] items-end pb-16 pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-end relative z-10 w-full">
          <div className="text-white space-y-4 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl md:text-xl lg:text-2xl font-medium">
              Otiano Foundation for Development
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Opportunity for All • Possibility Everywhere
            </h1>
           
            <p className="text-white/90 text-base leading-relaxed">
              We empower communities across Africa with innovative education, healthcare, economic opportunities, and social protection - unlocking potential and fostering sustainable growth for all.
            </p>
             <button 
               onClick={scrollToOurWork}
               className="inline-block text-white underline hover:opacity-80 transition-opacity cursor-pointer"
             >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home