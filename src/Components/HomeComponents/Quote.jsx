import { Link } from 'react-router-dom'

function Quote() {
  return (
    <section className="section-space border-y border-brand-100 bg-brand-50">
      <div className="site-container max-w-3xl text-center">
        <p className="section-eyebrow">A community-led direction</p>
        <h2 className="section-heading">Building programmes around needs that people have identified.</h2>
        <p className="reading-copy mx-auto mt-4">Learn about the founder’s community work and the experience that informs the Foundation’s direction.</p>
        <Link to="/about/founders-message" className="ofd-button mt-6">Meet our founder <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}

export default Quote
