import { Link } from 'react-router-dom'
const principles = [
  ['01', 'Listen First', 'Begin with the communities closest to the challenges, instead of assuming what they need.'],
  ['02', 'Plan Responsibly', 'Bring evidence, relevant expertise and local perspectives together before choosing a way forward.'],
  ['03', 'Learn and Improve', 'Set clear expectations, review what is learned and strengthen future programmes.'],
]
function OurApproach() {
  return (
    <section className="ofd-approach-section" aria-labelledby="approach-heading">
      <div className="site-container">
        <div className="ofd-approach-intro">
          <p className="section-eyebrow">How we think about development</p>
          <h2 id="approach-heading" className="section-heading">Meaningful change starts with the right questions.</h2>
          <p className="reading-copy">Before programmes come principles. We are building OFD around listening, responsible decisions and the willingness to learn.</p>
        </div>
        <div className="ofd-approach-steps">
          {principles.map(([number, title, text]) => (
            <article key={number} className="ofd-approach-step">
              <span aria-hidden="true" className="ofd-approach-number">{number}</span>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <Link to="/about/strategic-plan" className="ofd-text-link mt-7">Explore our strategic direction <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}
export default OurApproach
