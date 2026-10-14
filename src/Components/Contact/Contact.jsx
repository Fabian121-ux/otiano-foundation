import React from 'react'
import Navbar from '../GeneralComponents/Navbar'

function Contact() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-4">Contact Us</h1>
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
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">General Inquiries</h3>
              <p className="text-gray-600 mb-4">
For questions about our programs, partnerships, or support:               </p>
              <a href="mailto:inquiries@aigafrica.org" className="text-red-600 font-medium hover:text-red-600">
                info@otianofoundation.org 
              </a>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Media Inquiries</h3>
              <p className="text-gray-600 mb-4">
For press releases, interviews, or media kits:               </p>
              <a href="mailto:communication@aigafrica.org" className="text-red-600 font-medium hover:text-red-600">
                media@otianofoundation.org
              </a>
            </div>
            
            {/* <div className="bg-red-50 p-8 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-gray-700 text-sm leading-relaxed">
                  While we aim to be available to all our stakeholders and other interested parties, occasionally our response time may be delayed due to the large volume of emails we receive. Please bear with us.
                </p>
              </div>
            </div> */}
          </div>
          
          {/* <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Lagos Office</h3>
              <div className="space-y-2 text-gray-600">
                <p>19 Gerrard Road</p>
                <p>Ikoyi</p>
                <p>Lagos</p>
                <p>Nigeria</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Abuja Office</h3>
              <div className="space-y-2 text-gray-600">
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