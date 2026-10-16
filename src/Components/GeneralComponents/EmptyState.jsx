import { Link } from 'react-router-dom'

function EmptyState({ title, children, contactLabel = 'Contact the Foundation' }) {
  return (
    <div className="ofd-card mx-auto max-w-3xl border-l-4 border-l-brand p-6 sm:p-8">
      <h3 className="mb-3 text-xl font-semibold text-neutral-900">{title}</h3>
      <div className="reading-copy">{children}</div>
      <Link to="/contact" className="ofd-text-link mt-5">{contactLabel} <span aria-hidden="true">→</span></Link>
    </div>
  )
}

export default EmptyState
