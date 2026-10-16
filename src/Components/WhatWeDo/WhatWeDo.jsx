import OurWork from '../HomeComponents/OurWork'

function WhatWeDo() {
  return (
    <div>
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="site-container pb-10">
            <h1 className="mb-4 text-3xl font-bold text-brand md:text-4xl">What We Do</h1>
            <p className="reading-copy">Opportunity for All • Possibility Everywhere</p>
          </div>
        </div>
      </section>
      <OurWork />
    </div>
  )
}

export default WhatWeDo
