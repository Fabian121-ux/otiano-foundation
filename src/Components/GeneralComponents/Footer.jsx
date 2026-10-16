import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-8 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              The Otiano Foundation for Development
            </h3>
            <p className="text-neutral-200 text-sm leading-relaxed">
              Working to widen access to opportunity through education, healthcare, economic empowerment, and social welfare.</p>
          </div>

          
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

          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-neutral-400 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              
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

          
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Get involved</h4>
            <p className="mb-5 text-sm leading-6 text-neutral-200">Tell us about your interests, experience, and how you would like to contribute.</p>
            <Link to="/volunteer-opportunities" className="inline-flex min-h-11 items-center rounded-card border border-neutral-500 px-4 py-2 text-sm font-semibold text-white hover:border-white hover:bg-neutral-800">Express interest <span aria-hidden="true" className="ml-2">→</span></Link>
          </div>
        </div>

        
        <div className="border-t border-neutral-400 pt-8 mt-8 ">
          <p className="text-neutral-300 text-sm text-center mb-4 md:mb-0">
            &copy; {currentYear} Otiano Foundation. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
