import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              The Otiano Foundation for Development
            </h3>
            <p className="text-neutral-200 text-sm leading-relaxed">
              Transforming lives across Africa through inclusive education, quality healthcare, economic empowerment, and dignified social welfare.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-neutral-400 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-neutral-200 hover:text-white hover:bg-neutral-700 px-2 py-1 rounded transition-all text-sm flex items-center group">
                  <span className="w-2 h-0.5 bg-brand mr-2 group-hover:w-4 transition-all"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about/our-story" className="text-neutral-200 hover:text-white hover:bg-neutral-700 px-2 py-1 rounded transition-all text-sm flex items-center group">
                  <span className="w-2 h-0.5 bg-brand mr-2 group-hover:w-4 transition-all"></span>
                  About Us
                </a>
              </li>
              {/* <li>
                <a href="/what-we-do" className="text-neutral-200 hover:text-white hover:bg-neutral-700 px-2 py-1 rounded transition-all text-sm flex items-center group">
                  <span className="w-2 h-0.5 bg-brand mr-2 group-hover:w-4 transition-all"></span>
                  What we do
                </a>
              </li> */}
              <li>
                <a href="/latest-news" className="text-neutral-200 hover:text-white hover:bg-neutral-700 px-2 py-1 rounded transition-all text-sm flex items-center group">
                  <span className="w-2 h-0.5 bg-brand mr-2 group-hover:w-4 transition-all"></span>
                  News & Media
                </a>
              </li>
              <li>
                <a href="/volunteer-opportunities" className="text-neutral-200 hover:text-white hover:bg-neutral-700 px-2 py-1 rounded transition-all text-sm flex items-center group">
                  <span className="w-2 h-0.5 bg-brand mr-2 group-hover:w-4 transition-all"></span>
                  Get involved
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-neutral-400 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              {/* <li className="flex items-start text-neutral-400 text-sm">
                <FaMapMarkerAlt className="mt-1 mr-3 text-brand-200 flex-shrink-0" />
                <span>123 Foundation Way,<br />Lagos, Nigeria</span>
              </li> */}
              <li className="flex items-center text-neutral-200 text-sm">
                <FaPhone className="mr-3 text-brand flex-shrink-0" />
                <a href="tel:+2349022588266" className="hover:underline">+2349022588266</a>
              </li>
              <li className="flex items-center text-neutral-200 text-sm">
                <FaEnvelope className="mr-3 text-brand flex-shrink-0" />
                <a href="mailto:info@otianofoundation.org" className="min-w-0 break-words hover:underline">info@otianofoundation.org</a>
              </li>
              <li className="flex items-center text-neutral-200 text-sm">
                <FaEnvelope className="mr-3 text-brand flex-shrink-0" />
                <a href="mailto:media@otianofoundation.org" className="min-w-0 break-words hover:underline">media@otianofoundation.org</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-neutral-400 pb-2 inline-block">Follow Us</h4>
            <p className="text-neutral-200 text-sm mb-6">
              Stay connected with us on social media for the latest updates and insights.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex items-center justify-center p-3 bg-neutral-700 rounded-card hover:bg-brand-hover transition-all duration-300 group">
                <FaFacebookF className="text-neutral-200 group-hover:text-white mr-2" size={16} />
                <span className="text-neutral-200 group-hover:text-white text-sm">Facebook</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 bg-neutral-700 rounded-card hover:bg-brand-hover transition-all duration-300 group">
                <FaTwitter className="text-neutral-200 group-hover:text-white mr-2" size={16} />
                <span className="text-neutral-200 group-hover:text-white text-sm">Twitter</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 bg-neutral-700 rounded-card hover:bg-brand-hover transition-all duration-300 group">
                <FaLinkedinIn className="text-neutral-200 group-hover:text-white mr-2" size={16} />
                <span className="text-neutral-200 group-hover:text-white text-sm">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 bg-neutral-700 rounded-card hover:bg-brand-hover transition-all duration-300 group">
                <FaInstagram className="text-neutral-200 group-hover:text-white mr-2" size={16} />
                <span className="text-neutral-200 group-hover:text-white text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-400 pt-8 mt-8 ">
          <p className="text-neutral-300 text-sm text-center mb-4 md:mb-0">
            &copy; {currentYear} Otiano Foundation. All rights reserved.
          </p>

          {/* <div className="flex space-x-4">
            <span className="text-neutral-300 text-sm">Connect with us:</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
