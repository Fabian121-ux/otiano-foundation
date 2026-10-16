import { FaGraduationCap, FaHeartbeat, FaHandsHelping, FaShieldAlt, FaSeedling } from 'react-icons/fa'

const icons = {
  education: FaGraduationCap,
  healthcare: FaHeartbeat,
  livelihoods: FaSeedling,
  protection: FaShieldAlt,
  partnership: FaHandsHelping,
}

// An illustration represents a programme theme; it does not imply a documented activity.
function BrandVisual({ title, topic = 'partnership', className = '' }) {
  const Icon = icons[topic] || FaHandsHelping
  return (
    <div role="img" aria-label={`${title} programme icon`} className={`brand-visual ${className}`}>
      <span aria-hidden="true" className="brand-visual-icon"><Icon className="h-9 w-9" /></span>
      <span aria-hidden="true" className="max-w-xs text-center text-lg font-semibold leading-snug">{title}</span>
    </div>
  )
}

export default BrandVisual
