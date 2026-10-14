import React from 'react'
import Navbar from '../GeneralComponents/Navbar'

function Contact() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-brand mb-4">Contact Us</h1>
              <p className="text-lg md:text-xl font-medium">
Reach out for inquiries, collaborations, or general information.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">General Inquiries</h3>
              <p className="text-neutral-600 mb-4">
For questions about our programs, partnerships, or support:               </p>
              <a href="mailto:info@otianofoundation.org" className="text-brand font-medium hover:text-brand">
                info@otianofoundation.org 
              </a>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-card">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Media Inquiries</h3>
              <p className="text-neutral-600 mb-4">
For press releases, interviews, or media kits:               </p>
              <a href="mailto:media@otianofoundation.org" className="text-brand font-medium hover:text-brand">
                media@otianofoundation.org
              </a>
            </div>
            
            {/* <div className="bg-brand-50 p-8 rounded-card md:col-span-2 lg:col-span-1">
              <div className="bg-brand-100 p-4 rounded-card">
                <p className="text-neutral-700 text-sm leading-relaxed">
                  While we aim to be available to all our stakeholders and other interested parties, occasionally our response time may be delayed due to the large volume of emails we receive. Please bear with us.
                </p>
              </div>
            </div> */}
          </div>
          
          {/* <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-neutral-200 p-8 rounded-card">
              <h3 className="text-xl font-bold text-neutral-800 mb-6">Lagos Office</h3>
              <div className="space-y-2 text-neutral-600">
                <p>19 Gerrard Road</p>
                <p>Ikoyi</p>
                <p>Lagos</p>
                <p>Nigeria</p>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 p-8 rounded-card">
              <h3 className="text-xl font-bold text-neutral-800 mb-6">Abuja Office</h3>
              <div className="space-y-2 text-neutral-600">
                <p>1, Ichie Jude U. Igwe close</p>
                <p>Asokoro</p>
                <p>Abuja</p>
                <p>Nigeria</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default Contact