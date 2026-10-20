import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa6'

// Do not invent official destinations when they are not confirmed.
const socialChannels = [
  { name: 'Facebook', Icon: FaFacebookF, href: 'https://www.facebook.com/61590448050659/' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/otiano-foundation-for-development/' },
  { name: 'TikTok', Icon: FaTiktok, href: 'https://www.tiktok.com/@the_ofd' },
]

function Footer() {
  return (
    <footer className="bg-neutral-900 pt-12 pb-8 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 max-w-xs text-xl font-bold text-white">The Otiano Foundation for Development</h3>
            <p className="text-sm leading-relaxed text-neutral-200">Working to widen access to opportunity through education, healthcare, economic empowerment, and social welfare.</p>
            <div className="ofd-footer-social" aria-label="Social media">
              <p className="ofd-footer-social-title">Follow us on</p>
              <div className="ofd-footer-social-links">
                {socialChannels.map((channel) => channel.href ? (
                  <a key={channel.name} href={channel.href} target="_blank" rel="noopener noreferrer" className="ofd-social-link"
                    aria-label={`Follow OFD on ${channel.name}`}><channel.Icon aria-hidden="true" /><span>{channel.name}</span></a>
                ) : (
                  <span key={channel.name} className="ofd-social-link is-pending"
                    aria-label={`${channel.name} official page awaiting confirmation`}
                    title="Official profile URL not yet confirmed">
                    <channel.Icon aria-hidden="true" /><span>{channel.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-6 inline-block border-b border-neutral-400 pb-2 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ['Home', '/'], ['About Us', '/about/our-story'],
                ['News & Media', '/latest-news'], ['Get Involved', '/volunteer-opportunities'],
              ].map(([label, to]) => (
                <li key={to}><Link to={to} className="group flex items-center rounded px-2 py-1 text-sm text-neutral-200 transition-all hover:bg-neutral-700 hover:text-white">
                  <span aria-hidden="true" className="mr-2 h-0.5 w-2 bg-brand transition-all group-hover:w-4" />{label}
                </Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 inline-block border-b border-neutral-400 pb-2 text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-neutral-200"><FaPhone className="mr-3 shrink-0 text-brand" />
                <a href="tel:+2349022588266" className="hover:underline">+2349022588266</a></li>
              <li className="flex items-center text-sm text-neutral-200"><FaEnvelope className="mr-3 shrink-0 text-brand" />
                <a href="mailto:info@otianofoundation.org" className="min-w-0 break-words hover:underline">info@otianofoundation.org</a></li>
              <li className="flex items-center text-sm text-neutral-200"><FaEnvelope className="mr-3 shrink-0 text-brand" />
                <a href="mailto:media@otianofoundation.org" className="min-w-0 break-words hover:underline">media@otianofoundation.org</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Get Involved</h4>
            <p className="mb-5 text-sm leading-6 text-neutral-200">Tell us about your interests, experience, and how you would like to contribute.</p>
            <Link to="/volunteer-opportunities" className="inline-flex min-h-11 items-center rounded-card border border-neutral-500 px-4 py-2 text-sm font-semibold text-white hover:border-white hover:bg-neutral-800">
              Express interest <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-600 pt-8">
          <p className="text-center text-sm text-neutral-300">© {new Date().getFullYear()} Otiano Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
